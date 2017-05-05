'use strict'

angular.module('myWeb').provider('cookieService',{
  $get:['spaService',function(spaService){
    var that = this;
    var checkCookie = function(){
      var token = that.getCookie('man')
      if(token){
        spaService.getCurrent_user({token: token})
        spaService.getCarts();
      }
    }

    var addCookie = function(params){
      var token = that.getCookie('man');
      params.token = token;
      return params
    }
    return {
      checkCookie: checkCookie,
      addCookie: addCookie
    }
  }],
  getCookie:function(c_name){
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

})