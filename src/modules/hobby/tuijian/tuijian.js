'use strict'

angular.module('myWeb.module.tuijian',[

]);

angular.module('myWeb.module.tuijian').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('hobby_index.tuijian', {
      url: "/tuijian",
      templateUrl: 'hobby/tuijian/tuijian.html',
      controller: ['$mdSidenav','$scope','$timeout','$filter','$state','$http','$modal', 'spaService' , 'storageService', tuijianCtrl]
    });
}]);

function tuijianCtrl($mdSidenav,$scope,$timeout,$filter,$state,$http,$modal,spaService, storageService){

};