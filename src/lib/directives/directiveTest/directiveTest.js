'use strict'

angular.module('myWeb.lib.directive.directiveTest',[
  ]);
angular.module('myWeb.lib.directive.directiveTest').directive('dirTest',function(){
return {
    restrict: 'AE',
    transclude: true,
    templateUrl: 'directives/directiveTest/directiveTest.html',
    link: function (scope, element, attrs, ctrl, transclude){
    }
  }

});