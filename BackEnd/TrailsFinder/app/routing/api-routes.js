// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var friendsData = require('../data/friends.js');


// ===============================================================================
// ROUTING
// ===============================================================================

 var trailsData = require('../data/trails.js');
 var request = require('request');
var TransitAndTrails = require("transitandtrails");

var dummyData = [
 {
    "id": 1,
    "name": "Dornan Drive Parking Lot (South)",
    "description": null,
    "longitude": -122.387559819,
    "latitude": 37.910347725,
    "distance": "1453.81973124279",
    "author_id": 1,
    "non_profit_partner_id": null,
    "non_profit_partner_name": null,
    "non_profit_partner_website": null,
    "park_name": "Miller Knox Regional Shoreline",
    "park_agency_id": 1,
    "park_agency_name": "East Bay Regional Park District",
    "park_agency_website": "http://www.ebparks.org/",
    "trip_ids": [

    ]
  },
  {
    "id": 2,
    "name": "Seacliff Drive Walk-In Entrance",
    "description": null,
    "longitude": -122.374055385,
    "latitude": 37.9107932422,
    "distance": "1453.08448145303",
    "author_id": 1,
    "non_profit_partner_id": null,
    "non_profit_partner_name": null,
    "non_profit_partner_website": null,
    "park_name": "Miller Knox Regional Shoreline",
    "park_agency_id": 1,
    "park_agency_name": "East Bay Regional Park District",
    "park_agency_website": "http://www.ebparks.org/",
    "trip_ids": [

    ]
  },
  {
    "id": 3,
    "name": "Dornan Drive Parking Lot (Picnic Area 2)",
    "description": null,
    "longitude": -122.384094273,
    "latitude": 37.9140336214,
    "distance": "1453.60476227373",
    "author_id": 1,
    "non_profit_partner_id": null,
    "non_profit_partner_name": null,
    "non_profit_partner_website": null,
    "park_name": "Miller Knox Regional Shoreline",
    "park_agency_id": 1,
    "park_agency_name": "East Bay Regional Park District",
    "park_agency_website": "http://www.ebparks.org/",
    "trip_ids": [

    ]
  },
  {
    "id": 4,
    "name": "Dornan Drive Parking Lot (Picnic Area 1)",
    "description": null,
    "longitude": -122.384019355,
    "latitude": 37.9153842127,
    "distance": "6.56188738659526",
    "author_id": 1,
    "non_profit_partner_id": null,
    "non_profit_partner_name": null,
    "non_profit_partner_website": null,
    "park_name": "Miller Knox Regional Shoreline",
    "park_agency_id": 1,
    "park_agency_name": "East Bay Regional Park District",
    "park_agency_website": "http://www.ebparks.org/",
    "trip_ids": [
      1379
    ]
  },
  {
    "id": 5,
    "name": "Canal Blvd Walk-In Entrance",
    "description": null,
    "longitude": -122.373042999,
    "latitude": 37.9178169989,
    "distance": "1452.97799370565",
    "author_id": 1,
    "non_profit_partner_id": null,
    "non_profit_partner_name": null,
    "non_profit_partner_website": null,
    "park_name": "Miller Knox Regional Shoreline",
    "park_agency_id": 1,
    "park_agency_name": "East Bay Regional Park District",
    "park_agency_website": "http://www.ebparks.org/",
    "trip_ids": [

    ]
  }
]	

module.exports = function (app) {
	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------
	

// var trailheadObj = [];




	app.get('/api/trails/:lon/:lat', function(req,res){
		res.send(dummyData)
// 		 console.log(req.params)

// 		 var tnt = new TransitAndTrails({
// 		  key: "2e5b17ab10f75e98ad4802a9301e8e7c253d3a4c50736c63e1d91170c7106550"
// 		});
		 
// 		tnt.getTrailhead(292, function(err, trailhead) {
// 				if (err) {
// 				throw err;
// 				}
		
	
// 	});

// 		// var lat = req.params.lat;
// 		// var long = req.params.long;
// 		var trailsURL = 'https://api.transitandtrails.org/api/v1/trailheads';
// 		var limit = '&limit=5';
// 		var latitude = 57.9178169989;
// 		var longitude = -122.373042999;
// 		var key = '?key=2e5b17ab10f75e98ad4802a9301e8e7c253d3a4c50736c63e1d91170c7106550';

// // + "&longitude=" + "-122.373042999" + "&latitude=" + "57.9178169989" 

// 		//make request to trails api with lat long
// 		request(trailsURL + key + limit , function (error, response, body) {
// 		  if (!error && response.statusCode == 200) {
// 		    console.log(body) 
// 		    // Print the google web page.
// 		    res.json(body)
// 		  }
// 		})
// 		//once request is complete ".then()" send it to the front end
// 		// res.send or res.json
				
// 		// res.send(body)
		
	});	
};	
	// app.get('/api/friends', function (req, res) {
	// 	res.json(friendsData);
	// });

	
	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a form... this data is then sent to the server...
	// Then the server saves the data to the friendsData array)
	// ---------------------------------------------------------------------------

	// app.post('/api/friends', function (req, res) {
	// 	// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
	// 	// It will do this by sending out the value "true" have a table
	// 		friendsData.push(req.body);

	// 		res.json(friendsData);
		
	// });

	// // ---------------------------------------------------------------------------
	// // Clear out the table while working with the functionality.

	// app.post('/api/clear', function () {
	// 	// Empty out the arrays of data
	// 	friendsData = [];
	
		
	// });

