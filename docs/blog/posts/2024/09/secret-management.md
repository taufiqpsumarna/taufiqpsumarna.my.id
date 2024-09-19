---
draft: false #Todo: Change False to post Blog
authors: 
  - taufiqpsumarna
title: "Infisical: The Open Source Secret Management Solution You Need" #Todo: Add Blog Title
date: 2024-09-12 #Todo: Change Date
description: "Managing secrets securely is one of the key challenges in modern software development" #Todo: Add Short Description / Subtitle
categories: [Blog] #Todo: Categories Blog, Medium, Other
tags: [tutorial, devsecops, docker, infisical, secret management, security] #Todo: Add Blog Tags
---

![This Is Picture](/assets/images/infisical-banner.png)

## Infisical: The Open Source Secret Management Solution You Need

Managing secrets securely is one of the key challenges in modern software development. Secrets like API keys, database credentials, and tokens are sensitive data that, if exposed, can lead to security breaches, unauthorized access, and system compromises. To address this, secret management tools are critical, and Infisical, an open-source solution, offers an effective way to manage your secrets securely.

In this blog post, we’ll explore what Infisical is, why secret management is crucial, and why Infisical might be the right choice for your secret management needs.

## What is Infisical?

Infisical is an open-source secret management platform designed to store, manage, and secure sensitive information (i.e., secrets) used in your applications. As an open-source tool, it allows developers and security professionals to audit, modify, and customize it according to their needs. Infisical integrates seamlessly with modern CI/CD pipelines, infrastructure as code (IaC), and DevOps workflows.

With Infisical, developers can securely manage secrets such as:

- API keys
- Database credentials
- OAuth tokens
- SSH keys

## Why Infisical?

Infisical helps developers achieve secure centralized secret management and provides all the tools to easily manage secrets in various environments and infrastructure components. In particular, here are some of the most common points that developers mention after adopting Infisical:

- Streamlined local development processes (switching .env files to Infisical CLI and removing secrets from developer machines).
- Best-in-class developer experience with an easy-to-use Web Dashboard.
- Simple secret management inside CI/CD pipelines and staging environments.
- Secure and compliant secret management practices in production environments.
- Facilitated workflows around secret change management, access requests, temporary access provisioning, and more.
- Improved security posture thanks to secret scanning, granular access control policies, automated secret rotation, and dynamic secrets capabilities.

## Why Do We Need Secret Management?

Secrets are integral to the functioning of most applications. These credentials allow communication between services, databases, and APIs. Improper handling of secrets, such as storing them in plain text or hardcoding them in the application’s codebase, exposes them to risks like:

- Unauthorized Access: If secrets are stored insecurely, bad actors can gain access to critical systems or sensitive data.
- Security Breaches: Exposed secrets can lead to attacks, including data breaches, where sensitive information is stolen or leaked.
- Compliance Violations: Many regulations require companies to protect sensitive data. Failing to manage secrets properly can result in legal consequences and penalties.
  
For these reasons, it is essential to use a secret management tool that not only stores secrets securely but also ensures that they are used safely within your workflows.

## Why Choose Infisical for Secret Management?

1. Open Source and Transparent
Infisical’s open-source nature allows you to inspect the source code, audit the system for vulnerabilities, and even customize it to suit your organization’s specific needs. This level of transparency builds trust in the system, as users can be confident that no hidden vulnerabilities exist.

2. End-to-End Encryption
Infisical encrypts secrets both at rest and in transit, ensuring that even if someone gains access to the server or data, the secrets remain unreadable without the proper decryption keys.

3. Seamless Integration
Infisical integrates smoothly with popular tools like Docker, Kubernetes, AWS, GitHub Actions, and more. This means you can inject secrets directly into your containers or CI/CD pipelines without risking exposure.

4. Role-Based Access Control (RBAC)
Infisical provides granular access control, ensuring that only authorized personnel can access certain secrets. This reduces the risk of insider threats and ensures that sensitive data is handled on a need-to-know basis.

5. Version Control and Auditing
Infisical logs all changes to secrets, allowing teams to track who accessed or modified them and when. This is essential for maintaining security, debugging issues, and complying with regulatory requirements.

6. Collaboration Made Easy
Teams can use Infisical to collaborate securely on shared secrets. The platform ensures that secrets are always up to date across environments, eliminating the common issue of outdated credentials or manual updates.

## How To Use in Local Development Environment

In this demo we will use infisical CLI for retrieve secret from Infisical Cloud or Self-host

