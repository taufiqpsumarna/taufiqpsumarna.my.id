---
draft: false
authors: 
  - taufiqpsumarna
title: "Setup Grafana Loki Basic Auth Behind Nginx Reverse Proxy (HTTPS)"
date: 2024-08-06
description: "Setup Grafana Loki Basic Auth Behind Nginx Reverse Proxy (HTTPS)"
categories: [Medium]
tags: [sre,grafana,alloy,prometheus,loki]
---

*Published on 2024-08-06*

![This Is Picture](/blog/assets/images/grafana-alloy-diagram.jpg)

## Quick Introduction
### Grafana Loki
Grafnana Loki a powerful and scalable log aggregation system, lacks built-in authentication. To protect your log data, it’s essential to implement a robust authentication mechanism. This post guides you through setting up basic authentication for Loki behind an Nginx reverse proxy.

### Promtail 
Promtail is a log collection agent designed to efficiently gather log data from various sources and send it to a Grafana Loki instance for storage and analysis. It’s a crucial component of the Grafana Loki stack, working alongside Loki and Grafana to create a comprehensive log management solution.

Monitoring and logging are crucial aspects of maintaining the health and performance of your applications. Grafana Loki, a powerful tool for log aggregation and visualization, simplifies this task. By setting it up behind an Nginx reverse proxy with basic authentication, you can secure your logging infrastructure efficiently. This guide will walk you through the entire process step by step.

Read More:
[Medium: Setup Grafana Loki Basic Auth Behind Nginx Reverse Proxy (HTTPS)](https://medium.com/@taufiqpsumarna/grafana-loki-setup-basic-auth-behind-nginx-reverse-proxy-https-0c19d4c20e09)