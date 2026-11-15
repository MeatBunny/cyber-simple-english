# Cyber Simple English hooks

The Claude Code and Codex plugins include a `SessionStart` hook. The hook loads the Cyber Simple English writing rules when a session starts, resumes, clears, or compacts. You do not need to name the skill.

The hook needs Node.js. Both plugins run `src/hooks/cyber-simple-english-activate.js` with the `node` command.

## Install

Claude Code:

```bash
claude plugin marketplace add MeatBunny/cyber-simple-english
claude plugin install cyber-simple-english@cyber-simple-english
```

Codex:

```bash
codex plugin marketplace add MeatBunny/cyber-simple-english
codex plugin add cyber-simple-english@cyber-simple-english
```

Codex does not run a plugin hook until you trust it. At the first interactive start, Codex shows "Hooks need review". Select "Trust all and continue", or open `/hooks`, select the `SessionStart` hook, and press `t`. Codex saves the trust in `~/.codex/config.toml` with a hash of the hook, so an update that changes the hook needs a new review. A non-interactive `codex exec` run skips a hook that is not trusted and gives no warning. For automation with no interactive start, pass `--dangerously-bypass-hook-trust` to `codex exec`. Tested with Codex 0.169.0.

## What the hook sends

The hook writes the fenced rule block of `prompts/system-prompt.md` to standard output, about 5,000 characters. The page title, the paste instructions, and the word-budget variant stay out. The full skill, `skills/cyber-simple-english/SKILL.md`, is about 10,000 characters, and Claude Code caps hook output at 10,000 characters. Output over the cap goes to a file and the model gets only a preview. The condensed rules fit, and the hook names the full skill path so the model can read it for a compliance check or strict mode.

Codex limits each hook output to about 2,500 tokens by default and saves a longer output to a file. The `additionalContextLimit: 0` setting in `.codex-plugin/hooks.json` passes the complete output to the model. The `/hooks` screen shows this as "Context unlimited".

In Claude Code, four more `SessionStart` commands send `skills/cyber-simple-english/references/cyber-terms.md`, the cybersecurity term table, in parts (`--cyber 1` to `--cyber 4`). Claude Code asks for permission before the model reads a file inside an installed plugin, and it denies the read in an unattended run, so the hook sends the table itself. The cap of 10,000 characters applies to each command. A part holds whole sections. If the table grows past four parts, the hook test fails. The table adds about 21,000 characters to each session.

In Codex, the hook adds one sentence after the rule block that names the absolute path of the table. The model cannot find a path that is relative to the plugin, so the hook resolves it. If the file is absent, the hook omits the sentence.

## OpenCode

OpenCode gets the rules and the term table from the `instructions` field of `opencode.json`, which loads `rules/AGENTS.md` and `cyber-terms.md` into each session. The README has the two lines.

`src/hooks/opencode-plugin.mjs` is an optional plugin that holds the file check only. Add its absolute path to the `plugin` array of `opencode.json`. After a `write` or an `edit` of a Markdown file, it runs `lint_hook.py` and adds the hits to the tool output. The check is advisory and needs Python 3.

OpenCode has no check of the chat reply.

## Google Antigravity

`.antigravity-plugin/plugin.json` is the manifest. Antigravity reads the skill from `skills/` and two always-on rules from `rules/`. `rules/AGENTS.md` is a copy of the rule block. `rules/cyber-terms.md` is a copy of the term table, after a frontmatter block with `trigger: always_on`. Without that trigger, Antigravity does not apply the rule. `evals/check_numbers.py` fails if a copy differs from its source. If you change the term table, make the copy again. There is no file check: an Antigravity `PostToolUse` hook cannot return text to the model.

## If a file is absent

If the hook cannot read the prompt file, it tries the next location. If every location fails, it prints a short fallback rule set and exits 0. The session still starts.

## Where each harness loads the hook

- Claude Code: the `hooks` field in `.claude-plugin/plugin.json`.
- Codex: `.codex-plugin/hooks.json`, named by the `hooks` field in `.codex-plugin/plugin.json`. The marketplace catalog is `.agents/plugins/marketplace.json`.

## Test

From the repository root:

```bash
node --test src/hooks/cyber-simple-english-activate.test.js
```

## Advisory writing checks (Claude Code)

Two more hooks run under Claude Code, both advisory. Neither one blocks.

- `PostToolUse` on `Write` and `Edit`: when the file is Markdown, `src/hooks/lint_hook.py` lints it with `evals/ste_lint.py` and shows a one-line summary of the violations to the model. The same check names each cybersecurity term that `skills/cyber-simple-english/references/cyber-terms.md` says to replace.
- `Stop`: the same script reads the last reply and adds a system message when the reply breaks the register: an em-dash, bold, a header, a list item, a filler opener or closer, or a slop word.

Codex runs only the `SessionStart` hook. Test the checks with `python3 src/hooks/test_lint_hook.py`.

## What the file check skips

The writing rules cover the documents that you write for a reader. They do not cover the files that the agent keeps for itself, such as memory files. A summary of the violations in such a file only spends tokens. The `PostToolUse` check therefore skips three groups of paths:

- Every path under the Claude configuration directory. The check reads `CLAUDE_CONFIG_DIR` and falls back to `~/.claude`.
- Every path with a `.claude` directory component, for example `my-project/.claude/agent-memory/reviewer/MEMORY.md`. A skill or a command that you write under `.claude/` is also skipped.
- Every path that matches a glob in `CYBER_SIMPLE_ENGLISH_LINT_EXCLUDE`.

A symlink does not defeat a skip. The check tests the absolute path in two forms, as written and with the symlinks resolved. A match on either form is enough.

`CYBER_SIMPLE_ENGLISH_LINT_EXCLUDE` holds glob patterns, separated by the path separator of the platform (`:` on Linux and macOS, `;` on Windows). In a pattern, `*` also matches `/`. The check expands a leading `~` to your home directory.

```bash
export CYBER_SIMPLE_ENGLISH_LINT_EXCLUDE="$HOME/notes/*:*/CHANGELOG.md"
```

To turn the file check off, set the variable to `*`. The `Stop` reply check stays on.
