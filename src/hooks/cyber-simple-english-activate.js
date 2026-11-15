#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

// Claude Code caps hook stdout at 10,000 characters. Anything above that is
// written to a file and replaced by a preview, which defeats the hook.
const MAX_CHARS = 9500;

const FALLBACK_CONTEXT = `CYBER SIMPLE ENGLISH SKILL ACTIVE AUTOMATICALLY

Apply these writing rules, built on ASD-STE100, to cybersecurity documentation, training material, and runbooks. Use short sentences, active voice, one term for one meaning, and conditions before commands. Do not change code, identifiers, commands, or quoted errors.`;

const HEADER = [
  'CYBER SIMPLE ENGLISH SKILL ACTIVE AUTOMATICALLY',
  '',
  'Follow these writing rules without waiting for the user to name the skill. The full skill, with the rule catalog and the check mode, is at skills/cyber-simple-english/SKILL.md in this plugin. Read it for a compliance check or for strict mode.',
  '',
].join('\n');

function candidates(pluginRoot, hookDirectory, relative) {
  const roots = [];
  if (pluginRoot) {
    roots.push(pluginRoot);
  }
  roots.push(path.join(hookDirectory, '..', '..'), path.join(hookDirectory, '..'));
  return roots.map((root) => path.join(root, ...relative));
}

// The model cannot resolve a path "in this plugin", so the hook names the
// absolute path of the cyber term table when the file exists.
function cyberPointer(pluginRoot, hookDirectory) {
  const relative = ['skills', 'cyber-simple-english', 'references', 'cyber-terms.md'];
  const found = candidates(pluginRoot, hookDirectory, relative).find((file) => fs.existsSync(file));
  if (!found) {
    return '';
  }
  return `\n\nCYBERSECURITY TEXT. Before you write or check security text, read ${path.resolve(found)}. It names the security terms to keep, the rulings for terms with two senses, the jargon to replace, and when to define a term.`;
}

// Claude Code does not let the model read a file inside an installed plugin
// without a permission prompt, and it denies the read in an unattended run. So
// the hook sends the cyber term table itself. The cap applies to each hook
// command, and the table is larger than one cap, so the table goes out in
// parts: "--cyber 1" prints part 1, "--cyber 2" prints part 2, and so on. A
// part holds whole sections only. A command for a part that does not exist
// prints nothing.
const CYBER_PARTS = 4; // the number of "--cyber" commands in .claude-plugin/plugin.json

function cyberParts(text) {
  const parts = [];
  for (const section of text.split(/\n(?=## )/)) {
    const last = parts.length - 1;
    if (last >= 0 && parts[last].length + section.length + 1 <= MAX_CHARS - 200) {
      parts[last] += `\n${section}`;
    } else {
      parts.push(section);
    }
  }
  return parts;
}

function cyberPart(pluginRoot, hookDirectory, number) {
  const relative = ['skills', 'cyber-simple-english', 'references', 'cyber-terms.md'];
  const parts = cyberParts(readFirstFile(candidates(pluginRoot, hookDirectory, relative)).trim());
  const part = parts[number - 1];
  if (!part) {
    return '';
  }
  return `CYBERSECURITY TERM TABLE, part ${number} of ${parts.length}. Apply it when you write or check security text. You have the full table in these parts. Do not read the file.\n\n${part}`;
}

function promptCandidates(pluginRoot, hookDirectory) {
  return candidates(pluginRoot, hookDirectory, ['prompts', 'system-prompt.md']);
}

function readFirstFile(list) {
  for (const candidate of list) {
    try {
      return fs.readFileSync(candidate, 'utf8');
    } catch (error) {
      // Missing, unreadable, or a directory: try the next candidate.
    }
  }
  return '';
}

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

// prompts/system-prompt.md is a page for people: a title, a paragraph that says
// where to paste the block, the rule block between two "---" lines, then a
// word-budget variant. The model gets the fenced block only.
function ruleBlock(content) {
  const fence = /^---[ \t]*\r?$/m;
  const first = content.search(fence);
  if (first === -1) {
    return content;
  }
  const rest = content.slice(first).replace(fence, '');
  const second = rest.search(fence);
  return second === -1 ? rest : rest.slice(0, second);
}

function buildContext(promptText, pointer = '') {
  if (!promptText) {
    return FALLBACK_CONTEXT;
  }
  const out = HEADER + ruleBlock(stripFrontmatter(promptText)).trim() + pointer;
  if (out.length > MAX_CHARS) {
    process.stderr.write(`cyber-simple-english hook: payload is ${out.length} characters, over the ${MAX_CHARS} cap; sending the fallback ruleset\n`);
    return FALLBACK_CONTEXT;
  }
  return out;
}

function main() {
  const pluginRoot = process.env.PLUGIN_ROOT || process.env.CLAUDE_PLUGIN_ROOT;
  const args = process.argv.slice(2);
  if (args[0] === '--cyber') {
    process.stdout.write(cyberPart(pluginRoot, __dirname, Number(args[1])));
    return;
  }
  // Codex has no "--cyber" commands, so it gets the path of the table.
  const pointer = args.includes('--no-pointer') ? '' : cyberPointer(pluginRoot, __dirname);
  process.stdout.write(buildContext(readFirstFile(promptCandidates(pluginRoot, __dirname)), pointer));
}

if (require.main === module) {
  main();
}

module.exports = {
  FALLBACK_CONTEXT,
  MAX_CHARS,
  CYBER_PARTS,
  buildContext,
  cyberPart,
  cyberParts,
  cyberPointer,
  promptCandidates,
  readFirstFile,
  ruleBlock,
  stripFrontmatter,
};
