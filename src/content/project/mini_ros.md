---
title: "Mini ROS"
github: "https://github.com/amar-jay/mini_ros"
tags: ["Go", "message-broker", "robotics"]
---

This is a lightweight reimplementation of core ROS concepts, focusing on **`roscore`** and topic-based communication for subscribing and publishing. Built entirely in Go without external libraries, it mimics essential ROS behavior in a minimalistic way. The `roscore` server manages message exchanges between nodes, while topics enable asynchronous communication.

This aims to mimic the essential behavior of ROS in a minimalistic way, making it easier to understand the underlying mechanisms while maintaining flexibility and performance due to Go’s concurrency model.