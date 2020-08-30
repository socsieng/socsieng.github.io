---
layout: post
title: Blogging for free with Jekyll
date: 2020-08-29 16:57:57 -0700
categories: blogging
---

I'm starting a blog and I don't want to pay for it. I'm cheap.

In this post, I'll share my experience of setting up a blog with [Jekyll][jekyll] and GitHub as I go through the process
myself.

## Why Jekyll and GitHub Pages?

I actually started with GitHub Pages because it's been on my list of things to try out. I landed on Jekyll because a
quick search on Google for term "github blogging" said that I should.

## Getting started

Starting with the [Jekyll][jekyll] instructions:

> ```sh
> gem install bundler jekyll
> jekyll new my-awesome-site
> cd my-awesome-site
> bundle exec jekyll serve
> # => Now browse to http://localhost:4000
> ```

Browsing the site was about what I expected. Simple and sparse, which is a great start but I'm definitely going to be
looking for a new theme (I'll cover that in another post).

![Jekyll screenshot](/assets/img/jekyll-screenshot.png) _Jekyll screenshot._

## Under the hood

I was actually more interested in understanding how the site is structured, so I fired up Visual Studio Code to have a
look inside. I was happy with what I saw initially which was very little.

### Tweaking

There were a couple of things that I did straight away because I have a particular preference for how my code should
look. So I immediately started making the following changes:

1. Initialize a git repository. I'm planning on publishing to GitHub anyway and I want to do this as early as possible
   in case I break something, I'll have a restore point.

   ```sh
   git init
   git add -A
   git commit -am 'feat: initial commit'
   ```

2. Edit site configuration with the `_config.yml` file. I updated the following `title`, `description`,
   `twitter_username`, and `github_username`.
3. I didn't like the `.markdown` extensions for the markdown files so I renamed the files to `.md`.
4. Configure VS Code with [Prettier][prettier] to automatically format the markdown files on save. I'm using the
   [Prettier VSCode extension][prettier-vscode]. This configuration makes me happy:

   1. Create `.vscode/settings.json` file:

      ```json
      {
        "editor.formatOnSave": true
      }
      ```

   2. Create `.prettierrc.yml` file:

      ```yaml
      printWidth: 120
      singleQuote: true
      tabWidth: 2
      overrides:
        - files: '*.md'
          options:
            parser: markdown
            proseWrap: always
      ```

## Publishing changes to GitHub pages

I followed the [GitHub guide][github-jekyll] to complete this section but have summarized it to:

1. Create a `github.io` repository to host the github site [`socsieng/socsieng.github.io`][socsieng.github.io].
2. Add `github-pages` plugin to `Gemfile`:

   ```ruby
   group :jekyll_plugins do
     gem "jekyll-feed", "~> 0.12"
     gem "github-pages", "~> 207"
   end
   ```

3. Push your changes up to your repository:

   ```sh
   git remote add origin git@github.com:socsieng/socsieng.github.io.git

   # I'm making main my default branch
   git checkout -b main

   git push origin main
   ```

4. Configure GitHub pages the repository settings

   ![GitHub pages configuration](/assets/img/github-pages-config.png) _Configure GitHub Pages._

## Up next

This was a fairly straight forward exercise, and if everything goes well with my next git command, I'll have a blog post
published at [socsieng.github.io]. And best of all, apart from some initial set up, it won't have any ongoing operating
costs.

There are couple things I'd like to follow up with, including:

- Theming,
- Analytics,
- Custom domain? (...maybe. That's going to cost money)

[jekyll]: https://jekyllrb.com/
[prettier]: https://prettier.io/
[prettier-vscode]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[github-jekyll]: https://docs.github.com/en/github/working-with-github-pages/creating-a-github-pages-site-with-jekyll
[socsieng-github]: https://github.com/socsieng/socsieng.github.io
[socsieng.github.io]: https://socsieng.github.io
