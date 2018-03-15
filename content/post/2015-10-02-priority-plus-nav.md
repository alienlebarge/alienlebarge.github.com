---
date: 2015-10-02T14:42:45Z
description: A concept of priority+ navigation built with flexbox
tags:
- flexbox
- navigation
- priority
title: Priority+ navigation with flexbox
---

Priority+ navigation is an interesting pattern. The main idea of it is to place the more important items of your menu at the left of it. It means that the most important stuff will be available on all viewports and the less importants items will popup as the screen enlarge.

After an unsuccessful search for a priority+ navigation built with flexboxes, I have build one.

[And here's the result](http://codepen.io/alienlebarge/full/rOjRBZ/).

## Pros

- **Simple**. It’s very simple to implement. This is flexbox and some classes to toggle.
- **Very robust**. If an item title is tool long, the entire menu will adapte to fit it nicely. I think it is the main advantage. It’s indestructible.
- **Adaptive**. You can have as much entry you want and any kind of entry name, it will always adapte.
- **Customisable**. You can style it the way you want. It’s easy, it’s button inside (flex items) container !
- **Less, more or random priority**. The item on the left side doesn’t have to be the ones with the highest priority. For exemple, it’s possible to have a login button on the right who will stay visible on every viewport sizes.

## Cons

- **Only one level of navigation**. Do not think about sub navigation.

## The code

All [the documented code is available on Codepen](http://codepen.io/alienlebarge/pen/rOjRBZ). Feel free to play with it.

<p data-height="268" data-theme-id="7142" data-slug-hash="rOjRBZ" data-default-tab="result" data-user="alienlebarge" class='codepen'>See the Pen <a href='http://codepen.io/alienlebarge/pen/rOjRBZ/'>Priority+ navigation</a> by Cédric Aellen (<a href='http://codepen.io/alienlebarge'>@alienlebarge</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Next step

I would be very happy to implement the ability to have more than one menu level to solve the sub-nav dilemma.

![My notes about a sub-navigation](https://dlgjp9x71cipk.cloudfront.net/2015/10/priority-plus/2015-10-02-note-priority-nav-multi-level.jpg)
