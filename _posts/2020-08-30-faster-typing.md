---
layout: post
title: How Breaking My Hand Improved My Typing
date: 2020-08-30 01:52:00 -0700
categories: tools
---

Back in February of 2020, I was involved in a bicycle accident and broke my hand 🤕.

![Broken hand](/assets/img/broken-hand.jpg) _Ouch!_

Don't worry, the hand is fine, the bike is fine, and so is the dog...

During my recovery, I was fortunate enough to be able to continue working with one good hand. What I lacked in speed, I
made up for in perseverance (and hours). That was enough to get me through my most of my responsibilities... but not
all...

One of my responsibilities a developer advocate is that I put together developer materials like videos and screencasts,
some of them involve text being entered being typed. I was never that great or consistent at typing with two hands, and
there was no way I was going to be able to do this with one hand. So I started thinking instead.

What if I could get someone else to type for me? Better yet, what if there was some software I could use to type for me?
Unfortunately, I couldn't find anything that did what I needed it to do. The thing that came closest was
[AppleScript](https://dougscripts.com/itunes/itinfo/keycodes.php).

Which is where I started.

Some of limitations that I encountered were:

- AppleScript the language was very foreign to me, however, AppleScript automation supports JavaScript (which is what I
  ended up using),
- The APIs to send keys aren't documented very well and resources were hard to come by, and
- Sending individual keystrokes using the API was very onerous and required many, many keystrokes.

I ~~thought~~ knew I could do better. So I did what any self-respecting software engineer would do. I wrote a console
application named [sendkeys-macos](https://github.com/socsieng/sendkeys-macos) and published it to
[npm](https://www.npmjs.com/package/sendkeys-macos).

![npm install sendkeys-macos --global](https://github.com/socsieng/sendkeys-macos/raw/master/docs/sendkeys.gif)

```
npm install sendkeys-macos --global
```

With this tool, I created an abstraction that would send keystrokes to a given macOS application. It supports a typing
at a constant rate, inserting arbitrary pauses between keystrokes, and modifier key combinations.

Check out the following example:

![Hello world](https://github.com/socsieng/sendkeys-macos/raw/master/docs/example1.gif)

```
sendkeys -a "Notes" -c "Hello<p:1> world<c:left:option,shift><c:i:command>"
```

The library also supports input from a text file or `stdin`. Check it out on
[GitHub](https://www.npmjs.com/package/sendkeys-macos).

I would have never sat down to write this library if it wasn't for the broken hand. With two hands, my typing was slow
and error prone enough to be a source of frustration, but not bad enough to do something about it. Thanks to the bike
accident, it became bad enough to do something about. And now, my typing speed and accuracy has never been better.

---

Checkout a longer example below:

![Google Pay Vue](/assets/img/google-pay-vue.gif) _Look Ma, I'm integrating Google Pay into a Vue application! I'm doing
it so fast!_
