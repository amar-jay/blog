---
title: "From CAN to TSN"
description: "A Practical Tour of Automotive Networking from CAN to Ethernet"
tags: ["electronics"]
publishDate: 9 Feb 2026
updatedDate: 9 Feb 2026
---

## How cars quietly became distributed computers

When Tesla started tearing apart the traditional automotive electronics architecture, many engineers thought it was reckless. Decades of careful layering — CAN buses here, LIN chains there, FlexRay islands for safety-critical timing — were suddenly being replaced by centralized compute and Ethernet backbones. It looked suspiciously like Silicon Valley hubris rolling into a conservative industry.

Then the numbers started to make sense.

Modern premium vehicles routinely contain more than a hundred electronic control units (ECUs). Each one is a tiny computer, running its own firmware, speaking its own dialect of automotive networking, and connected through kilometers of copper wiring. Every new feature — heated mirrors, seat motors, rain sensors, power trunks — historically meant a new supplier, a new microcontroller, a new ECU, and new wiring. Over thirty years, this accreted into something resembling an archaeological site more than a coherent system.

Debugging such a machine is an exercise in distributed systems archaeology. Updating it over the air is a logistical nightmare. Securing it is borderline heroic. And scaling it to support autonomous driving, multi-camera perception, and centralized AI compute is close to impossible.

Tesla’s response was radical: collapse the architecture. Fewer computers. More software. Ethernet everywhere.

That decision sits at the center of a broader transformation now sweeping the automotive industry. To understand it, we need to walk backward — all the way to CAN.

---

## The elegance of CAN: two layers and no apologies

Controller Area Network, or CAN, is one of those protocols whose simplicity borders on philosophical.

It implements only two functional layers: the physical layer, which deals with voltages, timing, and wires, and the data link layer, which handles framing, arbitration, error detection, and retransmission. There is no network layer. No transport layer. No application layer. CAN does not know about addresses, connections, sessions, or streams.

This is not an omission. It is a deliberate rejection.

CAN was designed for real-time embedded control. Its job is to move small packets with extremely high reliability and tightly bounded latency inside electrically hostile environments. Every extra abstraction layer adds overhead, jitter, and failure modes. So CAN strips the problem to its bones: put bits on the wire, resolve contention deterministically, and deliver messages predictably.

This brutal minimalism is why CAN has survived for decades in vehicles, factories, and robots. It behaves less like a network and more like a nervous reflex arc: messages propagate, priorities resolve automatically, and the system reacts.

Higher-level protocols — CANopen, J1939, UDS, ISO-TP — stack on top to add addressing, diagnostics, and transport segmentation. But the skeleton remains unchanged.

---

## CAN-FD: stretching the idea without breaking it

As vehicles accumulated sensors, cameras, and increasingly complex control algorithms, classic CAN began to suffocate. Eight bytes per frame and one megabit per second were no longer enough.

CAN-FD extended the data rate and payload while keeping the architecture intact. Arbitration still happens slowly and deterministically. Data bursts happen fast. Payloads grow to sixty-four bytes. Error detection becomes stronger.

Philosophically, nothing changes. CAN-FD is not a new creature. It is the same animal with better lungs.

But even CAN-FD could not feed the bandwidth hunger of modern vehicles.

And this is where Ethernet enters.

---

## Ethernet: the two-layer skeleton that ate the world

Ethernet, at its core, is also just two layers: physical and data link. Everything else — IP, TCP, UDP, HTTP, video streaming, cloud computing — sits on top.

This architectural restraint is its superpower. Ethernet only moves frames. It does not care whether those frames contain braking commands, YouTube packets, or telemetry from Mars.

Over fifty years, Ethernet scaled from ten megabits per second on thick yellow cables to hundreds of gigabits per second over fiber. Along the way, it evolved from collision-prone shared buses into full-duplex switched fabrics capable of building global-scale networks.

But classical Ethernet is indifferent to time. It is best-effort. Packets arrive eventually. Latency is not guaranteed. Determinism is not promised.

For office networks, that is fine.

For brake-by-wire, it is unacceptable.

---

## Teaching Ethernet to respect time

