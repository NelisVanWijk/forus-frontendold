let GoogleMapDirective = function($scope, $element, $timeout, GoogleMapService) {
    $scope.style = [];
    // locations = [];
    $scope.markers = [];

    var initialize = function(obj, offices) {
        offices = offices || [];

        var $elementCanvas = $element.find('.map-canvas');
        var map, marker, infowindow;
        var image = $elementCanvas.attr("data-marker");
        var zoomLevel = 12;
        /*var styledMap = new google.maps.StyledMapType($scope.style, {
            name: "Styled Map"
        });*/
        let styles = [
            {
                featureType: 'poi.business',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}]
            }
        ];

        var mapOptions = {
            zoom: zoomLevel,
            disableDefaultUI: false,
            center: new google.maps.LatLng(53.251723, 6.4950947),
            scrollwheel: true,
            fullscreenControl: false,
            styles: styles,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        }

        map = new google.maps.Map(document.getElementById(obj), mapOptions);

        //map.mapTypes.set('map_style', styledMap);
        // map.setMapTypeId('map_style');

        infowindow = new google.maps.InfoWindow();

        offices.forEach(function(office) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(office.lat, office.lon),
                map: map,
                icon: image,
                office: office
            });

            $scope.markers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, office) {
                var description = [
                    'Address: ' + (office.address || 'Geen data'),
                    'Telephone: ' + (office.phone || office.organization.phone || 'Geen data'),
                    'E-mail: ' + (office.email || office.organization.email || 'Geen data'),
                    'Categories: ' + (office.organization.categories || 'Geen data'),
                ];

                return function() {
                    $timeout(function() {
                        $scope.selectedOffice = office.id;
                    }, 100);

                    infowindow.setContent(
                        '<div class="map-card">\
                                <img class="map-card-img" src="' + (office.photo ? office.photo.sizes.thumbnail : 'assets/img/placeholders/office-thumbnail.png') + '" alt=""/>\
                                <div class="map-card-title">' + (office.organization.name || 'Geen data') + '</div>\
                                <div class="map-card-description">' + description.join('<br />') + '</div>\
                                </div>');
                    infowindow.open(map, marker);
                }
            })(marker, office));
        });
    }

    $scope.$watch('selectedOffice', function(selectedOffice) {
        $scope.markers.forEach(marker => {
            if (marker.office.id == selectedOffice) {
                google.maps.event.trigger(marker, 'click')
            }
        });
    });

    $scope.$watch('offices', function(offices) {
        initialize('map-canvas-contact', offices);
    });

    GoogleMapService.getStyle().then(function(style) {
        $scope.style = style.style;
        initialize('map-canvas-contact');
    });
};

module.exports = () => {
    return {
        templateUrl: 'assets/tpl/directives/google-map.html',
        replace: true,
        transclude: true,
        scope: {
            offices: '=',
            selectedOffice: '=?'
        },
        controller: [
            '$scope',
            '$element',
            '$timeout',
            'GoogleMapService',
            GoogleMapDirective
        ]
    };
};