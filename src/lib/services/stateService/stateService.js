'use strict'

angular.module('myWeb.lib.service.stateService',[
  ]);

angular.module('myWeb.lib.service.stateService').service('stateService',[function(){
  var stateService = {};

  var state_arr=[
    'hobby_index.home',
    'hobby_index.search'
  ];

  var getPosition = function(thisState){
    var mark=0;
    angular.forEach(state_arr,function(value,key){
      if(thisState == value)mark=key;
    });
    return mark;
  }

  stateService.nextState = function(thisState,direct){
    console.log(thisState,direct);
    var result_state;
    var sign = getPosition(thisState);
    if(direct=='left'){
      sign=sign-1;
      if(sign<0){
        sign=state_arr.length-1;
      }
    }else if(direct == 'right'){
      sign= sign+1;
      if(sign>=state_arr.length){
        sign=0;
      }
    }
    result_state = state_arr[sign];
    return result_state;
  }
  
  return stateService;
}]);