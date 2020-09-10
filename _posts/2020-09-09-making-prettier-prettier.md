---
layout: post
title: 'Making Prettier Prettier'
date: 2020-09-09 18:44:03 -0700
categories: tools
tags: [tools, prettier, tips]
---

I like having consistently formatted code, but I hate formatting code. I'm also super pedantic about how my code should
be formatted.

![Prettier example](/assets/img/prettier-code.png)

In this post, I'll show you how to apply a work-around for [Prettier](https://prettier.io/) that for me was always a
blemish on an otherwise awesome code formatter. But first, some context.

## Context

Prettier describes itself as _an opinionated code formatter_ which I'm cool with, as long as these opinions are the same
as mine.

Where Prettier and I diverge is whether or not operators should appear at the beginning or the end of a line.

Prettier:

```js
// prettier-ignore
const booleanResult =
  condition1 === true &&
  condition2 === true &&
  condition3 === true;
```

Me ([plus a number of people on GitHub](https://github.com/prettier/prettier/issues/3806)):

```js
// prettier-ignore
const booleanResult =
  condition1 === true
  && condition2 === true
  && condition3 === true;
```

Prettier is so useful that I was willing to overlook the cancerous eyesore 🤮 that is the first example if it mean that
I didn't have to format the code myself. So I sucked it up and moved on... That was until this weekend when I stumbled
upon some
[new activity on a related Github issue](https://github.com/prettier/prettier/issues/3806#issuecomment-687278788).
[@btmills](https://github.com/btmills) had updated his [pull request](https://github.com/prettier/prettier/pull/7111)
and included instructions on how to use it. 🎉

I [applied](https://github.com/google-pay/google-pay-button/commit/95bc7ced6b1b37bde2ac21267ba8e781bdff0501) it to one
of [repositories](https://github.com/google-pay/google-pay-button/) that I manage but found that it wasn't completely
straight forward so I thought I'd share the additional steps required to get it working.

## Environment

I'm using npm (instead of yarn) with the following npm scripts in my `package.json` which is where I think the problem
lies:

```json
{
  "scripts": {
    "pretty": "prettier . --write --loglevel warn",
    "pretty:check": "prettier . --check"
  }
}
```

## Installation

```sh
npm install --save-dev prettier@npm:@btmills/prettier@^2.1.1
```

For some reason, `prettier@npm:@btmills/prettier@^2.1.1` does not create an executable under
`node_modules/.bin/prettier`, however, `prettier` does. So as a work-around, I referenced
`node_modules/prettier/bin-prettier.js` directly instead of `prettier` in my `package.json`:

```json
{
  "scripts": {
    "pretty": "node_modules/prettier/bin-prettier.js . --write --loglevel warn",
    "pretty:check": "node_modules/prettier/bin-prettier.js . --check"
  }
}
```

I'm told that the package name format (`prettier@npm:@btmills/prettier@^2.1.1`) is specific to yarn, and works as
expected with yarn.

As an alternative, I could have used the github package name `npm install --save-dev prettier/prettier#pull/7111/head`
but I found that the installation process was significantly slower than `prettier@npm:@btmills/prettier@^2.1.1`. I also
liked the fact that the yarn syntax references an npm package and is therefore immutable. So I stuck with that.

## Looking forward

Yes, this is a work-around that I'd prefer not to have to make, but at the same time, it doesn't cause my eyes to tear
up when I see my operators in the wrong location.

I plan to stick to this until Prettier `3.0` is released with the _correct_ opinion applied.
