---
draft: false #Todo: Change False to post Blog
authors: 
  - taufiqpsumarna
title: "UFW: Accidentally locked out SSH Port (22)" #Todo: Add Blog Title
date: 2024-09-11 #Todo: Change Date
description: "This article will guide you through solving firewall problems using UFW on your EC2 instance and avoid locking yourself out." #Todo: Add Short Description / Subtitle
categories: [Blog] #Todo: Categories Blog, Medium, Other
tags: [aws,linux,ubuntu,ssh,security,tutorial] #Todo: Add Blog Tags
---

## Introduction

![let me in](https://i.imgflip.com/933bdd.jpg)

So, you've just launched your first AWS EC2 instance.
Awesome! But wait, what’s that? Your instance is up, but you can’t seem to connect?
You might have stumbled into a common issue that many newbies face: __Firewall Configuration__ :sparkles:

AWS offers security groups by default, but sometimes, you'll want more control using tools like UFW (Uncomplicated Firewall),
This article will guide you through solving firewall problems using UFW on your EC2 instance and avoid locking yourself out.

## Understanding UFW and AWS Security Groups

### What is UFW?

UFW stands for "Uncomplicated Firewall." As the name suggests, it’s designed to simplify the process of managing iptables rules, which can be quite complex. UFW helps you quickly allow or block traffic on specific ports with simple commands.

### What are AWS Security Groups?

AWS Security Groups are virtual firewalls provided by AWS to control traffic to and from your EC2 instances. They are essential for managing inbound and outbound rules at a higher, network-based level.

## Why Configuring UFW on EC2 Causes Issues?

Beginners often face problems because they forget that AWS Security Groups and UFW can sometimes overlap in functionality.
If you configure UFW without considering your security group rules, you might block traffic that was previously allowed, leading to issues like getting locked out of your instance.

!!!tip
    I do recommend only use AWS Security Group and leave UFW configuration open all port

If you want to control which port opened, just use AWS Security Group from AWS Console or AWS CLI 😁

## Resolution

You could use the following Simplest way (user-data) to turn off the ufw.

1. Access your AWS EC2 Instance
2. Stop the instance first
3. In Instance Settings, View/Change User Data
4. Copy and Set the below user data as plain text and save

    ```bash
    Content-Type: multipart/mixed; boundary="//"
    MIME-Version: 1.0

    --//
    Content-Type: text/cloud-config; charset="us-ascii"
    MIME-Version: 1.0
    Content-Transfer-Encoding: 7bit
    Content-Disposition: attachment; filename="cloud-config.txt"

    #cloud-config
    cloud_final_modules:
    - [scripts-user, once]

    --//
    Content-Type: text/x-shellscript; charset="us-ascii"
    MIME-Version: 1.0
    Content-Transfer-Encoding: 7bit
    Content-Disposition: attachment; filename="userdata.txt"

    #!/bin/bash
    sudo ufw disable
    --//
    ```

5. Start AWS EC2 Instance
6. Remove UFW Rules and Disable UFW by default

    ```bash
    sudo ufw disable
    ```

7. Remove User Data from EC2 Instance (optional)

## Testing Your Configuration

Once you've set everything up, you can test your firewall by trying to access your EC2 instance from different IP addresses or running network diagnostic tools.

## Conclusion

Configuring UFW for your AWS EC2 instance can be tricky for beginners, but with careful planning and understanding of how UFW and AWS Security Groups interact, you can create a secure environment for your applications. Don’t rush the process — take your time to set up, test, and refine your firewall settings.

## Reference

- [View and update the instance user data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-view-change)
- [Stackoverflow Threads](https://stackoverflow.com/a/46546525/15878247)
- [UFW Essentials: Common Firewall Rules and Commands](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)
