var geocoder;
var map;
var marker;

function initialize() {
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	var options = {
		zoom: 5,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("mapa"), options);
	
	geocoder = new google.maps.Geocoder();
	

	var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h2 id="firstHeading" class="firstHeading">Uluru</h2>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335 km (208 mi) '+
    'south west of the nearest large town, Alice Springs; 450 km '+
    '(280 mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'http://en.wikipedia.org/w/index.php?title=Uluru</a> (last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow({
	    content: contentString
	});

	marker = new google.maps.Marker({
		map: map,
		draggable: true
	});

	
	  infowindow.open(map,marker);

	marker.setPosition(latlng);
}

$(document).ready(function () {

	initialize();
	// carregarNoMapa();
	// function carregarNoMapa() {
		geocoder.geocode({ 'address': 'Rua Belfort Roxo 285 , Rio de Janeiro', 'region': 'BR' }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
		
					$('#txtEndereco').val(results[0].formatted_address);
					$('#txtLatitude').val(latitude);
                   	$('#txtLongitude').val(longitude);
		
					var location = new google.maps.LatLng(latitude, longitude);
					marker.setPosition(location);
					map.setCenter(location);
					map.setZoom(16);
					console.log(map);
				}
			}
		})
	//}
	

	
});