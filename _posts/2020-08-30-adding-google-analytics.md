---
layout: post
title: Adding Google Analytics
date: 2020-08-30 01:01:00 -0700
categories: blogging
tags: blogging
excerpt: |
  <p>Next up, adding Google Analytics to the site.</p>
---

This is a follow up to my previous posts [Blogging for free with
Jekyll]({% post_url 2020-08-29-blogging-for-free-wth-jekyll %}), and [Updating the Blog's
Theme]({% post_url 2020-08-29-jekyll-theming %}).

In this post, I'll write about the process that I am going through to add
[Google Analytics](https://analytics.google.com/) to this site.

## Getting started

One of the things that I noticed when updating the [theme](https://github.com/pages-themes/midnight) for the previous
[post]({% post_url 2020-08-29-jekyll-theming %}) was this
[section](https://github.com/pages-themes/midnight#configuration-variables):

> Additionally, you may choose to set the following optional variables:
>
> ```yml
> show_downloads: ["true" or "false" to indicate whether to provide a download URL]
> google_analytics: [Your Google Analytics tracking ID]
> ```

So, after getting my Google Analytics tracking code, I updated `_config.yml`, and tried it out. Unlike my experience
with changing the theme, this worked exactly as advertised.

## Done

That's it. Done. Google Analytics are now part of this blog.
