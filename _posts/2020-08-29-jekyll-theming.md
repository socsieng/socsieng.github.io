---
layout: post
title: Updating the Blog's Theme
date: 2020-08-29 21:39:00 -0700
categories: blogging
tags: blogging
---

This is a follow up to my first post on [Blogging for free with
Jekyll]({% post_url 2020-08-29-blogging-for-free-wth-jekyll %}).

According to the [Midnight theme documentation](https://github.com/pages-themes/midnight) I had assumed that updating
the Jekyll theme was going to be as easy as updating the `theme` in `_config.yml`. I was wrong.

After following the instructions:

> To use the Midnight theme:
>
> 1. Add the following to your site's `_config.yml`:
>
>    ```yml
>    theme: jekyll-theme-midnight
>    ```

The command `bundle exec jekyll build` resulted in the following warnings:

```
Build Warning: Layout 'post' requested in _posts/2020-08-29-blogging-for-free-wth-jekyll.md does not exist.
Build Warning: Layout 'page' requested in about.md does not exist.
Build Warning: Layout 'home' requested in index.md does not exist.
```

My take on this is that the original theme `minima` had layouts that the `jekyll-theme-midnight` theme doesn't. My
initial thoughts on resolving this issue was to copy the referenced layouts defined for `minima` (located at
`vendor/bundle/ruby/2.6.0/gems/minima-2.5.1/_layouts`) into a new `_layouts` folder in the root of the repository.

The result...?

![Jekyll screenshot 1](/assets/img/jekyll-theming-1.png) _...success!_

The good news is that fixed the problem. However I wasn't quite happy with all aspects of the theme so I thought I would
start with some lite customization.

Step 1: Copy the `jekyll-theme-midnight`s `default` layout
(`vendor/bundle/ruby/2.6.0/gems/jekyll-theme-midnight-0.1.1/_layouts/default.html`) to the root `_layouts` folder.

Step 2: Remove the bits that I didn't want. Namely the header and the _Project maintained by_ section. Deleting:

```html
<div id="header"><!-- ... --></div>
```

```html
<span class="credits left"><!-- ... --></span>
```

```html
<span class="credits right"><!-- ... --></span>
```

The result...?

![Jekyll screenshot 2](/assets/img/jekyll-theming-2.png) _...better, but lots of space._

Step 3: Override the styles with `assets/css/style.scss`.

```scss
---
---

@import {% raw %}'{{ site.theme }}'{% endraw %};

section {
  margin-top: 0px;

  #title {
    margin: 0;
    padding: 0 0 5px 0;
  }
}
```

![Jekyll screenshot 3](/assets/img/jekyll-theming-3.png) _...better, much better..._

I started this post thinking that modifying the theme would be a straight forward exercise. However, due to missing
layouts in the new theme switching themes turned out to be a little more involved.

The silver lining is that resolving the issue exposed me to Jekyll's theming system (a little earlier than I had
planned). It was pretty straight forward and I was able to apply my own small customizations to the Midnight theme.
There are still more customizations that I would like to make over time, but it's a good start.

Next I'd like to have a go at integrating with Google Analytics. Check in later for an update on that.
