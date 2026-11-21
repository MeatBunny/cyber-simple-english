# Cyber Simple English

This agent skill makes an AI coding agent write cybersecurity documentation, training material, and chat replies in a controlled, simple English. The skill is built on the writing rules of [ASD-STE100](https://www.asd-ste100.org/). The rules are in [SKILL.md](skills/cyber-simple-english/SKILL.md).

## Scope

Use the skill for text that tells the reader what to do or what happened: runbooks, playbooks, training modules, lab guides, incident notes, READMEs, error messages, release notes, status updates, and chat replies.

Do not use it for text that evaluates or persuades:

- A risk narrative or an executive summary needs words such as "likely" and "may indicate". The rules ban these words.
- A breach notification, an attestation, or a legal filing has wording that a law or a contract fixes.
- Marketing text needs persuasion. The rules delete it.

In a mixed document, such as a penetration test report, apply the skill only to the procedural sections: the reproduction steps and the remediation instructions.

## Install

The project is tested with the seven agents below. Other agents that read the [Agent Skills](https://agentskills.io) standard are not tested. They can install the skill with the Gemini CLI command.

### Claude Code

```
claude plugin marketplace add MeatBunny/cyber-simple-english
claude plugin install cyber-simple-english@cyber-simple-english
```

The plugin installs these items:

- The skill
- A hook that loads the rules in each session
- A check of each Markdown file that the agent writes
- A check of each reply
- An output style

The hooks need Node.js and Python 3. The checks are advisory and block nothing.

The output style is optional. Select it in `/config` under **Output style**, or add this line to `~/.claude/settings.json`. The short name does not resolve.

```json
{"outputStyle": "cyber-simple-english:cyber-simple-english"}
```

To exclude files from the file check, set `CYBER_SIMPLE_ENGLISH_LINT_EXCLUDE` to a list of glob patterns for absolute paths. Separate the patterns with `:` (on Windows, with `;`). To stop the file check, set the variable to `*`.

### OpenAI Codex

```
codex plugin marketplace add MeatBunny/cyber-simple-english
codex plugin add cyber-simple-english@cyber-simple-english
```

The plugin installs the skill and a hook that loads the rules in each session. The hook needs Node.js.

Codex does not run the hook until you trust it. Start Codex one time in interactive mode. At the "Hooks need review" prompt, select **Trust all and continue**, or type `/hooks` and then press **t**. If you do not trust the hook, `codex exec` skips it and shows no warning.

### Gemini CLI, GitHub Copilot CLI, Goose

```
npx skills add MeatBunny/cyber-simple-english
```

This command uses the [skills CLI](https://github.com/vercel-labs/skills). It installs the skill only, with no hooks and no output style.

### OpenCode

Add these two URLs to the `instructions` array of `opencode.json`. OpenCode then loads the rules and the term table in each session.

```json
{
  "instructions": [
    "https://raw.githubusercontent.com/MeatBunny/cyber-simple-english/main/rules/AGENTS.md",
    "https://raw.githubusercontent.com/MeatBunny/cyber-simple-english/main/skills/cyber-simple-english/references/cyber-terms.md"
  ]
}
```

The URLs do not install the skill. For the check mode and the reference files, also run the `npx skills add` command above.

The file check is optional and needs Python 3 and a local clone:

```
git clone https://github.com/MeatBunny/cyber-simple-english ~/.config/opencode/cyber-simple-english
```

Then add the absolute path of `src/hooks/opencode-plugin.mjs` in the clone to the `plugin` array of `opencode.json`.

### Google Antigravity

```
agy plugin install https://github.com/MeatBunny/cyber-simple-english
```

The plugin installs the skill and two rules that are always on: the rule block and the term table.

### Manual install

Each [release](https://github.com/MeatBunny/cyber-simple-english/releases) has the file `cyber-simple-english-skill-<version>.zip`. Unzip it into the skills directory of your agent, for example `~/.claude/skills/` or `~/.agents/skills/`. The file holds the skill only, with no hooks and no output style.

### An agent with no skill support

Paste the rule block of [prompts/system-prompt.md](prompts/system-prompt.md) into the system prompt, `AGENTS.md`, or `.cursorrules`.

## Use

Ask the agent for technical writing, or say "rewrite this with cyber-simple-english". The skill has two more modes:

- To get a list of the rule violations, ask the agent to check a text. The list has a rewrite for each violation.
- To apply the STE vocabulary also, name ASD-STE100 in the request. No tool can guarantee compliance with the standard.

## Lint a file without an agent

`evals/ste_lint.py` counts the violations of the writing rules. `tools/ste-dictionary/ste_dict_lint.py` counts the security terms to replace. The start of each file gives the usage and the limits.

`ste_dict_lint.py` can also count the words that the STE dictionary does not approve. The repository cannot include the dictionary, so you must build the word lists from your own copy of the standard. ASD supplies the Issue 9 PDF at no cost on [request](https://www.asd-ste100.org/request.html). The commands below need `pdftotext`. The file names in the commands are fixed.

```
cd tools/ste-dictionary
pdftotext -layout /path/to/ASD-STE100-Issue-9.pdf ste9.txt
python3 parse_dict.py
python3 emit.py
```

## Contribute

Use an issue for a question or a bug. Pull requests are welcome.

- Before you push, run the five commands in [check.yml](.github/workflows/check.yml).
- The rule block, the term table, and the version each have copies in more than one file. The start of `evals/check_numbers.py` lists the copies. Change all copies together.
- If an agent wrote the code, say so in the pull request.
- Do not put attribution trailers on commits or pull requests.
- A change to a row of the term table ([cyber-terms.md](skills/cyber-simple-english/references/cyber-terms.md)) needs the approval of the maintainer.

For a new row in the term table, record these items in the pull request:

- The spelling and the capitals that the maker or the standard uses, and the source that you opened
- The permitted part of speech
- Each second meaning, and each word that is almost the same
- For an abbreviation: if it is standard in the field, and how a person says it (for "a" or "an")
- Code font or normal font
- A definition in ten words or fewer
- Plain words for a layperson
- If the linter can flag the term when it does not know the sense

The `evals` directory also holds benchmark scripts. The project publishes no benchmark numbers yet.

## Credit and legal

This project started from [SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) 2.1.1 by AminBlg, who wrote the rule engine, the skill, and the eval harness. The license is [MIT](LICENSE).

This project is unofficial. ASD and STEMG are not affiliated with it and do not endorse it. ASD-STE100 is a registered trademark of ASD. The repository paraphrases the rules. It contains no text from the specification and no content from the dictionary.
