$(document).ready(function() {

    var locations = [
      ['Place 1', 34.1517492, -118.5214282, 1],
      ['Place 2', 34.0194543, -118.4911912, 2],
      ['Place 3', 34.0736204, -118.4003563, 3],
      ['Place 4', 34.0609876, -118.3023579, 4],
      ['Place 5', 34.0211224, -118.3964665, 5]
    ];

// var zipcode = $('#search').val().trim();

// var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=$' + zipcode + '&sensor=false';

// var mapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox.places/Chester.json?country=us&access_token=pk.eyJ1IjoiZGFtaWVud3JpZ2h0IiwiYSI6ImNpdTdvYjlhazAwMGUzM28wdGd5MnYwbDcifQ.Q0yTEMl-dyTpCvVoi87jNA';

	$('#submit').on('click', function() {
		var zipcode = $('#pac-input').val().trim();
		var queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&sensor=false`
		console.log('Location entered:', zipcode);

		$.ajax({
			url: queryURL, 
			method:'GET'
		}).done(function(response) {

			if(zipcode.length < 5) {
				console.log('Invalid Zip Code')
			} else {
				for(i=0; i<response.results.length; i++) {
		      		var lat = response.results["0"].geometry.location.lat;
      				var long = response.results["0"].geometry.location.lng;		
					console.log('Latitude:', lat, 'Longitude:', long);
					getTrails(long, lat);
				}
			}	
		
		});
			return false;
	});



  function getTrails(long, lat) {
    var currentURL = window.location.origin;
    $.get(`http://localhost:3000/api/trailsapi/${long}/${lat}`, function(data) {
      console.log('data', data)
    })


  }

	// Display and Update Google Map based on search location
	function initAutocomplete() {
      
      // Stack code ===========
var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 12,
     center: {lat: 34.0522342, lng: -118.2436849},
     mapTypeId: 'terrain'
});

var infowindow = new google.maps.InfoWindow;

var marker, i;

for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
         map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
         return function() {
             infowindow.setContent(locations[i][0]);
             infowindow.open(map, marker);
         }
    })(marker, i));
}
      // =======================

        // var map = new google.maps.Map(document.getElementById('map'), {
        //   center: {lat: 34.0522342, lng: -118.2436849},
        //   zoom: 10,
        //   mapTypeId: 'terrain'
        // });
            
        //  if(navigator.geolocation) {
        //  	navigator.geolocation.getCurrentPosition(function(position) {
        //  		var pos = {
        //  			lat: position.coords.latitude,
        //  			lng: position.coords.longitude
        //  		}
        //  	});
        //  }     

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
	initAutocomplete();
 });