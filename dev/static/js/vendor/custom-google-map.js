
var map;
var centermap = {lat: 55.07257293349629, lng: 82.89549135230973};
if(window.matchMedia('(max-width: 1024px)').matches){
	centermap = {lat: 55.072607, lng: 82.899643};
}
function initMap() {
	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		center: centermap,
		zoom: 17,
		mapTypeControl: false,
		streetViewControl: false,
		zoomControl: true,
		panControl: true,
		scaleControl: false,
		fullscreenControl: false,
		styles:[
		{
			'elementType': 'geometry',
			'stylers': [
			{
				'color': '#212121'
			}
			]
		},
		{
			'elementType': 'labels.icon',
			'stylers': [
			{
				'visibility': 'off'
			}
			]
		},
		{
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#757575'
			}
			]
		},
		{
			'elementType': 'labels.text.stroke',
			'stylers': [
			{
				'color': '#212121'
			}
			]
		},
		{
			'featureType': 'administrative',
			'elementType': 'geometry',
			'stylers': [
			{
				'color': '#757575'
			}
			]
		},
		{
			'featureType': 'administrative.country',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#9e9e9e'
			}
			]
		},
		{
			'featureType': 'administrative.land_parcel',
			'stylers': [
			{
				'visibility': 'off'
			}
			]
		},
		{
			'featureType': 'administrative.locality',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#bdbdbd'
			}
			]
		},
		{
			'featureType': 'landscape',
			'elementType': 'labels.icon',
			'stylers': [
			{
				'color': '#8a8a8a'
			}
			]
		},
		{
			'featureType': 'landscape.man_made',
			'elementType': 'geometry.stroke',
			'stylers': [
			{
				'color': '#aaaaa7'
			},
			{
				'saturation': '-75'
			},
			{
				'lightness': '5'
			},
			{
				'weight': '4'
			}
			]
		},
		{
			'featureType': 'landscape.man_made',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#aaaaa7'
			}
			]
		},
		{
			'featureType': 'poi',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#757575'
			},
			{
				'weight': '3'
			}
			]
		},
		{
			'featureType': 'poi.park',
			'elementType': 'geometry',
			'stylers': [
			{
				'color': '#181818'
			}
			]
		},
		{
			'featureType': 'poi.park',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#616161'
			}
			]
		},
		{
			'featureType': 'poi.park',
			'elementType': 'labels.text.stroke',
			'stylers': [
			{
				'color': '#1b1b1b'
			}
			]
		},
		{
			'featureType': 'road',
			'elementType': 'geometry.fill',
			'stylers': [
			{
				'color': '#2c2c2c'
			}
			]
		},
		{
			'featureType': 'road',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#8a8a8a'
			}
			]
		},
		{
			'featureType': 'road.arterial',
			'elementType': 'geometry',
			'stylers': [
			{
				'color': '#373737'
			}
			]
		},
		{
			'featureType': 'road.highway',
			'elementType': 'geometry',
			'stylers': [
			{
				'color': '#3c3c3c'
			}
			]
		},
		{
			'featureType': 'road.highway.controlled_access',
			'elementType': 'geometry',
			'stylers': [
			{
				'color': '#4e4e4e'
			}
			]
		},
		{
			'featureType': 'road.local',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#616161'
			}
			]
		},
		{
			'featureType': 'transit',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#757575'
			}
			]
		},
		{
			'featureType': 'water',
			'elementType': 'geometry',
			'stylers': [
			{
				'color': '#000000'
			}
			]
		},
		{
			'featureType': 'water',
			'elementType': 'labels.text.fill',
			'stylers': [
			{
				'color': '#3d3d3d'
			}
			]
		}
		]

	}

	map = new google.maps.Map( mapCanvas, mapOptions );

	var mapsIcon = {
		url: 'static/img/svg/pin.svg',
		scaledSize: new google.maps.Size(34, 61),
	}

	var features = [
	{
		position: new google.maps.LatLng(55.072607, 82.899643)
	}
	];

	features.forEach(function(feature) {
		var marker = new google.maps.Marker({
			position: feature.position,
			icon: mapsIcon,
			animation: google.maps.Animation.BOUNCE,
			map: map
		});
		marker.addListener('click', function() {
			marker.setAnimation(null);
		});
	});

};