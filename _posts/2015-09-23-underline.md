---
layout:      post
title:       "Underline learned the hard way"
description: "Hoe to make good looking underline with CSS"
date:        2015-09-23 17:55:06
tags:
 - underline
 - css
 - typography
---

I love typography, beautiful typography. This is one of the most important points , if not the most when designing a site. There is nothing better than a proper font that makes reading text fluid and easy.

In the age of the Internet, there is a player to take account : underline.   

The problem is that each browser has its own way of displaying an underlined. Chrome displays thick lines intersecting feet letters. And Safari displays fine lines that stops before each foot.

![Underline in Chrome, Safari and Firefox side by side](http://alb-blog.s3.amazonaws.com/2015/09/underline/underline-side-by-side.png)

How can we manage to have the same underline's style everywhere ?  Why this is not the fonts who manages the display of underlining ? That way, they would be all the same across all browsers.  
Well, this is a legacy of the era of font case and paper. At that time there was simply no underline. And it is considered as too distracting.

> Professional Western typesetting usually does not employ lines under letters for emphasis within running text, because it is considered too distracting. Underlining is, however, often used with typewriters, in handwriting and with some non-alphabetic scripts. It is also used for secondary emphasis, i.e. marks added by the reader and not the author.  
> — [Emphasis (typography)](https://en.wikipedia.org/wiki/Emphasis_(typography)#Underlining) on Wikipedia 


> In printed documents underlining is generally avoided, with italics or small caps often used instead, or (especially in headings) using capitalization or bold type.  
> — [Underline](https://en.wikipedia.org/wiki/Underline) on Wikipedia

![A type case](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Metal_movable_type.jpg/1280px-Metal_movable_type.jpg)

[Medium](http://www.medium.com) as done a really great job to unify and beautify their underlines. After reading [how Medium is crafting link underlines](https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9 "Crafting link underlines on Medium"), I wanted to do the same for this site.

As I am picky, CSS should not depend on any library or framework like [Compass](http://compass-style.org/) . As you can imagine, I had to face some problems.  

## Problems

### Browser doesn't like dimension thinner than 1px

At the beginning, I wanted to use `em` as the calculation unit.  
But when testing, the underline doesn't appear on some browser.

Due to the fact I wanted extra thin lines, I was tempted to use some  width like `0.04em`. The problem is that `0.04em` is less than 1px. Actually, it's `0.64px` width. And some browser does not like that.

Some browser will not show line that are under 1px. Have a look at [this little test](http://www.w3.org/Style/Examples/007/units.en.html#units "CSS Tips & Tricks: Units"):

![Firefox is the only browser who show a line thinner than 1px](http://alb-blog.s3.amazonaws.com/2015/09/underline/browser-less-than-1px.png)
Yeah, Firefox is the only browser who show a line thinner than 1px.

The conclusion is that **`1px` is the smallest value that the line can have**. Best thing you can do about that, is adding a warning.

The first step is to convert `em` to `px`.
For that, you have to multiply the `em` size by the browsers default font size wich is `16px`.

    0.04em * 16px = 0.64px

> If you haven't set the font size anywhere on the page, then it is the browser default, which is probably 16px.  
&dash; [`font-size` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)

Then, add some conditions to display a warning if the underline thickness is thinner than 1px.

    // warn if width is thinner than 1px
    @if unit($width)==px {
      @if $width < 1px {
        @warn "Underline is thinner than 1px. Some browsers may not display it."
      }
    }
    @if unit($width)==em {
      @if px($width) < 1px {
        @warn "Underline is thinner than 1px. Some browsers may not display it."
      }
    }

### `px` or `em` ?

This is more a personal choice.
I have choose to do all the calculation in `em` because it let me deal with proportion. It means that big text like headings will have a thicker underlines than basic text. It’s more elegant than having identical thicknesses for all fonts sizes.

![Balanced underline thickness](http://alb-blog.s3.amazonaws.com/2015/09/underline/balanced-underline-thickness.png)

### There is not « one style that ruled them all »

Each font must have is own underline style.

If you want to apply this kind of nice underlines and use more than one font, be careful. You may have to set a style for each fonts.

![Same underline on two fonts](http://alb-blog.s3.amazonaws.com/2015/09/underline/same-underline-on-two-fonts.png)

### Almost bulletproof line cutting with `text-shadow`

The purpose of the `text-shadow` is to draw a zone around the text. This zone will hide the underline so it does not cut the fonts feet.

#### One shadow in each eight directions

To draw this zone we  set a shadow in eight directions.

- 1px to *top*
- 1px to *top-left*
- 1px to *left*
- 1px to *bottom-left*
- 1px to *bottom*
- 1px to *bottom-right*
- 1px to *right*
- 1px to *top-right*

Here is the CSS:

    text-shadow:
        0    1px 0 $bg-color,
        0   -1px 0 $bg-color,
        1px  0   0 $bg-color,
       -1px  0   0 $bg-color,
       -1px -1px 0 $bg-color,
       -1px  1px 0 $bg-color,
        1px -1px 0 $bg-color,
        1px  1px 0 $bg-color;

![Shadows in the eight directions](http://alb-blog.s3.amazonaws.com/2015/09/underline/shadow-eight-directions.png)

As you can see, the result may not be perfect with every font. We need something more accurate.

#### Multis shadows on the eights axis

The second test was to draw more than one shadow on each of the eights axis.

    text-shadow:
        0                    $cut-distance*1/5 0 $bg-color,
        0                    $cut-distance*2/5 0 $bg-color,
        0                    $cut-distance*3/5 0 $bg-color,
        0                    $cut-distance*4/5 0 $bg-color,
        0                    $cut-distance     0 $bg-color,

        0                  (-$cut-distance)*1/5 0 $bg-color,
        0                  (-$cut-distance)*2/5 0 $bg-color,
        0                  (-$cut-distance)*3/5 0 $bg-color,
        0                  (-$cut-distance)*4/5 0 $bg-color,
        0                  (-$cut-distance)     0 $bg-color,

        $cut-distance*1/5    0                  0 $bg-color,
        $cut-distance*2/5    0                  0 $bg-color,
        $cut-distance*3/5    0                  0 $bg-color,
        $cut-distance*4/5    0                  0 $bg-color,
        $cut-distance        0                  0 $bg-color,

      (-$cut-distance)*1/5   0                  0 $bg-color,
      (-$cut-distance)*2/5   0                  0 $bg-color,
      (-$cut-distance)*3/5   0                  0 $bg-color,
      (-$cut-distance)*4/5   0                  0 $bg-color,
      (-$cut-distance)       0                  0 $bg-color,

      (-$cut-distance)*1/5   $cut-distance*1/5  0 $bg-color,
      (-$cut-distance)*2/5   $cut-distance*2/5  0 $bg-color,
      (-$cut-distance)*3/5   $cut-distance*3/5  0 $bg-color,
      (-$cut-distance)*4/5   $cut-distance*4/5  0 $bg-color,
      (-$cut-distance)       $cut-distance      0 $bg-color,

      (-$cut-distance)*1/5 (-$cut-distance)*1/5 0 $bg-color,
      (-$cut-distance)*2/5 (-$cut-distance)*2/5 0 $bg-color,
      (-$cut-distance)*3/5 (-$cut-distance)*3/5 0 $bg-color,
      (-$cut-distance)*4/5 (-$cut-distance)*4/5 0 $bg-color,
      (-$cut-distance)     (-$cut-distance)     0 $bg-color,

        $cut-distance*1/5  (-$cut-distance)*1/5 0 $bg-color,
        $cut-distance*2/5  (-$cut-distance)*2/5 0 $bg-color,
        $cut-distance*3/5  (-$cut-distance)*3/5 0 $bg-color,
        $cut-distance*4/5  (-$cut-distance)*4/5 0 $bg-color,
        $cut-distance      (-$cut-distance)     0 $bg-color,

        $cut-distance*1/5    $cut-distance*1/5  0 $bg-color,
        $cut-distance*2/5    $cut-distance*2/5  0 $bg-color,
        $cut-distance*3/5    $cut-distance*3/5  0 $bg-color,
        $cut-distance*4/5    $cut-distance*4/5  0 $bg-color,
        $cut-distance        $cut-distance      0 $bg-color;

![Shadows in the eight directions](http://alb-blog.s3.amazonaws.com/2015/09/underline/shadow-eight-x-five-directions.png)

The result was better but we can do better.

#### The matrix

Here is an exemple of a matrix of 25 shadows.

    text-shadow:
      -1px   -1px   0 #fff,
      -1px   -0.5px 0 #fff,
      -1px    0px   0 #fff,
      -1px    0.5px 0 #fff,
      -1px    1px   0 #fff,
      -0.5px -1px   0 #fff,
      -0.5px -0.5px 0 #fff,
      -0.5px  0px   0 #fff,
      -0.5px  0.5px 0 #fff,
      -0.5px  1px   0 #fff,
       0px   -1px   0 #fff,
       0px   -0.5px 0 #fff,
       0px    0px   0 #fff,
       0px    0.5px 0 #fff,
       0px    1px   0 #fff,
       0.5px -1px   0 #fff,
       0.5px -0.5px 0 #fff,
       0.5px  0px   0 #fff,
       0.5px  0.5px 0 #fff,
       0.5px  1px   0 #fff,
       1px   -1px   0 #fff,
       1px   -0.5px 0 #fff,
       1px    0px   0 #fff,
       1px    0.5px 0 #fff,
       1px    1px   0 #fff;

This is how I get the CSS in Sass.

    // text-shadow
    $precision: 5;
    $all: ();
    $delta-distance: $underline-shadow-width * 2 / ($precision - 1);
    // from left to right
    @for $i from 0 through ($precision - 1) {
      // from top to bottom
      @for $y from 0 through ($precision - 1){
        $all: append($all, (-$underline-shadow-width)+$delta-distance*$i ((-$underline-shadow-width)+$delta-distance*$y) 0 $underline-background-color, comma)
      }
    }
    text-shadow: $all;

And yeah, the result is pretty decent.

![The shadow using 25 `text-shadow`](http://alb-blog.s3.amazonaws.com/2015/09/underline/shadow-matrix.png)

### Underline lowercase number

Something to be careful with are lowercase number. The underline  of the number 3 can be invisible. There is no miracle. You have to be picky with that !

![](http://alb-blog.s3.amazonaws.com/2015/09/underline/text-shadow-underline-cut.png)

### Awkward background color when selected

A thing to fix is the color of the background when you select underline text. If you do nothing, it will be the same as the page background color. And it will do strange things when text is selected.

![Strange background color on selected text](http://alb-blog.s3.amazonaws.com/2015/09/underline/underline-selection-wrong-background-color.png)

To fix that, you just have to add style on the selection. Thanks to [the `::selection` CSS pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection).

     .underline {
         // nice underlines
        @include underline();

        // When underline text is selected, the shadow color is the same as
        // the selection color.
           &::selection {
               @include underline($base-text-color, 4px, 1px, lighten($base-primary-color, 30%));
        }
      }

Here is the result:

![Fixed background color on selected text](http://alb-blog.s3.amazonaws.com/2015/09/underline/underline-selection-right-background-color.png)

### Things to know

#### Selected text may have some artifacts when selected    

On text selection, you can have some background exceedance.

![Background exceedance on selected text](http://alb-blog.s3.amazonaws.com/2015/09/underline/background-exceedance.png)

#### When selected, the underline is not the same color as the text

![](http://alb-blog.s3.amazonaws.com/2015/09/underline/underline-color.png)

The reason, is simple. The underline (made of `background-color`) is behind the selection layer.

![The underline is behind the selection](http://alb-blog.s3.amazonaws.com/2015/09/underline/selection-z-index.png)

## The code

All the code is available on Codepen.

<p data-height="268" data-theme-id="7142" data-slug-hash="KwjpMN" data-default-tab="result" data-user="alienlebarge" class='codepen'>See the Pen <a href='http://codepen.io/alienlebarge/pen/KwjpMN/'>Underline</a> by Cédric Aellen (<a href='http://codepen.io/alienlebarge'>@alienlebarge</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Inuit-underline

For [Inuitcss](http://inuitcss.com/) users, [Inuit-underline](https://github.com/alienlebarge/inuit-underline) is a collection of Sass files to include in your project.
