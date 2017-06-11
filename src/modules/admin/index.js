'use strict'

angular.module('myWeb.module.admin',[]);

angular.module('myWeb.module.admin').config(['$stateProvider','$mdThemingProvider', function($stateProvider,$mdThemingProvider) {
  $stateProvider
    .state('admin_index', {
      url: "/admin",
      templateUrl: 'admin/admin_index.html',
      controller: ['$scope' , '$timeout' ,'$mdDialog', '$q', 'storageService','spaService', adminCtrl]
    });
}]);

function adminCtrl($scope, $timeout, $mdDialog, $q, storageService,spaService){
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
  $scope.deleteUser = function(ev,user){
    var confirm = $mdDialog.confirm()
      .title('确定要删除用户'+ user.email+'?')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');
    $mdDialog.show(confirm).then(function() {
      spaService.deleteUser(user.id)
    }, function() {
    });
  }
}

angular.module('myWeb.module.admin').filter('dateFormat',[function(){
  return function(date,type){
    if(type === 2 ){
      return new Date(date).Format('yy-MM-dd')
    }else{
      return new Date(date).Format('yy-MM-dd hh:mm:ss')
    }
  }
}])

angular.module('myWeb.module.admin').filter('boolTranslate',[function(){
  return function(bool,trueText,falseText){
    return bool?trueText:falseText
  }
}])