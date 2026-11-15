# ASD-STE100 word lists, made on your machine

This directory holds an extractor and a word-choice linter. It holds no
ASD dictionary content. ASD-STE100 Issue 9 states on page 2 that no reproduction
of the standard, in whole or in part, is permitted without written authority
from ASD. So the repository ships the tool, and you make the word lists from
your own copy of the free PDF.

## Make the word lists

1. Request the free PDF at <https://www.asd-ste100.org/request.html>.
2. Convert it to text: `pdftotext -layout ASD-STE100_ISSUE9.pdf ste9.txt`.
3. Parse the dictionary: `python3 parse_dict.py ste9.txt`. This writes `dict.json`.
4. Emit the lists: `python3 emit.py .`. This writes `approved.txt` (841 rows) and `not-approved.tsv` (1,297 rows).

The output is deterministic. All four generated files are in `.gitignore`. Do not commit
them.

## Lint word choice

`evals/ste_lint.py` measures the mechanical rules. It does not see word choice.
This linter reads `not-approved.tsv` and reports each word that the standard
does not approve, with the approved alternatives. It also counts the LLM-tell
words from `evals/slop.tsv` as a separate number.

```
python3 ste_dict_lint.py file.md
python3 ste_dict_lint.py --self-test
```

The linter also reports a `cyber` count. It reads the terms to replace from
`skills/cyber-simple-english/references/cyber-terms.md`, the cybersecurity term table
of this project. A table row with `yes` in the last column is a lintable row. The linter does not
check if the text expands an abbreviation, because that depends on the reader. The
Markdown file is the source of the list. The `cyber` and `slop` counts work
without the dictionary files. Without them, the dictionary count is zero.

Known limit: the match is on the base form and simple inflections, with no
part-of-speech disambiguation. Numbers from this tool compare two texts run
through the same version. They are not a compliance verdict.
