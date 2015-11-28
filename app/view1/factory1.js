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
factory('GeoService', function() {
  function getPlaces() {
    var places = [];
    var count = 20;

    function randomizePoint(point) {
      var negativeOrPositive = (Math.random() > 0.5) ? -1 : 1;
      var randomNumber = 3 * (Math.random() / 100); // 3 * 0.00xxxx
      return point + (randomNumber * negativeOrPositive);
    }

    for (var i = 0; i < count; i++) {
      places.push({
        lat: randomizePoint(35.68),
        lng: randomizePoint(139.75),
        rating: Math.floor(((Math.random() * 10) % 5) + 1) //raing 1*-5*
      });
    }

    return places;
  }

  function filterPlaces(places, returnCount) {
    //sort from 5* rating to 1*
    places.sort(function(a, b) {
      return b.rating - a.rating;
    });

    //return x items with best rating
    return places.slice(0, returnCount);
  }

  function getFilteredPlaces(returnCount = 10) {
    return filterPlaces(getPlaces(), returnCount);
  }

  return {
    getPlaces: getPlaces,
    getFilteredPlaces: getFilteredPlaces
  };
});
