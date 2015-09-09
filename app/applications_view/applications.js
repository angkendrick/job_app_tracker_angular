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


var newApplication = angular.module('myApp.newApplication', []);

newApplication.controller('NewAppCtrl', function ($scope) {
  $scope.showModal = false;
  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
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