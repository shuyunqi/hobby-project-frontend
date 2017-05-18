'use strict'

angular.module('myWeb.lib.service.storageService',[
  ]);

angular.module('myWeb.lib.service.storageService').service('storageService',['$q' ,function($q){
    var _cache = {};

    var _getCache = function(){
        return _cache;
    }

    var _checkData = function(what){
        if(_cache[what])
            return true;
        else
            return false;
    }

    var _saveData = function(alias,data,callBack){
        var deffer =$q.defer();
        _cache[alias] = data;
        if(callBack)callBack();
        return deffer.promise;
    }

    var _getData = function(what){
        return _cache[what];
    }
    var _deleteData = function(what,criteria){
        if(_cache[what]){
            _cache[what] = _cache[what].filter(function(value){
                var sign = 0;
                if(!criteria)
                    return false;
                else{
                    for(var key in criteria){
                        sign  = sign + 1;
                        if(value[key] == criteria[key]){
                            sign = sign - 1;
                        }
                    }
                    if(!sign){
                        return false;
                    }else{
                        return true;
                    }
                }
            })
        }
    }
    var _addData = function(what,obj){
        if(_cache[what]){
            if(Object.keys(obj).length>0)
                _cache[what].push(obj);
        }else{
            _cache[what]=[];
            if(Object.keys(obj).length>0)
                _cache[what].push(obj);
        }
    }
    return {
        saveData: _saveData,
        getCache: _getCache,
        checkData: _checkData,
        getData: _getData,
        deleteData: _deleteData,
        addData: _addData

    };
}]);