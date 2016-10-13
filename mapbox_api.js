var zipcode = $('#search').val().trim();

var mapboxAPI = 'https://api.mapbox.com/directions/v5/mapbox.places/Chester.json?country=us&access_token=pk.eyJ1IjoiZGFtaWVud3JpZ2h0IiwiYSI6ImNpdTdvYjlhazAwMGUzM28wdGd5MnYwbDcifQ.Q0yTEMl-dyTpCvVoi87jNA';

var queryURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9AISNsRxkGIS_daS75JCY_XNSKZ-RJjk&callback=initMap' + zipcode;

		$.ajax({

			url: queryURL, 
			method:'GET',
			dataType: "JSONP"

		}).done(function(response) {
			$('#search').click(function(){
				console.log(zipcode);
			})
			// for(var i=0; i<3; i++) {
			// 	console.log(response);
			// }
		});

