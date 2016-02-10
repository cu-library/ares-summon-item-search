/* ares-summon-item-search - https://github.com/cu-library/ares-summon-item-search */

/* Create a AresSummonItemSearch namespace by creating an empty object,
   in which we can define our data and functions. */
var AresSummonItemSearch = AresSummonItemSearch || {};

/* Init function. */
AresSummonItemSearch.init = function (jq, loricaURL) {

    "use strict";
    var parent = AresSummonItemSearch;
    parent.jq = jq;
    parent.loricaURL = loricaURL;

    // Add the css file links.
    jq('head').append('<link rel="stylesheet" href="css/ares-summon-item-search.css" type="text/css" />');
    jq('head').append('<link rel="stylesheet" href="css/jquery-ui-1.11.4.min-edit.css" type="text/css" />');

    // Health check - Ensure Is Summon is available
    jq.ajax({
        url: loricaURL + "/ping",
        dataType: "json"
    })
        .done(function (data) {
            if (data.status === "available") {
                // Summon is available. Enable the typeahead.
                // Find out if we're on the right page by Action and Form query params
                var query = window.location.search.substring(1);
                if (~query.indexOf('Action=10') && ~query.indexOf('Form=21')) {
                    // -- Journal Article (Electronic)
                    // Search Journal Titles
                    jq("#Title").addClass("ares-summon-autocomplete").autocomplete({
                        source: parent.SearchJournalTitle,
                        minLength: 4,
                        delay: 500
                    });
                    // Search Article Titles
                    jq("#ArticleTitle").addClass("ares-summon-autocomplete").autocomplete({
                        source: parent.SearchArticleTitle,
                        select: parent.SelecteArticleTitle,
                        minLength: 4,
                        delay: 500
                    });
                    // Add help to form
                    jq("label[for='JournalTitle'] b").append("<br><span class=\"note\">Searches Summon for Journal Titles.</span>");
                    jq("label[for='ArticleTitle'] b").append("<br><span class=\"note\">Searches Summon for Article Titles.</span>");
                    jq("label[for='ArticleTitle'] b").append("<br><span class=\"note\">Rescricts by Journal Title, if available.</span>");
                    jq("label[for='ArticleTitle'] b").append("<br><span class=\"note\">Selecting a title from the dropdown will fill in parts</span>");
                    jq("label[for='ArticleTitle'] b").append("<br><span class=\"note\">of the form from available Summon data.</span>");
                }
            }
        });
};

/* Autocomplete Source - Search Journal Title */
AresSummonItemSearch.SearchJournalTitle = function (request, response) {

    "use strict";
    var parent = AresSummonItemSearch;
    var jq = parent.jq;
    var loricaURL = parent.loricaURL;

    var query = request.term;

    jq.ajax({
        url: loricaURL,
        dataType: "json",
        data: {
            "s.light": "true",
            "s.fvf": "ContentType,Journal / eJournal",
            "s.mr": "5",
            "s.ps": "5",
            "s.hl": "false",
            "s.q": query
        }
    })
        .done(function (data) {
            response(jq.map(data.documents, function (resultdocument) {
                return resultdocument.Title[0];
            }));
        })
        .fail(function () {
            response([]);
        });
};

/* Autocomplete Source - Search Article Title */
AresSummonItemSearch.SearchArticleTitle = function (request, response) {

    "use strict";
    var parent = AresSummonItemSearch;
    var jq = parent.jq;
    var loricaURL = parent.loricaURL;

    var query = request.term;

    if (jq("#Title").val() !== "") {
        // If the journal title has already been supplied, use it to restrict the search.
        query = "(" + request.term + ") AND (PublicationTitle:(" + jq("#Title").val() + "))";
    }

    jq.ajax({
        url: loricaURL,
        dataType: "json",
        data: {
            "s.light": "true",
            "s.fvf": "ContentType,Journal Article",
            "s.mr": "5",
            "s.ps": "5",
            "s.hl": "false",
            "s.q": query
        }
    })
        .done(function (data) {
            response(jq.map(data.documents, function (resultdocument, index) {
                return {
                    "label": resultdocument.Title[0],
                    "value": index.toString() + query
                };
            }));
        })
        .fail(function () {
            response([]);
        });
};

/* Autocomplete Select - Article Title Selected */
AresSummonItemSearch.SelecteArticleTitle = function (event, ui) {

    "use strict";
    var parent = AresSummonItemSearch;
    var jq = parent.jq;
    var loricaURL = parent.loricaURL;

    var indexInResults = parseInt(ui.item.value.substr(0, 1));
    var query = ui.item.value.substr(1);

    jq("#ArticleTitle").val(ui.item.label);
    jq("#ArticleTitle").addClass("ui-autocomplete-loading");
    event.preventDefault();

    jq.ajax({
        url: loricaURL,
        dataType: "json",
        data: {
            "s.light": "true",
            "s.fvf": "ContentType,Journal Article",
            "s.mr": "5",
            "s.ps": "5",
            "s.hl": "false",
            "s.q": query
        }
    })
        .done(function (data) {

            var result = data.documents[indexInResults];

            // Journal Title
            if (jq("#Title").val() === "" && "PublicationTitle" in result) {
                jq("#Title").val(result.PublicationTitle[0]);
            }

            // Author
            jq("#Author").val("");
            if ("Author_xml" in result) {
                if (result.Author_xml.length === 1) {
                    jq("#Author").val(result.Author_xml[0].surname + ", " + result.Author_xml[0].givenname);
                } else if (result.Author_xml.length === 2) {
                    jq("#Author").val(result.Author_xml[0].surname + ", " + result.Author_xml[0].givenname + " and " + result.Author_xml[1].surname + ", " + result.Author_xml[1].givenname);
                } else {
                    jq("#Author").val(result.Author_xml[0].surname + ", " + result.Author_xml[0].givenname + ", et al.");
                }
            }

            // Year
            jq("#JournalYear").val("");
            if ("PublicationDate_xml" in result) {
                jq("#JournalYear").val(result.PublicationDate_xml[0].year);
            }

            // Volume
            jq("#Volume").val("");
            if ("Volume" in result) {
                jq("#Volume").val(result.Volume[0]);
            }

            // Issue
            jq("#Issue").val("");
            if ("Issue" in result) {
                jq("#Issue").val(result.Issue[0]);
            }

            // Month
            jq("#Month").val("");
            if ("PublicationDate_xml" in result) {
                jq("#Month").val(parent.GetMonthName(result.PublicationDate_xml[0].month));
            }

            // Pages
            jq("#Pages").val("");
            if ("StartPage" in result) {
                var startpage = result.StartPage[0];
                if ("EndPage" in result) {
                    var endpage = result.EndPage[0];
                    jq("#Pages").val(startpage + "-" + endpage);
                } else {
                    jq("#Pages").val(startpage);
                }
            }

            //URL
            jq("#URL").val("");
            if ("link" in result) {
                jq("#WebLink").prop("checked", true);
                jq("#URL").val(result.link);
            }
        })
        .always(function (data) {
            jq("#ArticleTitle").removeClass("ui-autocomplete-loading");
        });

};

AresSummonItemSearch.GetMonthName = function (monthNumber) {
    "use strict";
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[parseInt(monthNumber) - 1];
};