# Technical formatting

Rule 2 of the skill protects the code and the names that the source contains. This file says how to write these items in new text.

One distinction decides the format. The name of a thing is literal text, and the reader types it or searches for it. Write it in code font. The type of a thing is an ordinary word. Write it in normal font. "Add `svc_backup` to the `Domain Admins` group" has two names and one type.

| Item | How to write it | Example |
|---|---|---|
| A command, a flag, code, a function name | code font | `systemctl restart sshd` |
| A file name, a file path, a directory name | code font | `/etc/ssh/sshd_config` |
| A host name, a domain name, an IP address, an IP address with a port | code font | `dc01`, `example.com`, `192.0.2.10:443` |
| A user name, a password, an email address | code font | `svc_backup` |
| The name of a group, a role, a field, a header, a parameter, a registry key | code font | the `Domain Admins` group, the `X-Forwarded-For` header |
| The type of a group, a role, a field, a header | normal font | an administrator, an HTTP header |
| A hash value | code font | `d41d8cd98f00b204e9800998ecf8427e` |
| A URL that the reader must not open, such as a target or an indicator | code font | `http://203.0.113.5/payload.bin` |
| A product name and its version | normal font, with no "v" before the number | Nmap 7.80 |
| The identifier of a vulnerability or a standard | normal font | CVE-2021-44228 |
| A port number alone, a line number | normal font, with no comma | port 3389 |
| An HTTP method, an HTTP status | normal font | a GET request, 404 Not Found |
| The name of a hash algorithm | normal font, with capitals and a hyphen | SHA-256, MD5 |
| An abbreviation | normal font | SIEM, IOC, C2 |

In a step, put the literal text where the reader needs it: "Open `/var/log/auth.log`." Do not put a full sentence in code font.

## Verb and noun forms

A verb of two words stays two words. The noun and the adjective are one word, or they have a hyphen.

| Verb | Noun or adjective |
|---|---|
| log in to the console | the login page |
| sign in | the sign-in page |
| back up the database | the backup |
| roll back the release | the rollback |
| time out | the timeout |
| fail over | the failover |
| take over the account | an account takeover |
| look up the hash | a DNS lookup |
| set up the agent | the setup |

Write these as one word: hostname, username, filename, filesystem, timestamp, website, plaintext, ciphertext, nameserver, ruleset, passphrase, checksum.

Write these as two words: web page, web server, data center, log file, key pair, file path, source code, word list.

Write "email", "internet", and "the web" in lowercase with no hyphen. Write "Wi-Fi".

## "A" or "an" before an abbreviation

Select "a" or "an" by the first sound of the next word, as a practitioner says it.

- If the first letter is said with a vowel sound, write "an": an SSH key, an HTTP request, an XSS vulnerability, an MFA prompt, an IOC, an EDR agent, an NGFW.
- If the abbreviation is said as a word, the word decides: a SIEM rule, a SOC analyst, a SQL query, a YARA rule, a NIST guide.
- Write "a URL" and "a `.exe` file".

## Excerpts: secrets, removed lines, and placeholders

Rule 2 says that you must not change quoted output. A secret is the one exception.

- Replace a secret or personal data in an excerpt with `[REDACTED]`. A secret is a password, a token, a key, or a session cookie. Do not replace it with a false value that looks real. Change nothing else in the excerpt.
- If you remove lines from an excerpt, put `[lines removed]` on a line of its own at that point.
- Show a value that the reader must supply as a name in angle brackets, and tell the reader to replace it: `ssh <user>@<host>`. Use the same placeholder name for the same value in the full document.

## Labels, keys, and messages on the screen

- Write the label of a button, a menu item, a tab, or a key that the reader clicks or presses in bold, with the words and the capitals that the tool shows: "Click **Isolate host**." "Press **Ctrl+C**." This is the only permitted use of bold in a document. Do not use bold in a chat reply.
- Write a key combination with a plus sign and no spaces: **Ctrl+Shift+Esc**.
- Write the name of a page or a pane that the reader does not click in normal font, with the capitals that the tool shows: "The Detections page shows the alert."
- Put terminal output and log lines in code font, because the reader searches for this text or compares each character.
- Put a message from a window in quotation marks, with the same words and capitals: The console shows "Isolation failed".

## Dates, times, numbers, and units

The reader compares the text with the output of a tool, and the reader can be in a different country. Use the forms that have one reading.

- Write a date as 2026-09-01. Do not write a date with slashes, because 03/04/2026 has two readings.
- Write a time in 24-hour form with the time zone: 14:02 UTC. Use one time zone in a document.
- Write a number as digits when it is a measurement, a count of items in a system, or a value that the reader types.
- Put a comma in a number of five or more digits: 12,500 events. Do not put a comma in a port number, a line number, an identifier, or a value in code.
- Keep the capitals of a unit: MB is megabytes, and Mb is megabits. Put a space between the number and the unit: 64 GB, 250 ms.

## Names of tools and products

Write a product name as its maker writes it. If you do not know the form, open the site of the maker.

If a name is also a command, write the name in normal font for the product and the command in code font for the text that the reader types: Nmap and `nmap`, Ncat and `ncat`.

These names have capitals that writers frequently get wrong: Wi-Fi, GitHub, GitLab, PowerShell, JavaScript, macOS, WordPress, VMware, YubiKey, PuTTY, OAuth, BloodHound, CrowdStrike, MITRE ATT&CK.

These names start with a capital: Kubernetes, Wireshark, Metasploit, Burp Suite, Tor, Zeek, Suricata, Sysmon.

The makers of these tools write the name in lowercase: curl, hashcat, sqlmap, mimikatz, osquery.

Do not start a sentence with a command, a URL, or a name that is all lowercase. Put a noun before it: "The `iocscan` tool stops with `401 Unauthorized`."

## Small conventions

- "Data" takes a singular verb: "the data is encrypted".
- Do not repeat the last word of an abbreviation. Write "PIN", not "PIN number".
- For the plural of an abbreviation that ends in S, write the full term: "intrusion detection systems", "operating systems".
- Write "an XML file" for the file type and "a `.xml` file" for the extension.
- Do not put a slash between two words in a sentence. Write "or", or write "and".
