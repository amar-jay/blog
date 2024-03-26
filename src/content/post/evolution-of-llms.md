---
title: "Evolution of large language models"
description: "A brief history of large language models, from bigrams to transformers"
tags: ["transformer", "emperical_analysis"]
publishDate: 18 March 2024
updatedDate: 27 March 2024
---

## Abstract

This empirical research investigates the evolution of language models from the inception of recognized techniques to the contemporary era dominated by transformers, including GPTs, Claude, and Gemini. Leveraging a dataset comprising 32,000 names scraped from ssa.gov, recorded up until 2018, our study conducts a comprehensive comparison of language models' performance metrics, loss, and sampled output names at a constant epoch.

Commencing with the historical perspective, we implement the foundational bigram model, conceptualized as a grid of all possible two-character combinations. Backpropagation, as proposed by Rumelhart et al. (1986), is subsequently applied to enhance the bigram model. Addressing the exponential cost encountered by Rumelhart's approach, we introduce the Multilayer Perceptron, accompanied by sequential learning late decay. Techniques proposed by Leslie et al. guide the determination of an optimal learning rate for our sampled dataset. The exploration continues with the implementation of Stochastic Gradient Descent, Kaiming initialization, Batch Normalization, and the progressive integration of advanced architectures such as Convolutional Neural Networks, Recurrent Neural Networks, LSTM, GRU, culminating in the transformative age of Transformers with Vaswani et al. (2017).

Throughout each step, meticulous recording of metrics enables a comparative analysis of the incremental improvements introduced by each method. Noteworthy is our commitment to consistency; all models are seeded at a constant time, ensuring uniformity in generated results. Furthermore, we maintain as many parameters (e.g., epoch, learning rate) as constant as possible, facilitating a nuanced and reliable assessment of model performance.

In essence, this research offers a temporal analysis, unraveling the nuanced progression of language models over time, shedding light on the advancements that have shaped the contemporary landscape of natural language processing.

## **Bigram Language Model** [Code](https://github.com/amar-jay/karparthy/blob/main/makemore/bigram.ipynb)

The bigram language model, as implemented in the provided notebook, employs a statistical approach dating back to the early 19th century. It predicts the succeeding character in a sequence based on the preceding character, operating in a two-dimensional space and generating a tensor of character probabilities following one another.

**Basic Implementation**
Initially, the model involves creating a tensor that records the likelihood of pairs of characters occurring. This probability tensor is utilized to determine a sequence of characters, and the overall probability of the entire sequence occurring. The widely adopted metric for evaluating the performance of a bigram model is the Negative Mean Log Likelihood ($NMLL$). A lower $NMLL$ corresponds to lower loss, signifying a higher likelihood of the sequence occurring. However, a limitation arises as the model becomes less manageable with an increasing range of possibilities (pairs of characters), resulting in a frame that grows exponentially, making it challenging to monitor.
$$ Model\ size = v^c - 1$$
$v$ = vocabulary size
c = context length

**Efficient Enhancement: Tensors and Gradient Descent**
To address the scalability issues, a more efficient system was devised. This involves expressing the model in the form of an equation: $y=x \times M + c$, where $M$ represents the weights, and $c$ denotes the bias. The process begins with the multiplication of random weights $(M)$ by a one-hot encoding of all characters in the training set $(x)$. Each character is represented by a vector where only its corresponding index is set to 1, and the rest are 0. Subsequently, $softmax$ is applied to the results. The $softmax$ function normalizes the output, converting it into a probability distribution.

$$
\text{softmax}(x)_i = \frac{e^{x_i}}{\sum_{j=1}^{n} e^{x_j}}
$$

**Gradient Descent**
Following the multiplication and activation, gradient descent is employed with a reasonable learning rate to iteratively adjust the weights. This iterative optimization process minimizes the loss, enhancing the model's ability to predict sequences accurately. Gradient descent computes the gradients of the loss with respect to the weights, indicating the direction in which the weights should be adjusted to reduce the loss.

## Multi-Layer Perceptron [Paper](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf) | [Code](https://github.com/amar-jay/karparthy/blob/main/makemore/mlp.ipynb)

