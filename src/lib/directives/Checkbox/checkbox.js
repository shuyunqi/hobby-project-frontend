'use strict'

angular.module('myWeb.lib.directive.checkbox',[
  ]);

angular.module('myWeb.lib.directive.checkbox').directive('checkBox',function () {
  return {
    restrict: 'AE',
    scope: {
        btnPrimary:'@',
        btnDefault:'@',
        btnXs:'@',
        btnSm:'@',
        repeatData:'=',
        fnSelectAll:'&',
        fnSelectNone:'&'
    },
    transclude: true,
    templateUrl: 'directives/Checkbox/checkbox.html',
    link: function (scope, element, attrs, ctrl, transclude){

      scope.selectAll = function(){
        scope.fnSelectAll();
        angular.forEach(scope.repeatData,function(r){
          r.selected = true;
        });
        scope.checkSelect();
      }

      scope.selectNone = function(){
        scope.fnSelectNone();
        angular.forEach(scope.repeatData,function(r){r.selected = false;});
        scope.checkSelect();
      }
      scope.$watch(function(){
        scope.result = "";
        angular.forEach(scope.repeatData,function(r,key){
          var str = JSON.stringify(r.selected);
          scope.result= scope.result+str;
        });
        return scope.result;
      },function(oldValue,newValue){
        scope.checkSelect();
      });

      scope.checkSelect = function(){
        var addSign = 0;
        angular.forEach(scope.repeatData,function(r){
          if(r.selected == true){
            addSign++;
          }
        });
        scope.do_selectAll = false;
        scope.none_selectAll = false;
        if(addSign == scope.repeatData.length){
          scope.do_selectAll = true;
        }
        else if(addSign == 0){
          scope.none_selectAll = true;
        }
      }
    }
  }
})