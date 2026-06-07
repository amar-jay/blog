---
title: "NAT WSL"
github: "https://github.com/amar-jay/nat_wsl"
tags: ["Go", "networking"]
---

A from-scratch NAT / port-forwarding tool in Go for WSL. It exposes services running inside a WSL distro directly on the host's network IP using explicit, configurable port mappings — instead of relying on Windows' default NAT behavior.

The goal was to gain hands-on understanding of networking fundamentals (NAT-PMP / PCP) while having simple, declarative control over which ports are forwarded.

Reference: [RFC 6886 - Port Control Protocol](https://datatracker.ietf.org/doc/html/rfc6886).
