---
title: "Notes from Probabilistic Robotics"
description: "Probabilistic Robotics by Sebastian Thrun aimed to teach me how to model uncertainty in robot perception and control using probabilistic techniques."
publishDate: "28 Jan 2025"
updatedDate: "07 Feb 2025"
tags: ["robotics"]
---

## Notes from Probabilistic Robotics

by Sebastian **THRUN**

[Probabilistic Robotics by Sebastian Thrun](https://docs.ufpr.br/~danielsantos/ProbabilisticRobotics.pdf) aimed to teach me how to model uncertainty in robot perception and control using probabilistic techniques. It introduced me to Bayesian filters, Kalman filters, particle filters, and Markov decision processes. The book focused on decision-making, localization, mapping, and sensor fusion, all of which were crucial for navigating dynamic environments. I'm still not done reading it

### Will Learn

- [x] State Estimation
- [x] Gaussian filter (Bayes Filter)
- [x] Kalman filter
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
  bef(x_k) = p(x_k | x_{k-1}, z_{k-1}, u_k, \delta)
  $$
  where $bef(x)$ is the belief at state $k$,
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
def bayes_filter(bef_x_prev, u_t, z_t):
    """
    Parameters:
    - bef_x_prev: Belief at time t-1 (prior)
    - u_t: Action at time t
    - z_t: Observation at time t
    Returns:
    - bef_x_t: Updated belief at time t
    """
    bef_x_t = {}

    # Prediction Step (Motion Update)
    for x_t in states:
        # Compute prediction for x_t by marginalizing over x_{t-1}
        predicted_belief = sum(
            motion_model(x_t, u_t, x_prev) * bef_x_prev[x_prev]
            for x_prev in states
        )

        # Measurement Update (Correction)
        measurement_prob = measurement_model(z_t, x_t)
        bef_x_t[x_t] = measurement_prob * predicted_belief

    # Normalization
    normalizer = sum(bef_x_t.values())
    for x_t in bef_x_t:
        bef_x_t[x_t] /= normalizer

    return bef_x_t

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
  $bef(X_0=\text{open}) = 0.5$
  $bef(X_0=\text{closes}) = 0.5$

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

<br/>

$$
p(x_t | z_{1:t},u_{1:t})= p(x_t | z_t, z_{1:t-1},u_{1:t}) = \frac{p(z_t | x_t,z_{1:t−1},u_{1:t})\ p(x_t | z_{1:t−1},u_{1:t})}{p(z_t | z_{1:t−1},u_{1:t})}
$$

$$
\text{where the normalizing factor, }\ \eta = p(z_t | z_{1:t−1},u_{1:t})
$$

<br/>

$$
\Rightarrow p(x_t | z_{1:t},u_{1:t}) =
\eta\ p(z_t | x_t,z_{1:t−1},u_{1:t})\ p(x_t | z_{1:t−1},u_{1:t})
$$

<br/>

$\text{Due to conditional independence, }\ p(z_t | x_t)\ =\ p(z_t | x_t,z_{1:t−1}, u_{1:t})$

$$
\Rightarrow p(x_t | z_{1:t},u_{1:t}) = \eta\ p(z_t | x_t)\ p(x_t | z_{1:t−1},u_{1:t})
$$

<br/>

$\text{Also,} p(x_t | z_{1:t−1},u_{1:t})$ $\text{is known as}$ _the predictive distribution_.

$\text{Also represented as}$ $\overline{\mathrm{bef}}(x_t)$.

$$
\Rightarrow p(x_t | z_{1:t},u_{1:t}) =
\eta\ p(z_t | x_t)\ \overline{\mathrm{bef}}(x_t)
$$

<br/>

$\text{Let's expand the term, }\ \overline{\mathrm{bef}}(x_t)  = p(x_t| z_{1:t-1}, u_{1:t})$

$$
= \int{p(x_t| x_{t-1}, u_t)\ p(x_{t-1} | z_{1:t-1}, u_{1:t-1})}\ dx
$$

<br/>

$$
\overline{\mathrm{bef}}(X_1) = \int{p(X_1 | X_0, u_0)\ \mathrm{bef}(X_0)} dx
$$

$$
bef(X_1) = η\ p(Z_1 | X_1)\ \overline{\mathrm{bef}}(X_1)
$$

So say the next action is a **push**,

$$
\overline{\mathrm{bef}}(X_1) = p(X_1 | X_0\text{=open}, u_1\text{=push})\ \mathrm{bef}(X_0\text{=open})
$$

$$
+ p(X_1 | X_0\text{=closed}, u_1\text{=push})\ \mathrm{bef}(X_0\text{=closed})
$$

<br/>

$$
\overline{\mathrm{bef}}(X_1\text{=open}) = 1.0\times 0.5 + 0.8\times 0.5 = 0.9
$$

$$
\overline{\mathrm{bef}}(X_1\text{=closed}) = 0.0 \times 0.5 + 0.2 \times 0.5 = 0.1
$$

<br/>

$$
bef(X_1) = \eta \ p(Z_1 | X_1)\ \overline{\mathrm{bef}}(X_1)
$$

$$
\mathrm{bef}(X_1\text{=closed}) = \eta*0.8*0.1=0.08\eta
$$

$$
\mathrm{bef}(X_1\text{ = open})= \eta*0.4*0.9=0.36\eta
$$

<br/>

$$
\eta = \frac {1} {0.08 + 0.36} = 2.272
$$

<br/>

$$
\mathrm{bef}(X_1\text{ = open})= 0.181
$$

$$
\mathrm{bef}(X_1\text{=closed})= 0.817
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

**What is canonical representation(natural representation) and moments representation?**

The representation of a Gaussian by its mean and covariance is called the moments representation. the mean and covariance are the first and second moments of probability distribution

- The Kalman filter was invented in the 1950s by **Rudolph Emil Kalman**,
- Kalman filters is not applicable to discrete or hybrid state spaces but for continuous state spaces.
- In Kalman filters the state transition model is considered to be a multivariate guassian with the mean being $\mu_t=A_t\mu_{t-1} + B_tu_{t} + \epsilon_0$ and covariance of $R_t$.
- The measurement probability must be linear in its arguments $z_t = C_tx_t + \sigma_t$ , where $\sigma_t$ is the measurement noise with mean 0 and covariance $Q_t$ ie $p(z_t|x_t)$ has a mean of $C_t x_t$.
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

These variables are the moment representation of the predictive distribution of bayes filter, $\overline{\mathrm{bef}}(x) = p(x_t | x_{t-1}, z_{t-1}, u_t)$

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

Similarly these $\mu_t$ and $\Sigma_t$ are the moment representation of belief, akin to that in that of bayes filters $bef(x) = p(x_k | x_{k-1}, z_{k-1}, u_k, \delta)$ of bayes filter

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


#### Summary of Kalman Filter
- Probably the best studied technique for implementing the Bayes filter is the Kalman Filter. Gaussians have two repesentation
  1. Canonical Representation
  2. Moments Representation (mean and variance)

- Like the vanilla bayes filter, Kalman filter are represented by stochastic probabilies and beliefs
- Unlike the vanilla bayes filter, the next state are predicted _linearly_ from state vectors and control vector. ie $\text{next state} = A_t x_{t-1} + B_t u_t + \epsilon_t$. 

- Making the state transition distribution, $p(x_t | u_t, x_{t-1})$, is a PDF function of the gaussian.

$$
=det(2\pi R_t)^{-0.5} exp\{ -\frac{1}{2} (x_t - A_tx_{t-1} - B_tu_t)^T R_t^{-1} (x_t - A_tx_{t-1} - B_tu_t)\}
$$

- Similary the measurement and state are linearly related. and its PDF is the measurement probability, $p(z_t | x_t)$.

$$
\text{measurement random variable, } Z_t = C_t x_t + \delta_t
$$  

- The kalman filter algorithm $(\mu_{t-1}, \Sigma_{t-1}, u_t, z_t)$:

  1.  $\bar{\mu}_t = A_t \mu_{t-1} + B_t u_t$  - prediction step for mean
  2.  $\bar{\Sigma}_t = A_t \Sigma_{t-1} A_t^T + R_t$ - prediction step for covar.
  3.  $K_t = \bar{\Sigma}_t C_t^T (C_t \bar{\Sigma}_t C_t^T + Q_t)^{-1}$ - $K_t$ is the Kalman gain, mean-squared error formula
  4.  $\mu_t = \bar{\mu}_t + K_t (z_t - C_t \bar{\mu}_t)$ - update step for mean
  5.  $\Sigma_t = (I - K_t C_t) \bar{\Sigma}_t$  - update step for covar.
  6.  **return** $\mu_t, \Sigma_t$

- Complexity = approximately $O(d2.8)$

- Also a thing to always remember is in KF. the state tranistion probability, measurement update and the belief are assumed to be a perfect normal distribution ie $\sim \mathcal{N}(\mu, \sigma^2)$ -- (at the very least considered so when used in the moments representation)  

#### Extended Kalman Filters

In practice, the assumptions of linear stae transitions and linear measurements with added gaussian nose are rearely fulfilled. Fore example, a robot that moves with constant translational and rotational velocity typically moves on a circular trajectory which cannot be described by linear next state transitions. 

Also, unlike in vanilla KF. our $x_t$ and $z_t$ are governed by non linear functions `g` and `h`.

$X_t = g(u_t, x_{t-1}) + \epsilon_t$ 
$Z_t = h(x_t) + \delta_t$

Unfortunately with non-linear `g` and `h`, the belief is no longer a true gaussuan but an appoximation. Thus, the EKF inherits from the Kalman filter the basic representation, but it differs in that this belief is only approximate, not exact as was the case in Kalman filters. 

The key idea underlying the EKF is **linearization**. Linearizatino approximated `g` by a linear function that is tangent to `g` at the mean of the Gaussian. There exist many techniques for linearizing non-linear functions. EKFs utilize (First order) _Taylor expansion_.

Extrapolation is achieved by a term proportional to the gradient of $g$ at $\mu_{t-1}$ and $u_t$:

$$
g(u_t, x_{t-1}) \approx g(u_t, \mu_{t-1}) + \nabla g(u_t, \mu_{t-1}) (x_{t-1} - \mu_{t-1})
$$

$$
\text{where } \nabla g(u_t, \mu_{t-1}) =: G_t
$$

$$
= g(u_t, \mu_{t-1}) + (x_{t-1} - \mu_{t-1}) G_t
$$


Note that $G_t$ is a $n \times n$ matrix written as gaussian, the matrix is a **Jacobian**. the next stae probabilty $p(x_t | u_t, x_{t-1})$ is approximated as follows:

$$
 \approx \det(2\pi R_t)^{-1/2} \exp \left( -\frac{1}{2} \left[ x_t - g(u_t, \mu_{t-1}) - G_t (x_{t-1} - \mu_{t-1}) \right]^T R_t^{-1} \left[ x_t - g(u_t, \mu_{t-1}) - G_t (x_{t-1} - \mu_{t-1}) \right] \right)
$$


##### Why is $G_t$ known as a  Jacobian
because it differs for different points in time. that is $\mu_{t-1}$ and $u_t$. 


The same method for state transition probability applies for measurement update and $h$.
$$
h(x_t) \approx h(\bar{\mu_t}) + \nabla h(\bar{\mu_t})(x_t - \bar{\mu_t})
$$
$$
\text{where } \nabla h(\bar{\mu_t}) =: H_t
$$

$$
= h(\bar{\mu_t}) + (x_t - \bar{\mu_t}) H_t 
$$
$p(z_t | x_t) =$
$$=det({2\pi Q_t})^{0.5} \exp\left(-\frac{1}{2}[z_t - h(\bar{\mu}_t) - H_t(x_t - \bar{\mu}_t)]^T Q_t^{-1} [z_t - h(\bar{\mu}_t) - H_t(x_t - \bar{\mu}_t)]\right)$$`


##### Algorithm
The Extended Kalman Filter algorithm $(\mu_{t-1}, \Sigma_{t-1}, u_t, z_t)$:

1.  $\bar{\mu}_t = g(u_t, \mu_{t-1})$  - prediction step for mean(state pred.)
2.  $\bar{\Sigma}_t = G_t \Sigma_{t-1} G_t^T + R_t$  - prediction step for covariance
3.  $K_t = \bar{\Sigma}_t H_t^T (H_t \bar{\Sigma}_t H_t^T + Q_t)^{-1}$  - $K_t$ is the Kalman gain
4.  $\mu_t = \bar{\mu}_t + K_t (z_t - h(\bar{\mu}_t))$  - update step for mean, (using meas. pred.)
5.  $\Sigma_t = (I - K_t H_t) \bar{\Sigma}_t$  - update step for covariance
6.  **return** $\mu_t, \Sigma_t$


### Information Filter
The dual of Kalman filter is the information filter. Similar to KF and EKF, the belief is a *guassian-ish*.


#### Difference between K.F and I.F
Whereas in the Kalman filter family of algorithms, Gaussians are represented by *their moments (mean, covariance)*, **information filters represent Gaussians in their canonical representation**, which is comprised of an **information matrix** and **an information vector**. 


The information matrix, $\Gamma$ is the inverse of the covariance. and the information vector, is the product of the covariance inverse and the mean. So, it is easy to see that $Ω$ and $ξ$ are a complete parameterization of a Gaussian.
$$
\ = \Sigma^{-1}
$$
$$
\ = \Sigma^{-1} \mu
$$


#### Why the canonical representation?
In many ways, the canonical representation is more elegant than the moments representation. In particular, the negative logarithm of the Gaussian (which plays an essential role in information theory) is a quadratic function in the canonical parameters $\Omega$ and $\xi$:

$$-\log p(x) = \text{const.} + \frac{1}{2} x^T \Omega x - x^T \xi$$

Here $const.$ is a constant. The reader may notice that we cannot use the symbol $\eta$ to denote this constant, since negative logarithms of probabilities do not normalize to $1$. 

The negative logarithm of our distribution $p(x)$ is quadratic in $x$, with the quadratic term parameterized by $\Omega$ and the linear term by $\xi$. In fact, for Gaussians, $\Omega$ must be positive semidefinite, hence $-\log p(x)$ is a quadratic distance function with mean $\mu = \Omega^{-1}\xi$. 

This is easily verified by setting the first derivative of (3.73) to zero:

$$\frac{\partial[-\log p(x)]}{\partial x} = 0 \iff \Omega x - \xi = 0 \iff x = \Omega^{-1}\xi$$

The matrix $\Omega$ determines the rate at which the l function increases in the different dimensions of the variable $x$. A quadratic distance that is weighted by a matrix $\Omega$ is called ***Mahalanobis distance.***


##### Information Filter Algorithm
The Information Filter algorithm $(\xi_{t-1}, \Omega_{t-1}, u_t, z_t)$:

1.  $\bar{\Omega}_t = (A_t \Omega_{t-1}^{-1} A_t^T + R_t)^{-1}$  - predicted information matrix  
2.  $\bar{\xi}_t = \bar{\Omega}_t \left(A_t \Omega_{t-1}^{-1} \xi_{t-1} + B_t u_t\right)$  - predicted information state  
3.  $\Omega_t = C_t^T Q_t^{-1} C_t + \bar{\Omega}_t$  - update step for information matrix  
4.  $\xi_t = C_t^T Q_t^{-1} z_t + \bar{\xi}_t$  - update step for information state  
5.  **return** $\xi_t, \Omega_t$  


Just like in K.F. 
$$
\bar{\mu}_t = A_t x_{t-1} + B_t u_t + \epsilon_t
$$
$$
\bar{\Sigma}_t = C_t x_t + \delta_t
$$


#### Extended Information Filter
Just like EKF is to KF, EIF is to IF. It has g and h functions to represent non-linearities in state transition space and measurement posterior. but in this case they are matrices

##### Algorithm  
The Information Filter algorithm $(\xi_{t-1}, \Omega_{t-1}, u_t, z_t)$:
1. $\mu_{t-1} = \Omega^{-1}_{t-1}\xi_{t-1}$
2.  $\bar{\Omega}_t = (G_t \Omega_{t-1}^{-1} G_t^T + R_t)^{-1}$  - predicted information matrix  
3.  $\bar{\xi}_t = \bar{\Omega}_t\ g(u_t, \mu_{t-1})$  - predicted information state  
4.  $\bar{\mu}_t = g(u_t, \mu_{t-1})$
5.  $\Omega_t = H_t^T Q_t^{-1} H_t + \bar{\Omega}_t$  - update step for information matrix  
6.  $\xi_t = H_t^T Q_t^{-1}\ [z_t-h(\bar{\mu}_t) + H_t \bar{\mu_t}]\ +\ \bar{\xi}_t$  - update step for information state  
7.  **return** $\xi_t, \Omega_t$  


#### Advantages of IF Over KF

- **Handling Global Uncertainty**: Setting Ω=0\Omega = 0Ω=0 in the information filter represents complete uncertainty, whereas in the Kalman filter, this corresponds to an infinite covariance, which is problematic in robotics.
- **Better for Sparse Measurements**: Sensor measurements often provide information about only a subset of state variables. The information filter naturally handles this, while EKFs require special provisions.
- **Numerical Stability**: Information filters tend to be more numerically stable than Kalman filters in many applications.
- **Efficient Multi-Robot Data Fusion**:
    - Multi-robot problems require decentralized sensor fusion, which is naturally supported by information filters.
    - Bayesian integration of sensor data becomes simple **addition** in logarithmic form, which is commutative and allows integration in any order, with arbitrary delays.
    - The Kalman filter can also do this, but with higher computational overhead.


#### Disadvantages of the EIF

- **Matrix Inversions in Nonlinear Systems**:
    - The EIF requires matrix inversions in both the prediction and update steps.
    - EKFs often avoid inverting matrices of comparable size, making them more computationally efficient.
- **Higher Computational Cost in High-Dimensional State Spaces**:
    - The need for frequent matrix inversions makes EIF computationally inferior for large state spaces.
    - This is a major reason why EKFs are more widely used than EIFs.
### NEXT STEP

