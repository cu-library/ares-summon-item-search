# ares_summon_item_search

Using Summon search results to prepopulate forms in Ares.

## Installation

If Ares' webroot is at `C:\inetpub\wwwroot\ares`, then you can use `movefiles.cmd` to move js and css files to the correct locations. 
To do so, right click on `movefiles.cmd` and select "Run as administrator..." 

You can also copy the three files manually. Copy `ares_summon_item_search.js` and `jquery-1.11.3.min.js` to the js folder. Copy `ares_summon_item_search.css` to the css folder.

Add this to the bottom of the `<body>` tag:
```html
<!-- jQuery include from CDN, fallback if fail. Noconflict, then ares_summon_item_search -->
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-1.11.3.min.js"><\/script>')</script>
<script>AresSummonItemSearchjQuery = jQuery.noConflict(true);</script>
<script src="js/ares_summon_item_search.js"></script>
```