$(document).ready(function() {

// var zipcode = $('#search').val().trim();

// var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=$' + zipcode + '&sensor=false';

// var mapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox.places/Chester.json?country=us&access_token=pk.eyJ1IjoiZGFtaWVud3JpZ2h0IiwiYSI6ImNpdTdvYjlhazAwMGUzM28wdGd5MnYwbDcifQ.Q0yTEMl-dyTpCvVoi87jNA';

	$('#submit').on('click', function() {
		var zipcode = $('#search').val().trim();
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
				}
			}	
		});
			return false;
	});
});