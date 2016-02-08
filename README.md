# Ares Summon Item Search

Using Summon search results to prepopulate forms in Ares.

## Installation

If Ares' webroot is at `C:\inetpub\wwwroot\ares`, then you can use `movefiles.cmd` to move js, css, and images files to the correct locations. 
To do so, right click on `movefiles.cmd` and select "Run as administrator..." 

You can also copy the three files manually. Copy `ares-summon-item-search.js`, `jquery-ui-1.11.4.min.js`, and `jquery-1.11.3.min.js` to the js directory. 
Copy `ares-summon-item-search.css`, `jquery-ui-1.11.4.min.css`, and the `jquery-ui-1.11.4-images` directory to the css directory.

Add this to the bottom of the `<body>` tag:
```html
<!-- ares-summon-item-search -->
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery-ui-1.11.4.min.js"></script>
<script>AresSummonItemSearchjQuery = jQuery.noConflict(true);</script>
<script src="js/ares-summon-item-search.js"></script>
<script>
/* When the DOM is ready, do work! */
AresSummonItemSearchjQuery(document).ready(function(){
  AresSummonItemSearch.init(AresSummonItemSearchjQuery, 
                            "https://yourloricaurl.com/2.0.0/search");
});
</script>
```

## What does it look like?

![UI Preview](ares-summon-integration-preview.gif?raw=true "UI Preview")