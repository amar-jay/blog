---
title: "Notes from Probabilistic Robotics"
description: "Probabilistic Robotics by Sebastian Thrun aimed to teach me how to model uncertainty in robot perception and control using probabilistic techniques."
publishDate: "28 Jan 2025"
updatedDate: "28 Jan 2025"
tags: ["filters", slam", "robotics"]
---

## Notes from Probabilistic Robotics

by Sebastian **THRUN**

[Probabilistic Robotics by Sebastian Thrun](https://docs.ufpr.br/~danielsantos/ProbabilisticRobotics.pdf) aimed to teach me how to model uncertainty in robot perception and control using probabilistic techniques. It introduced me to Bayesian filters, Kalman filters, particle filters, and Markov decision processes. The book focused on decision-making, localization, mapping, and sensor fusion, all of which were crucial for navigating dynamic environments. I'm still not done reading it

### Will Learn

- [x] State Estimation
- [x] Gaussian filter (Bayes Filter)
- [ ] Non parametricc filter
- [ ] Robot Localization
- [ ] MonteCarlo Localixzation
- [ ] SLAM
- [ ] Extended Information form Algorithm
- [ ] Markov Decision Process

### Why Learn This?

Robotics? Robotics is increasingly becoming a software science, a distict field due ti its increasing complexity. Its the understanding and making sense out of uncertainty. And this will deepen your knowledge of probability.

### Notes

#### Introduction

- **Prior** - a distribution that prepresents the accumulated past . A uniform distribution prior = maximum uncertainty
- **Belief** from Bayes theorem is a probability distribution of the likelihood of each state against the possible existing state.
  $$
  bel(x_k) = p(x_k | x_{k-1}, z_{k-1}, u_k, \delta)
  $$
  where $bel(x)$ is the belief at state $k$,
  $z$ is the prior at state $k-1$
  $u$ is the internal state (measurement)
  $\delta$ represents noise from control action
- **Posterior** is the update prior upon incorperating observation.
  $$
  Posterior = Prior + Observation
  $$

#### Recursive State Estimation

- [x] notations
- [x] formal description of model
- [x] bayes filter
- [x] Understand example given
- [x] Read the bayes filter formula proof

##### theorem of total probabilities.

> Note: **Posterior probability distribution** over X is $p(x|y)$ given $p(x)$ is the **prior probability distribution** (if is the pdf of X)

- In robotics, this inverse probability is often coined “generative model,” since it describes, at some level of abstraction, how state variables X cause sensor measurements Y.

  $$
  p(x | y) = η\ p(y |x)\ p(x)
  $$

  $where\ η=p(y)^{-1}$, usually called the **Normalizer**

- The expectation is a linear function of a random variable. In particular, we have

  $$
  E[aX + b] = aE[X] + b
  $$

  so,

  $$
  Cov[X] = E[X - E[X]^2] = E[X^2] - E[X]^2
  $$

- Another important characteristic of a random variable is its _entropy_. entropy will be used in robotic information gathering.
  $$
  H(P) = E[−\log_2p(x)] = −\sum_x p(x)\ \log_2p(x)
  $$
- Conditional independece $p(x | z) = p(x|z,y)$, does not neccessarily mean absolute independence $p(x,y\ |\ z) = p(x\ |\ z)\ p(y\ |\ z) \neq p(x)\ p(y)$. In special cases, however, conditional and absolute independence may coincide.

---

- The robot pose is often referred to as kinematic state.
- **Control**(motion) and **Perception**(measurement) are two complementary modular concepts used in robotics. Control performs actions on an evironment, and thereby distorting it due to inaccuracy of its actuator. Perception is the sensing and understanding of the environment. Its errors are primarily due to inaccurate sensor reading. Both are treated seperately to serve as a **conceptual tool** rather than distinction in space and time For example, Pathfinding is control and SLAM is Perception
- The probability $p(x_t | x_{t−1},u_t)$ is the state transition probability. The probability $p(z_t | x_t)$ is called the measurement probability.

- It can be noticed that from tee formula of the belief, measurement of state t are needed for calcuation of belief(aka **_correction_**) $\mathrm{bef}(x)$, however in reality, the **_measurement update_** $\overline{\mathrm{bef}}(x)$ is calcuated using prior state measument.
  $$
  \overline{\mathrm{bef}}(x) = p(x_t | x_{t-1}, z_{t-1}, u_t)
  $$

---

pseudo code

```python
def bayes_filter(belief_x1, u_t, z_t):
	for x_t in states:
		posterior = p(x2 | u2, x1)
		measurement_update = integal(posterior * belief_x1)
		 # corrected belief using generative model
		correction = normalizer * measurement_prob * measurement_update
	return correction
```

pseudo code 2

```python
def bayes_filter(bel_x_prev, u_t, z_t):
    """
    Parameters:
    - bel_x_prev: Belief at time t-1 (prior)
    - u_t: Action at time t
    - z_t: Observation at time t
    Returns:
    - bel_x_t: Updated belief at time t
    """
    bel_x_t = {}

    # Prediction Step (Motion Update)
    for x_t in states:
        # Compute prediction for x_t by marginalizing over x_{t-1}
        predicted_belief = sum(
            motion_model(x_t, u_t, x_prev) * bel_x_prev[x_prev]
            for x_prev in states
        )

        # Measurement Update (Correction)
        measurement_prob = measurement_model(z_t, x_t)
        bel_x_t[x_t] = measurement_prob * predicted_belief

    # Normalization
    normalizer = sum(bel_x_t.values())
    for x_t in bel_x_t:
        bel_x_t[x_t] /= normalizer

    return bel_x_t

```

---

#### NOTE

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 16px; background-color: #f9f9f909; margin: 16px 0;"> &#8505; <strong>The Markov Assumption</strong>: postulates that past and future data are independent if one knows the current state x_t </div>
- The Bayes filter makes a Markov assumption that specifies that the state is a complete summary of the past. This assumption implies the belief is sufficient to represent the past history of the robot. In robotics, the Markov assumption is usually only an approximation. There are conditions under which it is violated.

- Since the Bayes filter is not a practical algorithm, in that it cannot be imple mented on a digital computer, probabilistic algorithms use tractable approxima tions. Such approximations may be evaluated according to different criteria, re lating to their accuracy, efficiency, and ease of implementation.
