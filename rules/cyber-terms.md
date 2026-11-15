---
trigger: always_on
---

# Cybersecurity terms

This table is ours, not the ASD dictionary. Rules 1.5, 1.8, and 1.12 permit domain terms. This file names the security terms to keep, the terms to constrain, and the terms to replace. It also says when to define a term and when to expand an abbreviation. Read it before you write or check cybersecurity text. The backticks in these tables mark the text that the linter reads. In a document, write an abbreviation in normal font.

Three rules apply to every table:

- A replacement must keep the full meaning: the data, the direction, the boundary, and the mechanism. If the plain word loses a part of the meaning, keep the term.
- Never change a product name, a standard name, a framework name, or a label in a tool. "Privilege Escalation" in MITRE ATT&CK and "Cloud Security Posture Management" stay as written. If a label in a tool uses a word that this file replaces, keep the label in quotation marks and use the word from this file for the general idea: "Open the "Whitelist" page and add the domain to the allowlist."
- These words are permitted as a noun and as a verb: patch, scan, log, quarantine, triage, exploit, compromise, beacon. This is an exception of this project to rules 1.7 and 1.13.

## Contents

- When to define and when to expand
- Glossary: terms to keep
- Abbreviations
- Names and general IT abbreviations
- Terms to constrain
- Terms to replace
- Idioms to replace
- Marketing words to delete

## When to define and when to expand

Three readers exist. The default reader is the practitioner.

The practitioner works in security and knows the terms, the abbreviations, and the metaphor terms (honeypot, red team) of the field. For the practitioner, add no definition and no expansion.

The two other readers get different text:

| Reader | How you know | What you do |
|---|---|---|
| The learner | The document is onboarding material or training material, or the user asks for definitions. | Keep each term and define it at its first use. Expand each abbreviation at its first use. |
| The layperson | This reader does not work in security. The request or the document type shows it: a notice to all staff, a message to a customer, an error message for an end user. | Replace each term with plain words. Define only a term that the reader must recognize later. Do not use an abbreviation. |

These rules apply when you add a definition or an expansion:

- A definition has ten words or fewer. Use the definition from the glossary unless the source gives a better one.
- An expansion is the full term, then the abbreviation in parentheses. If the full term explains nothing to the reader, give the definition too.
- Do not put a definition in a procedure step. Put it in a note, or in a section before the steps.

One rule applies to every document, for every reader: do not use an abbreviation that is not standard in the field without its full term. See "Abbreviations".

## Glossary: terms to keep

Keep these terms. Define a term only for a learner. For a layperson, the definition shows you the plain words to use.

| Term | Definition |
|---|---|
| malware | software that is made to cause harm |
| ransomware | malware that encrypts data and demands payment |
| trojan | malware that looks like a safe program |
| spyware | malware that secretly records the actions of the user |
| virus | malware that copies itself into other files |
| worm | malware that copies itself to other systems automatically |
| rootkit | malware that hides inside the operating system |
| botnet | a group of infected computers that one attacker controls |
| backdoor | a hidden method to get access to a system |
| phishing | false messages that make the reader do an unsafe action |
| spear phishing | phishing that targets one person or one group |
| social engineering | a trick that makes a person give access or data |
| credential | data that proves identity, such as a password or key |
| vulnerability | a fault that an attacker can use to cause harm |
| zero-day | a vulnerability that attackers know before a patch exists |
| exploit (noun) | code or a method that uses a vulnerability |
| payload | the part of an attack that does the harm |
| patch (noun) | a software update that corrects a fault |
| hash | a short value that identifies the content of a file |
| threat actor | a person or group that attacks systems |
| attack surface | all the points where an attacker can enter a system |
| persistence | a method that keeps attacker access after a restart |
| privilege escalation | the action of an attacker who gets higher permissions |
| lateral movement | movement of an attacker from one system to the next |
| pivot (verb) | move from one compromised system to other systems |
| exfiltration | unauthorized transfer of data out of the network |
| beacon | a repeated signal from malware to the attacker's server |
| compromise (noun) | unauthorized access to, or control of, a system or account |
| telemetry | data that a system sends about its own activity |
| log source | a system that sends its logs to a central system |
| sandbox | an isolated environment where a suspicious file runs safely |
| honeypot | a false system that attracts attackers and records their actions |
| sinkhole (noun) | a safe server that receives the traffic for malicious domains |
| allowlist | a list of permitted items. All other items are denied. |
| blocklist | a list of items that are denied |
| event | something that occurred on a system and was recorded |
| alert | a notification from a tool about one or more events |
| incident | actual or possible harm to a system or its data |
| false positive | an alert for activity that is not an attack |
| triage (noun) | ranking of alerts by urgency, to select the next action |
| dwell time | the time that an attacker is in a system before detection |
| threat hunting | a search for attackers that no alert found |
| containment | the actions that stop an attack from spreading |
| eradication | removal of all the attacker's files, accounts, and access |
| recovery | return of the systems to normal operation |
| mitigation | an action that reduces a risk without removing the cause |
| red team | an authorized group that attacks an organization as a test |
| blue team | the group that defends the organization in a test |
| penetration test | an authorized attack that finds vulnerabilities |
| tabletop exercise | a meeting to practice the response to an imagined incident |
| defense in depth | more than one layer of protection against the same attack |
| zero trust | a design that verifies each request and trusts no network |

