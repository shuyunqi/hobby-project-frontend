'use strict'

angular.module('myWeb.lib.service.spaService',[
  ]);

angular.module('myWeb.lib.service.spaService').service('spaService' ,['$http', 'storageService' ,'$mdToast' ,function($http, storageService ,$mdToast){
  var spaService = {}
  var base_url="http://localhost:3010";
  // var base_url="http://192.168.1.113:3010";
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
      url: base_url + '/token',
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
      url: base_url + '/users/register',
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
      url: base_url + '/users/login',
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
      url: base_url + '/users/current',
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
    params = addCookie(params);
    return $http({
      method:'GET',
      url: base_url + '/books/current',
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
      url: base_url + '/carts/current',
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
      url: base_url + '/carts/add',
      "Access-Control-Allow-Origin":"",
      data: params
    }).success(function(data, status, headers, config){
      if(status=='200' && data.success){
        $mdToast.show(
          $mdToast.addCartSuccess()
        );
      }
    })
  }

  spaService.addBook = function(book){
    var params = book;
    params = addCookie(params);

    return $http({
      method: 'POST',
      url: base_url + '/books/add',
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

  spaService.deleteBook = function(book){
    var params = {};
    params.id = book.id;
    params.name = book.name;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: base_url + '/books/delete',
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
      url: base_url + '/search',
      params: what
    }).success(function(data, status, headers, config){
      if(data.length>0){
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
      url: base_url + '/users/edit',
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
    params.phone = typeof data.phone=='number'?data.phone:0;
    params.address = data.address;
    params = addCookie(params);
    return $http({
      method: 'PUT',
      url: base_url + '/consignee/add',
      data: params
    }).success(function(data, status, headers, config){
    });
  }

  spaService.getConsignees = function(){
    var params = {};
    params = addCookie(params);

    return $http({
      method: 'GET',
      url: base_url + '/consignee/current',
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
      url: base_url + '/orderForm/make',
      data: params
    }).success(function(data, status, headers, config){

    })
  }

  spaService.getOrderForm = function(){
    var params = {};
    params = addCookie(params);
    return $http({
      method: 'GET',
      url: base_url + '/orderForm/current',
      params: params
    }).success(function(data, status, headers, config){

    })
  }



  return spaService;
}]);