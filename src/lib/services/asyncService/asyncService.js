'use strict'

angular.module('myWeb.lib.service.asyncService',[
  ]);

angular.module('myWeb.lib.service.asyncService').provider('asyncService',{
  $get:['storageService' , 'spaService',function(storageService ,spaService){

    function getData_home(params){
      //get_books
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

    function _asyncPage(state,params,fromState){
      if(!fromState.name){
        //shuaxin
      }
      switch(state){
        case 'hobby_index.home':{
          getData_home(params);
          break;
        }
        case 'hobby_index.home.detail':{
          getData_detail(params);
          break;
        }
        case 'admin_index':{
          getData_home(params);
          break;
        }
        default :
          break;
      }
    }

    return {
      asyncPage: _asyncPage
    };
  }]
});