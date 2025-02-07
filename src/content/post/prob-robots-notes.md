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

Robotics? Robotics is increasingly becoming a software science, a distinct field due ti its increasing complexity. Its the understanding and making sense out of uncertainty. And this will deepen your knowledge of probability.

### Notes

#### Introduction

- **Prior** - a distribution that represents the accumulated past . A uniform distribution prior = maximum uncertainty
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
- [x] Bayes filter
- [x] Understand example given
- [x] Read the Bayes filter formula proof

##### theorem of total probabilities

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
- Conditional independence $p(x | z) = p(x|z,y)$, does not neccessarily mean absolute independence $p(x,y\ |\ z) = p(x\ |\ z)\ p(y\ |\ z) \neq p(x)\ p(y)$. In special cases, however, conditional and absolute independence may coincide.

---

- The robot pose is often referred to as kinematic state.
- **Control**(motion) and **Perception**(measurement) are two complementary modular concepts used in robotics. Control performs actions on an evironment, and thereby distorting it due to inaccuracy of its actuator. Perception is the sensing and understanding of the environment. Its errors are primarily due to inaccurate sensor reading. Both are treated seperately to serve as a **conceptual tool** rather than distinction in space and time For example, Pathfinding is control and SLAM is Perception
- The probability $p(x_t | x_{t−1},u_t)$ is the state transition probability. The probability $p(z_t | x_t)$ is called the measurement probability.

- It can be noticed that from tee formula of the belief, measurement of state t are needed for calculation of belief(aka **_correction_**) $\mathrm{bef}(x)$, however in reality, the **_measurement update_** $\overline{\mathrm{bef}}(x)$ is calculated using prior state measurement.
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

- Since the Bayes filter is not a practical algorithm, in that it cannot be implemented on a digital computer, probabilistic algorithms use tractable approximations. Such approximations may be evaluated according to different criteria, relating to their accuracy, efficiency, and ease of implementation.

### Example

Our illustration of the Bayes filter algorithm is based on a scenario, where a robot estimating the state of a door using its camera. To make this problem simple, let us assume that the door can be in one of two possible states, **open or closed**, and that only the robot can change the state of the door. Let us furthermore assume that the robot does not know the state of the door initially. Instead, it assigns equal prior probability to the two possible door states

#### Solution

- the initial belief a door is closed open open is uniform
  $bel(X_0=\text{open}) = 0.5$
  $bel(X_0=\text{closes}) = 0.5$

- confusion matrix of sensor data conditioned on the ground truth. ie $p(Z_t=\text{Predicted} | X_t = \text{Actual})$

$$
\begin{array}{c|cc}
    & \text{Predicted Positive} & \text{Predicted Negative} \\
    \hline
    \text{Actual Positive} & 0.4 & 0.6 \\
    \text{Actual Negative} & 0.2 & 0.8
\end{array}
$$

Also the state transition probability table

| Previous State $(X_{t-1})$ | Action $(U_t)$ | New State $(X_t)$ | Probability |
| -------------------------- | -------------- | ----------------- | ----------- |
| isOpen                     | _push_         | isOpen            | 1.0         |
| isOpen                     | _push_         | isClosed          | 0.0         |
| isClosed                   | _push_         | isOpen            | 0.8         |
| isClosed                   | _push_         | isClosed          | 0.2         |
| isOpen                     | _do nothing_   | isOpen            | 1.0         |
| isOpen                     | _do nothing_   | isClosed          | 0.0         |
| isClosed                   | _do nothing_   | isOpen            | 0.0         |
| isClosed                   | _do nothing_   | isClosed          | 1.0         |

$\text{Based on the Bayes rule,}$

$$
p(x|z)
= \frac {p(z|x)p(x)} {p(z)}
= \frac {p(z|x, v)p(x|v)} {p(z|v)}
$$

$\text{so taking }\ z = p(z_t)$ $\text{and }\ v = p(z_{1:t-1}, u_{1:t})$

