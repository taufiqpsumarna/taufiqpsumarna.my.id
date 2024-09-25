---
draft: false #Todo: Change False to post Blog
authors: 
  - taufiqpsumarna
title: "How To Running ChatGPT Locally Using Docker OpenWebUI" #Todo: Add Blog Title
date: 2024-09-25 #Todo: Change Date
description: "Having the ability to run models locally can provide you with greater control, privacy, and customization" #Todo: Add Short Description / Subtitle
categories: [Blog] #Todo: Categories Blog, Medium, Other
tags: [AI , docker, ollama, openwebui] #Todo: Add Blog Tags
---

![openwebui banner](/assets/images/openwebui-ollama-docker.png)

# Running ChatGPT Locally Using Docker OpenWebUI

In the evolving world of artificial intelligence, having the ability to run models locally can provide you with greater control, privacy, and customization. This guide will walk you through setting up ChatGPT locally using Docker and OpenWebUI, in this demo we utilizing the Phi3.5 model also you can find other model in here [Ollama Model Library](https://ollama.com/library) I will also cover an optional setup for leveraging NVIDIA GPUs in WSL 2 on Ubuntu. Let’s dive in!

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. Docker: Make sure Docker is installed and running. You can download it from the [official Docker website](https://www.docker.com/get-started).

2. Docker Compose: While Docker usually comes with Docker Compose, verify it’s available by running `docker-compose --version` in your terminal.

3. Git: You will need Git to clone the repository.

4. NVIDIA GPU (optional): If you plan to use GPU acceleration, ensure you have a compatible NVIDIA GPU and the necessary drivers installed.

5. WSL 2: For users on Windows, ensure you have WSL 2 enabled. Check [Microsoft's official guide](https://docs.microsoft.com/en-us/windows/wsl/install) for installation instructions.

6. Sufficient Hardware: Depending on the model and usage, ensure your machine has enough CPU, RAM, and preferably a GPU for better performance.

## Step-by-Step Guide

### Step 1: Configure Docker Compose

Inside the cloned repository, you should find a `docker-compose.yml` file. This file defines the services, networks, and volumes for your application. Open it in a text editor and modify it if necessary.

Here’s a basic example of what the `docker-compose.yml` might look like for the Phi3.5 model:

```yaml
version: '3.9'

services:

  webui:
    image: ghcr.io/open-webui/open-webui:main
    expose:
     - 8080/tcp
    ports:
     - 8080:8080/tcp
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - open-webui:/app/backend/data
    depends_on:
     - ollama

  ollama:
    image: ollama/ollama
    expose:
     - 11434/tcp
    ports:
     - 11434:11434/tcp
    healthcheck:
      test: ollama --version || exit 1
    command: serve
    volumes:
      - .ollama:/root/.ollama

volumes:
  ollama:
    external: true
  open-webui:

```

### Step 3: Build and Run the Docker Container

In your terminal, navigate to the directory containing the `docker-compose.yml` file and run:

```bash
docker-compose up
```

This command builds the Docker image and starts the container. If this is the first time you are running it, it may take some time to download the necessary images.

### Step 4: Access OpenWebUI

[openwebui signup](/assets/images/openwebui-signin.png)

Once the container is running, you can access the OpenWebUI interface by navigating to `http://localhost:8080` in your web browser. This interface allows you to interact with your ChatGPT model seamlessly.

!!!tip
    ![openwebui signup](/assets/images/openwebui-signup.png)
    For the first time you need create a local user by clicking up `sign up`, I took 30 minutes to realize it LOL 😂

### Step 5: Customizing the Setup

![OpenWebUI Demo](https://docs.openwebui.com/assets/images/demo-d3952c8561c4808c1d447fc061c71174.gif)

- Model Parameters: You can customize various parameters related to the model’s behavior by adjusting environment variables in the `docker-compose.yml` file.
  
- Persistent Data: Any data you want to persist, such as user interactions or model outputs, can be stored in the `open-webui` docker volume.

### Step 6: Stopping the Docker Container

To stop the container, simply go back to your terminal and press `Ctrl+C`. If you want to remove the containers, use:

```bash
docker-compose down
```

## Bonus Content: How to Setting Up NVIDIA GPU support with windows WSL 2 and Docker on Ubuntu LTS

In this demo video (Bahasa): [Menjalankan ChatGPT secara lokal menggunakan docker openwebui dengan model phi3.5](https://youtu.be/o-A27OlPWcw)

!!!info "System Specification"
      Processor  : 12th Gen Intel(R) Core(TM) i5-12450H
      CPU cores  : 12 @ 2496.008 MHz
      GPU        : NVIDIA GeForce RTX 3050 Laptop GPU, compute capability 8.6
      AES-NI     : ✔ Enabled
      VM-x/AMD-V : ✔ Enabled
      RAM        : 7.6 GiB
      Swap       : 2.0 GiB
      Disk       : 2.0 TiB
      Distro     : Ubuntu 24.04.1 LTS
      Kernel     : 5.15.153.1-microsoft-standard-WSL2
      VM Type    : WSL version: 2.2.4.0
      Operating system: Windows 11 - 64 Bit

If you have an NVIDIA GPU like me and want to leverage its power to enhance the performance of your ChatGPT model, follow these steps:

### Step 1: Install WSL 2 and Ubuntu LTS

1. Enable WSL: Open PowerShell as an administrator and run:

   ```powershell
   wsl --install
   ```

2. Set WSL 2 as Default:

   ```powershell
   wsl --set-default-version 2
   ```

3. Install Ubuntu LTS: You can find it in the Microsoft Store. Once installed, open it to complete the setup.

### Step 2: Install NVIDIA Drivers

1. Download and Install NVIDIA Drivers: Ensure you have the latest NVIDIA drivers that support WSL. You can download them from the [NVIDIA website](https://www.nvidia.com/Download/index.aspx).

2. Install CUDA Toolkit: Follow the instructions on the [CUDA Toolkit Installation Guide](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#installation) to set it up within your WSL environment.

### Step 3: Install Docker in WSL 2

1. Install Docker: Follow these commands within your WSL terminal:

   ```bash
   sudo curl -sL https://get.docker.com
   ```

2. Start Docker:

   ```bash
   sudo service docker start
   ```

3. Add your user to the Docker group (to avoid using `sudo` with Docker):

   ```bash
   sudo usermod -aG docker $USER
   ```

   After running this command, log out and log back into your WSL terminal.

### Step 4: Install NVIDIA Container Toolkit

1. Set Up the NVIDIA Docker Toolkit:
   1.1 Configure the production repository:

    ```bash
      curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
        && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
          sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
          sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
    ```

    1.2 Update the packages list from the repository and install Install the NVIDIA Container Toolkit packages

    ```bash
      sudo apt-get update
      sudo apt-get install -y nvidia-container-toolkit
    ```

   Follow the instructions from the [NVIDIA Docker documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker) to install the NVIDIA Container Toolkit, which allows Docker to use your NVIDIA GPU.

2. Configure NVIDIA Docker Toolkit

   ```bash
    sudo nvidia-ctk runtime configure --runtime=docker
    sudo systemctl restart docker
   ```

3. Restart your system.

### Step 5: Configure Docker to Use the GPU

After installing NVIDIA Docker Toolkit and restart system, Modify your `docker-compose.yml` file to enable GPU support:

```yaml
services:

  webui:
    image: ghcr.io/open-webui/open-webui:main
    expose:
     - 8080/tcp
    ports:
     - 8080:8080/tcp
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - open-webui:/app/backend/data
    depends_on:
     - ollama

  ollama:
    image: ollama/ollama
    expose:
     - 11434/tcp
    ports:
     - 11434:11434/tcp
    healthcheck:
      test: ollama --version || exit 1
    command: serve
    volumes:
      - .ollama:/root/.ollama
    #Enable GPU Support
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              device_ids: ['all']
              capabilities: [gpu]

volumes:
  ollama:
    external: true
  open-webui:
```

### Step 6: Build and Run the Docker Container with GPU Support

Now, you can build and run your container, and it will utilize your NVIDIA GPU 💪

```bash
docker-compose up
```

### Step 7: Access OpenWebUI

Access the OpenWebUI as described in the previous steps, and you should now have a performance boost from your NVIDIA GPU.

## Benefits of Running ChatGPT Locally

1. Privacy: Keeping your data local means it’s not shared with third-party servers.
2. Control: You can modify and configure the model as needed.
3. Performance: Utilizing a GPU can significantly enhance performance, especially for larger models.

## Conclusion

Running ChatGPT locally using Docker OpenWebUI is a straightforward process that provides numerous benefits. With the optional setup for NVIDIA GPU support on WSL 2 and Ubuntu , you can take your local AI capabilities to the next level.

Feel free to dive into the configuration files and experiment with different settings to optimize your local environment 😁

---

### Additional Resources

- [Project Repository](https://github.com/taufiqpsumarna/openwebui-demo)
- [Docker Documentation](https://docs.docker.com/)
- [OpenWebUI GitHub Repository](https://github.com/open-webui/OpenWebUI)
- [Ollama Model](https://ollama.com/library)
- [NVIDIA Docker Documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker)
- [WSL Installation Guide](https://docs.microsoft.com/en-us/windows/wsl/install)
