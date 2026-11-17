# Changelog

## 1.0.0, 2026-11-15

The first version of Cyber Simple English. It started from [SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) 2.1.1 by AminBlg (commit a6fcb4f), and the version number restarts at 1.0.0. The history before this version is in the [SimpleEnglish changelog](https://github.com/AminBlg/SimpleEnglish/blob/main/CHANGELOG.md).

Changes from SimpleEnglish 2.1.1:

- Scope: the skill is for cybersecurity documentation and training material. It is for instructional writing and not for evaluative or persuasive writing.
- Names: each `simple-english` identifier is now `cyber-simple-english`. An install of the SimpleEnglish plugin is a different plugin.
- Term table: `references/cyber-terms.md` is new. It holds the security terms to keep, the standard abbreviations, the rulings for terms with two senses, and the terms, idioms, and marketing words to replace. `SKILL.md` carries a checked copy of its last four tables.
- Readers: the skill names three readers. The practitioner is the default and gets no definitions. The learner gets a definition at the first use of each term. The layperson gets plain words.
- Formatting: `references/technical-formatting.md` is new. It gives the rules for code font, compounds, secrets and placeholders, dates, numbers, and labels on the screen. Bold is permitted in a document for the label of a button, a menu item, or a key.
- Examples: each worked example is now a cybersecurity example.
- Checks: the file check names each term that the term table says to replace. `ste_dict_lint.py` reports these terms as a `cyber` count.
- Agents: OpenCode and Google Antigravity support is new. The project is tested live with Claude Code 2.1.325, Codex 0.169.0, OpenCode 1.19.5, Antigravity `agy` 1.5.9, Gemini CLI 0.68.0, GitHub Copilot CLI 1.0.112, and Goose 1.59.0.
- Removed: the SimpleEnglish benchmark tables and result files. This project has no benchmark run of its own.
- Documentation: one README replaces the SimpleEnglish documents.