Time-Sensitive Networking, or TSN, is the collection of standards that teaches Ethernet how to behave in real-time systems.

TSN introduces precise time synchronization, deterministic scheduling, traffic shaping, and frame preemption. Together, these allow Ethernet networks to guarantee bounded latency, low jitter, and strict delivery deadlines.

Importantly, TSN does not require a new physical layer. It operates entirely within Layer 2, modifying how switches and network interfaces queue, schedule, and transmit frames. The wires remain the same. The intelligence changes.

This transforms Ethernet from a best-effort delivery service into a distributed real-time machine.

Suddenly, Ethernet can compete with CAN and FlexRay for safety-critical control loops, while retaining its immense bandwidth and software ecosystem.

This convergence is not academic. It is reshaping vehicle architecture.

---

## Automotive Ethernet: when physics pushes back

Automotive Ethernet is not merely Ethernet transplanted into cars. It is Ethernet rebuilt for one of the most hostile electrical environments engineers routinely face.

Inside a vehicle, cables run next to high-current motor lines, switching inverters, ignition systems, and DC-DC converters. Temperatures swing from arctic cold to engine-bay heat. Vibration is constant. Moisture and contaminants are unavoidable. And cost constraints are merciless.

To survive this, automotive Ethernet abandons bulky four-pair cables and fragile connectors in favor of single twisted-pair links and ruggedized interconnects. Technologies like 100BASE-T1 and 1000BASE-T1 deliver hundred-megabit and gigabit data rates over a single differential pair.

Power-over-Data-Line allows cameras, radars, and sensors to receive both power and data through the same cable, reducing harness weight and complexity.

Signal integrity, electromagnetic compatibility, and fault detection dominate design. This is Ethernet engineered not for comfort, but for survival.

---

## Zonal architectures: collapsing electronic sprawl

Traditional automotive electronics evolved through supplier-driven accretion. Each new feature meant another ECU. Over time, vehicles accumulated dozens, then hundreds, of distributed controllers connected through overlapping networks.

This approach does not scale.

Modern designs instead group electronics by physical location. Sensors and actuators connect to local zonal controllers. Zones connect to centralized compute nodes using Ethernet backbones.

Instead of a hundred tiny brains scattered everywhere, vehicles now deploy a handful of powerful computers orchestrating software-defined behavior across the car.

This shift simplifies wiring, reduces mass, enables massive over-the-air updates, and makes advanced perception and autonomy feasible.

It is less an electronics upgrade than a fundamental architectural reboot.

---

## The quiet collapse of the ECU explosion

At their peak, premium vehicles contained over 150 ECUs. Each one had its own microcontroller, firmware, update process, and diagnostics interface. Coordinating them became an exercise in distributed systems engineering.

Next-generation architectures aim to reduce that to roughly ten to thirty major controllers: a few central compute nodes, several zonal controllers, and dedicated powertrain modules.

Hardware complexity decreases. Software complexity increases. And the vehicle begins to resemble a data center on wheels.

---

## Where it all converges

CAN-FD stretches classical control buses toward higher data rates. TSN bends Ethernet toward deterministic timing. Automotive Ethernet hardens networking against physical abuse. Centralized compute collapses distributed sprawl.

All of these trends converge on a single idea: the car as a real-time distributed computer.

Old vehicles were mechanical systems augmented by electronics.

New vehicles are computational systems expressed through mechanics.

The nervous system has changed. The body is following.

---

## Closing

Ethernet began as a way to connect a handful of machines in a laboratory. CAN began as a way to move small control messages reliably inside vehicles. Neither was designed to support autonomous navigation, distributed AI, or software-defined machines.

Yet here they are — converging, merging, and reshaping one of the world’s largest industries.

The most interesting revolutions often look like simple wiring changes.

They are anything but.

## References & Further Reading

A short, practical reading list for diving deeper into the ideas behind CAN, Ethernet, TSN, and modern automotive architectures:

1. Introduction to TSN (Avnu Alliance): https://avnu.org/what-is-tsn/

2. Automotive Ethernet Overview (Broadcom): https://www.broadcom.com/products/ethernet-connectivity/automotive-ethernet