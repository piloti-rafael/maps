Module("Piloti", function(Piloti){

	Piloti.fn.initialize = function(settings) {
		if (settings.mapa){
			this.Map(settings.seletor, settings.mapa);
		}
	};

	Piloti.fn.Map = function(seletor, settings){

		var container;
		// console.log(settings);
		if (seletor[0].nodeName === "SELECT"){

			var params = (typeof settings != "undefined") ? settings.container : "naoDefinido";

			if (params == "naoDefinido" || params == undefined){
				console.log("Por Favor defina o container");
				return;
			}else{
				container = settings.container;
			}
		}else{
			container = seletor;
		}
		var config = {
			icon: null,
			shadow: null,
			container: container,
			containerSize: {
				height: "400px",
				width: "600px",
				display: "block"
			},
			address: "Av. Venezuela",
			number : "131",
			city: "Rio de Janeiro",
			region: 'BR',
			contentString: null,
			elementoNodeName: seletor[0].nodeName,
			elementoDOM: seletor[0]
		};

		$.extend(true, config, settings);

		// seto o estilo css para o container

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
			draggable: false,
			icon : config.icon,
			shadow : config.shadow
		});

		marker.setPosition(latlng);

		if (config.elementoNodeName == "SELECT"){

			config.elementoDOM.addEventListener("change", function(){
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

	};

});