These terms need no definition for any reader: firewall, antivirus, password.

These technical verbs are permitted (rule 1.12): block, isolate, quarantine, patch, scan, log, deploy, detect, investigate, triage, escalate, exploit, compromise, exfiltrate, pivot, beacon.

## Abbreviations

The abbreviations in this table are standard in the field. Write them with no full term for a practitioner.

1. Use the form in this table. Write `C2`, not `C&C` or `CnC`.
2. For the plural, add "s" with no apostrophe: `IOCs`, `TTPs`.
3. The table does not hold every standard abbreviation. An abbreviation that practitioners use across organizations (`WAF`, `SSO`, `XSS`) is standard too. An abbreviation is not standard if only one team, one vendor, or one writer uses it. In every document, write the full term, or write the full term and then the abbreviation in parentheses at the first use. Do not make a new abbreviation.
4. For a learner, write the full term and then the abbreviation in parentheses at the first use: "security information and event management (SIEM)". After that, write the abbreviation only. Give the abbreviation also when the term occurs only once, because the learner will see it in the tools.
5. In a heading, use the same form that the body text uses at that point.
6. Some abbreviations have two meanings in security text. If the document does not make the meaning clear, write the full term at the first use for every reader. Examples: `APT` (a threat group, or the package tool), `PoC` (proof of concept, or point of contact), `MAC` (message authentication code, or the address of a network interface), `SOP` (same-origin policy, or standard operating procedure), `IP` (Internet Protocol, or intellectual property).
7. Keep the capital letters of an abbreviation, because they carry the meaning. `SOC` is a security operations center, and `SoC` is a system on chip. `DoS` is denial of service, and `DOS` is an operating system.

| Abbreviation | Full term | Definition |
|---|---|---|
| `APT` | advanced persistent threat | a skilled group that keeps long-term access to a target |
| `C2` | command and control | the channel that an attacker uses to control compromised systems |
| `DDoS` | distributed denial of service | an attack from many systems that overloads a service |
| `EDR` | endpoint detection and response | software on a computer that detects and stops attacks |
| `IDS` | intrusion detection system | a system that detects attacks |
| `IOC` | indicator of compromise | evidence that an attacker was in a system |
| `IPS` | intrusion prevention system | a system that detects and blocks attacks |
| `IR` | incident response | the work to stop an incident and recover from it |
| `MFA` | multi-factor authentication | a login that needs two or more types of proof |
| `NGFW` | next-generation firewall | a firewall that also inspects application data |
| `SIEM` | security information and event management | a system that collects logs and raises alerts |
| `SOC` | security operations center | the team that monitors and responds to alerts |
| `TTP` | tactics, techniques, and procedures | the methods that an attacker uses |
| `XDR` | extended detection and response | software that detects attacks across computers, networks, email, and cloud |

## Names and general IT abbreviations

Never expand the names in this table. The full term explains nothing to the reader. For a learner, give the description at the first use: "YARA (a tool that identifies malware by patterns in files)".

| Name | Description |
|---|---|
| `CVE` | a public list that gives each known vulnerability one identifier |
| `CVSS` | a numerical score for the severity of a vulnerability |
| `CWE` | a public list of types of software and hardware weakness |
| MITRE ATT&CK | a public catalog of attacker tactics and techniques |
| YARA | a tool that identifies malware by patterns in files |
| Sigma | an open format for rules that describe log events |

Other names follow three rules:

- A product name that is not in the table: for a learner, say what the product is in a few words. Do not expand the name.
- The name of an organization (`NIST`, `CISA`, `ENISA`): for a learner or a layperson, write the full name at the first use, then the abbreviation in parentheses.
- A general IT abbreviation, such as `IP`, `URL`, `DNS`, `API`, `HTTP`, `VPN`, `TLS`, or `SSH`: never expand it. A reader who works in IT knows it. For a layperson, use a plain word ("web address" for `URL`), or say what the item does in a few words.

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
