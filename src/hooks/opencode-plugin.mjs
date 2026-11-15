// OpenCode plugin for Cyber Simple English.
//
// Add the absolute path of this file to the "plugin" array of opencode.json.
// After a write or an edit of a Markdown file, the plugin runs the same file
// check as the Claude Code hook (lint_hook.py) and adds the hits to the tool
// output. The check is advisory. The rules and the term table do not come from
// this plugin: load them with the "instructions" field (see the README).

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const FILE_TOOLS = new Set(['write', 'edit']);

// The file check reads a Claude Code PostToolUse event, so the plugin sends one.
export function fileCheck(filePath, cwd) {
  if (typeof filePath !== 'string' || !filePath.endsWith('.md')) {
    return '';
  }
  const event = { hook_event_name: 'PostToolUse', tool_input: { file_path: filePath }, cwd };
  const run = spawnSync('python3', [path.join(here, 'lint_hook.py')], { input: JSON.stringify(event), encoding: 'utf8', timeout: 10000 });
  return run.status === 2 ? run.stderr.trim() : '';
}

export const CyberSimpleEnglish = async ({ directory }) => {
  return {
    'tool.execute.after': async (input, output) => {
      if (!FILE_TOOLS.has(input.tool)) {
        return;
      }
      const hits = fileCheck(input.args && (input.args.filePath || input.args.file_path), directory);
      if (hits) {
        output.output = `${output.output}\n\n${hits}`;
      }
    },
  };
};
