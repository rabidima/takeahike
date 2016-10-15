$(document).ready(function() {

  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFtaWVud3JpZ2h0IiwiYSI6ImNpdTdvYjlhazAwMGUzM28wdGd5MnYwbDcifQ.Q0yTEMl-dyTpCvVoi87jNA';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
      center: [-74.50, 40], // starting position
      zoom: 9 // starting zoom
  });

// var zipcode = $('#search').val().trim();

// var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=$' + zipcode + '&sensor=false';

// var mapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox.places/Chester.json?country=us&access_token=pk.eyJ1IjoiZGFtaWVud3JpZ2h0IiwiYSI6ImNpdTdvYjlhazAwMGUzM28wdGd5MnYwbDcifQ.Q0yTEMl-dyTpCvVoi87jNA';

	$('#submit').on('click', function() {
		var zipcode = $('#search').val().trim();
		var queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&sensor=false`
		console.log(zipcode);

		$.ajax({

			url: queryURL, 
			method:'GET'

		}).done(function(response) {
				for(i=0; i<response.results.length; i++) {
		      		var lat = response.results["0"].geometry.location.lat;
      				var long = response.results["0"].geometry.location.lng;		
					console.log('Latitude: ', lat, 'Longitude: ', long);
				}
				
			});
				return false;
	});
});