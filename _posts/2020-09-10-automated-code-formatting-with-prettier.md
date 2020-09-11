---
layout: post
title: 'Automated Code Formatting With Prettier'
date: 2020-09-10 19:46:00 -0700
categories: tools
tags: [tools, prettier, tips, code, formatting, productivity]
---

If you're not using an automatic code formatter, you're wasting time (and money). Boost your team's productivity by
integrating one into your workflow today.

Consistency is important when maintaining large code bases, across multiple contributors (especially for open source
projects). If consistency is important to you, then there are a few ways to maintain consistency in your code base:

1. Code review
2. Linting
3. Automatic formatting

Each option is built on top of the options before them.

## During code review

I order to maintain consistency during code reviews, you need to start with a coding standards/guidelines.

It ~~could~~ should be as simple as:

> We use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) here.

Stick to a well known style guide unless you have a good reason not to... and don't forget to actually do the code
review.

## Linting

Linting builds on top of guidelines. It takes these guidelines and _codifies_ them, identifying violations before the
code is reviewed by another human.

[ESLint](https://eslint.org/) is pretty much _the_ standard for linting JavaScript.

## Automatic formatting

Automatic code formatting takes linting one step further. Instead of simply reporting violations, automatic code
formatting can fix these violations for you. Why waste your time adding a semicolon here, comma there? Put those idle
clock cycles to work.

[Prettier](https://prettier.io/) with [editor plugins](https://prettier.io/#:~:text=Editor%20Support) is a great way to
automatically format your code on `save`.

![Prettier in action](/assets/img/prettier-example.gif) _Prettier in action with Visual Studio Code._

I personally spend a lot of time with Visual Studio Code working with TypeScript and JavaScript so Prettier works really
well for me. If you're working with other technologies, look around for their equivalent tools.

## Getting started with Prettier

Using Prettier on a new code base is straight forward:

1. Install Prettier into your npm project: `npm install --save-dev prettier`
2. Install Prettier plugin for your editor ([VSCode extension](https://github.com/prettier/prettier-vscode))

   Recommended: configure VSCode to format on `save` with `.vscode/settings.json`:

   ```json
   {
     "editor.formatOnSave": true
   }
   ```

3. Configure Prettier (start with the defaults and tweak to your liking)

   This is the `.prettierrc.yml` for one of my projects:

   ```yml
   arrowParens: avoid
   printWidth: 120
   quoteProps: consistent
   semi: true
   singleQuote: true
   tabWidth: 2
   trailingComma: all
   overrides:
     - files: '*.md'
       options:
         parser: markdown
         proseWrap: always
   ```

4. I recommend adding a couple of scripts to your `package.json` to help with integration into automated builds

   ```json
   {
     "scripts": {
       "pretty": "prettier . --write --loglevel warn",
       "pretty:check": "prettier . --check"
     }
   }
   ```

   I use the first with [`husky`](https://www.npmjs.com/package/husky) on `pre-commit` to fix up formatting where I've
   used an editor without the plugin, and the second as a verification step on `build` as a catch-all where the git hook
   hasn't been installed. An example might be external contributors who use a different set of tools.

## Using Prettier on an established code base

It's easy to add Prettier to a new or small code base, but what about a large/established code base?

You've got two options:

1. **Just Do It**: let your team know what you're about to do, get those outstanding pull requests merged... Any pull
   requests the haven't been merged in time are going to have a rough time with merge conflicts.
2. **Softly-softly**: turn Prettier on for new files only, and gradually enable it for the rest of your project one file
   at a time.

If you choose the second option the `.prettierignore` file is your friend.

Add an entry for all the files that you're not ready to switch over into `.prettierignore`. Any new files added to your
project will have automated code formatting applied and when you're ready to enable Prettier on an existing file, simply
remove it from `.prettierignore`.

## Do your team a favor

Automatic code formatting will help boost your team's productivity and produce more consistent code. You'll no longer
have to worry about the little things like whitespace, commas, and semicolons, and you can focus on the things that
matter... the actual code.

_In my previous [post]({% post_url 2020-09-09-making-prettier-prettier %}), I show how you can fix one the few issues
that I have with Prettier._
