---
title: "miniCPU"
github: "https://github.com/amar-jay/ttsky26b-mini-cpu"
tags: ["verilog", "asic", "tiny-tapeout", "cpu", "digital-design", "8-bit"]
---

A minimal **8-bit accumulator-based CPU** designed for **Tiny Tapeout** ASIC fabrication and submitted to the **sky26b** shuttle. Currently being taped out.

The design prioritizes tiny area (just **1×1 tile**), a clean synchronous architecture, and an easy-to-understand custom ISA. It runs a small hardcoded program that produces a classic **Knight Rider / bidirectional LED scanner** pattern on the 8 dedicated outputs — perfect for visual bring-up on the shuttle.

### Key Specs
- **Language**: Verilog
- **Top module**: `tt_um_amarjay`
- **Target clock**: 100 kHz (with internal 4-bit divider / clock enable for ~human-visible ~40 Hz updates)
- **Registers**: 8-bit accumulator (`A`), 8-bit `B`, 5-bit program counter (max 32 instructions)
- **ROM**: Combinational `case` statement (32×8-bit)
- **ALU**: Combinational next-state logic
- **I/O**: Standard Tiny Tapeout (`ui_in[7:0]`, `uo_out[7:0]` for LEDs, `uio_*` disabled)

### ISA Highlights
Compact 8-bit instructions (3-bit opcode + 5-bit operand/imm/sub-op):

- `LDI`, `ADDI`, `SUBI` immediates
- Register transfer (`TAB`/`TBA`), `IN` from ui pins
- ALU: `ANDB`/`ORB`/`XORB`, `ADDB`/`SUBB`, `SHL`/`SHR`
- Control: `OUT` (to uo_out), conditional `JNZ`/`JZ`, unconditional `JMP`

The demo ROM program cleverly works around the 5-bit immediate limit (LDI + repeated SHL) to reach bit 6 for the full 8-bit scanner sweep, then reverses direction.

### Architecture Notes
- Single-cycle FSM core with clock enable (CPU only steps when divider is full)
- Everything synchronous on the enabled edge; combinational paths compute `next_a` and instruction in parallel
- Emphasis on minimal area and deterministic, easy-to-reason-about behavior suitable for a first (or educational) tapeout project

### Testing
- Reset (`rst_n` low for several cycles), apply clock, observe `uo_out[7:0]`
- The scanner should continuously sweep a single lit "LED" left, then right
- Cocotb testbench included: `make test`

See the full project documentation in [docs/info.md](https://github.com/amar-jay/ttsky26b-mini-cpu/blob/main/docs/info.md) (includes ISA diagrams) and the repository for the complete Verilog source, testbench, and hardening flow (LibreLane via Tiny Tapeout GitHub Actions).

Once the sky26b shuttle results are available, the design can be inspected in the Tiny Tapeout 3D viewer / GDS viewer via the project's GitHub Pages site.
