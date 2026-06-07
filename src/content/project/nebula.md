---
title: "Nebula"
github: "https://github.com/amar-jay/nebula"
tags: ["robotics", "drone", "computer-vision", "ardupilot", "zeromq", "teknofest"]
---

Drone control and automation system developed in 2025 by the **CGM MaTek Nebula Team** (sponsored by **Çemberlitaş Gençlik Merkezi**) for the [Teknofest 2025 IHA](https://teknofest.org/en/) (Unmanned Aerial Vehicle) competition.

Nebula is a full software stack for autonomous drone operations, featuring:

- **Ground Control Station (GCS)**: A PySide6 desktop application for remote monitoring and control, real-time telemetry visualization, and viewing raw + processed camera feeds.
- **Edge Server**: Runs on an NVIDIA Jetson Orin NX. Handles MAVLink communication (pymavlink), video streaming, YOLO-based detection/tracking, and serial commands to subsystems like the crane/hook for package delivery.
- **ZeroMQ Communication**: A lightweight custom Pub/Sub messaging layer (chosen over ROS/ROS2) for fast, decoupled communication between GCS and edge. Async server with `asyncio` + `ThreadPoolExecutor`; Qt-threaded client using `QThread` + signals for smooth UI integration.

### Highlights

- **ArduPilot Integration**: Full MAVLink 2.0 support for flight controller communication, telemetry, and control.
- **Computer Vision & Geo-Localization**: Custom YOLOv8 model (trained on ~1000 real + simulated images) for detecting helipads and tanks. Monocular GPS coordinate estimation using a nadir-mounted camera, pinhole model, camera intrinsics, and live drone GPS/altitude/attitude data.
- **Simulation**: Deep Gazebo + ArduPilot SITL integration with custom worlds, downward-facing cameras, and multi-drone support. Useful `make` targets for quick iteration.
- **Herelink Support**: Experimental integration for real-world long-range comms and telemetry relay.

Full documentation, architecture deep-dives (messaging evolution, frame processing, MAVLink proxy, lifecycle), and setup instructions are available at [nebula.amarjay.com](https://nebula.amarjay.com).

**Demo**: [Watch on YouTube](https://www.youtube.com/watch?v=ZF_N-Vu7Tik)

> **Note**: This project is no longer maintained following the conclusion of the 2025 competition.