1. Cloud or [Self-host](https://infisical.com/docs/self-hosting/overview)
2. Create Project `+ Add New Project` 
   ![This Is Picture](/assets/images/infisical-01-create-project.png)
3. Add Project Secret `Project Name > + Add Secret` in here you can add secret individually
   ![This Is Picture](/assets/images/infisical-02-create-secret.png)
   ![This Is Picture](/assets/images/infisical-03-created-secret.png)
4.  Or upload .env file  `Development > Explore > Drag and Drop a .env, .json, or .yml`
   ![This Is Picture](/assets/images/infisical-04-upload-file.png)
5. Create Service Token: Access Control > Service Token
   ![This Is Picture](/assets/images/infisical-05-access-token.png)
   ![This Is Picture](/assets/images/infisical-05-1-access-token.png)
6. Install Infisical CLI, Guide [Here](https://infisical.com/docs/cli/overview)
7. Login using web auth (default)
   ```bash
      #Login infisical Self-host using web-auth
      infisical login
      ========================================================================
      ✔ Self Hosting
      Domain: https://INFISICAL_URL

      To complete your login, open this address in your browser: https://INFISICAL_URL/login?callback_port=34715 

      Once login is completed via browser, the CLI should be authenticated automatically.
      However, if browser fails to communicate with the CLI, please paste the token from the browser below.

      Token: Browser login successful
      >>>> Welcome to Infisical! You are now logged in as EMAIL_ACCOUNT <<<< 

      Quick links
      - Learn to inject secrets into your application at https://infisical.com/docs/cli/usage
      - Stuck? Join our slack for quick support https://infisical.com/slack
   ```
8. Infisical project init
   ```bash
      infisical init
      ========================================================================
      ✔ YOUR_ORG
      ✔ infisical-demo
      cat .infisical.json
      {
         "workspaceId": "xxxxxxx-xxxxx-xxxx-xxxx-xxxxxxxxxx",
         "defaultEnvironment": "dev",
         "gitBranchToEnvironmentMapping": null
      }                                             
   ```
9. Run your apps with infisical secret using `infisical run -- your-run-apps-script`
   ```bash
      infisical run --env=dev --path="/" -- docker run hello-world
      ========================================================================
      4:11PM INF Injecting 1 Infisical secrets into your application process      
   ```
10. Generate .env file using `infisical export`
   ```bash
      infisical export --env=dev > .env
      ========================================================================
      #Show .env File content
      ls -alh
      total 24K
      drwxr-xr-x  2 dash15 dash15 4.0K Sep 19 16:18 .
      drwxrwxrwt 39 root   root    12K Sep 19 16:09 ..
      -rw-r--r--  1 dash15 dash15   29 Sep 19 16:18 .env
      -rw-------  1 dash15 dash15  134 Sep 19 16:09 .infisical.json

      cat .env
      APP_KEY='1234567890-app-key'
   ```

## How To Use in Gitlab CI/CD Environment

In this demo we will use Infisical with Gitlab CI/CD Pipeline

1. Create Machine Identity `Organization Settings > Machine Identities > + Create identity`
2. Choose `universal-auth` method for generating `INFISICAL_TOKEN` [Machine Identity](https://infisical.com/docs/cli/commands/login#machine-identity-authentication-quick-start)
3. Setup Gitlab CI/CD Variables
 
    !!!info "Gitlab CI/CD Variables List"
         - INFISICAL_URL = YOUR_INFISICAL_URL
         - INFISICAL_PROJECT_ID = YOUR_INFISICAL_PROJECT_ID
         - INFISICAL_ENV_PATH = /PATH/TO/PROJECT-GROUP (Leave empty use default path "/")
         - INFISICAL_ENVIRONMENT = Dev | Staging | Prod
         - INFISICAL_CLIENT_ID = Machine Identity Client ID
         - INFISICAL_CLIENT_SECRET = Machine Identity Secret Token
         - GITLAB_INFISICAL_CLI_VERSION = Infisical CLI Version (Leave empty use default 0.31.0)

4. Setup Gitlab Pipeline, create `.gitlab-ci.yml` file

<script src="https://gist.github.com/taufiqpsumarna/53ea8fe30455f65dcafc3a9a12fe14f6.js"></script>

   ![This Is Picture](/assets/images/infisical-06-gitlab-pipeline.png)

## Conclusion

Managing secrets securely is not just a best practice—it’s a necessity. Infisical, as an open-source secret management solution, offers a blend of security, transparency, and ease of use, making it a strong contender for anyone looking to secure their application secrets.
By implementing Infisical, you can reduce the risk of security breaches, unauthorized access, and compliance violations, all while enabling your team to collaborate effectively and securely on sensitive data.

### Reference

- [infiscal Official Website](https://infisical.com/)
- [infisical documentation](https://infisical.com/docs/documentation/getting-started/introduction)
- [infisical CLI documentation](https://infisical.com/docs/cli/overview)
