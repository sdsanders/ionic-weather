angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Weather) {

})

.controller('CurrentlyCtrl', function($scope, Weather) {
  $scope.getCurrentWeather = function() {
    var onSuccess = function(position) {
      $scope.position = position;

      $scope.weather = Weather.get(
        {
          args : $scope.position.coords.latitude + ',' + $scope.position.coords.longitude
        }
        , function() {
        console.log($scope.weather);
        $scope.$broadcast('scroll.refreshComplete');
      }); // get() returns a single entry
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  $scope.getCurrentWeather();
})

.controller('ForecastCtrl', function($scope, $stateParams, Weather) {
  $scope.time = $stateParams.time;
  
  $scope.getForecast = function() {
    var onSuccess = function(position) {
      $scope.position = position;

      $scope.weather = Weather.get(
        {
          args : $scope.position.coords.latitude + ',' + $scope.position.coords.longitude + ',' + $scope.time
        }
        , function() {
        console.log($scope.weather);
        $scope.$broadcast('scroll.refreshComplete');
      }); // get() returns a single entry
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  
  $scope.getForecast();
})

.directive('weatherIcon', function(){
  return {
    restrict: 'E',
    scope: {
      'icon': '=icon'
    },
    template: '<i class="icon icon-large" ng-class="getIconClass()"></i>',
    link: function(scope, element, attrs) {
      scope.getIconClass = function() {
        return scope.icon;
      }
    }
  }
})

.factory('Weather', function($resource) {
  var baseURL = 'https://api.forecast.io/forecast/8e3469ed24e6e038711f6706299bf8ce/';

  return $resource(baseURL + ':args');
});
