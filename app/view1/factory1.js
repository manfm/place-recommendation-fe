'use strict';

angular.module('myApp.view1').
factory('MarkerCreatorService', function() {

  var markerId = 0;

  function createByCoords(latitude, longitude) {
    return {
      'coords': {
        'latitude': latitude,
        'longitude': longitude
      },
      'key': markerId++
    };
  }

  return {
    createByCoords: createByCoords
  };
}).
factory('GeoService', function($http) {
  function getFilteredPlaces(keyPosition, returnCount = 10, successCallback, errorCallback) {
    var server = 'http://localhost:3000';
    $http.get(server, {
      params: keyPosition
    }).then(
      // Success
      function(response) {
        // change datat format to required
        var places = [];
        for (var i = 0; i < response.data.length; i++) {
          var place = response.data[i]['_source'];
          places.push({
            name: place.name,
            latitude: place.location.split(',')[0],
            longitude: place.location.split(',')[1],
            rating: place.rating
          });
        }

        //pass places back
        if (typeof successCallback === 'function') {
          return successCallback(places);
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
