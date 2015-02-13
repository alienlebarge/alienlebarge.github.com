/*!
 * alienlebarge-blog v1.11.1 (http://www.alienlebarge.ch)
 * Copyright 2014-2015 Cédric Aellen
 * Licensed under MIT (https://github.com/alienlebarge/alienlebarge.github.com/blob/master/LICENSE)
 */
(function(d) {
  var config = {
    kitId: 'pxp8tkl',
    scriptTimeout: 3000
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
