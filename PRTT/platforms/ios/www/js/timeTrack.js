// script.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var timeTrackApp = angular.module('timeTrackApp', ['ngRoute']);

// configure our routes
timeTrackApp.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    })

    // route for the about page
    .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    });
});

// create the controller and inject Angular's $scope
timeTrackApp.controller('loginController', function ($scope) {
    // create a message to display in our view
    $scope.PageTitle = 'Login';
});

timeTrackApp.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

timeTrackApp.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
