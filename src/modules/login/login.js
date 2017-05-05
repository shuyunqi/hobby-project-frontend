'use strict'

angular.module('myWeb.module.login',[]);

angular.module('myWeb.module.login').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: 'login/login.html',
      controller: ['$scope', loginCtrl]
    });
}]);

function loginCtrl($scope){
  $scope.gotoLogin = function(sign){
    $scope.register = !sign;
    $scope.user_login = {};
    $scope.user_register = {};
  };
}