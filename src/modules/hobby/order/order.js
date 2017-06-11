'use strict'

angular.module('myWeb.module.order',[

]);

angular.module('myWeb.module.order').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('order', {
      url: "/order/:orderFormId",
      templateUrl: 'hobby/order/order.html',
      controller: ['$mdSidenav','$mdDialog','$scope','$timeout','$filter','$state','$http','$modal', 'spaService', 'storageService','hobbySetting', orderCtrl]
    });
}]);

angular.module('myWeb.module.order').run(['$rootScope',function($rootScope){
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    console.log(event, toState, toParams, fromState, fromParams)
  })
}])
function orderCtrl($mdSidenav, $mdDialog,$scope,$timeout,$filter,$state,$http,$modal,spaService,storageService,hobbySetting){
  $scope.data = storageService.getCache();

  $scope.pay={
    wechat:{
      title:'微信支付',
      name: 'wechat',
      selected: false
    },
    alipay:{
      title:'支付宝支付',
      name: 'alipay',
      selected: false
    },
    card: {
      title: '银行卡',
      name:'card',
      selected: false
    }
  };

  $scope.goHome= function(){
    window.location.reload();
    window.location.href=hobbySetting.home_url;
  }
  $scope.$watch(function(){
    if(Object.keys($scope.data).length>0 && $scope.data.orderForm && $scope.data.orderForm[0])
      return $scope.data.orderForm[0];
    else
      return 0;
  },function(newValue,oldValue){
    if(newValue){
      console.log('adsadsadsad',newValue);
      if(newValue.shipping_method){
        angular.forEach($scope.pay,function(v){
          if(v.name == newValue.shipping_method)
            v.selected = true;
        })
      }
      if(newValue.consigneeId){
        angular.forEach($scope.data.current_consignees,function(c){
          if(c.id === newValue.consigneeId)
            c.selected = true;
        })
      }
      if(newValue.status == 1 && newValue.shipping_method && newValue.consigneeId)
        $scope.step = 4;
      else if(newValue.status == 1 && (!newValue.shipping_method || !newValue.consigneeId))
        $scope.step = 2;
      else if(newValue.status == 0)
        $scope.step = 1;
    }
  });
  $scope.nextStep = function(){
    $scope.step = $scope.step+1;
  }
  $scope.lastStep = function(){
    $scope.step = $scope.step-1;
  }
  $scope.checkSelect = function(consignee){
    angular.forEach($scope.data.current_consignees,function(v){
      if(v.id!==consignee.id)
        v.selected = false;
    })
  }

  $scope.checkPay = function(key){
    for(var i in $scope.pay){
      if(i!=key)
        $scope.pay[i].selected = false;
    }
  }
  $scope.commitOrderForm = function(){
    var pay = "";
    angular.forEach($scope.pay,function(p){
      if(p.selected)
        pay = p.name;
    });
    var consignee={};
    angular.forEach($scope.data.current_consignees,function(c){
      if(c.selected)
        consignee = c;
    })
    spaService.updateOrderForm({
      shipping_method:pay,
      consignee:consignee,
    })
    $scope.step = $scope.step+1;
  }
  $scope.payOrder = function(){
    spaService.payOrder();
  }
  $scope.addConsignee = function(ev){
    $mdDialog.show({
      controller: getConsignee,
      templateUrl: 'hobby/order/addConsignee.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    })

    function getConsignee($scope, $mdDialog){
      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
      $scope.addConsigneeData = function(data){
        spaService.addConsignee(data);
        $mdDialog.hide();
      }
    }
  }
  $scope.addConsigneeData = function(data){

  }
  $scope.cancelModal = function(){

  }
  $scope.caculatePrice = function(){
    var total = 0;
    if($scope.data.orderForm){
      angular.forEach($scope.data.orderForm[0].books,function(v){
        total = total + v.amount*v.price*v.discount;
      })
    }
    return total;
  }
};