---
layout: post
title: Customizing The Blog With Related Posts
date: 2020-08-30 10:44:00 -0700
categories: blogging
tags: blogging
---

I've been using Jekyll and GitHub as a blogging platform for about a day now and have been very happy with the
out-of-the-box capabilities. I did however, want to apply an minor tweak to include related posts to the end of every
blog post.

A quick search on for "related posts" Jekyll sent me to
[`site.related_posts`](https://jekyllrb.com/docs/variables/#site-variables) site variables. I recalled that the site's
homepage `_layouts/home.html` displayed a list of posts.

```html
{% raw %}{%- if site.posts.size > 0 -%}
  <h2 class="post-list-heading">{{ page.list_title | default: "Posts" }}</h2>
  <ul class="post-list">
    {%- for post in site.posts -%}
    <li>
      {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
      <span class="post-meta">{{ post.date | date: date_format }}</span>
      <h3>
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </h3>
      {%- if site.show_excerpts -%}
        {{ post.excerpt }}
      {%- endif -%}
    </li>
    {%- endfor -%}
  </ul>

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a></p>
{%- endif -%}{% endraw %}
```

I figured I could combine the two starting by copy/pasting the content above into a new file
`_includes/related-posts.html` and replacing references to `site.posts` with `site.related_posts` and removing bits of
content that I didn't need for a related post section.

This is what I ended up with in `_includes/related-posts.html`:

```html
{% raw %}{%- if site.related_posts.size > 0 -%}
  <hr></hr>
  <h2 class="post-list-heading">Related posts</h2>
  <ul class="post-list">
    {%- for post in site.related_posts -%}
    <li>
      <h3>
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </h3>
    </li>
    {%- endfor -%}
  </ul>
{%- endif -%}{% endraw %}
```

Next I updated my `_layouts/post.html` file to _include_ a reference to the new `_includes/related-posts.html` file:

```html
{% raw %}{%- include related-posts.html -%}{% endraw %}
```

That was it. Pretty simple.

I'm not completely satisfied with the implementation as according to the
[documentation](https://jekyllrb.com/docs/variables/#site-variables)

> If the page being processed is a Post, this contains a list of up to ten related Posts. By default, these are the ten
> most recent posts. For high quality but slow to compute results, run the `jekyll` command with the `--lsi`
> ([latent semantic indexing](https://en.wikipedia.org/wiki/Latent_semantic_analysis#Latent_semantic_indexing)) option.
> Also note GitHub Pages does not support the `lsi` option when generating sites.

Because I'm hosting on GitHub Pages, related posts will just return the 10 most recent posts. Which isn't an issue for
me at the moment, because this is currently my 5th blog post. But this is something that I'd like to revisit later on.
