'use strict'


angular.module('myWeb.lib.directive.uiBook',[
  ]);

angular.module('myWeb.lib.directive.uiBook').config(function($mdThemingProvider){

})
angular.module('myWeb.lib.directive.uiBook').directive('uiBook',['$state','storageService' ,'spaService','$mdDialog',function($state,storageService ,spaService,$mdDialog){
  return {
    restrict: 'E',
    transclude:true,
    scope:{
      book:"=",
      showDetail: '&',
      admin: "@"
    },
    templateUrl:'directives/uiBook/uiBook.html',
    link:function(scope, element, attrs, ctrl, transclude){
      var admin = scope.admin?scope.admin:false;
      var current_carts = storageService.getData('current_carts');

      if(current_carts){
        current_carts.forEach(function(c){
          if(c &&c.id == scope.book.id){
            scope.in_cart = true;
          }
        })
      };

      scope.choseBook = function(ev){
        // console.log('2222222')
        if(!click_collect && !admin){
          scope.showDetail();
          $state.go('hobby_index.home.detail',{bookId:scope.book.id});
          storageService.saveData('current_book',scope.book)
        }
        click_collect = false;
      }

      var click_collect = false;
      scope.collect = function(){
        // console.log('11111111');
        click_collect = true;
        scope.book.collection = true;
        spaService.addCarts({
          bookId: scope.book.id
        });
        scope.in_cart = true;
      }

      scope.deleteBook = function(ev){
        var confirm = $mdDialog.confirm()
          .title('确定要删除《'+ scope.book.name+'》?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('确定')
          .cancel('取消');
        $mdDialog.show(confirm).then(function() {
          spaService.deleteBook(scope.book)
        }, function() {
        });
      }
    }
  }
}]);
