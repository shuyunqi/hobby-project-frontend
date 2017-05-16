'use strict'

angular.module('myWeb.module.order',[

]);

angular.module('myWeb.module.order').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('order', {
      url: "/order",
      templateUrl: 'hobby/order/order.html',
      controller: ['$mdSidenav','$scope','$timeout','$filter','$state','$http','$modal', 'spaService', 'storageService', orderCtrl]
    });
}]);

function orderCtrl($mdSidenav,$scope,$timeout,$filter,$state,$http,$modal,spaService,storageService){
  console.log($state.current.name);
  $scope.data = storageService.getCache();

  $scope.goHome= function(){
    window.location.href="http://localhost:3000/#/hobby/home";
  }

  console.log(Date.parse(new Date()))
};