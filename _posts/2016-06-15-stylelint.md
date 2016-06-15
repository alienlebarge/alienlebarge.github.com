---
layout:      post
title:       "Stylelint: My CSS linting workflow"
description: "How I use Stylelint to lint my CSS"
date:        2016-06-15 13:44:58
tags:
 - stylelint
 - css
---

> Having a good and most importantly uniform coding style is a good habit. Your code is more readable on more understandable.  
> &ndash; A coder

Before using a linter, I tried to follow as much as possible Harry Roberts [CSS guidelines](http://cssguidelin.es/). At this time, I was almost certain that I had a standard way of writing and my CSS were perfectly formed.  
But then, I ran a linter...

![A panda facepalming himself after linting his code.](http://i.giphy.com/14aUO0Mf7dWDXW.gif)

<span lang="es">*Caramba !*</span>  
I forget spaces, semicolons were missing and a bunch of other things were wrong. In short, my terminal was blinking red.
It was time to use a linter in my workflow !

## Stylelint

During the last month, I started to work with [PostCSS](https://github.com/postcss/postcss) as my main pre/post-processor.
In the PostCSS world, [Stylelint](http://stylelint.io) is a well known tool to lint your stylesheets. Take a look at the [features](http://stylelint.io/#features) and you will understand why.

Instead of each time copy and paste my rule settings in every projects, I've created a *stylelintrc* repo that own my rule's configuration file. You can find (and use) it [on GitHub](https://github.com/alienlebarge/stylelint-config)

Now, in every projects, I add this repo as a dependencie.

    $ npm install @alienlebarge/stylelint-config

And then I set my linting task in [Gulp](http://gulpjs.com/).

    var gulp = require("gulp")
    var postcss = require("gulp-postcss")
    var reporter = require("postcss-reporter")
    var stylelint = require("stylelint")

    gulp.task("lint:css", function () {
      return gulp.src("test/**/*.css")
        .pipe(postcss([
          stylelint({
            /* configFile: 'node_modules/alb-stylelintrc/.stylelintrc' */
          }),
          reporter({ clearMessages: true }),
        ]))
    })

and *Voilà* !
Now everytime you run a build it will warn you if your CSS doesn't follow the coding rules.
