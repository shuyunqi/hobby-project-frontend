'use strict'

angular.module('myWeb',[
  'mgcrea.ngStrap',
  'ui.router',
  'ngAnimate',
  'anim-in-out',
  'ngCookies',
  'ngMaterial',
  'ngMessages',
  'myWeb.module',
  'myWeb.lib',
  'templates-lib',
  'templates-modules'
]);

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

angular.module('myWeb').config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider
    .otherwise("/hobby/search");

  // cookieService.checkCookie();
}]);

angular.module('myWeb').run([ '$rootScope','$modal', 'cookieService', 'asyncService' ,function($rootScope,$modal,cookieService,asyncService){
  $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
    if(unfoundState.to==="no-state")
      event.preventDefault();
  });
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    cookieService.checkCookie(toState.name);
    asyncService.asyncPage(toState.name, toParams, fromState);
  });
}])

