# Evocation

Using Summon search results to prepopulate forms in Ares.

## Installation

If Ares' webroot is at `C:\inetpub\wwwroot\ares`, then you can use `movefiles.cmd` to move js and css files to the correct locations. 
To do so, right click on `movefiles.cmd` and select "Run as administrator..." 

You can also copy the two files manually. Copy `evocator.js` to the js folder. Copy `evocator.css` to the css folder.

Add this to the head of IRFArticle.html:
```html
<script language="javascript" src="js/evocator.js"></script>
```