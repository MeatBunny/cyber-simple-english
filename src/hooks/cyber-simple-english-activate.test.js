const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
  FALLBACK_CONTEXT,
  MAX_CHARS,
  buildContext,
  CYBER_PARTS,
  cyberPart,
  cyberParts,
  cyberPointer,
  promptCandidates,
  readFirstFile,
  stripFrontmatter,
} = require('./cyber-simple-english-activate');

const SCRIPT = path.join(__dirname, 'cyber-simple-english-activate.js');
const REPO_PROMPT = path.join(__dirname, '..', '..', 'prompts', 'system-prompt.md');

function tmpRoot(promptText) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cse-hook-'));
  fs.mkdirSync(path.join(root, 'prompts'));
  if (promptText !== undefined) {
    fs.writeFileSync(path.join(root, 'prompts', 'system-prompt.md'), promptText);
  }
  return root;
}

function runHook(env) {
  return spawnSync(process.execPath, [SCRIPT], { env: { ...process.env, PLUGIN_ROOT: '', CLAUDE_PLUGIN_ROOT: '', ...env }, encoding: 'utf8' });
}

test('prefers the prompt under the plugin root', () => {
  assert.equal(promptCandidates('/plugin', '/plugin/src/hooks')[0], '/plugin/prompts/system-prompt.md');
});

test('falls back to the repository layout without a plugin root', () => {
  assert.equal(promptCandidates(undefined, '/repo/src/hooks')[0], '/repo/prompts/system-prompt.md');
});

test('skips an unreadable candidate and reads the next one', (t) => {
  if (process.getuid && process.getuid() === 0) {
    t.skip('root can read mode 000 files');
    return;
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cse-read-'));
  const locked = path.join(dir, 'locked.md');
  const open = path.join(dir, 'open.md');
  fs.writeFileSync(locked, 'SECRET');
  fs.chmodSync(locked, 0o000);
  fs.writeFileSync(open, 'OPEN');
  assert.equal(readFirstFile([locked, open]), 'OPEN');
  fs.chmodSync(locked, 0o644);
});

test('skips a directory candidate', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cse-dir-'));
  const asDir = path.join(dir, 'system-prompt.md');
  fs.mkdirSync(asDir);
  const file = path.join(dir, 'real.md');
  fs.writeFileSync(file, 'REAL');
  assert.equal(readFirstFile([asDir, file]), 'REAL');
});

test('returns an empty string when every candidate fails', () => {
  assert.equal(readFirstFile(['/nonexistent/a.md', '/nonexistent/b.md']), '');
});

test('removes YAML frontmatter with LF or CRLF line endings', () => {
  assert.equal(stripFrontmatter('---\nname: x\n---\nBody'), 'Body');
  assert.equal(stripFrontmatter('---\r\nname: x\r\n---\r\nBody'), 'Body');
});

test('uses the fallback ruleset when there is no prompt text', () => {
  assert.equal(buildContext(''), FALLBACK_CONTEXT);
});

test('the shipped prompt fits under the Claude Code stdout cap', () => {
  const out = buildContext(fs.readFileSync(REPO_PROMPT, 'utf8'));
  assert.ok(out.length <= MAX_CHARS, `${out.length} > ${MAX_CHARS}`);
  assert.ok(out.includes('THE REPLY'));
  assert.ok(!out.includes('Standalone system prompt'), 'the page title leaked');
  assert.ok(!out.includes('Word-budget'), 'the word-budget section leaked');
  assert.ok(!out.includes('paste this block'), 'the packaging paragraph leaked');
  assert.ok(out.startsWith('CYBER SIMPLE ENGLISH SKILL ACTIVE AUTOMATICALLY'));
});

