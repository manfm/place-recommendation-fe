'use strict';

angular.module('myApp.view1')
  .factory('MarkerCreatorService', function() {
    var markerId = 0;

    // iconType = 'red','blue-dot','green', ...
    function createByPlace(place, iconType = 'red') {
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
      var server = (typeof REST_API_URL !== 'undefined') ? REST_API_URL : 'http://localhost:3000';
      $http.get(server, {
        params: keyPosition
      }).then(
        // Success
        function(response) {
          // change data format to required
          var places = [];
          for (var i = 0; i < response.data.length; i++) {
            var place = response.data[i]['_source'];
            places.push({
              name: place.name,
              latitude: place.location.split(',')[0],
              longitude: place.location.split(',')[1],
              rating: place.rating,
              score: Math.round(parseFloat(response.data[i]['_score']) * 100000) //make score int to easilly read by user
            });
          }

          // order by score: descendent
          places.sort(function(a, b) {
            return b.score - a.score
          });

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
