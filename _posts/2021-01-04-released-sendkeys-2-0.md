---
layout: post
title: 'Released: sendkeys 2.0'
date: 2021-01-04 13:47:58 -0800
categories: tools
image: https://github.com/socsieng/sendkeys/raw/main/docs/images/accessibility.gif
tags: [tools, sendkeys, brew, mouse]
---

I'm happy to announce the release of [`sendkeys 2.0`](https://github.com/socsieng/sendkeys). 🚀🎉!

This is a major release and includes the following:

- Rewrite from JavaScript to Swift.
- Installable via [homebrew](https://brew.sh/).
- **Support for automating mouse events!!!**

## Installation

```sh
brew install socsieng/tap/sendkeys
```

## Example usage

```sh
sendkeys --application-name "Notes" --characters "Hello<p:1> world<c:left:option,shift><c:i:command>"
```

![hello world example](https://github.com/socsieng/sendkeys/raw/main/docs/images/example1.gif)

_Activates the Notes application and types `Hello` (followed by a 1 second pause) and `world`, and then selects the word
`world` and changes the font to italics with `command` + `i`._

```sh
sendkeys -c "<m:100,300,300,300:0.5><p:0.5><m:100,300:0.5>"
```

![mouse move example](https://github.com/socsieng/sendkeys/raw/main/docs/images/mouse.gif)

_Moves the mouse cursor from (100, 300) to (300, 300), pausing for 0.5 seconds and moving back to (100, 300)._

## Why rewrite?

You might be wondering about why anyone would bother rewriting anything from JavaScript to Swift. In my case, it was to
provide mouse automation capabilties and overall simplification. With the rewrite, I was able to unify how keyboard and
mouse events are dispatched to macOS using Quartz instead of AppleScript (`osascript` for keyboard) and Quartz for
mouse.

## Prerequisites

`sendkeys` requires macOS 10.11 or later.

When running from the terminal, ensure that the terminal has permission to use accessibility features. This can be done
by navigating to System Preferences > Security & Privacy > Privacy > Accessibility and adding your terminal application
there.

![accessibility settings](https://github.com/socsieng/sendkeys/raw/main/docs/images/accessibility.gif)

## What's next?

There are some additional features and learnings that I got out of this release that I plan to cover in subsequent
posts. Keep an eye out for:

- Recording and replaying mouse events, and
- Automating releases with GitHub Actions and `brew`.
