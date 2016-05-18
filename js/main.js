//main.js
var app = angular.module('aliceApp', ['ngRoute', 'ngLoadScript']);



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
  controller('routeController', ['$scope', '$location', '$window', function($scope, $location, $window) {
    $scope.onGame = $location.path() === '/game';
    $scope.onWelcome = $location.path() === '/welcome';
    $('.scroll').smoothScroll();


    $scope.includeDesktopTemplate = false;
    $scope.includeMobileTemplate = false; 
    var screenWidth = $window.innerWidth;

    if (screenWidth < 569){
        $scope.includeMobileTemplate = true;
    }else{
        $scope.includeDesktopTemplate = true;
    }
  }]);