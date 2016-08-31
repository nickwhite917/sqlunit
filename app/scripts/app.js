
(function () {
    'use strict';
    
    var _templateBase = './scripts';
    
    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/database/database.html' ,
                controller: 'databaseController',
                controllerAs: '_ctrl'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);

})();