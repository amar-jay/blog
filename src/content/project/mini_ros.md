---
title: "Mini ROS"
github: "https://github.com/amar-jay/mini_ros"
tags: ["Go", "message-broker", "robotics"]
---

This is a lightweight reimplementation of core ROS concepts, focusing on __`roscore`__ and topic-based communication for subscribing and publishing. Built entirely in Go without external libraries, it mimics essential ROS behavior in a minimalistic way. The `roscore` server manages message exchanges between nodes, while topics enable asynchronous communication.

This aims to mimic the essential behavior of ROS in a minimalistic way, making it easier to understand the underlying mechanisms while maintaining flexibility and performance due to Go’s concurrency model.

| commands  | purposes                                        |
| --------- | ----------------------------------------------- |
| core      | To start roscore server on master url as in ROS |
| subscribe | To subscribe to a topic                         |
| publish   | To publish a topic                              |
| status    | To get stats of a topic                         |


### TODO

- [x] ROS core
- [x] Publish topic
- [x] Subscribe to topic
- [x] message types
- [x] get topic metrics
- [x] better CLI
- [ ] Create more realistic topic `/cmd_vel` or `/raw_image`
- [x] ROS Node
- [x] ROS simple client library
- [ ] ROS service
- [ ] ROS launch file