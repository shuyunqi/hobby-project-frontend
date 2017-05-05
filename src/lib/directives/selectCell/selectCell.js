'use strict'


angular.module('myWeb.lib.directive.selectCell',[
  ]);
angular.module('myWeb.lib.directive.selectCell').directive('selectCell',function(){
  return {
    restrict: 'E',
    transclude:true,
    scope:{
      showData:"="
    },
    templateUrl:'directives/selectCell/selectCell.html',
    link:function(scope, element, attrs, ctrl, transclude){
      scope.choseUrl = function(data){
        scope.showData.currentUrl = data;
      }

    }
  }
});