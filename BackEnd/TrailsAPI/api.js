// SETUP VARIABLES
// ==========================================================

 // var apiURL = "https://api.transitandtrails.org/api/v1/trailheads?key=2e5b17ab10f75e98ad4802a9301e8e7c253d3a4c50736c63e1d91170c7106550&limit=5";

                //var apiURL = "https://prescriptiontrails.org/api/filter/?zip=87102&by=zip&offset=0&count=6";

                    // console.log('hi')
            // Going to the URL and getting the data;
         
            // $.ajax({url: apiURL, method: "GET", dataType: "jsonp" }).done(function(data) {
                // $("#trailN").text(data);
                
                console.log('hit');
                //console.log(data);

           
                // console.log(JSON.stringify(data));



// This variable will be pre-programmed with our authentication key (the one we received when we registered)
var authKey = "2e5b17ab10f75e98ad4802a9301e8e7c253d3a4c50736c63e1d91170c7106550";

// These variables will hold the results we get from the user's inputs via HTML
// var queryTerm 	= "";
// var numResults 	= 0;
// var startYear 	= 0;
var zipcode		= 0;
var numResults = 5	;

// Based on the queryTerm we will create a queryURL limit to 5 results
var queryURLBase = "https://api.transitandtrails.org/api/v1/trailheads?key=" + authKey + "&callback=?" + "&limit=" + numResults;

// Array to hold the various article info
var trailsCount = 0;

// FUNCTIONS
// ==========================================================


// This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
function runQuery(numTrail, queryURL){

	// The AJAX function uses the URL and Gets the JSON data associated with it. The data then gets stored in the variable called: "NYTData"
	$.ajax({url: queryURL, method: "GET", dataType: "jsonp"}) 
		.done(function(trailsApi) {

			// Here we are logging the URL so we have access to it for troubleshooting
			console.log("------------------------------------")
			console.log("URL: " + queryURL);
			console.log("------------------------------------")

			// Here we then log the trailsApi to console, where it will show up as an object.
			console.log(trailsApi);
			console.log("------------------------------------")

			// Loop through and provide the correct number of articles
			for (var i=0; i<numTrail; i++) {

					// Add to the Article Counter (to make sure we show the right number)
					trailsCount++;

							// Create the HTML Well (Section) and Add the Article content for each
					var wellSection = $("<div>");
					wellSection.addClass('well');
					wellSection.attr('id', 'articleWell-' + trailsCount)
					$('#wellSection').append(wellSection);

							// Confirm that the specific JSON for the article isn't missing any details
							// If the article has a headline include the headline in the HTML
					// if(trailsApi.response.docs[i].headline != "null")
					// {
						$("#articleWell-"+ trailsCount).append('<h3 class="articleHeadline"><span class="label label-primary">' + trailsCount + '</span><strong>   ' + "trailsApi.response.docs[i].headline.main" + "</strong></h3>");
						
								// Log the first article's Headline to console.
					// 	console.log(trailsApi.response.docs[i].headline.main);
					// }
					
								// If the article has a Byline include the headline in the HTML
					// if( trailsApi.response.docs[i].byline && trailsApi.response.docs[i].byline.hasOwnProperty("original"))
					// {
					// 	$("#articleWell-"+ trailsCount).append('<h5>' + trailsApi.response.docs[i].byline.original + "</h5>");

								// Log the first article's Author to console.
					// 	console.log(trailsApi.response.docs[i].byline.original);
					// }

								// Then display the remaining fields in the HTML (Section Name, Date, URL)
					// $("#articleWell-"+ trailsCount).append('<h5>Section: ' + trailsApi.response.docs[i].section_name + "</h5>");
					// $("#articleWell-"+ trailsCount).append('<h5>' + trailsApi.response.docs[i].pub_date + "</h5>");
					// $("#articleWell-"+ trailsCount).append("<a href='" + trailsApi.response.docs[i].web_url + "'>" + trailsApi.response.docs[i].web_url + "</a>");

					// Log the remaining fields to console as well
					// console.log(trailsApi.response.docs[i].pub_date);
					// console.log(trailsApi.response.docs[i].section_name);
					// console.log(trailsApi.response.docs[i].web_url);	
			}
		});

}

// METHODS
// ==========================================================
	
	// On Click button associated with the Search Button
	$('#runSearch').on('click', function(){

		// Initially sets the trailsCount to 0
		trailsCount = 0;

		// Empties the region associated with the articles
		$("#wellSection").empty();

		// !!!!!!!!!!!!!------Search Term 
		
		// var searchTerm = $('#searchTerm').val().trim();
		// queryURL = queryURLBase + searchTerm;
		queryURL = queryURLBase;
		// Num Results
		numResults = $("#numRecordsSelect").val();

		// // Start Year
		// startYear = $('#startYear').val().trim();

		// // End Year
		// endYear = $('#endYear').val().trim();

		// If the user provides a startYear -- the startYear will be included in the queryURL
		// if (parseInt(startYear)) {
		// 	queryURL = queryURL + "&begin_date=" + startYear + "0101";
		// }

		// // If the user provides a startYear -- the endYear will be included in the queryURL
		// if (parseInt(endYear)) {
		// 	queryURL = queryURL + "&end_date=" + endYear + "0101";
		// }

		// Then we will pass the final queryURL and the number of results to include to the runQuery function
		runQuery(numResults, queryURL);

		// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
		return false;
	});	

// This button clears the top articles section
$('#clearAll').on('click', function(){
	trailsCount = 0;
	$("#wellSection").empty();
})
