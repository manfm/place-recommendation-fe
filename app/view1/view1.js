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
    $scope.currentPotision = {
      latitude: 34.68,
      longitude: 135.50
    };

    $scope.map = {
      center: $scope.currentPotision,
      zoom: 12,
      markers: [],
      control: {},
      options: {
        scrollwheel: false
      }
    };

    uiGmapGoogleMapApi.then(function(map) {
      //map is ready
      GeoService.getCurrentPosition(recommend);
    });

    function recommend(lat, lng) {
      $scope.currentPotision = {
        latitude: lat,
        longitude: lng
      };

      var places = GeoService.getFilteredPlaces($scope.currentPotision, 3);

      var markers = [];
      for (var id = 0; id < places.length; id++) {
        markers.push(
          MarkerCreatorService.createByCoords(places[id].latitude, places[id].longitude)
        );
      }

      $scope.map.markers = uiGmapObjectIterators.slapAll(markers);

      $scope.map.control.refresh($scope.currentPotision);
    }
  }
]);
