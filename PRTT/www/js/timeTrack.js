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
    .when('/home', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    // route for the contact page
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    });
});

// create the controller and inject Angular's $scope
timeTrackApp.controller('loginController', function ($scope, $http) {
    // create a message to display in our view
    $scope.PageTitle = 'Login';
    if (localStorage['Username'] !== "" && localStorage['Password'] !== "") {
        $scope.username = localStorage['Username'];
        $scope.password = localStorage['Password'];
    }
    if ($scope.username !== "" && $scope.password !== "") {
        $http.get('http://www.plusrein.at/dev/TimeTracking?Username=' + $scope.username + '&Password=' + $scope.password)
            .success(function (data) {
                if (data['status'] === 'OK') {
                    window.location.href = "#/home";
                } else {
                    alert(data['message']);
                }
            });
    }
    $scope.login = function () {
        $http.get('http://www.plusrein.at/dev/TimeTracking?Username=' + $scope.username + '&Password=' + $scope.password)
            .success(function (data) {
                if (data['status'] === 'OK') {
                    localStorage['Username'] = $scope.username;
                    localStorage['Password'] = $scope.password;
                    window.location.href = "#/home";
                } else {
                    alert(data['message']);
                }
            });
    };
    $('#mainContent').trigger('create');

});

timeTrackApp.controller('homeController', function ($scope, $http) {
    $http.get('http://www.plusrein.at/dev/TimeTracking?Username=' + localStorage['Username'] + '&Password=' + localStorage['Password'] + '&GetAllEmployer=true')
        .success(function (data) {
            if (data['status'] === 'OK') {
                $scope.employers = data['employer'];
            } else {
                alert(data['status'] + " -  " + data['message']);
            }
        })
    .error(function (data, status) {
        alert(status + " - " + data);
    });
    $('#mainContent').trigger('create');
});

timeTrackApp.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
    $('#mainContent').trigger('create');
});
