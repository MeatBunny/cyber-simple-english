# Use cases beyond documentation

STE was built for aircraft maintenance manuals. The same properties transfer to any text where a misreading has a cost: one meaning per word, short sentences, condition-first commands. Each case below names the mode and the adaptations.

## Error messages and CLI output

Mode: procedural. An error message is an instruction to a reader who is in the middle of a failure.

Pattern: state what happened (simple past), state the cause if known, give the command or condition that fixes it.

> Before: Oops! Something went wrong while attempting to sign you in. Please ensure your code has been entered correctly and try again.
> After: The sign-in failed. The code was not correct, or it expired. Open your authenticator app. Type the new code, then sign in again.

## Runbooks and standard operating procedures

Mode: procedural. A SOC runbook is a maintenance manual, which is the text type that STE was written for.

- Every step is imperative, one instruction per step, condition first.
- A warning comes before its step: command first, risk second.
- No sentence has more than 20 words.

## Incident reports and postmortems

Mode: descriptive, simple past only. A timeline in present perfect ("we have identified") hides when things happened.

> Before: We have identified suspicious activity that may have impacted a user account.
> After: At 09:20 UTC, the attacker signed in to the account of one finance user from an unfamiliar IP address. The SOC disabled the account at 09:41 UTC.

STE bans hedges such as "may have impacted". The report states what is known and says "unknown" for the rest.

## Commit messages and PR descriptions

Mode: imperative subject line, descriptive body. The convention already matches STE. Apply the word swaps and the 25-word limit to the body. Delete "this PR aims to".

## API changelogs and release notes

Mode: descriptive. One entry, one change, one sentence where possible. A "Breaking:" entry follows the warning pattern, command first: "Update each dashboard that reads `src_ip`. The field is now `source.ip`."

## Instructions for AI agents (prompts, AGENTS.md, skills)

Mode: procedural. A system prompt is a procedure for a reader that cannot ask questions.

- One instruction per sentence keeps each rule quotable and hard to half-follow.
- One word, one meaning stops the model from treating "check", "verify", and "validate" as three operations.
- A condition first ("If the scan fails, stop") beats a trailing condition, which models drop.
- No "should". A model reads "should" as optional. Write "must" or delete the rule.

## Support macros and status-page updates

Mode: descriptive, 25-word limit. Many readers of these messages are non-native speakers.

> Before: We sincerely apologize for any inconvenience this may have caused.
> After: The sign-in service was down for 18 minutes. No account data changed. You can sign in now.

## Translation and localization prep

Mode: strict. STE was written so that non-native maintenance crews can read English manuals. The same rules prepare text for machine translation. One meaning per word and complete grammar (articles, "that") remove many ambiguities that a translator must otherwise guess at.

## UI copy and empty states

Mode: procedural, hard length limits. Buttons and labels are technical names and are exempt. `technical-formatting.md` says how a step names a label. Body copy follows the rules: "No alerts yet. Connect a log source to start."

## Where STE does not fit

Do not use STE for marketing pages, launch posts, blog posts, or brand writing. STE removes persuasion. Write those texts in your own voice, and use STE for the docs that they link to.
