---
draft: true #Todo: Change False to post Blog
authors: 
  - taufiqpsumarna
title: "Hello World" #Todo: Add Blog Title
date: 2024-09-06 #Todo: Change Date
description: "Hello World Blog Template" #Todo: Add Short Description / Subtitle
categories: [Blog] #Todo: Categories Blog, Medium, Other
tags: [Hello-World] #Todo: Add Blog Tags
---

# Hello World

![This Is Picture](/assets/images/hello_world.jpg)


``` bash
echo "Hello World"
```

## Struktur Folder Blog
```bash
blog/post
          |
          YYYY
              |
                MM
                  |
                  blog_title.md
```
!!!info
    Example: blog/post/2024/09/blog_title.md <br>
    Create post inside ```YYYY/MM``` folder

## Struktur Folder Image
```bash
blog/assets
          |
            images
                  |
                  hello_world.jpg
```
How to call image?

!!!info

    ```md
    ![This Is Picture](/blog/assets/images/hello_world.jpg)
    ```

## Reference
- [Markdown Cheat Sheets](https://www.markdownguide.org/cheat-sheet/)
- [Mkdocs Material Reference](https://squidfunk.github.io/mkdocs-material/reference/)