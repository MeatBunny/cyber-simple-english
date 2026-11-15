---
name: cyber-simple-english
description: |
  Write or rewrite cybersecurity documentation and training material in plain
  English, built on the writing rules of ASD-STE100 Simplified Technical
  English: short sentences, active voice, simple tenses, one word one meaning,
  condition before command, no AI slop. The default reader is a security
  practitioner, so standard security terms get no definitions. For a learner
  the skill defines terms; for a layperson it replaces them. Strict mode
  applies full STE vocabulary compliance when the user names STE, ASD-STE100,
  or compliance. Use for runbooks, playbooks, procedures, training modules,
  lab guides, onboarding docs, incident notes, READMEs, error messages, and
  release notes. Not for findings, risk narratives, or marketing. Also use
  when the user says "STE", "Simplified Technical English", "ASD-STE100",
  "plain English", "layman's terms", "explain it simply", "no jargon",
  "de-slop", "make this readable", or "write for non-native readers". The
  same rules govern the reply: answer first, prose only.
license: MIT
compatibility: claude-code codex opencode antigravity gemini-cli github-copilot goose
metadata:
  version: "1.0.0"
  standard: ASD-STE100 Issue 9 (2025-01-15)
---

# Cyber Simple English

Write plain English that the reader understands on one read. Three readers exist. The practitioner works in security and is the default. The learner reads onboarding or training material. The layperson does not work in security. The rules come from ASD-STE100, the controlled language that aerospace uses for maintenance manuals. Two registers exist: the document you write or rewrite, and the reply you type in chat. Each has its own short rule set below.

## The Document

When asked to write or rewrite documentation, apply these rules to the prose:

1. Classify each passage. Procedural text tells the reader what to do: imperative mood, 20 words per sentence, one instruction per sentence. Descriptive text explains: simple tenses, 25 words per sentence, one topic per paragraph, six sentences per paragraph at most.
2. Never touch code, identifiers, commands, flags, file paths, quoted errors, product names, or facts. One exception: replace a secret or personal data in a quoted excerpt with `[REDACTED]`, never with a false value that looks real. When the source gives no number or cause, keep the general statement. In new text, write literal text in code font: a command, a path, a host name, an IP address, a user name, a hash value, and the name of a field or a group. Write a product name, a version, a CVE identifier, a port number, and an abbreviation in normal font. The full table is in `references/technical-formatting.md`.
3. Condition before command, with a comma: "If the scan fails, read the log."
4. Use simple tenses and active voice. No present perfect ("has completed" → "completed"). No "-ing" verb after a comma (", making it easy" → new sentence). Name the actor: "You run the scan."
5. Modals: can, will, must. Never should, would, may, might, could. A required "should" becomes "must". An optional one is deleted.
6. Use complete grammar. No contractions, keep articles, keep "that". Write short sentences, not telegraph style.
7. No semicolons and no em-dashes. Write two sentences, or name the relation.
8. One word, one meaning, for the whole document. Use `make sure that` for check, verify, confirm, validate, ensure. Use `configuration` for config, settings, options. Break noun chains over three words with a preposition ("the timeout value for the agent heartbeat"). A verb of two words stays two words, and its noun is one word: "log in to the console", "the login page". Select "a" or "an" by the first sound of the next word: an SSH key, a SIEM rule. Write a date as 2026-09-01 and a time in 24-hour form with the time zone: 14:02 UTC. The lists are in `references/technical-formatting.md`.
9. Give the reader each fact before the step that needs it. Do not define a term that is standard in the field, and do not expand an abbreviation that is standard in the field. For a learner, or if the user asks for definitions, define each concept term at its first use, in ten words or fewer, one per sentence. For a layperson (the request or the document type shows it: a notice to all staff, a message to a customer), replace the term with plain words. Never define the tool the document is about. Never expand a product name or a standard name (Splunk, HTTP, CVE). Never put a definition in a procedure step. Expand or avoid an abbreviation that is not standard in the field. Also name the host, the flag, or the prior step that a command depends on. "Restart the service" becomes "Restart the `edr-agent` service on the host that sent the alert."
10. State the fact, not its importance. Delete words that carry no fact: simply, seamlessly, robust, powerful, comprehensive, leverage, crucial, "in order to", "it is worth noting". No "not just X, it is Y". No decorative triplets. No "in conclusion".
11. Use formatting only where it carries structure. No bold lead-ins, no bold as emphasis, no emoji, no heading over two sentences. Bold has one permitted use in a document: the label of a button, a menu item, or a key in a step, written as the tool shows it: "Click **Isolate host**." Put a message from a window in quotation marks, not in code font. A vertical list is for three or more parallel items or steps: colon on the lead-in, uppercase start, one instruction per item.
12. Warnings: command or condition first, then the risk. "Do not isolate a domain controller. Isolation stops the logins of the full domain."

