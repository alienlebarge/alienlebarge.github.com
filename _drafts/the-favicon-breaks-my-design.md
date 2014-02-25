# The favicon breaks my design !

I’m redesigning an Intranet published with TYPO3 4.7.17. Unfortunately for use, IE8 still is use in our company.
So to enforce IE8 to render correctly the design i've set `<meta http-equiv="X-UA-Compatible" content="IE=edge">`.

```
page.meta.X-UA-Compatible = IE=edge
page.meta.X-UA-Compatible.httpEquivalent = 1
```

When I have added my favicon, the design breaks. In fact, IE8 has changed is *document mode* to IE7.

```
page.shortcutIcon = favicon.ico
```

[Microsoft documentation](http://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx) says the following :

> The X-UA-Compatible header isn't case sensitive; however, it must appear in the header of the webpage (the HEAD section) before all other elements except for the title element and other meta elements.

In fact, `page.shortcutIcon` place the favicon's tag right at the beginning of the `<head>` and the `X-UA-Compatible` doesn't work anymore.

To fix that, I have set the favicon like so:

```
page.headerData.10 = TEXT
page.headerData.10.value = favicon.ico
page.headerData.10.wrap = <link rel="Shortcut Icon" href="|" type="image/x-icon">
```

Now, the link the favicon tag, is at the end of the `<head>`.
