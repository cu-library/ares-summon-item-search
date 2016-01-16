/* ares-summon-item-search - https://github.com/cu-library/ares-summon-item-search */

var AresSummonItemSearch = AresSummonItemSearch || {};

/* Init function */
AresSummonItemSearch.init = function($, loricaURL){

  var parent = AresSummonItemSearch;
 
  parent.$ = $;
  parent.loricaURL = loricaURL;
	
  // Add the css file links.  
  $('head').append('<link rel="stylesheet" href="css/ares-summon-item-search.css" type="text/css" />');
  $('head').append('<link rel="stylesheet" href="css/jquery-ui-1.11.4.min-edit.css" type="text/css" />');
  
  // Health check - Ensure Is Summon is available
  $.ajax({
    url: loricaURL+"/ping",
	dataType: "json",
  })
  .done(function(data) {   
	if ( data.status == "available") {	
	  // Summon is available. Enable the typeahead.	
	  // Find out if we're on the right page by Action and Form query params  
      var query = window.location.search.substring(1);
      if ( ~query.indexOf('Action=10') && ~query.indexOf('Form=21') ) {
        // Journal Article (Electronic)
        $( "#Title" ).addClass("ares-summon-autocomplete").autocomplete({
	        source: parent.SearchJournalTitle,
	    	minLength: 4,
			delay: 1000,
        });
      }
	}       
  });  
  
  
}


/* Autocomplete Source - Search Journal Title */
AresSummonItemSearch.SearchJournalTitle = function (request, response) {
  var parent = AresSummonItemSearch;
  
  $ = parent.$;
 loricaURL = parent.loricaURL;
 
 console.log(request);
  
  $.ajax({
    url: loricaURL,
	dataType: "json",
	data: {
	  "s.light":"true",
	  "s.fvf":"ContentType,Journal / eJournal",
	  "s.ps":"5",
	  "s.ho":"true",
	  "s.q":request.term,
	},	
  })
  .done(function(data) {   
	console.log(data);
    response($.map(data.documents, function( resultdocument ){
		return resultdocument.Title[0].replace(/<\/?[^>]+(>|$)/g, "");
	})); 	      
  })
  .fail(function() {
    response([]);
  });   
  
  
}



