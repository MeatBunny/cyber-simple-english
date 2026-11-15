# Before / after

Each "before" below is unedited model output (Claude Sonnet, November 2026, no skill loaded). Each "after" is the same content, rewritten with the skill loaded and then corrected where it broke a rule.

## 1. README introduction (descriptive)

**Before:**

> `iocscan` is a command-line tool that checks the endpoints of your organization for indicators of compromise (IOCs). It takes file hashes, domains and IP addresses from a threat intelligence feed and searches for them by querying your EDR's API. That way you don't have to look through each host by hand. Any matches are written to a CSV file or sent to your SIEM. You can run `iocscan` once, for example during an incident, or on a schedule so that new indicators are checked as the feed updates. All settings, including the feed, the EDR connection and the output destination, are in a single YAML file.

**After: one topic per paragraph, no contraction, no "-ing" clause:**

> The `iocscan` command-line tool searches the endpoints of your organization for IOCs. It reads file hashes, domains, and IP addresses from a threat intelligence feed. It then queries the API of your EDR for each indicator, so you do not search each host by hand.
>
> The tool writes each match to a CSV file or sends it to your SIEM.
>
> You can run `iocscan` once, for example during an incident. You can also run it on a schedule. When the feed updates, `iocscan` checks the new indicators.
>
> You set the feed, the EDR connection, and the output destination in one YAML file.

## 2. Runbook entry (procedural)

**Before (the first part of the entry): bold lead-ins, several instructions in one step:**

> ## Agent not reporting
>
> **Symptom:** The EDR console shows a Windows host as offline or stale, with no telemetry received within the expected interval.
>
> **Likely causes:** The `edr-agent` service is stopped, the host cannot reach the EDR cloud on TCP 443, or the host clock is wrong and TLS validation fails.
>
> **Triage steps** (run in an elevated PowerShell session on the host, or via remote shell):
>
> 1. **Check the service.**
>    ```powershell
>    Get-Service edr-agent
>    ```
>    If the status is `Stopped`, start it with `Start-Service edr-agent` and confirm it stays `Running`. If it stops again, check the Windows Event Log (Service Control Manager and the agent's own log) for the reason. Also check whether the stop was unexpected, since an agent stopped by an unauthorized user may indicate tampering. Escalate to IR if so.

**After: one instruction per sentence, condition first, one verb for "check":**

> # Agent not reporting
>
> The EDR console shows a Windows host as offline or stale. The console received no telemetry from the host within the expected interval.
>
> ## Likely causes
>
> - The `edr-agent` service is stopped.
> - The host cannot connect to the EDR cloud on TCP port 443.
> - The host clock is wrong, and TLS validation fails.
>
> ## Triage steps
>
> Run each command in a PowerShell session with administrator permissions on the host, or through a remote shell.
>
> 1. Make sure that the service runs.
>
>    ```powershell
>    Get-Service edr-agent
>    ```
>
> 2. If the status is `Stopped`, run `Start-Service edr-agent`.
> 3. Make sure that the status stays `Running`.
> 4. If the service stops again, read the Windows Event Log to find the reason.
> 5. If an unauthorized user stopped the agent, escalate the incident to IR. The stop can be a sign of tampering.

## 3. Error message for an end user (layperson)

**Before:**

> That code didn't work. It may be incorrect or expired. Check that you entered the latest code from your authenticator app, then try again. Codes refresh every 30 seconds. If you keep having trouble, contact your IT help desk.

**After:**

> The sign-in failed. The code was not correct, or it expired.
> Open your authenticator app. Type the new code, then sign in again.
> If the problem continues, contact your IT help desk.

## 4. Incident summary for the shift handover (descriptive, simple past)

**Before:**

> At 09:12 UTC today, a finance user entered their password on a fake Microsoft 365 sign-in page delivered by a phishing email. At 09:20, an attacker signed in to the account from an unfamiliar IP address and created an inbox forwarding rule. The SOC disabled the account and revoked all sessions at 09:41, and the forwarding rule has been removed. The same email went to 14 other recipients, and none of them clicked the link. The sender domain is now blocked. No further action is outstanding on containment. Follow-up items for the next shift are to confirm with the user that the account is safe to restore after a password reset and MFA check, and to review the mailbox audit log for anything forwarded or accessed between 09:20 and 09:41.

**After:**

> A phishing email sent a fake Microsoft 365 sign-in page to a finance user. At 09:12 UTC, the user typed a password on the page. At 09:20 UTC, the attacker signed in to the account from an unfamiliar IP address and created an inbox forwarding rule. At 09:41 UTC, the SOC disabled the account and revoked all sessions.
>
> The SOC removed the forwarding rule and blocked the sender domain. The same email went to 14 other recipients, and none of them clicked the link.
>
> The next shift has two tasks. After the password reset and the MFA check, make sure with the user that the account is safe to restore. Review the mailbox audit log for the items that the attacker forwarded or opened between 09:20 UTC and 09:41 UTC.

## 5. Breaking change in release notes

**Before:**

> **Breaking change: `src_ip` renamed to `source.ip` in alert output**
>
> Starting in 4.0, the source IP address in alert output is in the `source.ip` field, which follows the Elastic Common Schema (ECS). It was previously `src_ip`.
>
> **Who is affected:** Any SIEM dashboard, saved search, detection or correlation query, or SOAR playbook that reads `src_ip` from alerts produced by this rule pack.
>
> **What to do:** Change every reference to `src_ip` to `source.ip` before you rely on 4.0 alert output. The value and format are unchanged. Only the field name is different.
>
> **Transition period:** For now, alerts include both `source.ip` and `src_ip`. The deprecated `src_ip` field will be removed after **2027-03-01**. Anything that still reads it will stop working after that date, so finish the migration before then.

**After:**

> Breaking: change each reference to `src_ip` to `source.ip` before you use the alert output of version 4.0.
>
> In version 4.0, the source IP address in alert output is in the `source.ip` field, which follows the Elastic Common Schema. In earlier versions, the field was `src_ip`. The value and the format did not change.
>
> The change affects each SIEM dashboard, saved search, detection query, and SOAR playbook that reads `src_ip` from the alerts of this rule pack.
>
> Until 2027-03-01, alerts include `source.ip` and `src_ip`. After that date, the rule pack does not send `src_ip`.
