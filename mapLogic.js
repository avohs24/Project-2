module.exports = function autoPlace(){
//global storage for Google-generated autocomplete
	var autocomplete;

	// Bias the autocomplete object to the user's geographical location,
	// as supplied by the browser's 'navigator.geolocation' object.
	function geolocate() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var geolocation = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
	      var circle = new google.maps.Circle({
	        center: geolocation,
	        radius: position.coords.accuracy
	      });
	      autocomplete.setBounds(circle.getBounds());
	    });
	  }
	}

		// collect Place for each location from createMarkers
		var places = [];
		//define map center
		var input = document.getElementById('search');
		//save google place info
		var place;

		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.cleanData.Autocomplete(
		    /** @type {!HTMLInputElement} */(document.getElementById('search')),
		    {types: ['geocode']});
		//save place info on user selection
		autocomplete.addListener('place_changed', function(){
			  place = autocomplete.getPlace();

		});

		$('#search').on('click', function(){

			// Make api call to convert address or zip to lat/lng and then center map accordingly
			// format: address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
			// TO-DO: get key?
			var address = place.formatted_address;;
			var addressArray = address.split(' ');
			var addressParam = addressArray.join('+');
			var components = '&components=country:US';
			query2 = 'https://maps.googleapis.com/maps/api/geocode/json?address='+addressParam+components;
			console.log('query2')
			$.ajax({
				url: query2,
				method: "GET"
			})
			.done(function(response) {
				center = response.results[0].geometry.location;

			this.createMarkers(map);
			geolocate();

	    	})
	    })



}


	function googleError(){
		alert('Sorry, Google did not respond');
	}
}
	//link index.html to firebase;
	// add accessiblePlaygrounds to firebase;
	//populate locations array in maps with firebase objects
	//sort by region?
