'use strict'

angular.module('myWeb.lib.filter.searchAll',[
  ]);

angular.module('myWeb.lib.filter.searchAll').filter('searchAll',['testValue','$filter',function(testValue,$filter) {
  return function(options){
    var result = [];
    angular.forEach(testValue.apiUrl,function(data,key){
      if(data.url.indexOf(options)>0||data.method.indexOf(options)>0){
        result.push(testValue.apiUrl[key]);
      }else if(data.data){
        var a = JSON.stringify(data.data)
        if(a.indexOf(options)>0){
          result.push(testValue.apiUrl[key]);
        }
      }else if(data.params){
        var a = JSON.stringify(data.params)
        if(a.indexOf(options)>0){
          result.push(testValue.apiUrl[key]);
        }
      }
    });
    return result;
  };
}])
