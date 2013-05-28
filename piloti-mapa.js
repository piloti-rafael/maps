/*
	Site: http://www.piloti.com.br
	Version : 0.1
	Description: Plugin com integração google maps.
*/


(function($) {
  $.fn.mapa = function(settings) {
	var config = {
		container: this.selector,
		containerSize: {
			height: "400px",
			width: "600px",
			display: "block"
		},
		address: "Av. Venezuela, 131",
		city: "Rio de Janeiro",
		region: 'BR',
		contentString: null
	};
	//$.extend(config, settings);
	$.extend(true, config, settings);

	return this.each(function() {

		$(config.container).css(config.containerSize);
		var geocoder;
		var map;
		var marker;
		var data;
		
			var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
			var options = {
				zoom: 5,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map($(config.container)[0], options);
			//crio tamanho para o container 



			geocoder = new google.maps.Geocoder();

			if(config.contentString === null){
				data = {};
			}else{
				data = {content: config.contentString};
			}
				var infowindow = new google.maps.InfoWindow(data);


			marker = new google.maps.Marker({
				map: map,
				draggable: true
			});


			infowindow.open(map,marker);

			marker.setPosition(latlng);

		geocoder.geocode({ 'address': config.address + ", " + config.city , 'region': config.region }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
					var location = new google.maps.LatLng(latitude, longitude);
					marker.setPosition(location);
					map.setCenter(location);
					map.setZoom(16);
				}
			}
		});

	});
  };
})(jQuery);