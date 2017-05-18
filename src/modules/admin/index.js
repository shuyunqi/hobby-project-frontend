'use strict'

angular.module('myWeb.module.admin',[]);

angular.module('myWeb.module.admin').config(['$stateProvider','$mdThemingProvider', function($stateProvider,$mdThemingProvider) {
  $stateProvider
    .state('admin_index', {
      url: "/admin",
      templateUrl: 'admin/admin_index.html',
      controller: ['$scope' , '$timeout' , '$q', 'storageService','spaService', adminCtrl]
    });
}]);

function adminCtrl($scope, $timeout, $q, storageService,spaService){
  $scope.sw_option = 'in_store';
  $scope.data = storageService.getCache();
  $scope.getHeight = function(jian){
    var ba = 80;
    if(jian)
      ba = ba + jian;
    var height = window.innerHeight -ba;
    return { 'height': height+ 'px'}
  }
  $scope.switchList = function(sw){
    $scope.show_list = sw;
  }

  $scope.book={ name: ""};
  $scope.tag={
    name: [],
    readonly: false,
    removable: true
  }

  $scope.addBook = function(){
    $scope.book.tags = $scope.tag.name;
    spaService.addBook($scope.book).then(function(){
      $scope.book={};
      $scope.tag={
        name: [],
        readonly: false,
        removable: true
      }
    });
  }
}

