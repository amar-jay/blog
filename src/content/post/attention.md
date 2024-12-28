---
title: "Understanding Squared attention"
description: "Just a brief explanation of how attention mechanism works. As well as the quadratic scaling of attention."
publishDate: "31 July 2024"
updatedDate: "31 July 2024"
tags: ["transformer", "neural networks", "ml-ai"]
---

## Introduction

Self-attention was first introduced in the Transformer architecture by [Vaswani et al.'s paper - Attention is all you need](https://arxiv.org/abs/1706.03762). This mechanism plays a crucial role in the architecture of modern models like GPT. Self-attention allows the model to weigh the importance of different words in a sentence when encoding a sequence, leading to more accurate context understanding and improved performance in natural language processing tasks.

In contrast to RNN architectures, where information is passed sequentially and stored in a hidden state, self-attention processes all tokens in parallel. This parallel processing not only speeds up computation but also enables the model to capture long-range dependencies more effectively. By considering all positions of the input sequence simultaneously, self-attention aggregates all states across time into a single, comprehensive representation.

Despite its advantages, self-attention scales quadratically $O(n^2)$ compared to the linear scaling of previous RNN approaches. This means that doubling the context size results in at least a fourfold increase in the number of parameters. This blog aims to explain in simple terms why this quadratic scaling occurs. Specifically in GPT.

Based on [karpathy/nanoGPT - (scaling_laws.ipynb)](#) github repository which replicated some scaling laws results from the [Chinchilla paper](#), it says that thee GPT model parameters can be calcuated by the code however. However, that isn't really necessary because the same can be done by simply runking `.nparameters()` on a pytorch model and will do equally the same. However let's try explaining how the number of parameters are calculated.

```python

def gpt_params(seq_len, vocab_size, d_model, num_heads, num_layers):
    """ Given a GPT model, calculate total number of parameters """

    ffw_size = 4*d_model # Represent the intermediate layer size in MLP. in GPT the number of intermediate features is always 4*d_model.
    # token and position embeddings
    embeddings = d_model * vocab_size + d_model * seq_len
    # transformer blocks
    attention = 3*d_model**2 + 3*d_model # weights and biases
    attproj = d_model**2 + d_model
    ffw = d_model*(ffw_size) + ffw_size
    ffwproj = ffw_size*d_model + d_model
    layernorms = 2*2*d_model
    # dense
    ln_f = 2*d_model
    dense = d_model*vocab_size # note: no bias here
    # note: embeddings are not included in the param count!
    total_params = num_layers*(attention + attproj + ffw + ffwproj + layernorms) + ln_f + dense
    return total_params

```

## Embeddings

The embeddings of a transformer is made up of _two_ parts. The token embedding and the positional embedding. First of how are embedding tables calculated.

$$
 = X \times W
$$

### Token embedding

Given the shape of [the one-hot encoded](https://en.wikipedia.org/wiki/One-hot) text, $X is `Size(batch_size, sequnece_len, vocab_size)`, then the shape of the Weight is `Size(batch_size, embedding_dim, vocab_size)`, making the embedding of shape `Size(batch_size, embedding_dim, vocab_size)`. Basically, an embedding table increases the size the second dimension.

### Positional embedding

A similar thing occurs with the positional embedding, However the methods of assigning positions to text differ from structure. One of the most popular is Rotational Positional Embedding. However, let's implement a simple one by simply numbering the tokens within a sequence. The numbering order within a fixed context length becomes the input to the embedding table. This method is popularly used in the [GPT](https://arxiv.org/abs/2005.14165). So similarly, the shape of the input (numbered sequence within the sequence length), $X
