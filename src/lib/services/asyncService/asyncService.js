'use strict'

angular.module('myWeb.lib.service.asyncService',[
  ]);

angular.module('myWeb.lib.service.asyncService').provider('asyncService',{
  $get:['storageService' , 'spaService','hobbySetting',function(storageService ,spaService,hobbySetting){

    function getData_home(params){
      console.log('asyncService:change state to book list',params)
      if(!storageService.checkData('books')){
        spaService.getBooks();
      }
    }
    function getData_detail(params){
      console.log('asyncService:change state to book detail',params)
      if(!storageService.checkData('current_book')){
        spaService.getBooks({id:params.bookId});
      }
    }
    function getData_order(params){
      spaService.getOrderForm({
        criteria: {
          order_account: params.orderFormId
        }
      });
      spaService.getConsignees();
    }
    function getData_admin(params){
      spaService.getOrderForm({type:'admin'});
      spaService.getBooks();
    }

    function _asyncPage(state,params,fromState){
      if(!fromState.name){
        //shuaxin
      }
      if(state !=='order' &&state !=='admin_index' && !storageService.checkData('current_carts')){
        spaService.getCarts();
      }
      if(state !=='order' &&state !=='admin_index'&& !storageService.checkData('current_consignees')){
        spaService.getConsignees();
      }
      if((state !=='order' &&state !=='admin_index' && !storageService.checkData('orderForm'))|| fromState =='order'){
        spaService.getOrderForm({type:'All'});
      }
      switch(state){
        case 'hobby_index.home':
          getData_home(params);
          break;
        case 'hobby_index.home.detail':
          getData_detail(params);
          break;
        case 'admin_index':
          getData_admin(params);
          break;
        case 'order':
          getData_order(params);
          break;
        default :
          return false;
      }
    }

    return {
      asyncPage: _asyncPage
    };
  }]
});