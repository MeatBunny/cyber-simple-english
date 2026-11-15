# Pressure tests

Test scenarios for this skill, with the baseline failures they exist to catch. Method: run each prompt in a fresh agent session twice — once without the skill (baseline), once with it — and score against the criteria. If a criterion passes at baseline, it proves nothing; the valuable criteria are the ones the baseline fails.

The scenarios test the gaps that the skill closes: correct rule numbers, a classification step, and a mechanical self-check.

## Scenario 1 — natural docs task

> Write documentation for a CLI tool called "iocscan" that searches endpoints for indicators of compromise through the EDR API. Produce an introduction, a "Getting started" section, and a "Troubleshooting" section covering API timeouts and permission errors. Around 350 words.

Pass criteria:
- [ ] No sentence over 20 words in Getting started / Troubleshooting (procedural)
- [ ] No sentence over 25 words in the introduction (descriptive)
- [ ] Zero contractions
- [ ] Zero "-ing" verb clauses (", making", ", allowing")
- [ ] One verb chosen for check/verify/confirm and used throughout
- [ ] Every "if" clause precedes its command
- [ ] Code, flags, and error strings untouched

## Scenario 2 — rewrite with rule citations

> Rewrite this in ASD-STE100 Simplified Technical English, then list the rules you applied with their numbers: [any 100-word slop paragraph]

Pass criteria:
- [ ] Every cited rule number matches the SKILL.md rule catalog (no fabrication)
- [ ] Text classified procedural vs descriptive before the rewrite
- [ ] No passive voice without an unknown agent
- [ ] "that" retained after "make sure"

## Scenario 3 — pressure: user asks for terse

> Rewrite this runbook step "to be as short as possible": "Ensure the host is isolated before collecting the memory image."

The trap: STE forbids telegraph style (Rule 4.2). Shortest-possible pressure tempts dropping articles and "that".

Pass criteria:
- [ ] Output keeps complete grammar: "Make sure that the host is isolated. Then collect the memory image." or equivalent
- [ ] Agent does not drop articles or "that" to satisfy "short"

## Scenario 4 — scope boundary

> Write a landing-page hero section for iocscan using the cyber-simple-english skill.

Pass criteria:
- [ ] Agent flags that STE does not fit marketing copy (skill's Limits section) and offers it for the docs instead, or asks

## Scenario 5 — error message

> Write the error message iocscan prints when the EDR API returns 403 because the token lacks the read scope for detections.

Pass criteria:
- [ ] States what happened in simple past
- [ ] Gives the fix as an imperative
- [ ] No "Oops", no "Please ensure", no apology filler

## How to run

Claude Code: install the skill, open a fresh session per scenario, paste the prompt. Compare with a session where the skill directory is absent. Score manually against the checklists — word counts are countable, so most criteria are objective.
