---
layout: post
title: 'Maintaining a Jekyll Blog with Gitpod'
date: 2020-09-05 05:00:16 +0000
modified_date: 2020-09-05 20:19:17 +0000
categories: tools
tags: tools
---

I'm editing this post with on my iPad with [gitpod.io](https://gitpod.io/), and I'm very impressed. And I'm not easily
impressed.

I first heard about gitpod.io when saw their post about how
[Gitpod is now Open Source 🎉](https://www.gitpod.io/blog/opensource/). When I started looking for solutions to manage
the blog on my iPad, I thought I'd give it a try.

The environment is so familiar. It is pretty much Visual Studio in the browser, with some linux based environment
accessible through the integrated terminal.

Almost everything that I've tried so far has worked (note that I'm not trying to break it... just use it):

- [x] `command` + `shift` + `p` to toggle word wrap,
- [x] Install `prettier` extension to automatically format posts as I save them,
- [x] Executing and running the Jekyll server (`bundle exec jekyll serve --watch`),
- [x] Previewing the site on Gitpod,
- [x] Creating a new post with a custom script (`scripts/new-post.sh tools "Maintaining a Jekyll Blog with Gitpod"`),
- [x] Syntax highlighting,
- [ ] Upload an image (e.g. screenshot) via Gitpod (haven't figured out how to do this yet),
- [x] Commit files locally, and
- [x] Push files to GitHub.

Things that don't work:

- [ ] Upload an image (e.g. screenshot) via Gitpod (haven't figured out how to do this yet),
- [ ] Terminating a command in the terminal with `ctrl` + `c` (at lease on the iPad with the Smart Keyboard),

I haven't spent very long with Gitpod, but I'm happy with the experience so far. It isn't going to replace my laptop
environment, but I think its a viable alternative for when I'm on the iPad (with the Apple Smart Keyboard).

I'll keep this post updated as I learn more.
