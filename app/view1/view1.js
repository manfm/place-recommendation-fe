'use strict';

angular.module('myApp.view1', ['ngRoute', 'uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]).
config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
}).
controller('View1Ctrl', ['$scope', 'uiGmapGoogleMapApi', "uiGmapObjectIterators", 'MarkerCreatorService', 'GeoService',
  function($scope, googleMap, uiGmapObjectIterators, MarkerCreatorService, GeoService) {

    $scope.map = {
      center: {
        latitude: 35.68,
        longitude: 139.75
      },
      zoom: 12,
      markers: [],
      control: {},
      options: {
        scrollwheel: false
      }
    };

    var places = GeoService.getFilteredPlaces(3);

    var markers = [];
    for (var id = 0; id < places.length; id++) {
      markers.push(MarkerCreatorService.createByCoords(places[id].lat, places[id].lng));
    }

    $scope.map.markers = uiGmapObjectIterators.slapAll(markers);

    googleMap.then(function(maps) {
      // The callback function provides the google.maps object.
    });
  }
]);
