/**
 * Created by kendrick on 15-09-08.
 */

'use strict';

var app = angular.module('myApp.applications', ['ngRoute', 'ngResource'])

app.factory('ApplicationsService', function($resource) {
  return $resource('http://localhost:3000/applications', {}, {});
})

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/applications', {
    templateUrl: 'applications_view/applications.html',
    controller: 'ApplicationsCtrl',
    controllerAs: 'applications',
    resolve: {
      applications: function(ApplicationsService){
        return ApplicationsService.query().$promise;
      }
    }
  });
 }]);

app.controller('ApplicationsCtrl', function(applications) {
  console.log(applications);
  return applications;
});