---
draft: false #Todo: Change False to post Blog
authors: 
  - taufiqpsumarna
title: "YABS: Yet-Another-Bench-Script Linux benchmarking tools" #Todo: Add Blog Title
date: 2024-09-24 #Todo: Change Date
description: "Yet-Another-Bench-Script (YABS) is a benchmarking tool primarily designed to assess the performance of Linux servers." #Todo: Add Short Description / Subtitle
categories: [Blog] #Todo: Categories Blog, Medium, Other
tags: [linux,bash,benchmarking] #Todo: Add Blog Tags
---

![yabs.sh](https://user-images.githubusercontent.com/8313125/106475387-e1f6da00-6473-11eb-918c-c785ebeef8b9.jpg)

## Introduction

Yet-Another-Bench-Script (YABS) is a benchmarking tool primarily designed to assess the performance of Linux servers. It’s a script-based solution that quickly provides insights into CPU, memory, and disk performance. This lightweight and easy-to-use tool is especially popular among system administrators, VPS users, and cloud engineers, offering a quick way to check the raw hardware performance of a server.

## Why Do We Need YABS?

1. Simplified Benchmarking: YABS eliminates the need for complex setup or installation of multiple tools by bundling CPU, memory, disk, and network testing into a single script.
2. Quick Performance Insights: Whether for a new server or after making configuration changes, you can quickly benchmark key performance metrics in a matter of minutes.
3. Comparability: Many users in the hosting community use YABS for testing, making it easier to compare performance results against similar configurations or hosting providers.
4. Ideal for VPS Testing: If you’re evaluating virtual private servers (VPS) or cloud instances, YABS provides an easy way to verify that you're getting the performance you’re paying for.

## How to Use Yet-Another-Bench-Script (YABS)

### Step 1: Installing YABS

To use YABS, SSH into your Linux server and execute the following command to download and run the script:

```bash
curl -sL yabs.sh | bash
```

### Step 2: Running the Benchmark

The script automatically performs tests for:

- CPU Performance: Using `sysbench`, YABS tests your server’s CPU speed and efficiency.
- Disk Performance: It checks your disk's read/write speeds to gauge how fast your storage operates.
- Network Performance: The script pings well-known servers around the globe to determine network latency and throughput.

### Step 3: Write report and Interpreting the Results

```bash
curl -sL yabs.sh | bash | tee "yabs-report-$(date +'%Y-%m-%d_%H-%M-%S').txt"
```

YABS outputs a summary after the test, including:

- CPU benchmark: Performance results based on how well the CPU can handle multiple threads.
- Disk I/O: Shows read and write speeds in MB/s for both sequential and random tests.
- Network throughput: Gives insight into the upload and download speeds between your server and global locations.

## Conclusion

YABS is an essential tool for those working with Linux servers, especially when evaluating hardware performance or comparing VPS providers. Its ease of use and quick benchmarking features allow you to verify system capabilities with minimal effort, making it a go-to for system administrators and engineers alike.

## Reference

- [Github: yet-another-bench-script](https://github.com/masonr/yet-another-bench-script)
