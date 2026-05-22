---
layout: default
title: Categories
permalink: /category/
---

<div class="blogpage-wrap">

  <div class="blogpage-hero">
    <h1>Categories</h1>
    <p>Browse all categories.</p>
  </div>

  <div class="blogpage-grid">

    {% assign categories = site.posts | map: "category" | uniq %}

    {% for category in categories %}

      <article class="blogpage-card">

        <div class="blogpage-content">

          <h2>
            <a href="{{ '/category/' | append: category | append: '/' | relative_url }}">
              
            </a>
          </h2>

        </div>

      </article>

    {% endfor %}

  </div>

</div>
