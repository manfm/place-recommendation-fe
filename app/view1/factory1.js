'use strict';

angular.module('myApp.view1')
  .factory('MarkerCreatorService', function() {
    var markerId = 0;

    // iconType = 'red','blue-dot','green', ...
    function createByPlace(place, iconType) {
      place['coords'] = {
        'latitude': place.latitude,
        'longitude': place.longitude
      };
      place['showWindow'] = false;
      place['key'] = markerId++;

      place['icon'] = {
        url: "//maps.google.com/mapfiles/ms/icons/" + iconType + ".png"
      };

      return place;
    }

    return {
      createByPlace: createByPlace
    };
  })
  .factory('GeoService', function($http) {
    function getFilteredPlaces(keyPosition, successCallback, errorCallback) {
      // REST_API_URL is global variable from file server.js path '/getenv.js'
      var data = keyPosition;
      data.size = 10;
      var server = (typeof REST_API_URL !== 'undefined') ? REST_API_URL : 'http://localhost:3000';

      $http.get(server, {
        params: data
      }).then(
        // Success
        function(response) {
          //pass places back
          if (typeof successCallback === 'function') {
            return successCallback(response.data);
          }
        },
        errorCallback
      );
    }

    function getCurrentPosition(successCallback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          if (typeof successCallback === 'function') {
            return successCallback({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          }
        });
      } else {
        console.log('Unable to locate current position');
      }
    }

    return {
      getCurrentPosition: getCurrentPosition,
      getFilteredPlaces: getFilteredPlaces
    };
  });
