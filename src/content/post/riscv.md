---
title: "Understanding RISC-V"
description: "If you’ve ever looked into processors, you’ve probably heard of big names like Intel, AMD, or ARM. But let me introduce you to **RISC-V**, a bold and open alternative that’s changing how CPUs are designed, built, and used."
publishDate: "28 Dec 2024"
updatedDate: "28 Dec 2024"
tags: ["🍟", "riscv"]
---

If you’ve ever looked into processors, you’ve probably heard of big names like Intel, AMD, or ARM. But let me introduce you to **RISC-V**, a bold and open alternative that’s changing how CPUs are designed, built, and used.

---

## What Is RISC-V?

RISC-V (pronounced “risk-five”) is an **open standard for instruction sets**, meaning anyone can use its specifications to design their own processors—without paying royalties or licensing fees. It’s like giving engineers a blank canvas and letting them create processors for everything from microcontrollers to high-end servers.

However, there’s often confusion around RISC-V’s openness. While its instruction set is free, the actual chip designs can be proprietary. Many companies keep their RISC-V designs closed, but open-source implementations are available for those who want to tinker or build.

The organization **RISC-V International** oversees the standard, manages branding, and fosters development. However, they don’t design chips themselves—this responsibility lies with member companies like SiFive, Alibaba, and others.

---

## Modular Design: RISC-V’s Superpower

RISC-V’s architecture is **modular** by design, offering unmatched flexibility. Companies can start with one of its base modules and customize them with various extensions or even create proprietary ones. This flexibility has made RISC-V attractive across industries, though it has also led to some fragmentation.

### RISC-V Base and Extension Modules

| **Module**         | **Description**                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| **RV32I**          | 32-bit base integer instruction set.                                                                    |
| **RV64I**          | 64-bit base integer instruction set.                                                                    |
| **RV32E**          | 32-bit base set optimized for embedded systems (fewer registers).                                       |
| **M Extension**    | Adds support for integer multiplication and division operations.                                        |
| **A Extension**    | Atomic instructions for multi-core processors.                                                          |
| **F/D Extensions** | Adds single-precision (F) and double-precision (D) floating-point operations.                           |
| **C Extension**    | Compressed instructions to reduce code size and improve efficiency.                                     |
| **V Extension**    | Vector instructions for applications like machine learning and graphics.                                |
| **B Extension**    | Bit manipulation instructions for cryptography and networking.                                          |
| **Z Extensions**   | Specialized extensions for areas like security (`Zicsr`) or supervisor-level instructions (`Zifencei`). |

---

## A New Player: Tenstorrent and Jim Keller

If you’re into processors, you’ve probably heard of **Jim Keller**, a legend known for his work on AMD Zen, Tesla’s AI chips, and Apple’s A-series processors. Keller is now the CEO of **Tenstorrent**, a company embracing RISC-V to push the boundaries of AI and high-performance computing.

Tenstorrent is unique because it doesn’t just design CPUs—it focuses on combining RISC-V cores with powerful AI accelerators. This vision has caught the attention of investors, raising **over $600 million** in their first round of funding. With Keller at the helm and such massive backing, Tenstorrent is a company to watch in the RISC-V space.

---

## Where Is RISC-V Making an Impact?

### **1. Academia**

RISC-V’s simplicity makes it ideal for teaching assembly language and CPU design. It’s quickly becoming the go-to architecture in classrooms.

### **2. Embedded Systems**

This is where RISC-V shines today. Companies are adopting it for microcontrollers and IoT devices due to its low cost and flexibility. Even big names like NVIDIA and Apple reportedly use RISC-V cores in their products, though they don’t advertise it.

### **3. AI Hardware**

AI startups and giants alike are turning to RISC-V for its modular design. Many customize RISC-V cores with their own extensions, like low-precision matrix multiplication for neural networks.

### **4. Consumer Devices**

RISC-V is slowly catching up to ARM and x86 in consumer tech. Profiles like **RVA22** and **RVA23** aim to support Linux and Android, bringing RISC-V closer to powering everything from smartphones to PCs.

---

## The SHD Group: Bold Projections for RISC-V

The **SHD Group**, a prominent consulting and market analysis firm in the semiconductor industry, has been closely monitoring the rise of RISC-V. Known for their detailed forecasts and strategic insights, the SHD Group has outlined some intriguing projections about the future of RISC-V in the global market.