$$
\begin{center}
\\
p(x_t | z_{1:t},u_{1:t})= p(x_t | z_t, z_{1:t-1},u_{1:t}) = \frac{p(z_t | x_t,z_{1:t−1},u_{1:t})\ p(x_t | z_{1:t−1},u_{1:t})}{p(z_t | z_{1:t−1},u_{1:t})} \\
\text{where the normalizing factor, }\ \eta = p(z_t | z_{1:t−1},u_{1:t}) \\
\\
\Rightarrow p(x_t | z_{1:t},u_{1:t}) = \eta\ p(z_t | x_t,z_{1:t−1},u_{1:t})\ p(x_t | z_{1:t−1},u_{1:t}) \\
\\
\end{center}
$$

$\text{Due to conditional independence, }\ p(z_t | x_t)\ =\ p(z_t | x_t,z_{1:t−1},u_{1:t})$

$$
\Rightarrow p(x_t | z_{1:t},u_{1:t}) = \eta\ p(z_t | x_t)\ p(x_t | z_{1:t−1},u_{1:t}) \\
$$

$\text{Also, }\ p(x_t | z_{1:t−1},u_{1:t}) \text{ is known as *the predictive distribution*. Also represented as}$ $\overline{\mathrm{bef}}(x_t)$.

$$
\Rightarrow p(x_t | z_{1:t},u_{1:t}) = \eta\ p(z_t | x_t)\ \overline{\mathrm{bef}}(x_t)
$$

