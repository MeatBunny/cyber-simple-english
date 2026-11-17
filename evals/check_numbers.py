#!/usr/bin/env python3
"""Check that the copies of the rule block and the version strings agree.

Run it before you push. CI runs it on every push and pull request.

    python3 evals/check_numbers.py            # exit 1 on a mismatch

Checks:
- The rule block: prompts/system-prompt.md, rules/AGENTS.md, and output-styles/cyber-simple-english.md
  carry the same text, and SKILL.md carries the same reply rules.
- rules/cyber-terms.md is a copy of the term table in the skill, after its frontmatter.
  Antigravity applies a rule only if the frontmatter has `trigger: always_on`.
- SKILL.md carries a copy of the term table from "## Terms to constrain" to the end.
- The version string in SKILL.md and the four manifests.

The project publishes no benchmark numbers yet. When it does, add the check of
each published number against its raw files here.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
problems = []


def rule_block(text):
    """The text between the first two --- lines, or the body after the frontmatter."""
    parts = re.split(r"^---[ \t]*$", text, flags=re.M)
    return parts[1].strip() if len(parts) >= 3 else text.strip()


def sync():
    prompt = rule_block((ROOT / "prompts" / "system-prompt.md").read_text(encoding="utf-8"))
    style = (ROOT / "output-styles" / "cyber-simple-english.md").read_text(encoding="utf-8")
    style = re.sub(r"^---\n.*?\n---\n", "", style, count=1, flags=re.S).strip()
    rule = (ROOT / "rules" / "AGENTS.md").read_text(encoding="utf-8")
    if not rule.startswith(prompt):
        problems.append("rules/AGENTS.md (the Antigravity rule) does not start with the rule block of prompts/system-prompt.md")
    table = (ROOT / "skills" / "cyber-simple-english" / "references" / "cyber-terms.md").read_text(encoding="utf-8")
    copy = (ROOT / "rules" / "cyber-terms.md").read_text(encoding="utf-8")
    if copy != "---\ntrigger: always_on\n---\n\n" + table:
        problems.append("rules/cyber-terms.md (the Antigravity copy of the term table) differs from "
                        "skills/cyber-simple-english/references/cyber-terms.md. Make the copy again.")
    if prompt != style:
        problems.append("rule block differs between prompts/system-prompt.md and output-styles/cyber-simple-english.md")
    skill = (ROOT / "skills" / "cyber-simple-english" / "SKILL.md").read_text(encoding="utf-8")
    if table[table.index("## Terms to constrain"):].rstrip("\n") not in skill:
        problems.append("SKILL.md copy of the constrain and replace tables differs from cyber-terms.md. Make the copy again.")
    for phrase in ("Answer in prose", "No em-dashes", "No contractions", "first sentence gives the answer",
                   "Condition before command", "make sure that", "Never touch"):
        for name, text in (("SKILL.md", skill), ("prompts/system-prompt.md", prompt)):
            if phrase.lower() not in text.lower():
                problems.append(f"{name} lacks the rule phrase {phrase!r}")


def versions():
    v = {}
    v["SKILL.md"] = re.search(r'version: "([^"]+)"', (ROOT / "skills/cyber-simple-english/SKILL.md").read_text()).group(1)
    for f in (".claude-plugin/plugin.json", ".claude-plugin/marketplace.json", ".codex-plugin/plugin.json",
              ".antigravity-plugin/plugin.json"):
        v[f] = re.search(r'"version":\s*"([^"]+)"', (ROOT / f).read_text()).group(1)
    if len(set(v.values())) != 1:
        problems.append(f"version strings differ: {v}")


def main():
    sync()
    versions()
    if problems:
        print("MISMATCH")
        for p in problems:
            print(" -", p)
        return 1
    print("check_numbers OK: the rule block copies and the version strings agree")
    return 0


if __name__ == "__main__":
    sys.exit(main())
