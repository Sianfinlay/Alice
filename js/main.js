//main.js
// create angular app variable
var app = angular.module('aliceApp', ['ngRoute', 'ngLoadScript']);
// using angular router to create the welcome and game views
// using 'ngLoadScript' to load game script inside the game view

// function below control to the menu opening and closing
// menu added to the site for user to access both views, for example if user forget how to play they can return to the 'how-to' section in the welcome view using the menu
function openNav() {
    $("#myNav").css("width", "100%");
    $(".game").css("display", "none");
}

function closeNav() {
    $("#myNav").css("width", "0%");
    setTimeout(function() { // timeout to deal with menu and canvas overlap issue
      // z-index doesn't seem to fix it
      $(".game").css("display", "table");
    }, 500);   
}

// config routes
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/welcome', {// welcome route
        controller: 'routeController', 
        templateUrl: 'partials/welcome.html'
      }).
      when('/game', {// game route
        controller: 'routeController',
        templateUrl: 'partials/game.html'
      }).
      otherwise({// redirect to welcome if unknown route is input in url
        redirectTo: '/welcome'
      })
  }]).
  controller('routeController', ['$scope', '$location', '$window', function($scope, $location, $window) { 
    // routes
    $scope.onGame = $location.path() === '/game';
    $scope.onWelcome = $location.path() === '/welcome';
    // used smoothScroll to scroll down to 'how-to' when on welcome page
    $('.scroll').smoothScroll();

    //below scopes are used to change the game js file if the user is on a desktop or mobile device.
    // Because of how the game was created using HTML5 canvas making game elements responsive could have caused more errors than solutions.
    // Therefore testing was done during the design stage to see what the best dimensions for the desktop and mobile game would be. 
    $scope.includeDesktopTemplate = false;
    $scope.includeMobileTemplate = false; 
    var screenWidth = $window.innerWidth;

    // maximun screen size for mobile game
    if (screenWidth < 569){
        $scope.includeMobileTemplate = true;
    }else{ // any screen size larger than above to use desktop game
        $scope.includeDesktopTemplate = true;
    }
  }]);