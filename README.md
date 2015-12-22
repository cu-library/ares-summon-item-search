# Ares Summon Item Search

Using Summon search results to prepopulate forms in Ares.

## Installation

If Ares' webroot is at `C:\inetpub\wwwroot\ares`, then you can use `movefiles.cmd` to move js and css files to the correct locations. 
To do so, right click on `movefiles.cmd` and select "Run as administrator..." 

You can also copy the three files manually. Copy `ares-summon-item-search.js`, `jquery-ui-1.11.4.min.js`, and `jquery-1.11.3.min.js` to the js folder. 
Copy `ares-summon-item-search.css` and `jquery-ui-1.11.4.min.css` to the css folder.

Add this to the bottom of the `<body>` tag:
```html
<!-- jQuery include from CDN, fallback if fail. Noconflict, then ares-summon-item-search -->
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-1.11.3.min.js"><\/script>')</script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script>window.jQuery.ui || document.write('<script src="js/jquery-ui-1.11.4.min.js><\/script>')</script>
<script>AresSummonItemSearchjQuery = jQuery.noConflict(true);</script>
<script src="js/ares-summon-item-search.js"></script>
```