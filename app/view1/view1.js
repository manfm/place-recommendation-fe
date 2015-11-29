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
  function($scope, uiGmapGoogleMapApi, uiGmapObjectIterators, MarkerCreatorService, GeoService) {

    //default position. Will be changed after getting position from browser
    $scope.currentPotision = {
      latitude: 34.68,
      longitude: 135.50
    };

    //map init
    $scope.map = {
      center: $scope.currentPotision,
      zoom: 12,
      markers: [],
      control: {},
      options: {
        scrollwheel: false
      }
    };

    //callback when map is ready
    uiGmapGoogleMapApi.then(function(map) {
      //get position from web browser
      GeoService.getCurrentPosition(function(position) {
        moveMapCenterToPosition(position);
        loadPlaces(position);
      });
    });

    function moveMapCenterToPosition(position) {
      $scope.currentPotision = position;
      refreshMap();
    }

    function loadPlaces(position) {
      //get places from web rest api
      GeoService.getFilteredPlaces(position, 3, function(places) {
        // put places to map as markers
        var markers = [];
        for (var id = 0; id < places.length; id++) {
          markers.push(
            MarkerCreatorService.createByCoords(places[id].latitude, places[id].longitude)
          );
        }

        $scope.map.markers = uiGmapObjectIterators.slapAll(markers);

        refreshMap();
      });
    }

    function refreshMap() {
      $scope.map.control.refresh($scope.currentPotision);
    }
  }
]);
