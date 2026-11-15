# Changelog

Each entry names the version, the date, and the measured effect where one exists.

## 1.0.0, not released

- Changed: the version restarts at 1.0.0. This project does not follow the
  version numbers of SimpleEnglish.
- Started from [SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) 2.1.1 by
  AminBlg (commit a6fcb4f). AminBlg wrote the rule engine, the skill, and the
  eval harness.
- Changed: the names, the install commands, and the plugin metadata now belong
  to this project.
- Changed: each worked example is now a cybersecurity example: the examples
  in `SKILL.md`, the rule block, the reference files, the README, and
  `examples/before-after.md`, and the prompts in `evals/scenarios.json`,
  `evals/reply_scenarios.json`, and `evals/pressure-tests.md`. Each "before"
  text in the examples is unedited model output with no skill loaded.
- Removed: the SimpleEnglish benchmark tables in the README and the result
  files under `evals/results/`. They describe SimpleEnglish releases, not this
  project. `evals/check_numbers.py` now checks the copies of the rule block and
  the version strings only. This project has no benchmark run of its own yet.
- Changed: each `simple-english` identifier is now `cyber-simple-english`: the
  plugin name, the marketplace name, the skill name and its directory, the
  output style, the hook files, and the `CYBER_SIMPLE_ENGLISH_LINT_EXCLUDE`
  variable. The display name is Cyber Simple English. An install of the
  SimpleEnglish plugin is a different plugin and stays as it is.
- Added: `skills/cyber-simple-english/references/technical-formatting.md`. It
  says which items go in code font and which go in normal font in new text. It
  fixes the verb and noun forms of compounds (log in, login) and the choice of
  "a" or "an" before an abbreviation. It says how to mark a secret, removed
  lines, and a placeholder in an excerpt. It gives the forms of dates, times,
  numbers, and units, the form of labels and messages on the screen, the
  spelling of tool names, and five small conventions. Rules 2 and 8 of the
  document register
  carry the short forms.
- Added: OpenCode support. The `instructions` field of `opencode.json` loads
  the rules and the term table. An optional plugin,
  `src/hooks/opencode-plugin.mjs`, runs the file check after a write or an edit
  of a Markdown file.
- Changed: bold is permitted in a document for one purpose, the label of a
  button, a menu item, or a key in a step. The reply keeps its ban on bold.
- Added: a Google Antigravity plugin manifest, `.antigravity-plugin/plugin.json`,
  and two always-on rules: `rules/AGENTS.md`, a copy of the rule block, and
  `rules/cyber-terms.md`, a copy of the term table. `evals/check_numbers.py`
  compares each copy with its source, and it compares the version string.
  Tested with `agy` 1.5.9.
- Changed: scope narrowed to cybersecurity documentation and training material.
  The README gained a Scope section: in scope is instructional writing (runbooks,
  training, internal IR notes, agent instructions, the procedural parts of client
  deliverables); out of scope is evaluative and persuasive writing (risk
  narratives, executive summaries, regulated documents, public persuasive
  content). Plugin descriptions and keywords follow the same narrowing.
- Added: `skills/cyber-simple-english/references/cyber-terms.md`, the cybersecurity
  term table of this project. It holds a glossary of 52 terms to keep and 14 standard
  abbreviations. Each definition has ten words or fewer and uses words
  that a non-native reader knows. It holds descriptions for 6 names that the
  skill never expands (CVE, CVSS, CWE, MITRE ATT&CK, YARA, Sigma). It holds 34 rulings for terms with two senses and for word pairs, 32 terms to
  replace, 9 idioms to replace, and 8 groups of marketing words to delete. The table is new work of this project
  and holds no ASD dictionary content.
- Changed: `SKILL.md` carries a checked copy of the three replace tables of
  `cyber-terms.md`, so an agent that loads only the skill applies them.
  `cyber-terms.md` starts with a contents list.
- Added: `tools/ste-dictionary/ste_dict_lint.py` reports a `cyber` count. It
  reads the lintable rows from `cyber-terms.md`, so no second copy of the list
  exists. If the dictionary files are absent, the linter does not stop.
- Added: the `PostToolUse` file check names each cyber term to replace. The
  check is advisory. In Claude Code, the `SessionStart` hook sends `cyber-terms.md` to the
  model in parts, because Claude Code denies a read of a plugin file in an
  unattended run. Codex gets the path of the file and no file check.
- Added: the `ste_dict_lint.py` self-test runs in CI.
- Changed: the reader, rule 9 of the document register, and rule 4 of the
  reply register. The skill names three readers. The practitioner works in
  security and is the default. For this reader, the skill adds no definition
  and does not expand an abbreviation that is standard in the field. For the
  learner (onboarding and training material), the skill defines each term at
  its first use, in ten words or fewer. For the layperson, the skill replaces
  the terms with plain words. A definition never goes in a procedure step. An
  abbreviation that only one team, one vendor, or one writer uses is expanded
  or avoided in every document. The change is in `SKILL.md`,
  `prompts/system-prompt.md`, and `output-styles/cyber-simple-english.md`.
- Not changed, on purpose: `evals/ste_lint.py`, `evals/slop.tsv`, and each
  published number. The mechanical rules did not change. The published numbers
  are from the SimpleEnglish rule text.

## Before 1.0.0

This project started from SimpleEnglish 2.1.1. The history of SimpleEnglish 2.0.0 to 2.1.1 is in the [SimpleEnglish changelog](https://github.com/AminBlg/SimpleEnglish/blob/main/CHANGELOG.md).
