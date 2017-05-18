'use strict'

angular.module('myWeb.lib.service.spaService',[
  ]);

angular.module('myWeb.lib.service.spaService').service('spaService' ,['$http', 'storageService' ,'$mdToast','hobbySetting' ,function($http, storageService ,$mdToast,hobbySetting){
  var spaService = {};

  function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
  }
  function addCookie(params){
    var token = getCookie('man');
    params.token = token;
    return params;
  }
  function getCookie(c_name){
    if (document.cookie.length>0){
      var c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        {
        c_start=c_start + c_name.length+1
        var c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        }
      }
    return ""
  }

  spaService.checkCode = function(data){

    return $http({
      method:'POST',
      url: hobbySetting.base_url + '/token',
      "Access-Control-Allow-Origin":"",
      data: data
    }).success(function(data, status, headers, config){

    }).error(function(data, status, headers, config){

    })
  }
  spaService.registerUser = function(data){
    var params ={};
    params.email = data.email;
    params.passwd = data.passwd;

    return $http({
      method:'POST',
      url: hobbySetting.base_url + '/users/register',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){

    }).error(function(data, status, headers, config){

    })
  }

  spaService.loginUser = function(data){
    var params ={};
    params.email = data.email;
    params.passwd = data.passwd;

    return $http({
      method:'POST',
      url: hobbySetting.base_url + '/users/login',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(data.token){
        setCookie('man',data.token,3);
      }
    }).error(function(data, status, headers, config){

    })
  }

  spaService.getCurrent_user = function(data){
    var params ={};
    if(data.token)params.token = data.token;
    return $http({
      method:'GET',
      url: hobbySetting.base_url + '/users/current',
      "Access-Control-Allow-Origin":"",
      params: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data){
        storageService.saveData('current_user',data);
      }
    }).error(function(data, status, headers, config){

    })
  }

  spaService.getBooks = function(criteria){
    var params={};

    if(!criteria){
      params.type='All';
    }
    if(criteria&&criteria.id)
      params.id = criteria.id;
    if(criteria&&criteria.tag)
      params.tag = criteria.tag;
    params = addCookie(params);
    return $http({
      method:'GET',
      url: hobbySetting.base_url + '/books/current',
      "Access-Control-Allow-Origin":"",
      params: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data){
        if(criteria&&criteria.id){
          storageService.saveData('current_book',data);
        }else{
          storageService.saveData('books',data);
        }
      }
    }).error(function(data, status, headers, config){

    })
  }

  spaService.getCarts = function(){
    var params = {};
    params = addCookie(params);
    return $http({
      method: 'GET',
      url: hobbySetting.base_url + '/carts/current',
      "Access-Control-Allow-Origin":"",
      params: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data){
        if(data.error){

        }else{
          storageService.saveData('current_carts',data);
        }
      }
    })
  }

  spaService.addCarts = function(criteria){
    var params = {};
    params.userId = storageService.getData('current_user').id;
    params.bookId = criteria.bookId;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/carts/add',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data.id){
        $mdToast.show(
          $mdToast.addCartSuccess()
        );
        storageService.addData('current_carts',data);
      }
    })
  }
  spaService.deleteCart = function(cart){
    var params = {};
    params.cartId = cart.id;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/carts/delete',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data){
        storageService.deleteData('current_carts',data)
      }
    })
  }

  spaService.addBook = function(book){
    var params = book;
    params = addCookie(params);

    return $http({
      method: 'POST',
      url: hobbySetting.base_url + '/books/add',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(status=='200' && !data.error){
        $mdToast.show(
          $mdToast.addBookSuccess()
        );
        storageService.addData('books',data);
      }
    })
  }

  spaService.changeBook = function(book){
    var params = {};
    params.data = book;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/books/edit',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data.id){
        storageService.deleteData('books',{id:book.id})
        storageService.addData('books',data);
      }
    })
  }

  spaService.deleteBook = function(book){
    var params = {};
    params.id = book.id;
    params.name = book.name;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/books/delete',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data.success){
        $mdToast.show(
          $mdToast.deleteBookSuccess()
        );
        storageService.deleteData('books',{id:book.id})
      }
    })
  }

  spaService.search = function(what){
    return $http({
      method: 'GET',
      url: hobbySetting.base_url + '/search',
      "Access-Control-Allow-Origin":"",
      params: what
    }).success(function(data, status, headers, config){
      if(data.length>0){
        data.forEach(function(b){
          b.discount = b.discount?b.discount:1;
          b.from = 'search';
        })
        storageService.saveData('books',data);
      }
    }).error(function(data, status, headers, config){

    })
  }

  spaService.editUser = function(who,criteria,what){
    var params = {};
    params.id = who;
    params.criteria = criteria?criteria:null;
    params.edit = what?what:null;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/users/edit',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(data && status==200){
        if(!data.success)
          storageService.saveData('current_user',data);
        if(!data.error){
          $mdToast.show(
            $mdToast.editUserSuccess()
          );
        }else{
          $mdToast.show(
            $mdToast.editUserError()
          );
        }
      }
    })
  }

  spaService.addConsignee = function(data){
    var params={};
    params.name = data.name;
    params.phone = Number(data.phone);
    params.address = data.address;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/consignee/add',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(data.id)
        storageService.addData('current_consignees',data)
    });
  }

  spaService.deleteConsignee = function(consignee){
    var params = {};
    params.consigneeId = consignee.id;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/consignee/delete',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data){
        storageService.deleteData('current_consignees',data)
      }
    })
  }

  spaService.getConsignees = function(){
    var params = {};
    params = addCookie(params);

    return $http({
      method: 'GET',
      url: hobbySetting.base_url + '/consignee/current',
      "Access-Control-Allow-Origin":"",
      params: params
    }).success(function(data, status, headers, config){
      if(data.length>0){
        storageService.saveData('current_consignees',data);
      }
    });

  }

  spaService.addOrderForm = function(books){
    var params={ data:{}};
    params.data.books = books;
    params.data.type="prepare";
    params = addCookie(params);

    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/orderForm/make',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(data)
        storageService.saveData('current_orderForm',data);
    })
  }

  spaService.getOrderForm = function(data){
    var params = {};
    if(data.type){
      params.type = data.type;
    }else if(data.criteria){
      params.criteria = data.criteria;
    }
    params = addCookie(params);
    return $http({
      method: 'GET',
      url: hobbySetting.base_url + '/orderForm/current',
      "Access-Control-Allow-Origin":"",
      params: params
    }).success(function(data, status, headers, config){
      storageService.deleteData('orderForm');
      if(typeof data == 'object' && data instanceof Array){
        storageService.saveData('orderForm',data);
      }else{
        storageService.addData('orderForm',data);
      }
    })
  }
  spaService.updateOrderForm = function(data){
    var params = {};
    params.orderForm = storageService.getData('orderForm');
    params.consignee = data.consignee;
    params.shipping_method = data.shipping_method;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/orderForm/update',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){

    })
  }
  spaService.payOrder = function(){
    var params = {};
    params.orderForm = storageService.getData('orderForm');
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: hobbySetting.base_url + '/orderForm/pay',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){

    })
  }


  return spaService;
}]);