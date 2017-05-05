'use strict'

angular.module('myWeb.lib.filter.verify',[
  ]);

angular.module('myWeb.lib.filter.verify').filter('verify',[function() {
  return function(input,method,rePasswd){
    if(!input){
      return '此项不能为空！';
    }else{

      var reg_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(method){
        switch(method){
          case 'email':{
            if(!reg_email.test(input)){
              return "邮箱格式错误！";
            }else{
              return "";
            }
          }
          case 'password':{
            if(rePasswd){
              if(rePasswd == input){
                return "";
              }else{
                return '两次密码不一致';
              }
            }else{
              return "";
            }
          }
          default:
            return "";
        }
      }else{
        return "";
      }
    }
  };
}])

angular.module('myWeb.lib.filter.verify').filter('check',[function() {
  return function(input,method,rePasswd){
    if(!input){
      return false;
    }else{

      var reg_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(method){
        switch(method){
          case 'email':{
            if(!reg_email.test(input)){
              return false;
            }else{
              return true;
            }
          }
          case 'password':{
            if(rePasswd){
              if(rePasswd == input){
                return true;
              }else{
                return false;
              }
            }else{
              return false;
            }
          }
          default:
            return false;
        }
      }else{
        return false;
      }
    }
  };
}])
