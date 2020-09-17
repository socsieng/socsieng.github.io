---
layout: post
title: 'Released: sendkeys-macos Now Stable 🎉'
date: 2020-09-16 20:57:49 -0700
categories: tools
image: /assets/img/google-pay-size.gif
tags: [tools, sendkeys-macos, npm]
---

I've just released stable version of [`sendkeys-macos`](https://www.npmjs.com/package/sendkeys-macos) as v1.0.1.

I've been wanting to do this for a while now, but the main thing stopping was the absence of unit tests and some
additional project hygiene.

Hygiene related activities include:

- Unit tests
- Automation
  - Add [Prettier for consistent automatic code
    formatting]({% post_url 2020-09-10-automated-code-formatting-with-prettier %})
  - Add [Husky] git hooks
  - Auto-generating change logs with [`release-please`](https://github.com/GoogleCloudPlatform/release-please-action)
  - Automated publish to npm

Checkout the project on [github](https://github.com/socsieng/sendkeys-macos). Let me know if you have any issues. Pull
requests welcome.

![Google Pay button size example](/assets/img/google-pay-size.gif) _The latest example of the `sendkeys-macos` in action
(and gratuitous animation)._
