#!/usr/bin/env python3
"""Count words that are not approved in ASD-STE100, in a text.

`ste_lint.py` measures the mechanical writing rules. It does not look at word
choice. This tool covers the other half: it reads `not-approved.tsv` and reports
each word in the text that the standard does not approve, with the approved
alternatives.

It also reads `slop.tsv` and reports LLM-tell words as a separate count. These
are terms from the SimpleEnglish lexicon (its count: 8 or more published ban lists) that
the STE dictionary does not rule on. The two counts do not overlap: a word in
both lexicons counts as a dictionary hit only.

It also reads the cybersecurity term table of this project,
`skills/cyber-simple-english/references/cyber-terms.md`, and reports the terms to
replace as a third count. The dictionary files are optional: without them the
dictionary count is zero and the slop and cyber counts still work.

Known ceiling: the match is on the base form and on simple inflections
(-s, -es, -ed, -ing, -ly). It does not do part-of-speech disambiguation, so a
word that is not approved as a verb but approved as a noun gives a false hit.
Code blocks, code spans, URLs, and headings are removed before the count.
Numbers from this tool compare two texts run through the same version. They are
not a compliance verdict.

Usage:
  python3 ste_dict_lint.py file.md
  cat text.md | python3 ste_dict_lint.py -
  python3 ste_dict_lint.py --self-test
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
TSV = HERE / "not-approved.tsv"
SLOP_TSV = HERE.parent.parent / "evals" / "slop.tsv"
CYBER_MD = HERE.parent.parent / "skills" / "cyber-simple-english" / "references" / "cyber-terms.md"
EMPTY = ({}, [])


def approved_words(path=HERE / "approved.txt"):
    """Base forms of every approved word, lowercase."""
    return {re.sub(r"\s*\(.*", "", ln).strip().lower()
            for ln in path.read_text(encoding="utf-8").splitlines() if ln.strip()}


def load(path=TSV):
    """Return ({surface form: 'headword -> ALTERNATIVES'}, [(phrase regex, entry)]).

    An entry is dropped when the same spelling is approved as another part of
    speech. "use" is not approved as a noun but "USE (v)" is approved, and this
    tool cannot tell the two apart. Dropping the entry loses recall and removes
    a large number of false hits.
    """
    table, phrases = {}, []
    if not path.exists() or not (HERE / "approved.txt").exists():
        return table, phrases  # no local copy of the dictionary: the other counts still work
    ok = approved_words()
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        word, pos, alts = (line.split("\t") + ["", ""])[:3]
        word = word.strip().lower()
        if not word or word in ok:
            continue
        entry = f"{word} ({pos}) -> {alts}"
        if " " in word:
            phrases.append((re.compile(r"\b" + r"\s+".join(map(re.escape, word.split())) + r"\b",
                                       re.I), entry))
        else:
            for form in forms(word):
                if form not in ok:  # "approved" is the past participle of an
                    table.setdefault(form, entry)  # unapproved verb, and approved
    return table, phrases


def load_slop(path=SLOP_TSV):
    """Same shapes as load(), from the LLM-tell lexicon.

    Columns: term, count of ban lists that name it (counted by SimpleEnglish), replacement.
    Terms that the STE dictionary already rules on are not in this file.
    """
    table, phrases = {}, []
    if not path.exists():
        return table, phrases
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        word, count, alt = (line.split("\t") + ["", ""])[:3]
        word = word.strip().lower()
        entry = f"{word} ({count} lists) -> {alt}"
        if " " in word:
            phrases.append((re.compile(r"\b" + r"\s+".join(map(re.escape, word.split())) + r"\b",
                                       re.I), entry))
        else:
            for form in forms(word):
                table.setdefault(form, entry)
    return table, phrases


def load_cyber(path=CYBER_MD):
    """Same shapes as load(), from the cyber term table of this project.

    The Markdown file is the source. A table row whose last cell is "yes" is
    a lintable row: cell 1 holds the terms, separated by commas, and cell 2
    holds the replacement. A phrase also matches with a plural "s".
    Abbreviations are not checked: the audience decides if a text expands them.
    """
    table, phrases = {}, []
    if not path.exists():
        return table, phrases
    for line in path.read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 3 or cells[-1] != "yes":
            continue
        for term in cells[0].replace("`", "").lower().split(","):
            term = term.strip()
            entry = f"{term} -> {cells[1]}"
            if not term.replace("-", "").isalpha():  # a phrase, or a form such as "c&c"
                phrases.append((re.compile(r"\b" + r"\s+".join(map(re.escape, term.split())) + r"s?\b",
                                           re.I), entry))
            else:
                for form in forms(term):
                    table.setdefault(form, entry)
    return table, phrases


def forms(word):
    """Base form plus the regular inflections that a writer produces."""
    out = {word}
    if word.endswith("y") and len(word) > 2:
        out |= {word[:-1] + "ies", word[:-1] + "ied"}
    elif word.endswith(("s", "x", "z", "ch", "sh")):
        out.add(word + "es")
    else:
        out.add(word + "s")
    if word.endswith("e"):
        out |= {word + "d", word[:-1] + "ing"}
    else:
        out |= {word + "ed", word + "ing"}
    out.add(word + "ly")
    return out


# Rule 1.5 permits a technical noun that is not in the dictionary. These are the
# technical nouns of software documentation that the raw count flags most often.
# The residual count removes them. Extend the set for another subject field.
TECHNICAL_NOUNS = {
    "run", "runs", "file", "files", "port", "ports", "request", "requests",
    "stage", "stages", "process", "processes", "transfer", "log", "logs",
    "backup", "settings", "load", "progress", "design", "key", "list", "form",
    "record", "records", "table", "tables",
    # cybersecurity: the technical nouns and verbs that the dictionary flags
    "scan", "scans", "block", "blocks", "alert", "alerts", "event", "events",
}


def strip_code(text):
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"`[^`\n]+`", " ", text)
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"^#+\s.*$", " ", text, flags=re.M)
    return text


def lint(text, table=None, slop=None, cyber=None):
    table, phrases = load() if table is None else table
    slop_table, slop_phrases = load_slop() if slop is None else slop
    cyber_table, cyber_phrases = load_cyber() if cyber is None else cyber
    body = strip_code(text)
    words = re.findall(r"[A-Za-z][A-Za-z'\-]*", body)
    hits, slop_hits, cyber_hits = [], [], []
    for w in words:
        entry = table.get(w.lower())
        if entry:
            hits.append({"used": w, "entry": entry})
        elif (c := cyber_table.get(w.lower())):  # dictionary wins on overlap, then cyber
            cyber_hits.append({"used": w, "entry": c})
        elif (s := slop_table.get(w.lower())):
            slop_hits.append({"used": w, "entry": s})
    for rx, entry in phrases:
        for m in rx.finditer(body):
            hits.append({"used": m.group(0), "entry": entry})
    for rx, entry in slop_phrases:
        for m in rx.finditer(body):
            slop_hits.append({"used": m.group(0), "entry": entry})
    for rx, entry in cyber_phrases:
        for m in rx.finditer(body):
            cyber_hits.append({"used": m.group(0), "entry": entry})
    n = max(len(words), 1)
    residual = [h for h in hits if h["used"].lower() not in TECHNICAL_NOUNS]
    return {
        "words": len(words),
        "not_approved": len(hits),
        "not_approved_per_100w": round(100 * len(hits) / n, 2),
        "residual": len(residual),
        "residual_per_100w": round(100 * len(residual) / n, 2),
        "slop": len(slop_hits),
        "slop_per_100w": round(100 * len(slop_hits) / n, 2),
        "cyber": len(cyber_hits),
        "cyber_per_100w": round(100 * len(cyber_hits) / n, 2),
        "hits": hits,
        "slop_hits": slop_hits,
        "cyber_hits": cyber_hits,
    }


def self_test():
    table = ({f: "x" for f in forms("utilize")},
             [(re.compile(r"\bprior\s+to\b", re.I), "prior to -> BEFORE (prep)")])
    empty = EMPTY
    r = lint("Utilize the tool prior to launch. `utilize` stays.", table, empty)
    assert r["not_approved"] == 2, r
    assert r["words"] == 7, r  # the code span is removed before the count
    r2 = lint("Use the tool before launch.", table, empty)
    assert r2["not_approved"] == 0, r2
    # slop lexicon: separate count, dictionary wins on overlap
    slop = load_slop()
    r3 = lint("We delve into the robust landscape in order to deliver.", table, slop)
    assert r3["slop"] == 4, r3  # delve, robust, landscape, "in order to"
    assert r3["not_approved"] == 0, r3
    both = ({f: "x" for f in forms("delve")}, [])
    r4 = lint("Delve deeper.", both, slop)
    assert r4["not_approved"] == 1 and r4["slop"] == 0, r4
    # cyber table: read from the shipped Markdown file, separate count
    cyber = load_cyber()
    r5 = lint("Remediate the host. The bad actors pivoted. This military-grade tool stays.", empty, empty, cyber)
    assert r5["cyber"] == 3 and r5["not_approved"] == 0 and r5["slop"] == 0, r5
    r6 = lint("The log contains the exploit. Threat hunting found the compromised host. "
              "Escalate the alert. Remediation is complete. `remediate` stays.", empty, empty, cyber)
    assert r6["cyber"] == 0, r6  # guidance-only terms, nouns, and code spans are not flagged
    # standard abbreviations pass with no expansion; the wrong form is flagged
    r7 = lint("Open the SIEM. The IOCs are in the ticket. The C&C server is down.", empty, empty, cyber)
    assert [h["used"] for h in r7["cyber_hits"]] == ["C&C"], r7
    r8 = lint("The malware phoned home. The team spun up a host and put it in the sandbox.", empty, empty, cyber)
    assert r8["cyber"] == 2, r8  # idioms, with their listed verb forms
    assert lint("Mitigate the risk.", load(HERE / "no-such-file.tsv"), empty, cyber)["cyber"] == 1
    print("self-test ok")


if __name__ == "__main__":
    if "--self-test" in sys.argv:
        self_test()
    else:
        src = sys.argv[1] if len(sys.argv) > 1 else "-"
        text = sys.stdin.read() if src == "-" else pathlib.Path(src).read_text()
        print(json.dumps(lint(text), indent=2))
