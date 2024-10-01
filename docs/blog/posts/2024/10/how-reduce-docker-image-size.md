---
draft: false #Todo: Change False to post Blog
authors: 
  - taufiqpsumarna
title: "How to Reduce Docker Image Size and Ensure Security in Your Docker Images" #Todo: Add Blog Title
date: 2024-10-01 #Todo: Change Date
description: "Docker has revolutionized the way we deploy applications, but managing large images can be a challenge." #Todo: Add Short Description / Subtitle
categories: [Blog] #Todo: Categories Blog, Medium, Other
tags: [docker, security, build] #Todo: Add Blog Tags
---

![How to Reduce Docker Image Size and Ensure Security in Your Docker Images](/assets/images/how-reduce-docker-image-size.png)

Docker has revolutionized the way we deploy applications, but managing large images can be a challenge. Not only do larger images consume more storage space and bandwidth, they also pose potential security risks if not managed properly. In this blog post, we'll explore strategies to reduce Docker image size while ensuring the security of your images.

## Why we need to reduce docker images?
 Reducing the size of Docker images is crucial for several reasons:

1. Storage Efficiency: Larger images consume more disk space, which can quickly lead to limited storage on systems where containers are deployed. Smaller images require less storage, allowing you to manage multiple applications and their environments more efficiently.

2. Performance Optimization: A smaller image size means faster download times when deploying new containers or pushing them to registries. Faster deployment speeds improve productivity and can speed up the delivery of updates.

3. Bandwidth Savings: When images are larger, transferring them over networks (such as from a registry to a Docker host) consumes more bandwidth. Reducing image size means less time spent downloading and more time running applications.

4. Security: Larger images can potentially contain unnecessary files or libraries that increase the attack surface of your containers. Smaller images are easier to audit, reducing the risk of vulnerabilities being exploited.

5. Scalability: In environments with limited resources (like edge devices or cloud instances), smaller images help optimize resource usage, allowing for more applications to be deployed on a single host.

## 1. Use Multi-Stage Builds
Multi-stage builds are a powerful feature in Docker that allows you to optimize the final image size by leveraging intermediate containers for different stages of the build process. This technique is particularly useful for compiling code on one container and then copying only the necessary binaries to the final image.

Here's an example:

```Dockerfile
# Stage 1: Compile application
FROM golang:alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp main.go

# Stage 2: Create minimal runtime environment
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/myapp .
CMD ["./myapp"]
```

In this example, the `golang` image is used to compile the application (`Stage 1`), and then only the compiled binary is copied into a minimal `alpine:latest` image for the final runtime environment (`Stage 2`). This results in a significantly smaller final image.

## 2. Minimize Image Layers
Each instruction in your Dockerfile creates a new layer. Keeping these layers to a minimum helps reduce the size of the final image. Here are some tips to minimize layers:

- Combine `RUN` commands: Combine multiple `RUN` commands into one whenever possible. This reduces the number of layers and speeds up the build process.
  
  ```Dockerfile
  # Bad practice
  RUN apt-get update && apt-get install -y \
    package1 \
    package2
  
  # Good practice
  RUN apt-get update && apt-get install -y package1 package2
  ```

- Remove unnecessary files and caches: After installing packages, remove any temporary or unnecessary files to reduce the size of the final image.

  ```Dockerfile
  RUN apt-get update && apt-get install -y \
    package1 \
    package2
  RUN rm -rf /var/lib/apt/lists/*
  ```

## 3. Use Smaller Base Images
Choosing the right base image can have a significant impact on your Docker image size. Official images from reputable sources are usually well-maintained and secure, but they may also be larger in size. Look for minimal or slim variants of popular base images like `Alpine`, `Ubuntu`, or `Debian`.

```Dockerfile
# Instead of using the full Ubuntu image
FROM ubuntu:latest

# Use a smaller variant
FROM ubuntu:slim
```

## 4. Optimize Dependencies and Libraries
Ensure that your application dependencies are optimized for size. For example, if you're using Python libraries, consider using `pip install --no-cache-dir` to avoid including unnecessary cache files in the image.

```Dockerfile
# Example Dockerfile snippet for optimizing Python dependencies
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## 5. Leverage Multi-Architecture Images
Docker supports multi-architecture images, which allows you to build and run containers on different platforms (e.g., AMD64, ARM64). This can help reduce the size of your images by targeting specific architectures.

```sh
# Build an image for a specific architecture
docker buildx create --use
docker buildx build --platform linux/amd64 -t myapp:latest .
```

## 6. Regularly Prune Docker Resources
Regularly prune unused Docker objects to free up server disk space and maintain optimal performance. You can use the following commands to clean up unnecessary data:

Docker system prune: Remove all stopped containers, unused networks, dangling images, and build cache. 
  
  ```sh
  docker system prune -a
  ```

!!!tip
    I recommend do this command only on staging / development server, if you want to run in production please do manually volume remove by
    ```sh
    docker image ls
    docker image volume rm <volume_id>
    ```

## 7. Secure Your Docker Images
Last thing is ensuring the security of your Docker images is crucial. Here are some best practices:

- Use trusted base images: Always start with a secure and reputable base image, such as those provided by official vendors like `Alpine`, `Ubuntu`, or `Debian`.

- Minimize exposure to vulnerabilities: Regularly update your base images, application dependencies, and Docker itself. Use tools like `Trivy` for scanning your images for vulnerabilities.

  ```sh
  docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH <image_name>
  ```
  Example output:

![Trivy Docker Image Scan](/assets/images/trivy-scan-output.png)

!!!tip
    Instead using `latest` docker image you can specify docker image version when create `dockerfile` to ensure image stability and security, for example:
    ```dockerfile
    FROM python:latest ❎
    FROM python:3.9.20-alpine3.20 ✅
    ```

## Conclusion
Reducing Docker image size not only helps with storage and performance but also enhances security by minimizing the attack surface. By using multi-stage builds, minimizing layers, selecting smaller base images, optimizing dependencies, leveraging multi-architecture images, regularly pruning resources, and securing your images, you can create more efficient and secure Docker deployments.

Remember to continually evaluate and optimize your Dockerfile practices to ensure that your application remains performant and secure.

## Reference

 - [Docker Multi-Stage Builds](https://docs.docker.com/develop/develop-images/multistage-build/)
 - [Docker Base Images](https://hub.docker.com/_/ubuntu)
 - [Docker System Prune Command](https://docs.docker.com/engine/reference/commandline/system_prune/)
 - [DZone: Optimizing Docker Images for Size](https://dzone.com/articles/optimizing-docker-images-for-size)
 - [Docker Inc. Blog: Building Secure and Efficient Docker Images](https://www.docker.com/blog/intro-guide-to-building-secure-and-efficient-docker-images/)
 - [Trivy Documentation](https://aquasecurity.github.io/trivy/v0.55/)