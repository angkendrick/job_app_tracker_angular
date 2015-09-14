/**
 * Created by kendrick on 15-09-08.
 */

'use strict';

// MAIN
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


// NEW APPLICATION POP-UP
var newApplication = angular.module('myApp.newApplication', []);

newApplication.controller('NewAppCtrl', function ($scope, $http) {
  $scope.showPopup = false;
  $scope.toggleShowPopup = function(){
    $scope.showPopup = !$scope.showPopup;
  };
  // FORM SUBMIT
  $scope.formData = {};
  $scope.processForm = function() {
    $http({
      method:   'POST',
      url:      'http://localhost:3000/applications',
      data:     $.param({application: $scope.formData}),
      headers:  { 'Content-Type' : 'application/x-www-form-urlencoded'}
    })
        .success(function(data){
          console.log(data);
        })
        .error(function(data){
          console.log(data);
          $scope.errorTitle = data.errors.title;
          $scope.errorCompany = data.errors.company;
          $scope.errorDescription = data.errors.description;
          $scope.errorUrl = data.errors.url;
        });
  };
});

newApplication.directive('modal', function () {
  return {
    template: '<div class="modal fade">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
    '<h4 class="modal-title">{{ title }}</h4>' +
    '</div>' +
    '<div class="modal-body" ng-transclude></div>' +
    '</div>' +
    '</div>' +
    '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value){
        if(value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});
