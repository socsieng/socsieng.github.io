---
layout: post
title: 'Using GitHub Actions Over GitHub Pages'
date: 2020-09-07 13:30:19 -0700
categories: blogging
tags: blogging
---

I'm making the move from GitHub's built-in Jekyll integration to GitHub Actions.

Jekyll lists a number of
[advantages of using GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/#advantages-of-using-actions),
however, I'm primarily interested in:

- Improved indexing for `related_posts` with `--lsi`
  ([latent semantic indexing](https://en.wikipedia.org/wiki/Latent_semantic_analysis#Latent_semantic_indexing)) which is
  not available with GitHub pages,
- Access to more plugins (not just those permitted by GitHub pages),
- More fine-grained control over how the site is generated - the current GitHub pages set up is a bit too magic-y and I
  don't have visibility of what is actually happening when I commit changes, and
- Using the latest version of Jekyll

## Reverting to the latest version of Jekyll

Step 1: Remove `github-pages` from `Gemfile`, and add `jekyll`

```ruby
# gem "github-pages", group: :jekyll_plugins
gem "jekyll", "~> 4.1.1"
```

One of the things that broke for me was that the theme I was using didn't work with the latest version of `jekyll`. So I
carefully copied the files from `gems/jekyll-theme-midnight-0.1.1` into the root of my repository, and added the plugins
that the theme referenced into my `Gemfile`:

```ruby
group :jekyll_plugins do
  # ...
  gem "jekyll-seo-tag", "~> 2.0"
end
```

Verify that the site continues to work as expected.

## Adding latent semantic indexing (locally)

Latent semantic indexing support requires the `classifier-reborn` plugin. This is added by updating the `Gemfile`:

```ruby
group :jekyll_plugins do
  # ...
  gem "classifier-reborn", "~> 2.2.0"
end
```

And then enabling it with the `--lsi` option:

```sh
# install plugin
bundle install

# start server locally
bundle exec jekyll serve --lsi
```

This is the list of related posts before:

> ### Related posts
>
> - Maintaining a Jekyll Blog with Gitpod
> - Scripting a New Blog Post
> - We Don't Look Alike
> - Automation Challenge: Image Optimization
> - Customizing The Blog With Related Posts
> - How Breaking My Hand Improved My Typing
> - Adding Google Analytics
> - Updating the Blog's Theme
> - Blogging for free with Jekyll

And after:

> ### Related posts
>
> - Blogging for free with Jekyll
> - Using GitHub Actions Over GitHub Pages
> - Updating the Blog's Theme
> - Customizing The Blog With Related Posts
> - Automation Challenge: Image Optimization
> - How Breaking My Hand Improved My Typing
> - Adding Google Analytics
> - Maintaining a Jekyll Blog with Gitpod
> - Scripting a New Blog Post
> - We Don't Look Alike

Trust me, the updated list is much more relevant than a _recent posts_ list

## Adding the GitHub Action workflow

Previously, [socsieng.github.io](https://socsieng.github.io/) was automatically setup to build a static Jekyll site and
publish to GitHub Pages. Without this automatic process, I now need publish my static site to a GitHub Pages branch
(`gh-pages` by convention).

Jekyll provides a
[sample workflow file](https://jekyllrb.com/docs/continuous-integration/github-actions/#setting-up-the-action), which I
use as a starting point for `.github/workflows/jekyll.yml`:

```yml
{% raw %}name: jekyll build

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      # Use GitHub Actions' cache to shorten build times and decrease load on servers
      - uses: actions/cache@v1
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gems-

      - uses: socsieng/jekyll-action@master
        with:
          target_branch: gh-pages
        env:
          JEKYLL_PAT: ${{ secrets.JEKYLL_PAT }}
          JEKYLL_ARGS: --lsi{% endraw %}
```

I've had a look at the [`helaili/jekyll-action`](https://github.com/helaili/jekyll-action/) repository that the Jekyll
documentation referenced and used some of the sample configuration there as well.

Note that I've forked [`helaili/jekyll-action`](https://github.com/helaili/jekyll-action/) to add support for additional
`JEKYLL_ARGS` parameters so that I can pass in the `--lsi`. I've also raised a
[pull request](https://github.com/helaili/jekyll-action/pull/56) back to the original repository.

A prerequisite to enabling this workflow is that you need to provide and configure a
[GitHub Personal Access Token](https://github.com/settings/tokens) with the `public_repo` scope for the workflow to use
to publish site changes. I **strongly** recommend creating a new token instead of reusing an existing one.

## Configuring GitHub pages

Once the workflow executes, a new branch is created `gh-pages` (updated if you already had this branch).

The final step is to configure GitHub Pages to use this new branch:

![GitHub pages configuration](/assets/img/github-pages-config2.png) _Configure GitHub Pages._

## Summing up

I switched over to GitHub Actions so that I could have more control over how my Jekyll site is generated. It is more
involved than simply using the default GitHub/Jekyll integration, but I think it will pay off in the long run with more
control and flexibility at my finger tips.

I hope this helps anybody else thinking about making the switch.
