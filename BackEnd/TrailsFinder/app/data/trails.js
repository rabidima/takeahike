	// ===============================================================================
// DATA
// Below data will hold all of the friends.
// ===============================================================================
// var TransitAndTrails = require("transitandtrails");

// var trailheadObj = [];

// var tnt = new TransitAndTrails({
//   key: "2e5b17ab10f75e98ad4802a9301e8e7c253d3a4c50736c63e1d91170c7106550"
// });
 
// trailheadObj = tnt.getTrailhead(292, function(err, trailhead) {
// 		if (err) {
// 		throw err;
// 		}
// 	return this.trailhead;
	
// 	});


var trailheadObj = [
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

module.exports = trailheadObj;

// console.log(trailheadObj);
	// return trailhead.name;
	
			
// 			TnT.prototype.getTrailhead = function(id, callback) {
//   return this.get("/api/v1/trailheads/" + id, callback);
// };