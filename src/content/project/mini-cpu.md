---
title: "miniCPU"
github: "https://github.com/amar-jay/ttsky26b-mini-cpu"
tags: ["verilog", "asic", "tiny-tapeout", "cpu", "digital-design", "8-bit"]
---

A minimal 8-bit accumulator-based CPU implemented in Verilog for **Tiny Tapeout**. Submitted to the sky26b shuttle (1×1 tile).

It features a compact custom ISA and runs a small hardcoded program that produces a classic **Knight Rider** bidirectional LED scanner on the 8 outputs — useful for visual bring-up. Designed for a 100 kHz clock with an internal divider so the pattern runs at human-visible speed.

See [docs/info.md](https://github.com/amar-jay/ttsky26b-mini-cpu/blob/main/docs/info.md) for the ISA, diagrams, and Cocotb test instructions. The design uses the standard `tt_um_*` Tiny Tapeout interface.
