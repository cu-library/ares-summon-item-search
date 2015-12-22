/* ares-summon-item-search - https://github.com/cu-library/ares-ummon-item-search */

var AresSummonItemSearch = AresSummonItemSearch || {};

/* Init function */
AresSummonItemSearch.init = function(jq){
  // Add the css file links.  
  jq('head').append('<link rel="stylesheet" href="css/ares-summon-item-search.css" type="text/css" />');
  jq('head').append('<link rel="stylesheet" href="css/jquery-ui-1.11.4.min.css" type="text/css" />');
}

/* When the DOM is ready, do work! */
AresSummonItemSearchjQuery(document).ready(function(jq){
  AresSummonItemSearch.init(jq);
});

