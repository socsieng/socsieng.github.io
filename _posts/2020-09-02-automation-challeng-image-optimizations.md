---
layout: post
title: 'Automation Challenge: Image Optimization'
date: 2020-09-02 20:13:00 -0700
categories: tools
tags: [tools, automation, ruby, git, hook]
---

I'm looking for things to automate and I challenge you to do the same.

In this post, I'm going to automate a task that does not _spark joy_. This time I've decided that it's going to be
optimizing images for this blog.

## Optimizing images

This blog is built with Jekyll and is running on GitHub pages. Jekyll is built with Ruby (a new language to me), so I'll
be using a Ruby gem called [`image_optim`][image_optim] to apply the optimizations. I do this by adding the dependency
to my `Gemfile`:

```ruby
group :development do
  gem "image_optim", require: false
  gem "image_optim_pack", require: false
end
```

And then installing the dependency:

```sh
bundle install
```

I'm going to organize scripts in the aptly named `scripts` folder, and the Ruby script to optimize images will be named
`scripts/optimize-images.rb` 🤯:

```ruby
#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
require 'image_optim'

# resolve the root folder of the repository
root_folder = `git rev-parse --show-toplevel`.strip
if !File.directory?(root_folder)
  root_folder = `pwd`.strip
end

# files to optimize: jpg, png, and gif files under assets/img
target_files = "#{root_folder}/assets/img/*.{jpg,png,gif}"

# instantiate ImageOtim with configuration options
image_optim = ImageOptim.new(
  :pngout => false,
  :svgo => false,
  :cache_dir => "#{root_folder}/temp"
)

# execute image optimization
image_optim.optimize_images!(Dir[target_files]) do |unoptimized, optimized|
  if optimized
    # print filename to stdout
    puts "#{optimized}"
  end
end
```

_Nothing too crazy going on here. Its not rocket surgery... 🚀🩺_

A couple of things to note:

1. I've specified the option `:cache_dir` which is a performance optimization. This allows `image_optim` to _remember_
   that it has already seen and optimized an image, and it won't do it again. The image optimization process can be slow
   and taxing on the CPU.
2. I am writing the file path of the optimized image (`puts "#{optimized}"`). This will come in handy later.

I can trigger an image optimization by executing the following command:

```
ruby scripts/optimize-images.rb
```

## Automation

Having a script to optimize images is a great first step, but it still doesn't spark any joy.

I need to figure out which event I should use as a trigger and I've settled on `pre-commit` (instead of something like
_build_). The reason being that this is required step in my workflow which is create/edit a post locally on my computer,
commit the changes, and push to GitHub.

I'm creating a script called `scripts/pre-commit.sh`:

```sh
#!/usr/bin/env bash
set -e

# get the repository root
repo_folder=`git rev-parse --show-toplevel`

# use repository root if there is a value, otherwise use the current folder
root_folder=${repo_folder:-`pwd`}

echo "Performing image optimization for the first time can take a while. Sit tight..."

# execute image optimization and store results in a variable
optimized_images=`ruby $root_folder/scripts/optimize-images.rb`

if [ -n "$optimized_images" ]
then
  echo "$optimized_images" | while read image; do
    echo " - Optimized $image"
    git add "$image"
  done
fi

echo "Done."
```

_Don't forget to make sure this script is executable (`chmod +x scripts/pre-commit.sh`)._

This is where output-ing the file path from the `scripts/optimize-images.rb` script comes into play. It is assigned to
the `$optimized_images` variable where we loop over each of them optimized images and stage them to the repository with
`git add`.

In order to get this script executed on `pre-commit`, I need to install it as a git `pre-commit` hook which can be done
by copying this file to `.git/hooks/pre-commit` (without the `.sh` extension). I've created a little script to help me
install it in case I need to re-install it on another device (`scripts/install-pre-commit.sh`):

```sh
#!/usr/bin/env bash
set -e

script_folder=`cd $(dirname $0) && pwd`
repo_folder=`git rev-parse --show-toplevel`

cp -f $script_folder/pre-commit.sh $repo_folder/.git/hooks/pre-commit
```

_Again, don't forget to make this script executable. Install using `scripts/install-pre-commit.sh`._

Once installed, any images that have not already been optimized every time I call `git commit`.

## Sparking joy

With very little effort, I've been able to automate an otherwise mindless activity.

And here are the results:

| Image                   | Size before | Size after | Improvement |
| :---------------------- | ----------: | ---------: | ----------: |
| github-pages-config.png |        102K |        51K |   51K (50%) |
| google-pay-vue.gif      |        2.9M |       2.4M |  0.5M (17%) |
| jekyll-screenshot.png   |        520K |       272K |  248K (48%) |
| jekyll-theming-1.png    |        570K |       307K |  263K (46%) |
| jekyll-theming-2.png    |        536K |       285K |  251K (47%) |
| jekyll-theming-3.png    |        569K |       311K |  258K (45%) |

![Discard everything that does not spark joy - Marie Kondo](/assets/img/marie-kondo.png) _I'm sure Marie Kondo would
approve._

I challenge you to find something/anything to automate. I want to hear about it: [@aussoc](https://twitter.com/aussoc).

[image_optim]: https://github.com/toy/image_optim
