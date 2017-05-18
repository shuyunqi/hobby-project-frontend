'use strict'

angular.module('myWeb.module.hobby',[

]);

angular.module('myWeb.module.hobby').config(['$stateProvider','$mdThemingProvider', function($stateProvider,$mdThemingProvider) {
  $stateProvider
    .state('hobby_index', {
      url: "/hobby",
      templateUrl: 'hobby/hobby_index.html',
      controller: ['$scope','$timeout','$filter','$state','$http','$modal', '$mdSidenav', '$mdToast', 'stateService', 'spaService', 'storageService', 'hobbySetting', indexCtrl]
    });

  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow');
}]);

function indexCtrl($scope,$timeout,$filter,$state,$http,$modal, $mdSidenav, $mdToast, stateService, spaService, storageService,hobbySetting){
  //default setting
  $scope.register = false;
  $scope.showUser = false;
  var loginModal = $modal({scope: $scope, template: 'hobby/login.html', show: false});
  $scope.user_login = {};
  $scope.user_register = {};

  //get data
  $scope.data = storageService.getCache();

  console.log($scope.data);

  $scope.loginModal = function(){
    loginModal.show();
  };

  $scope.gotoLogin = function(sign){
    $scope.register = !sign;
    $scope.user_login = {};
    $scope.user_register = {};
  };
  $scope.userLogin = function(){
    if($filter('check')($scope.user_login.email,'email') && $scope.user_login.passwd){
      spaService.loginUser($scope.user_login).then(function(req){
        if(req.data.token){
          $mdToast.show(
            $mdToast.loginSuccess()
          );
          setTimeout(function() {
            location.reload();
          }, 1000);
        }else if(req.data.error){
          $scope.user_login.passwd="";
          $mdToast.show(
            $mdToast.loginError()
          );
        }
      });
    }else{
      $mdToast.show(
        $mdToast.loginWarning()
      );
    }
  };
  $scope.signout = function(){
    document.cookie = 'man' + "=" + "" + "; " + -1;
    location.reload();
  }
  $scope.userRegister = function(){
    if($filter('check')($scope.user_register.email,'email') && $filter('check')($scope.user_register.passwd,'password',$scope.user_register.rePasswd)){
      spaService.registerUser($scope.user_register).then(function(req){
        if(req.data.success){
          $mdToast.show(
            $mdToast.registerSuccess()
          );
          $scope.user_register = {};
          loginModal.hide();
        }else if(req.data.error){
          $mdToast.show(
            $mdToast.registerError_reEmail()
          );
        }else{
          $mdToast.show(
            $mdToast.registerError()
          );
        }
      })
    }else{
      $mdToast.show(
        $mdToast.registerWarning()
      );
    }
  };

  $scope.goState = function(text){
    if(text!=="home")
      spaService.getBooks({tag:text});
    else
      spaService.getBooks();
    window.location.href=hobbySetting.home_url;
    $scope.$broadcast('showDetail',false);

  }

  $scope.toggleLeft = buildToggler('left');
  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    }
  }

  $scope.openSidenav = function(componentId){
    $scope.show_change_username = false;
    $scope.show_change_password = false;
    $scope.change_passwd ={};
    var componentArr = ['gerenziliao','gouwuche','dingdan'];
    angular.forEach(componentArr,function(cpt){
      $mdSidenav(cpt).close();
    })
    $mdSidenav(componentId).toggle();
  }
  $scope.closeSidenav = function(componentId){
    $mdSidenav(componentId).close()
  }
