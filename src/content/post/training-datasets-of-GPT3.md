---
title: Understanding the Text Corpus and Training Datasets of GPT-3
publishDate: "4 April 2024"
description: "Exploring GPT-3's diverse training datasets for language model pretraining development."
tags: ["ML-AI", "transformer"]
---

## Understanding the Text Corpus and Training Datasets of GPT-3

The development of large language models (LLMs) like GPT-3 relies on extensive and diverse text corpora for training, encompassing a myriad of topics and natural and computer languages. This will delve into the text corpus used to train GPT-3, its composition, and the implications of using such a vast dataset for language model pretraining.

### GPT-3's Pretraining Dataset

The GPT-3 model was pretrained using a diverse dataset, consisting of several subsets, as outlined in table below. The total dataset comprises **410 billion** tokens from _CommonCrawl_ (filtered), **19 billion** tokens from _WebText2,_ **12 billion** tokens from _Books1_, **55 billion** tokens from _Books2_, and **3 billion** tokens from Wikipedia.

| Dataset name               | Dataset description        | Number of tokens | Proportion in training data |
| -------------------------- | -------------------------- | ---------------- | --------------------------- |
| **CommonCrawl (filtered)** | Web crawl data             | 410 billion      | 60%                         |
| **WebText2**               | Web crawl data             | 19 billion       | 22%                         |
| **Books1**                 | Internet-based book corpus | 12 billion       | 8%                          |
| **Books2**                 | Internet-based book corpus | 55 billion       | 8%                          |
| **Wikipedia**              | High-quality text          | 3 billion        | 3%                          |

Each dataset contributes a specific fraction of the total tokens used in the training process. However, it is essential to note that only a subset of 300 billion tokens was used for training, drawn from all datasets combined. This sampling approach means that not every single piece of data available in each dataset was included in the training subset. Some datasets might have been included multiple times, while others were not entirely covered, to reach the total count of 300 billion tokens.

### The Role of Dataset Size and Diversity

The sheer size and diversity of the GPT-3 training dataset enable the model to perform well on various tasks, including language syntax, semantics, context, and even some requiring general knowledge. The extensive range of topics and languages in the dataset allows the model to generate more accurate and contextually relevant responses.

### GPT-3 Dataset Details

The GPT-3 dataset consists of several subsets, with CommonCrawl being the largest, containing 410 billion tokens. Other notable datasets include WebText2, Books1, Books2, and Wikipedia.
While the authors of the GPT-3 paper did not share the exact sources for Books1 and Books2, it is speculated that Books1 originates from **Project Gutenberg**, and Books2 comes from **Libgen**. CommonCrawl is a filtered subset of the CommonCrawl database, and WebText2 consists of the text of web pages from all outbound Reddit links with 3 or more upvotes.

### Publicly Available Comparable Dataset

Although the GPT-3 training dataset is not publicly available, a comparable dataset, The Pile, can be used for similar purposes. However, it is crucial to be aware that The Pile may contain copyrighted works, and the exact usage terms may depend on the intended use case and country.

### Pretrained Language Models

The pretrained nature of these models, like GPT-3, makes them incredibly versatile for further finetuning on downstream tasks. Pretraining LLMs requires significant resources and is expensive. However, many pretrained LLMs are available as open-source models, which can be used as general-purpose tools for writing, extracting, and editing texts that were not part of the training data.

### Conclusion

In conclusion, I hope this give a basic understanding on the vast and diverse text corpora used in the development of LLMs like GPT-3. Thanks
