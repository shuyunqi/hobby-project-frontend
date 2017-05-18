'use strict'

angular.module('myWeb.module.home',[
  'myWeb.module.home.detail'
]);

angular.module('myWeb.module.home').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('hobby_index.home', {
      url: "/home",
      templateUrl: 'hobby/home/home.html',
      controller: ['$mdSidenav','$scope','$timeout','$filter','$state','$http','$modal', 'spaService', 'storageService', homeCtrl]
    });

}]);

// angular.module('myWeb.module.home').run(['$rootScope',function($rootScope){
//   $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
//       console.log(toState, toParams, fromState, fromParams)
//   });
// }])

function homeCtrl($mdSidenav,$scope,$timeout,$filter,$state,$http,$modal,spaService, storageService){

  $scope.showDetail = $state.current.name =='hobby_index.home'?false:true;
  $scope.page=1;
  $scope.data = storageService.getCache();

  $scope.$on('showDetail',function(ev,data){
    $scope.showDetail = data;
  })
  $scope.goDetail=function(){
    $scope.showDetail=true;
  }
  $scope.nextPage = function(sign){
    if(sign==='left'&&$scope.page>1){
      $scope.page = $scope.page - 1;
    }else if(sign==='right'){
      if($filter('cutBooks')($scope.data.books,$scope.page+1).length>0)
        $scope.page = $scope.page + 1;
    }
  }
}

angular.module('myWeb.module.home').run(['$rootScope',function($rootScope){
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if(toState.name=='hobby_index.home'){

    }
  });
}]);

angular.module('myWeb.module.home').filter('cutBooks',function(){
  return function(input,page){
    var cutBooks = function(books){
      var result = [];
      for (var i = 0; i < parseInt(books.length/10)+1; i++) {
        var line = []
        for(var j =0 ; j< 10 ; j++ ){
          if(books[10*i + j])
            line.push(books[10*i + j])
        }
        result.push(line);
      }
      return result
    }
    var result=[];
    if(input)
     result = cutBooks(input)

    if(page)
      return result[page-1];
    else
      return result;
  }
})