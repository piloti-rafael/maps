/*
	Site: http://www.piloti.com.br
	Version : 1.1
	Description: Plugin com integração google maps.
*/


(function($) {
  $.fn.mapa = function(settings) {
	var container;
	if (this[0].nodeName === "SELECT"){

		var params = (typeof settings != "undefined") ? settings.container : "naoDefinido"

		if (params == "naoDefinido" || params == undefined){
			console.log("Por Favor defina o container");
			return;
		}else{
			container = settings.container
		}
	}else{
		container = this.selector
	}
	var config = {
		container: container,
		containerSize: {
			height: "400px",
			width: "600px",
			display: "block"
		},
		address: "Av. Venezuela",
		number : "231",
		city: "Rio de Janeiro",
		region: 'BR',
		contentString: null,
		elementoNodeName: this[0].nodeName,
		elementoDOM: this
	};
	//$.extend(config, settings);
	$.extend(true, config, settings);
	return this.each(function() {

		//crio tamanho para o container 
		$(config.container).css(config.containerSize);

		var geocoder;
		var map;
		var marker;
		var data;
		var latlng = new google.maps.LatLng(-22.8800397, -43.15878999999999);
		var options = {
			zoom: 5,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map($(config.container)[0], options);
		geocoder = new google.maps.Geocoder();

		if(config.contentString === null){
			data = {};
		}else{
			data = {content: config.contentString};
		}

		function popup(data){
			var infowindow = new google.maps.InfoWindow(data);
			infowindow.open(map,marker);
		}

		marker = new google.maps.Marker({
			map: map,
			draggable: false
		});


		marker.setPosition(latlng);

		if (config.elementoNodeName == "SELECT"){
			$(config.elementoDOM).on("change", function(){
				var endereco = $(this).val();
				var description = {content: $('option:selected', this).attr('data-description')};
					endereco = endereco.split(",");
				if (description.content == undefined){
					description = {};
				}
				popup(description);
				montaGeocoder(endereco[0], endereco[1], endereco[2], endereco[3]);

			});
		}else{
			popup(data);

			montaGeocoder(config.address, config.number, config.city, config.region)
		}


		function montaGeocoder(address, number, city, region){
			geocoder.geocode({ 'address': address + ", "+ number+", " + city , 'region': region }, function (results, status) {
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
		}


	});
  };
})(jQuery);