/**
*   个人资料sidebar
*/

  $scope.show_change_username = false;
  $scope.show_change_password = false;
  $scope.show_add_cinsignee = false;
  $scope.changePassword = function(){
    $scope.show_change_password = true;
    $scope.show_add_cinsignee = false;
  }
  $scope.changeUsername = function(){
    $scope.show_change_username = true;
    $scope.show_add_cinsignee = false;
  }
  $scope.changeConsignee = function(){
    $scope.show_add_cinsignee = true;
    $scope.consignee={};
  }
  $scope.change_passwd ={};
  $scope.confirmChangePassword = function(){
    $scope.show_change_password = false;
    if($filter('check')($scope.change_passwd.passwd,'password',$scope.change_passwd.rePasswd)){
      spaService.editUser('mine',{passwd:$scope.change_passwd.old_passwd},{passwd:$scope.change_passwd.passwd})
    }else{
      $mdToast.show(
        $mdToast.editUserError()
      );
    }
    $scope.change_passwd ={};
  }
  $scope.cancelChangePassword = function(){
    $scope.show_change_password = false;
    $scope.change_passwd ={};
  }
  $scope.confirmChangeUsername = function(){
    $scope.show_change_username = false;
    spaService.editUser('mine',null,{name:$scope.change_passwd.username});
  }
  $scope.cancelChangeUsername = function(){
    $scope.show_change_username = false;
  }
  $scope.confirmChangeConsignee = function(){
    $scope.show_add_cinsignee = false;
    spaService.addConsignee($scope.consignee);
  }
  $scope.cancelChangeConsignee = function(){
    $scope.show_add_cinsignee = false;
  }

  $scope.goOrder = function(){
    if($scope.selected.length == 0){

    }else{
      spaService.addOrderForm($scope.selected).then(function(){
        window.location.reload();
        window.location.href= hobbySetting.order_url + '/'+$scope.data.current_orderForm.order_account;
      });
    }
  }
  $scope.conetinueOrder = function(order){
    window.location.reload();
    window.location.href= hobbySetting.order_url + '/'+order.order_account;
  }

  $scope.caculateFrame = function(){
    var height = window.innerHeight;
    var width = window.innerWidth;
    return { 'height': height+ 'px', 'width': width + 'px'  }
  }

  $scope.checkNum = function(item){
    if(item.amount==0){
      item.amount = 1;
    }
  }

  $scope.deleteCart = function(cart){
    spaService.deleteCart(cart);
  }
  $scope.deleteConsignee =function(consignee){
    spaService.deleteConsignee(consignee);
  }

  //check box
  $scope.selected = [];
  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };
  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };
  $scope.isChecked = function() {
    if($scope.data.current_carts)
      return $scope.selected.length === $scope.data.current_carts.length;
  };
  $scope.toggleAll = function() {
    if ($scope.selected.length === $scope.data.current_carts.length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
      $scope.selected = $scope.data.current_carts.slice(0);
    }
    console.log($scope.selected)
  };
  $scope.isIndeterminate = function() {
    return ($scope.selected.length !== 0 &&
      $scope.selected.length !== $scope.data.current_carts.length);
  };
  $scope.caculatePrice = function(){
    if($scope.selected.length>1){
      var price = $scope.selected.reduce(function(b1,b2,index){
        if(index === 1)
          b1 = b1.price*b1.discount*b1.amount;
        var p2 = b2.price*b2.discount*b2.amount;
        return b1+p2;
      });
      return price;
    }else if($scope.selected.length == 1){
      return $scope.selected[0].price * $scope.selected[0].discount* $scope.selected[0].amount;
    }else{
      return 0;
    }
  }
}

angular.module('myWeb.module.hobby').run(['$state',function($state){
  // window.location.href = "http://localhost:3000/#/hobby/home";
}]);

angular.module('myWeb.module.hobby').filter('default',function(){
  return function(input,defaultNum){
    if(!input){
      return defaultNum;
    }
  }
})

angular.module('myWeb.module.hobby').filter('showOrderStatus',function(){
  return function(input){
    if(input){
      switch(input){
        case '0':{
          return '未完成';break;
        }
        case '1' :{
          return '未付款';break;
        }
        case '2' : {
          return '已完成';break;
        }
        default:
          return false;
          break;
      }
    }
  }
})