Use American spelling. `references/word-swaps.md` maps the overused words to plain ones. Before you draft security text, you must read `references/cyber-terms.md` in full. It names the security terms to keep, the abbreviations, and when to define a term. The rulings for terms with two senses and the words to replace are in the four tables below, after the example. Apply them to every security text. For an error message, a runbook, an incident report, release notes, a commit message, or UI copy, read `references/use-cases.md` first. It names the mode and the pattern for each.

Before (AI output):

> 1. **Check the service.** If the status is `Stopped`, start it with `Start-Service edr-agent` and confirm it stays `Running`. If it stops again, check the Windows Event Log (Service Control Manager and the agent's own log) for the reason. Also check whether the stop was unexpected, since an agent stopped by an unauthorized user may indicate tampering. Escalate to IR if so.

After (procedural, headed, numbered):

> ## The agent service is stopped
>
> 1. If the status of the `edr-agent` service is `Stopped`, run `Start-Service edr-agent`.
> 2. Make sure that the status stays `Running`.
> 3. If the service stops again, read the Windows Event Log to find the reason.
> 4. If an unauthorized user stopped the agent, escalate the incident to IR. The stop can be a sign of tampering.

## Terms to constrain

Each term below has two senses, or a near-synonym that means a different thing. The linter cannot see the sense, so it does not flag these terms. You must apply the ruling.

| Term | Ruling |
|---|---|
| event, alert, incident | Three different things. Do not use one word for another. |
| alert (verb) | Alert is a noun. A rule "raises an alert". A person "tells" a person. |
| attacker, threat actor, adversary | Use one of these words for the same person or group in a document. Use attacker by default. Use threat actor for a tracked group. Use adversary for the simulated attacker in an exercise. |
| vulnerability, weakness | A vulnerability is one fault in one product (a CVE). A weakness is a type of fault (a CWE). Do not write flaw, hole, or bug for one of them. A bug is a fault that has no security effect. Do not use vulnerability for intended behavior. |
| threat, vulnerability, risk | A threat is the possible cause of harm. A vulnerability is the fault. A risk is the likelihood and the effect together. Do not use one word for another. |
| incident, breach | A breach is a proven exposure of data, and the word has legal effects. Do not use it for other incidents. |
| severity, priority | Severity is the amount of harm. Priority is the order of work. Do not use one word for the other. |
| authentication, authorization | Authentication proves who the user is. Authorization decides what the user can do. Do not write "auth". |
| cryptography, cryptocurrency | Do not write "crypto". Write the full word. |
| cleartext, plaintext | Cleartext is data that is not encrypted. Plaintext is the input to an encryption function. Use cleartext for a password that a system stores or sends with no encryption. |
| unvalidated, invalidated | Unvalidated input was not examined. Invalidated input was examined and rejected. An invalidated session is a session that the system ended. |
| unauthenticated, unprivileged | An unauthenticated user did not log in. An unprivileged user logged in and has no special permissions. Do not use one word for the other. |
| high-privilege, low-privilege | The words are permitted. Where you can, name the role or the permission at the first use: "a member of `Domain Admins`". |
| insecure, unsecured | The words are permitted. Where you can, name the missing control: "the bucket has no access policy". Do not write "unsecure". |
| runbook, playbook | Use the name that the team uses, and keep it. With no team rule, a runbook holds the steps for one task and a playbook holds the plan for one type of incident. |
| allowlist, blocklist | Use this pair. If a tool shows the label denylist or "allowed list", keep that label. |
| isolate, quarantine | You isolate a host: you remove its network access. You quarantine a file or a message: you move it to a place where it cannot run. |
| escalate | One meaning: pass an alert or an incident to a higher tier. Name the recipient: "Escalate the incident to Tier 2." For an attacker, use the noun "privilege escalation", or write "got administrator permissions". |
| exploit (verb) | The object is a vulnerability, and the sentence names the effect: "The attacker exploited CVE-2024-3094 to run commands." In other senses, write "use". |
| exfiltrate | Keep the verb, because no plain verb holds the full meaning. Name the data and the destination. For a lay reader, write "copied the customer table out of the network to a server that the attacker controls". |
| compromise | Name the item that was compromised. If the source gives the method, name the method. Do not use the word for an agreement between two positions. |
| contain | In a step, name the action: "Isolate the host", "Disable the account", "Block the domain". Containment is the name of the phase. |
| detect | A tool or a rule detects. A person finds. |
| hunt (verb) | "Threat hunting" is the technical noun. For the action, write "search for". |
| pivot | The attacker sense only: "The attacker pivoted from the web server to the database server." The verb "pivot" and the noun "lateral movement" name the same action. For an analyst, write "search for other records with the same value". For a change of plan, write "change". The word is also permitted in the term "pivot table". |
| sinkhole (verb) | Write "redirect the domain to the sinkhole". |
| payload | Use it for the attack sense only. For the network sense, write "request body" or "packet data". |
| endpoint | A device with an agent on it, or a URL of an API. Use one sense in a document. Write "device" or "API endpoint" for the other. |
| hacker, hack | Write attacker and attack. The words are permitted in a name ("Certified Ethical Hacker", "hackathon"). |
| zero trust | Permitted as the name of the architecture only. Do not use it as a claim about a product. |
| next-generation | Permitted in the term "next-generation firewall" only. |
| security posture | Name the state that you can measure: the patch level, the open findings, the configuration. The words are permitted in a product category name. |
| `threat landscape` | Delete it, or name the threats. |
| cyber (adjective) | Delete it: "cyber attack" becomes "attack". "Cybersecurity" and names ("Cyber Kill Chain") stay. |

## Terms to replace

The linter flags each row that has "yes" in the last column. It reads the terms and the replacements from this table, so `references/cyber-terms.md` is the source of the lists.

| You wrote | Write instead | Linter |
|---|---|---|
| `remediate` | name the action: "install the patch", "disable the account". If the source gives no action, write "correct". The noun "remediation" stays. | yes |
| `mitigate` | "reduce the likelihood of" or "reduce the effect of". Say which. The noun "mitigation" stays. | yes |
| `eradicate` | "remove all of", and name the item: the malware, the account, the scheduled task | yes |
| `detonate` | run the file in the sandbox and record its behavior | yes |
| `weaponize` | "build an attack tool from" the exploit, or "add a payload to" the document | yes |
| `whitelist` | allowlist | yes |
| `blacklist` | blocklist | yes |
| `bad actor, bad guy` | attacker | yes |
| `malicious code` | malware, or name the type: malicious script, malicious macro | yes |
| `pwn` | get control of | yes |
| `creds` | credentials | yes |
| `vuln` | vulnerability | yes |
| `exfil` | exfiltration | yes |
| `recon` | reconnaissance | yes |
| `privesc` | privilege escalation | yes |
| `C&C` | `C2` | yes |
| `0-day, 0day` | zero-day | yes |
| `best practice` | name the practice or the standard: "CIS Benchmark for Ubuntu 22.04, section 5.2". If it is a requirement, write "must". | yes |
| `pain point` | problem | yes |
| `silo, siloed` | "separate", and name the teams or the systems | yes |
| `pop a shell, popped a shell` | "get a shell on" the host | yes |
| `cert` | certificate | yes |
| `repo` | repository | yes |
| `on-prem` | on-premises | yes |
| `k8s` | Kubernetes | yes |
| `trivial, trivially` | say what the attacker needs: "needs no account", "needs one request" | yes |
| `segregate, segregation` | segment (a network), separate (duties) | yes |
| `tribal knowledge` | "knowledge that is not written down" | yes |
| `dump` (verb) | name the action and the data: "copy the password hashes from memory" | |
| `white hat, black hat` | "authorized tester" or "attacker". The words stay in a name (Black Hat, the conference). | |
| `master/slave` | primary and replica for data, leader and follower for control. If the product uses other words, use the words of the product. A setting or a host that has the old name stays as written, in code font. | |
| `sunset` (verb) | "stop support for", and give the date | |

## Idioms to replace

An idiom or a phrasal verb has a meaning that is different from the meanings of its words. A reader whose first language is not English cannot find the meaning in a dictionary.

| You wrote | Write instead | Linter |
|---|---|---|
| `in the wild` | "in real attacks" | yes |
| `crown jewels` | name the data or the system | yes |
| `blast radius` | "the systems that the attack affects", or "the systems that the change affects" | yes |
| `phone home, phoned home, phoning home` | "connect to the attacker's server" | yes |
| `spin up, spun up, spinning up, stand up, stood up` | start, or create | yes |
| `lock down, locked down, locking down` | name the action: "disable remote login" | yes |
| `take down, took down, taken down` | remove, or stop | yes |
| `low-hanging fruit` | "the easy targets", or delete it | yes |
| `living off the land` | "use of the tools that are already on the system" | yes |
| `box` | host. The linter does not flag this word. |  |

## Marketing words to delete

These words carry no fact. Delete the word. If a fact is behind it, state the fact.

| You wrote | Write instead | Linter |
|---|---|---|
| `military-grade, bank-grade, enterprise-grade` | name the standard: "AES-256" | yes |
| `bullet-proof, unhackable` | name the property and its limit | yes |
| `next-gen` | (delete) | yes |
| `best-in-class, world-class, industry-leading` | (delete) | yes |
| `battle-tested` | name the test or the time in production | yes |
| `AI-powered` | say what the model does | yes |
| `sophisticated attacker, sophisticated attack` | delete "sophisticated", or name the capability that the attacker showed | yes |
| `single pane of glass` | name the console | yes |

## The Reply

Every chat reply, in every mode, follows these rules:

1. Answer in prose. No headers, no bullet lists, no bold, no tables. A code block is legal when the reader must copy it.
2. The first sentence gives the answer or the result. Do not restate the question.
3. No em-dashes. Name the relation ("because", "but", "for example") or write two sentences.
4. Do not define a term that is standard in the field. For a learner or a layperson, define a concept term in a few words the first time you use it: "dwell time (the time that an attacker is in a system before detection)". Do not define product names.
5. No contractions. No openers ("Certainly", "Great question") and no closers ("I hope this helps", "Let me know").
6. Do not shorten quoted error text, security warnings, or confirmations before a destructive action.

Before: No, that isn't normal. svchost.exe is a legitimate host process, so it's a common disguise for malware that injects into it or masquerades as it.
After: No, a fixed 60-second beacon to an unknown domain is not normal for a file server. Malware frequently uses the name svchost.exe or injects code into this process.

## Self-Check Before You Deliver

1. Reply: search for `—`, `**`, `#`, and a line that starts with `-`. Remove each one.
2. Document: count the words in your three longest sentences. Over 20 or 25, split. Search for `'`, `has been`, `should`, `may`, `;`, `—`, `, making`, `**` that is not a label in a step, `check`, `verify`, `config`, and any heading that covers fewer than three sentences. Fix each hit. Read each step: does it name a host, a flag, or a prior step the reader must already have? If not, add it or point to it.
3. Security text: search your draft for each term in the four tables above (terms to constrain, terms to replace, idioms to replace, marketing words to delete). Fix each hit.

## Modes

Plain is the default and is all of the above. Strict applies when the user names STE, ASD-STE100, or compliance: read `references/strict-vocabulary.md` before you draft the document, and say once that no tool guarantees compliance. The reply stays Plain in every mode.

When asked to CHECK text instead of writing it, first open `references/rule-catalog.md`. Then report each violation as: rule number quoted from that file, the offending text, a compliant rewrite. Never cite a rule number from memory. When the user asked for compliance, end with one sentence: no tool can guarantee ASD-STE100 compliance, and the standard is a free download at asd-ste100.org.

## Limits

These rules are for facts and instructions, not marketing copy or brand writing, because they delete persuasion. Say so, and offer them for the docs instead.

## References

- `references/rule-catalog.md`: the 53 rules of Issue 9 with security examples, for CHECK mode
- `references/strict-vocabulary.md`: the dictionary discipline for Strict mode
- `references/word-swaps.md`: a map from overused words to plain ones
- `references/cyber-terms.md`: the security terms to keep and define, the terms with two senses, and the jargon to replace. The last four tables of that file are also in this file, above
- `references/technical-formatting.md`: code font or normal font for commands, paths, hosts, names, versions, and identifiers, the verb and noun forms of compounds, "a" or "an" before an abbreviation, excerpts, labels and messages on the screen, dates, times, units, and the names of tools
- `references/use-cases.md`: the mode and the pattern for error messages, runbooks, incident reports, release notes, commits, agent prompts, UI copy, and translation prep
