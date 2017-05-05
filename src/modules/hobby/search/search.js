'use strict'

angular.module('myWeb.module.search',[

]);

angular.module('myWeb.module.search').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('hobby_index.search', {
      url: "/search",
      templateUrl: 'hobby/search/search.html',
      controller: ['$mdSidenav','$scope','$timeout','$filter','$state','$http','$modal', 'spaService', searchCtrl]
    });
}]);

function searchCtrl($mdSidenav,$scope,$timeout,$filter,$state,$http,$modal,spaService){
  console.log($state.current.name);
  $scope.isThisNet = false;

  $scope.search = function(data){
    console.log(data);
    spaService.search({
      data:data,
      search: $scope.isThisNet?'My':'All'
    })
  }
};