### **1. Explosive Growth in Market Share**

SHD Group predicts that RISC-V will achieve **double-digit market share** in the global semiconductor industry by 2030. This growth is fueled by:

- **Adoption in Embedded Systems**: RISC-V's modularity and low cost make it a perfect fit for microcontrollers and IoT devices, two of the fastest-growing segments in the tech industry.
- **Growing Presence in Data Centers**: Companies like Alibaba and SpacemiT are deploying RISC-V-based processors in cloud environments, where scalability and cost-effectiveness are crucial.

### **2. Competition in High-Performance Computing (HPC)**

RISC-V, traditionally seen as a lightweight architecture, is now entering the HPC domain. SHD Group highlights advancements in out-of-order core designs and custom extensions, which could make RISC-V competitive with x86 and ARM in server and AI workloads by 2028.

The report underscores the role of companies like **Tenstorrent** and other RISC-V players in developing processors tailored for AI and machine learning. With the demand for specialized AI chips surging, RISC-V’s flexibility gives it a unique edge.

### **3. Increasing Open-Source Ecosystem**

According to SHD Group, the open-source nature of RISC-V will drive innovation in ways traditional architectures cannot match. They project a robust ecosystem of **free and proprietary designs** that will lower the entry barrier for startups and smaller semiconductor companies.

- By 2026, they anticipate a significant increase in RISC-V cores being developed for niche markets, such as **custom SoCs for automotive, robotics, and wearables**.
- Open-source software tools like GCC and LLVM are already supporting RISC-V, and SHD believes this ecosystem will mature rapidly with the introduction of more optimized frameworks.

### **4. Fragmentation Challenges**

While RISC-V’s modularity is a strength, SHD Group warns that **fragmentation** could slow adoption. Unlike ARM, which offers a cohesive ecosystem, RISC-V allows companies to add proprietary extensions, leading to incompatibilities between implementations.

SHD emphasizes the need for RISC-V International to create stricter guidelines and standardized profiles (like the **RVA profiles**) to ensure interoperability across implementations.

### **5. Expanding Into Consumer Electronics**

Perhaps the boldest prediction from the SHD Group is that RISC-V will power a significant portion of consumer electronics by 2035. This includes:

- **Smartphones**: With profiles like RVA23 targeting Android, SHD expects RISC-V to start appearing in budget and mid-tier smartphones within the next few years.
- **Smart TVs and Wearables**: SHD highlights RISC-V’s suitability for these markets due to its energy efficiency and scalability.

### **6. Geopolitical Implications**

The SHD Group report also touches on geopolitics, emphasizing how RISC-V's open nature allows countries to avoid reliance on foreign IP. This is particularly relevant in regions like:

- **China**: With a strong push for semiconductor independence, Chinese firms like Alibaba and Loongson are heavily investing in RISC-V.
- **India**: The government’s “Digital India” initiative includes support for RISC-V development, focusing on building a domestic semiconductor ecosystem.

---

## Can RISC-V Compete With Intel, AMD, or ARM?

The high-end processor market has traditionally been dominated by Intel, AMD, and ARM. While RISC-V isn’t quite there yet, progress is accelerating. Companies like Alibaba (XuanTie C910/C920 cores) and SpacemiT (K1 core) are proving that RISC-V can handle workloads ranging from cloud servers to consumer devices.

There’s also a lot of excitement around upcoming RISC-V designs. Several companies claim their chips will rival Intel’s and AMD’s best offerings, though getting these designs to market remains a challenge.

---

## The Road Ahead

RISC-V represents a bold step towards a more open and competitive CPU ecosystem. Its modular design, open nature, and growing industry support make it a compelling alternative to traditional ISAs. With heavyweights like Jim Keller and Tenstorrent in the mix, the future of RISC-V looks brighter than ever.

Whether you’re a student, a developer, or just a tech enthusiast, now’s the time to start paying attention to RISC-V. It might not replace your PC’s processor tomorrow, but it’s already shaping the future of computing.

In our next post, we’ll take a closer look at **Tenstorrent**, a rising star in the RISC-V ecosystem. With Jim Keller at the helm and over $600 million raised in its first funding round, Tenstorrent is poised to make waves in AI and high-performance computing. Stay tuned for an in-depth analysis of their contributions and vision for the future!
