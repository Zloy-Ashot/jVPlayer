/*BaseModule.js*/

var prefix
  , self;

function BaseModule(pref){
  prefix = pref;

  //XXX_1: Goto XXX_2
  self = this;
  this._getSelfConstructor = function(){
    return this.constructor;
  }
}

BaseModule.prototype = {
  include:{
    JSONVar: function(path){
      return playerInclude.JSONVar(prefix+path);
    },
    plainText: function(path){
      return playerInclude.plainText(prefix+path);
    },
    config: function(name){
      //XXX_2: But it`s no other way. Desu.
      var constructorName = self._getSelfConstructor().name;
      var path = prefix+'../../config/'+constructorName+'/'+name+'.json';
      return playerInclude.JSONVar(path);
    }
  }
}

module.constructor = BaseModule;
