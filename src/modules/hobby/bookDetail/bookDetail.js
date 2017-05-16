'use strict'

angular.module('myWeb.module.home.detail',[

]);

angular.module('myWeb.module.home.detail').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('hobby_index.home.detail', {
      url: "/b/:bookId",
      templateUrl: 'hobby/bookDetail/bookDetail.html',
      controller: ['$scope','storageService' , 'spaService' , bookDetailCtrl]
    });
}]);

function bookDetailCtrl($scope ,storageService ,spaService){
  //default
  $scope.currentNavItem = 'home';
  $scope.form={ number: 1};

  //get data
  $scope.data = storageService.getCache();
  if($scope.data.current_carts){
    $scope.data.current_carts.forEach(function(id){
      if($scope.data.current_book.id === id){
        $scope.in_cart = true;
      }
    })
  }
  $scope.addCart = function(){
    spaService.addCarts({
      bookId: $scope.data.current_book.id
    })
    $scope.in_cart = true;
    $scope.data.current_carts.push($scope.data.current_book.id)
  }
  $scope.checkNum = function(){
    if($scope.form.number == 0){
      $scope.form.number =1;
    }
  }

}

angular.module('myWeb.module.home.detail').run(['$state',function($state){
}]);


angular.module('myWeb.module.home.detail').filter('cut',function(){
  return function(input,n){
    if(typeof input == 'number')
      return input.toFixed(n)
    else if(typeof input == 'string')
      return input.substring(0,n);
  }
})