test('names the absolute path of the cyber term table, inside the cap', () => {
  const pointer = cyberPointer(undefined, __dirname);
  const file = path.resolve(__dirname, '..', '..', 'skills', 'cyber-simple-english', 'references', 'cyber-terms.md');
  assert.ok(pointer.includes(file), pointer);
  const out = buildContext(fs.readFileSync(REPO_PROMPT, 'utf8'), pointer);
  assert.ok(out.endsWith(pointer) && out.length <= MAX_CHARS, `${out.length}`);
  assert.equal(cyberPointer('/nonexistent', '/nonexistent/a/b'), '');
});

test('sends the whole cyber term table in parts that fit the cap', () => {
  const file = path.resolve(__dirname, '..', '..', 'skills', 'cyber-simple-english', 'references', 'cyber-terms.md');
  const text = fs.readFileSync(file, 'utf8').trim();
  const parts = cyberParts(text);
  assert.equal(parts.join('\n'), text);
  assert.ok(parts.length <= CYBER_PARTS, `${parts.length} parts, but plugin.json runs ${CYBER_PARTS} commands`);
  const manifest = fs.readFileSync(path.resolve(__dirname, '..', '..', '.claude-plugin', 'plugin.json'), 'utf8');
  assert.equal((manifest.match(/--cyber \d/g) || []).length, CYBER_PARTS);
  for (let n = 1; n <= parts.length; n += 1) {
    const out = cyberPart(undefined, __dirname, n);
    assert.ok(out.length <= MAX_CHARS, `part ${n} is ${out.length} characters`);
    assert.ok(out.startsWith(`CYBERSECURITY TERM TABLE, part ${n} of ${parts.length}`));
  }
  assert.equal(cyberPart(undefined, __dirname, parts.length + 1), '');
  assert.equal(cyberPart('/nonexistent', '/nonexistent/a/b', 1), '');
});

test('the OpenCode plugin checks a Markdown file', async () => {
  const plugin = await import('./opencode-plugin.mjs');
  const hooks = await plugin.CyberSimpleEnglish({ directory: os.tmpdir() });
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'cse-')), 'runbook.md');
  fs.writeFileSync(file, 'Then remediate the host.\n');
  const result = { output: 'Wrote file successfully.' };
  await hooks['tool.execute.after']({ tool: 'write', args: { filePath: file } }, result);
  assert.ok(result.output.includes('cyber term: remediate'), result.output);
  const other = { output: 'ok' };
  await hooks['tool.execute.after']({ tool: 'bash', args: { command: 'ls' } }, other);
  assert.equal(other.output, 'ok');
});

test('an oversized prompt falls back instead of getting cut mid-sentence', () => {
  const out = buildContext('x'.repeat(MAX_CHARS + 1));
  assert.equal(out, FALLBACK_CONTEXT);
});

test('main() reads the prompt from CLAUDE_PLUGIN_ROOT', () => {
  const root = tmpRoot('CLAUDE-COPY');
  const r = runHook({ CLAUDE_PLUGIN_ROOT: root });
  assert.equal(r.status, 0);
  assert.ok(r.stdout.includes('CLAUDE-COPY'));
});

test('main() reads the prompt from PLUGIN_ROOT (Codex)', () => {
  const root = tmpRoot('CODEX-COPY');
  const r = runHook({ PLUGIN_ROOT: root });
  assert.equal(r.status, 0);
  assert.ok(r.stdout.includes('CODEX-COPY'));
});

test('main() exits 0 with the fallback when no candidate exists', () => {
  // Copy the script somewhere with no prompts/ nearby, so the repository
  // layout cannot rescue it, then point the plugin root at an empty tree.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cse-main-'));
  const script = path.join(dir, 'a', 'b', 'hook.js');
  fs.mkdirSync(path.dirname(script), { recursive: true });
  fs.copyFileSync(SCRIPT, script);
  const root = tmpRoot(undefined);
  const r = spawnSync(process.execPath, [script], { env: { ...process.env, PLUGIN_ROOT: '', CLAUDE_PLUGIN_ROOT: root }, encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.equal(r.stdout, FALLBACK_CONTEXT);
});
