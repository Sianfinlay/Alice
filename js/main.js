//main.js
var app = angular.module('aliceApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/welcome', {
        controller: 'routeController',
        templateUrl: 'partials/welcome.html'
      }).
      when('/game', {
        controller: 'routeController',
        templateUrl: 'partials/game.html'
      }).
      otherwise({
        redirectTo: '/welcome'
      })
  }]).
  controller('routeController', ['$scope', '$location', function($scope, $location) {
    $scope.onGame = $location.path() === '/game';
    $scope.onWelcome = $location.path() === '/welcome';
    $('.scroll').smoothScroll();
  }]);