$\text{Let's expand the term, }\ \overline{\mathrm{bef}}(x_t)  = p(x_t| z_{1:t-1}, u_{1:t})$

$$
= \int{p(x_t| x_{t-1}, u_t)\ p(x_{t-1} | z_{1:t-1}, u_{1:t-1})}\ dx
$$

$$
\begin{center}
\overline{\mathrm{bef}}(X_1) = \int{p(X_1 | X_0, u_0)\ \mathrm{bef}(X_0)} dx \\
bel(X_1) = η\ p(Z_1 | X_1)\ \overline{\mathrm{bef}}(X_1)
\end{center}
$$

So say the next action is a **push**,

$$
\begin{center}
\overline{\mathrm{bef}}(X_1) = p(X_1 | X_0\text{=open}, u_1\text{=push})\ \mathrm{bef}(X_0\text{=open}) \\ + p(X_1 | X_0\text{=closed}, u_1\text{=push})\ \mathrm{bef}(X_0\text{=closed}) \\ \\

\overline{\mathrm{bef}}(X_1\text{=open}) = 1.0*0.5 + 0.8*0.5 = 0.9 \\
\overline{\mathrm{bef}}(X_1\text{=closed}) = 0.0*0.5 + 0.2*0.5 = 0.1 \\ \\

bel(X_1) = \eta \ p(Z_1 | X_1)\ \overline{\mathrm{bef}}(X_1) \\
\mathrm{bef}(X_1\text{=closed}) = \eta*0.8*0.1=0.08\eta \\
\mathrm{bef}(X_1\text{ = open})= \eta*0.4*0.9=0.36\eta \\ \\
\eta = \frac {1} {0.08 + 0.36} = 2.272 \\ \\
\mathrm{bef}(X_1\text{ = open})= 0.181 \\
\mathrm{bef}(X_1\text{=closed})= 0.817 \\
\end{center}
$$

So, the robot believes with $82\%$ accuracy that the door is closed. At first glance, this probability may appear to be sufficiently high to simply accept this hypothesis as the world state and act accordingly. However, such an approach may result in unnecessarily high costs. If mistaking a closed door for an open one incurs costs (e.g., the robot crashes into a door), considering both hypotheses in the decision making process will be essential, as unlikely as one of them may be.

#### Summary

| **Term**                                       | **Mathematical Expression**    | **Description**                                                                                                                                          |
| ---------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Posterior (Belief)**                         | $p(x_t\|z_{1:t}, u_{1:t})$     | The **updated belief** after incorporating observations up to time $t$. It reflects the most current state.                                              |
| **Predictive Distribution (Predicted Belief)** | $p(x_t \| z_{1:t-1}, u_{1:t})$ | The **prior prediction** of the state at time $t$, before incorporating the new observation at time $t$.                                                 |
| **Measurement Likelihood**                     | $p(z_t \| x_t)$                | The **probability of observing** $z_t$ given the state $x_t$. It describes how likely the measurement is given the state.                                |
| **State Transition Model**                     | $p(x_t \| x_{t-1}, u_t)$       | The **dynamics model**, describing how the state $x_t$ evolves from the previous state $x_{t-1}$ given control input $u_t$.                              |
| **Normalizing Constant (Marginal Likelihood)** | $p(z_t \| z_{1:t-1}, u_{1:t})$ | The **normalization factor** that ensures the posterior is a valid probability distribution. Often calculated as $1/(\text{sum of belief coefficients})$ |
| **Prior Distribution**                         | $p(x_t \| z_{1:t-1})$          | The **distribution of the state** at time $t$ before considering control input or measurements, typically used in Bayesian models.                       |

### Gaussian Filters

- [x] What is canonical representation(natural representation) and moments representation?
- The representation of a Gaussian by its mean and covariance is called the moments representation. the mean and covariance are the first and second moments of probability distribution
- The Kalman filter was invented in the 1950s by Rudolph Emil Kalman,
- Kalman filters is not applicable to discrete or hybrid state spaces but for continuous state spaces.
- In Kalman filters the state transition model is considered to be a multivariate guassian with the mean being $\mu_t=A_t\mu_{t-1} + B_tu_{t} + \epsilon_0$ and covariance of $R_t$.
- The measurement probability must be linear in its arguments $z_t = C_tx_t + \sigma_t$ , where $\sigma_t$ is the measurement noise with mean 0 and covariance $Q_t$ ie $p(z_t|x_t)$ has a mean of $C_tx_t$.
- The initial belief must be normal distributed. by $\mu_0$ and covariance $\Sigma_0$.

#### Kalman Filter Algorithm

Given the following inputs:

- $A_t$: State transition matrix
- $B_t$: Control matrix
- $C_t$: Measurement matrix
- $R_t$: Process noise covariance
- $Q_t$: Measurement noise covariance
- $\mu_{t-1}$: Previous state estimate
- $\Sigma_{t-1}$: Previous state covariance estimate
- $u_t$: Control input
- $z_t$: Measurement

##### Step 1: Prediction

The predicted state estimate is:

$$
\mu_t^{\text{pred}} = A_t \mu_{t-1} + B_t u_t
$$

The predicted covariance estimate is:

$$
\Sigma_t^{\text{pred}} = A_t \Sigma_{t-1} A_t^T + R_t
$$

##### Step 2: Update (Correction)

The Kalman Gain is:

$$
K_t = \Sigma_t^{\text{pred}} C_t^T \left( C_t \Sigma_t^{\text{pred}} C_t^T + Q_t \right)^{-1}
$$

The updated state estimate is:

$$
\mu_t = \mu_t^{\text{pred}} + K_t \left( z_t - C_t \mu_t^{\text{pred}} \right)
$$

The updated covariance estimate is:

$$
\Sigma_t = \left( I - K_t C_t \right) \Sigma_t^{\text{pred}}
$$

##### Return

- $\mu_t$, $\Sigma_t$

---

```python
def kalman_filter(A, B, C, R, Q, mu_prev, Sigma_prev, u, z):
    """
    A: State transition matrix
    B: Control matrix
    C: Measurement matrix
    R: Process noise covariance
    Q: Measurement noise covariance
    mu_prev: Previous state estimate (mu_{t-1})
    Sigma_prev: Previous state covariance estimate (Sigma_{t-1})
    u: Control input (u_t)
    z: Measurement (z_t)

    Returns: Updated state estimate and covariance (mu_t, Sigma_t)
    """

    # **Prediction Step**

    # Predicted state estimate (mu_t^pred)
    mu_pred = np.dot(A, mu_prev) + np.dot(B, u)

    # Predicted covariance estimate (Sigma_t^pred)
    Sigma_pred = np.dot(np.dot(A, Sigma_prev), A.T) + R

    # **Update Step**

    # Compute Kalman Gain (K_t)
    K = np.dot(np.dot(Sigma_pred, C.T), np.linalg.inv(np.dot(np.dot(C, Sigma_pred), C.T) + Q))

    # Update state estimate (mu_t)
    mu_t = mu_pred + np.dot(K, (z - np.dot(C, mu_pred)))

    # Update covariance estimate (Sigma_t)
    Sigma_t = np.dot(np.eye(len(Sigma_pred)) - np.dot(K, C), Sigma_pred)

    return mu_t, Sigma_t
```

---

- Complexity = approximately O(d2.8)

### NEXT STEP

- [ ] Proof of KF
