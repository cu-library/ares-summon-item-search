/* ares-summon-item-search - https://github.com/cu-library/ares-summon-item-search */

var AresSummonItemSearch = AresSummonItemSearch || {};

/* Init function */
AresSummonItemSearch.init = function($, loricaURL, summonURL){

  var parent = AresSummonItemSearch;
 
  parent.$ = $;
  parent.loricaURL = loricaURL;
  parent.summonURL = summonURL;
	
  // Add the css file links.  
  $('head').append('<link rel="stylesheet" href="css/ares-summon-item-search.css" type="text/css" />');
  $('head').append('<link rel="stylesheet" href="css/jquery-ui-1.11.4.min-edit.css" type="text/css" />');
  
  //Health check - Ensure Is Summon is available
  $.ajax({
    url: loricaURL,
	data: { "accept": "application/json",
            "path": "/2.0.0/search/health" }
  })
  .done(function(data) { 
    console.log(data);  
    // Lorica has returned a header we can use. 
    $.ajax({
      url: summonURL+"/health",
	  headers: { "Accept": "application/json",
	             "x-summon-date": data.timestamprfc2616,
				 "Authorization": data.authorizationheader}
    })
	.done(function(data) {
	  console.log(data);
	});     
  });  
  
  //Find out if we're on the right page by Action and Form query params  
  var query = window.location.search.substring(1);
  if ( ~query.indexOf('Action=10') && ~query.indexOf('Form=21') ) {
    // Journal Article (Electronic)
    $( "#Title" ).autocomplete({
	    source: this.SearchJournalTitle,
		minLength: 4
    });
  }
}


/* Autocomplete Source - Search Journal Title */
AresSummonItemSearch.SearchJournalTitle = function (request, response) {
  var parent = AresSummonItemSearch;
  
  console.log(request);
  console.log(parent);
  
  response([ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ]);
}



