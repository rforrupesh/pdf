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
      {% assign cat_page = site.pages | where:"category_name", category | first %}
      <article class="blogpage-card">
        <div class="blogpage-content">
          <h2>
            <a href="{{ site.baseurl }}/category/{{ category }}/">
              {{ cat_page.title | default: category }}
            </a>
          </h2>
        </div>
      </article>
    {% endfor %}
  </div>
</div>
