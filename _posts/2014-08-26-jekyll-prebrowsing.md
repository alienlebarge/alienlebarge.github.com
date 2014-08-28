---
layout:      post
title:       "Jekyll and prebrowsing"
description: How to setup some prebrowsing in Jekyll
date:        2014-08-26 05:00:00
image:       http://wac.450f.edgecastcdn.net/80450F/screencrush.com/files/2013/05/Timecop-2.png
tags:
 - code
 - jekyll
 - prebrowsing
---

Prebrowsing in one of the hot topic on the web these time. It mean: preparing the next page the user will visite. So if you wanted to be like Jean-Claude Van Damme in [Timecop](http://en.wikipedia.org/wiki/Timecop "Timecop on Wikipedia") and master the (loading) time, here is a few things you can do with a Jekyll based blog.

Please, read excellent [Santiago Valdarrama's article on A List Apart ](http://alistapart.com/article/one-step-ahead-improving-performance-with-prebrowsing "One Step Ahead: Improving Performance with Prebrowsing") before.

## DNS prefetching

Here are the kind of ressources we can prefetch.

- Resources on different domains hidden behind 301 redirects
- Resources accessed from JavaScript code
- Resources for analytics and social sharing (which usually come from different domains)

You can find them by opening the chrome inspector and looking in the *Network* tab at the DNS you want to resolve.

### Twitter

If you embed twitter posts in your article it can be useful to prefetch the following DSN.

    <link rel="dns-prefetch" href="//twitter.com">
    <link rel="dns-prefetch" href="//platform.twitter.com">
    <link rel="dns-prefetch" href="//syndication.twitter.com">
    <link rel="dns-prefetch" href="//pbs.twimg.com">

### Typekit

This is for the Typekit fonts.

    <link rel="dns-prefetch" href="//p.typekit.net">
    <link rel="dns-prefetch" href="//use.typekit.net">

### Google Analytics

Who doesn't use Google Anylytics on his website ?

    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//stats.doubleclick.net">
```

### Iconic (hosted on my own server)

Here is the iconic icon system I host on my own server.

    <link rel="dns-prefetch" href="//www.alienlebarge.ch">

### Mapbox

I use Mapbox to do [some nice headers "Article about Mapbox API"](/2014/07/mapbox-map/).

    <link rel="dns-prefetch" href="http://api.tiles.mapbox.com">

## Resource prefetching

I do not prefetch ressource. Because there is perhaps one or two icons that I can prefetch from an article page to blog list.  
It means when the visitor go from one page to another, 95% of the ressource are already cached.

## Prerendering

I only prerender the next and previous page if there is a pagination and the home page if you are on an article page.

Here's the little Liquid code:

{% raw %}
    {% if paginator %}
    <!-- Prerender pagination page -->
      {% if paginator.previous_page %}
        {% if paginator.previous_page == 1 %}
    <link rel="prerender" href="http://blog.alienlebarge.ch">
        {% else %}
    <link rel="prerender" href="http://blog.alienlebarge.ch/page{{ paginator.previous_page }}">
        {% endif %}
      {% endif %}
      {% if paginator.next_page %}
    <link rel="prerender" href="http://blog.alienlebarge.ch/page{{ paginator.next_page }}">
      {% endif %}
    {% else %}
    <!-- Prerender homepage -->
    <link rel="prerender" href="http://blog.alienlebarge.ch">
    {% endif %}
{% endraw %}