![mlp layer](https://www.researchgate.net/publication/353791233/figure/fig1/AS:1055105411477505@1628568141028/Classic-feed-forward-neural-network-language-model-Bengio-et-al-2003.ppm)

### Addressing Dimensionality Challenges

One inherent challenge of n-gram models lies in determining the appropriate dimension. The curse of dimensionality complicates this aspect, as a word sequence for model testing is likely to differ significantly from all word sequences encountered during training. Traditional yet successful approaches, rooted in n-grams (multi-dimensional bigrams), achieve generalization by concatenating very short overlapping sequences observed in the training set.

However in 2003, Yoshua Bengio et al. addressed the dimensionality problem in the paper "A Neural Probabilistic Language Model," where they proposed a more efficient and scalable approach to this issue. This approach not only overcomes the challenge of a large number of inputs but also navigates the intricacies of dimensionality, providing a robust foundation for language modeling tasks. The key innovation in their work was the introduction of a **Multi-Layer Perceptron (MLP)**.\[[2](#references)\]. The MLP methodology proved to be way more efficient than any others ever proposed. This doesn't condemn the fact that no others where propsed before that. However this was the one that made the most significant impact.

### Approach

The approach of MLP is a tree-like architecture with multiple layers\[[1](#mlp-references)\]. It begins with an embedding layer, similar to that of the n-gram, however viewed as shared parameters in a tensor ($C$) within a constant context window. and then it is propagated into a $tanh$ layer to produce the logits(log-counts). Afterwards, it is $softmax$'ed to produce the the output tensor. The output tensor, is approximately similar to the Probability distribution. This approach proved to be way more effective and can potentially be scaled to 100's of layers as the size grew.

### Efficient Enhancement

One drawback immediately seen, as the paper was released was the small $tanh$ layer the $tanh$ layer of size (10, 30, 50) was made to handle a 10,000+ dataset. By scaling up the size of the $tanh$, the loss was immensely reduced. This is due to the vast amount of input placed within a small frame. This made it a bit hard to learn since the data had a small leg room to learn.

Also, one way to improve the MLP, is by increasing the number of inner layers as the data grew. Currently just one linear layer(first layer) and one $tanh$ layer(second layer) was implemented. However as data grows, addition of more layers to capture more features can improve the cross entropy loss significantly and in effect improve the efficiently. An addition of more layers may vary based on the number of features needed to be recorded.

### Challenges

- Learning rate
  In Rumelhart et al., the learning rate approaches a maximim minima when training. The maximum minima is approximately eqiuvalent to the grid's cross entropy loss. However in MLP, learning might either underfit or overfit. To find the optimum learning rate for training, can very a very daunting task. However, a plot of epoch to a log of the sequential learning rate, is a curve which may aid in finding the optimum learning rate.

  Learning rate decay is a method of finding the optimum learning rate. A low learning rate my take years to converge on the minima, and a high learning rate is likely to overfit the training set. However, in this approach, a large learning rate is taken as it approaches the minima, then a learning rate decay is the which is a much smaller learning rate is take as it converges to the minima. This gives a more precise way of finding the learning learning rate. However, this method is graphically and specific for every dataset. However, there are efficient optimizers that have been produced over the years which produce insanely accurate results irrespective of the dataset. Eg. Cyclical learning rate, optimizers,...

- fan in of $tanh$ layer
  This is not only specific to $tanh$, but to all ..., $tanh$ layer outputs are between the range of 1 to -1, when input values are way large extremes beyond the mean, it makes it hard to quantify those value since they all converge to 1 or -1. The input of the $tanh$ must be near to a gaussian distribution with a standard deviation of 1, to be able to accommodate the input tensor. One is to simply to scale it down. Scaling it too down, converges all the output to 0, scaling it too high converges all value to 1 or -1. To find the optimum scale, the kaiming method does so by scales the input tensor by a factor of a defined scale based on the tensor size. This scales the value with the most probable scale value and thereby produces the optimum scaled output.
- Another method is by batch normalization
  Batch normalization is simply the method of gaussianizing the input to the $tanh$ layer(works for all constrained output layer). Since the $tanh$ layer input ought ot be a normal distr
