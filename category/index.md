---
layout: default
title: Categories
permalink: /category/
robots: noindex

---
<div class="blogpage-wrap">
  <div class="blogpage-hero">
    <h1>Categories</h1>
    <p>Browse all categories.</p>
  </div>
  <div class="blogpage-grid">
    {% for cat_page in site.pages %}
      {% if cat_page.category_name %}
        <article class="blogpage-card">
          <div class="blogpage-content">
            <h2>
              <a href="{{ site.baseurl }}/category/{{ cat_page.category_name }}/">
                {{ cat_page.title }}
              </a>
            </h2>
          </div>
        </article>
      {% endif %}
    {% endfor %}
  </div>
</div>
