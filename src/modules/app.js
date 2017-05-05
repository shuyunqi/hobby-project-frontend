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
  cookieService.checkCookie();
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    asyncService.asyncPage(toState.name, toParams, fromState);
  });
}])
