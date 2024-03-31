---
title: "trBPE: A Byte Pair Encoder tailored for Turkish"
github: "https://github.com/amar-jay/trBPE"
tags: ["DL", "Tokenization"]
---

The current landscape of Large Language Models (LLMs) predominantly caters to the English language. This bias can be attributed to extensive training on English datasets and the efficacy of tokenization. Notably, OpenAI tokenizer for GPT-4's excels in contextualizing tokens based on syllabic divisions, enhancing comprehension and generation capabilities.

However, for foreign languages like Turkish, this advantage diminishes due to tokenization randomness. To address this, a repository was created to develop a BPE tokenizer tailored to Turkish, using rich Turkish language datasets.

<div align="center">
  <p class="text-md">This was used by KomRade in the competition...</p>
</div>

In an attempt to replicate methods outlined in [this paper](https://www.cmpe.boun.edu.tr/~gungort/theses/A%20Comprehensive%20Analysis%20of%20Subword%20Tokenizers%20for%20Morphologically%20Rich%20Languages.pdf), with exceptions:

- Non-agglutinative pieces are preceded by a space, and agglutinative pieces aren't `#` prefixed.
- Tokenization is case-insensitive.
