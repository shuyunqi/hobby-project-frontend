'use strict'

angular.module('myWeb.module.home.detail',[

]);

angular.module('myWeb.module.home.detail').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('hobby_index.home.detail', {
      url: "/b/:bookId",
      templateUrl: 'hobby/bookDetail/bookDetail.html',
      controller: ['$scope', '$mdToast','storageService' , 'spaService','hobbySetting' , bookDetailCtrl]
    });
}]);

function bookDetailCtrl($scope , $mdToast,storageService ,spaService,hobbySetting){
  //default
  $scope.currentNavItem = 'home';
  $scope.form={ number: 1};
  $scope.in_cart = false;
  $scope.isBuy = false;

  //get data
  $scope.data = storageService.getCache();
  $scope.$watch(function(){
    var length = 0;
    if($scope.data){
      length = Object.keys($scope.data).length;
    }
    return length
  },function(newValue,oldValue){
    if($scope.data&&$scope.data.current_carts){
      if($scope.data.current_carts.find(function(c){
        return $scope.data.current_book.id === c.id;
      })){
        $scope.in_cart = true;
      }
    }
    if($scope.data&&$scope.data.orderForm&&$scope.data.current_book){
      angular.forEach($scope.data.orderForm,function(order){
        if(order.status==2){
          angular.forEach(order.books,function(b){
            if(b.id===$scope.data.current_book.id)
              $scope.isBuy = true;
          })
        }
      })
    }
  })
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
  $scope.buyBook = function(){
    var tobook = angular.copy($scope.data.current_book);
    tobook.amount = $scope.form.number;
    spaService.addOrderForm([tobook]).then(function(){
      window.location.href= hobbySetting.order_url + '/'+$scope.data.current_orderForm.order_account;
      window.location.reload();
    });
  }
  $scope.add_comment = function(){
    if($scope.myComment){
      spaService.addComment($scope.data.current_book.id,$scope.myComment).then(function(){
        $scope.myComment='';
        $mdToast.show(
          $mdToast.addCommentSuccess()
        )
      });
    }
  }
  $scope.setComment = function(c){
    $scope.myComment=c;
  }

  $scope.checkIsBuy = function(){
    var flag = false;
    if($scope.data){
      angular.forEach($scope.data.orderForm,function(order){
        if(order.status==2){
          angular.forEach(order.books,function(b){
            if(b.id===$scope.data.current_book.id)
              flag = true;
          })
        }
      })
    }
    return flag;
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