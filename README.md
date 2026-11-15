# cyber-simple-english

Cyber Simple English is based on [SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) by AminBlg. AminBlg wrote the rule engine, the skill, and the eval harness. This project adapts them for cybersecurity documentation and training.

<p align="center">
  An agent skill that makes LLMs write clear, unambiguous cybersecurity documentation and training material.<br>
  Built on the writing rules of <a href="https://www.asd-ste100.org/">ASD-STE100 Simplified Technical English</a>, the controlled language aerospace has used since 1983 so a tired mechanic cannot misread an instruction.<br>
  Plain by default, strict on request.
</p>

<p align="center">
  <a href="https://agentskills.io"><img src="https://img.shields.io/badge/SKILL.md-open_standard-blue?style=flat" alt="Agent Skills"></a>
  <a href="skills/cyber-simple-english/SKILL.md"><img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat" alt="version 1.0.0"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat" alt="MIT"></a>
</p>

Works in every agent that reads the [Agent Skills standard](https://agentskills.io): Claude Code, Cursor, VS Code Copilot, OpenAI Codex, Gemini CLI, Goose, OpenCode, and others. One folder, no dependencies, MIT.

## Scope

This skill is for **instructional writing**: text that tells the reader what to do, or what happened. In scope:

- SOC runbooks and playbooks
- Training modules, lab guides, and tabletop exercises
- Analyst onboarding docs
- Internal incident postmortems and IR notes
- Tool and project READMEs
- Error messages and release notes
- Agent instructions (`AGENTS.md`, prompts)
- Internal comms: status updates, shift handovers
- Chat replies and quick rewrites, through the reply register
- The procedural parts of client deliverables: reproduction steps, remediation instructions

The skill writes for three readers. The default reader is the practitioner, a person who works in security. For this reader, the skill does not define security terms, and it does not expand abbreviations that are standard in the field, such as SIEM or EDR. For the learner, who reads onboarding and training material, the skill defines each term at its first use. For the layperson, who does not work in security, the skill replaces the terms with plain words.

It is not for **evaluative or persuasive writing**: text whose job is to say how likely something is, or to convince the reader of something. That means:

- **Risk narratives and executive summaries.** Honest assessment needs calibrated language — "likely", "may indicate", "low confidence" — and these rules ban exactly those words on purpose.
- **Official and regulated documents:** breach notifications to regulators, compliance attestations, legal filings. Their wording is fixed by law or contract, not by style.
- **Public persuasive content** — marketing, talks, blog voice. These rules delete persuasion by design, so applying them here hurts the text.

Some documents mix both kinds. A pentest report has evaluative findings and procedural remediation steps. When that happens, classify the section, not the document: apply the skill to the procedural sections only.

## Install

Any agent, with the [skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add MeatBunny/cyber-simple-english
```

This installs the skill only. It does not install the session hook or the output style below, so setting `outputStyle` to `cyber-simple-english:cyber-simple-english` without the plugin does nothing. Use the Claude Code plugin for those.

Claude Code plugin, with the session hook and the output style:

```bash
claude plugin marketplace add MeatBunny/cyber-simple-english && claude plugin install cyber-simple-english@cyber-simple-english
```

The output style is named `cyber-simple-english:cyber-simple-english`. The short name does not resolve. Select it with `/config` under Output style, or put `{"outputStyle": "cyber-simple-english:cyber-simple-english"}` in `~/.claude/settings.json`.

Codex plugin, with the session hook:

```bash
codex plugin marketplace add MeatBunny/cyber-simple-english
codex plugin add cyber-simple-english@cyber-simple-english
```

Codex does not run the hook until you trust it. At the first interactive start, Codex shows "Hooks need review". Select "Trust all and continue", or open `/hooks` and press `t`. Codex saves the trust, and `codex exec` then loads the rules too. Before that, `codex exec` skips the hook and gives no warning. The hooks need Node.js. Details in [`src/hooks/README.md`](src/hooks/README.md).

OpenCode, with the rules and the term table in each session. Add these two lines to the `instructions` array of your `opencode.json`:

```json
{
  "instructions": [
    "https://raw.githubusercontent.com/MeatBunny/cyber-simple-english/main/rules/AGENTS.md",
    "https://raw.githubusercontent.com/MeatBunny/cyber-simple-english/main/skills/cyber-simple-english/references/cyber-terms.md"
  ]
}
```

This gives OpenCode the rules, not the skill. For the check mode and the reference files, install the skill with the skills CLI command above.

The file check for OpenCode is optional. It needs Python 3 and a local copy of the repository:

```bash
git clone https://github.com/MeatBunny/cyber-simple-english ~/.config/opencode/cyber-simple-english
```

Then add the absolute path of the plugin file to the `plugin` array of your `opencode.json`:

```json
{ "plugin": ["/home/you/.config/opencode/cyber-simple-english/src/hooks/opencode-plugin.mjs"] }
```

Google Antigravity plugin, with the skill and an always-on rule:

```bash
agy plugin install https://github.com/MeatBunny/cyber-simple-english
```

The plugin installs the skill and two always-on rules: the rule block and the term table. Antigravity has no file check, because its hooks cannot send text to the model after a file write.

No skill support? Paste the rule block of [`prompts/system-prompt.md`](prompts/system-prompt.md) into your system prompt, `AGENTS.md`, or `.cursorrules`. The page ends with a short version for tight budgets.

Then ask for any technical writing, or say "rewrite this with cyber-simple-english".

## See it

Left is unedited Claude output with no skill. Right is the same text, rewritten with the skill loaded.

<table>
<tr>
<th width="50%">Without skill</th>
<th width="50%">With skill</th>
</tr>
<tr>
<td valign="top">

> `iocscan` is a command-line tool that searches your endpoints for indicators of compromise (such as file hashes, IP addresses, and domains) by querying your EDR platform's API, so you can check many hosts without logging in to each one. Before the first run, make sure your EDR API token has the read scope for both hosts and detections, because `iocscan` can't list endpoints or retrieve results without them.

</td>
<td valign="top">

> The `iocscan` command-line tool searches your endpoints for IOCs, such as file hashes, IP addresses, and domains. It queries the API of your EDR platform, so you do not have to log in to each host.
>
> Before the first run, make sure that your EDR API token has the read scope for hosts and the read scope for detections. Without these scopes, `iocscan` cannot list endpoints or get results.

</td>
</tr>
</table>

More rewrites in [`examples/before-after.md`](examples/before-after.md): a README, a runbook entry, an error message, an incident summary, and release notes. Incident reports here means internal IR notes and postmortems, not regulatory filings — see Scope.

## Measurements

This project has no benchmark run of its own yet. [SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) publishes measurements for its own releases. Those numbers do not describe Cyber Simple English, because the rule text is different.

## The rules

Two registers in [`SKILL.md`](skills/cyber-simple-english/SKILL.md). The 53 numbered rules of Issue 9 live in [`rule-catalog.md`](skills/cyber-simple-english/references/rule-catalog.md) for check mode and Strict mode.

The reply, every chat answer:

| Rule | What it removes |
|---|---|
| Prose only: no headers, bullets, bold, tables | The wall of formatting around a one-line answer |
| First sentence answers | The preamble |
| No em-dashes | The spliced half-thought |
| Define a concept term in a few words, for a learner or a layperson | Jargon the reader has to look up |
| No contractions, openers, or closers | "Great question!" and "Hope this helps!" |

The document: docs, READMEs, runbooks, error messages, release notes:

| Rule | What it removes |
|---|---|
| Max 20 words per instruction, 25 per description | The run-on sentence |
| Condition before command | Trailing "...if the flag is set" that readers execute too late |
| Simple tenses, active voice | "has been updated", ", making it easy to..." |
| No should/would/may/might | Hedging. `can`, `will`, `must` survive |
| One word = one meaning, whole document | check/verify/confirm/validate roulette |
| Keep articles, keep "that" | Telegraph style. STE is short, not terse |
| No bold lead-ins, no heading over two sentences | Decoration that hides the fact |
| State the fact, not its importance | "crucial", "robust", "not just X, it is Y" |

Two modes. Plain, the default, is all of the above. Strict adds the STE dictionary discipline from [`strict-vocabulary.md`](skills/cyber-simple-english/references/strict-vocabulary.md) when you name STE, ASD-STE100, or compliance. The reply stays Plain in every mode.

## FAQ

Does this make output STE-certified? No. Nothing does, because ASD certifies no tool. Strict mode gets close. Word-level rulings live in the official standard, a [free download](https://www.asd-ste100.org/request.html).

Will my docs sound robotic? They will sound like Airbus manuals: flat and impossible to misread. For docs that is the whole point. Keep your voice for your blog.

Why not just prompt "write clearly"? "Clearly" is an opinion. "No sentence over 20 words" is a spec. Agents follow specs.

Why a 40-year-old aerospace standard? It is maintained (Issue 9, January 2025), numbered, and testable. It is also a near-perfect negative of every AI writing tell.

How was it built? SimpleEnglish built the rules from the primary Issue 9 text, not from summaries. This project adds the cybersecurity term table and the rules for technical formatting. Test scenarios: [`evals/pressure-tests.md`](evals/pressure-tests.md).

## Word-choice linter

`evals/ste_lint.py` measures the mechanical rules and cannot see word choice. [`tools/ste-dictionary/`](tools/ste-dictionary/README.md) holds an extractor that builds the word lists from your own copy of the free Issue 9 PDF. A linter reads them. The repository ships the tool and no dictionary content, because the standard forbids reproduction without written authority from ASD.

The same linter reads the cybersecurity term table of this project, [`cyber-terms.md`](skills/cyber-simple-english/references/cyber-terms.md), and counts the terms that the table says to replace. This count needs no dictionary files. In the Claude Code plugin, the advisory file check names these terms after each Markdown write. The check does not block.

## Contributing

Open an issue for questions and bug reports. Pull requests are welcome. `python3 evals/check_numbers.py` must pass. It checks that the copies of the rule block and the version strings agree. Run `python3 evals/ste_lint.py --self-test` before you push. Say in the PR whether an agent wrote the code, and do not add attribution trailers.

A new row in [`cyber-terms.md`](skills/cyber-simple-english/references/cyber-terms.md) must record these points:

1. The spelling and the capitals that the maker or the standard uses, with the source that you opened.
2. The part of speech that is permitted.
3. A second meaning or a word that looks almost the same, if one exists.
4. For an abbreviation: if it is standard in the field, and how a practitioner says it, for "a" or "an".
5. Code font or normal font.
6. The definition in ten words or fewer.
7. The plain words for a layperson.
8. If the linter can flag the term without the sense.

## License

MIT for everything here. The repo paraphrases the rules for teaching and reproduces no spec text or dictionary content. Unofficial project, not affiliated with or endorsed by ASD or STEMG. ASD-STE100 is a registered trademark of ASD.
