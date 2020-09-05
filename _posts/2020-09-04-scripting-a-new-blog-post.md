---
layout: post
title: 'Scripting a New Blog Post'
date: 2020-09-04 13:02:27 -0700
modified_date: 2020-09-04 14:49:45 -0700
categories: tools
tags: [tools, blogging]
excerpt: |
  <p>I've created a script to help me create new Jekyll blog posts. Before this was copy/pasting an existing post... no more...</p>
---

I'm tired of manually creating a new Jekyll blog post which for me included copying an existing post, renaming the file
with today's date and the title of the post, updating the `title` attribute of the markdown file, and deleting the
contents of the copied post.

That workflow ends today.

I've created a script (`scripts/new-post.sh`):

```sh
#!/usr/bin/env bash
set -e

repo_folder=`git rev-parse --show-toplevel`

category=$1
title=$2
timestamp=`date "+%F %T %z"`
date_value=`date "+%F"`
file=`echo $title | awk '{print tolower($0)}' | sed -e 's/[^a-zA-Z0-9]/-/g'`
file_path="$repo_folder/_posts/$date_value-$file.md"

echo "---
layout: post
title: '$title'
date: $timestamp
categories: $category
tags: $category
---
" >> $file_path

echo $file_path
```

Usage:

```sh
scripts/new-post.sh <category> "<title>"
```

It takes two arguments. `category` and `title`. Your title will probably contain spaces so you'll want to generally wrap
your blog post title in quotes.

Example:

```sh
scripts/new-post.sh blogging "My New Post"
```

I've decided to write the new file path to `stdout` so that I can `command` + click the file name to quickly start
editing in Visual Studio Code.

Demo:

![New post script in action](/assets/img/new-post.gif)
