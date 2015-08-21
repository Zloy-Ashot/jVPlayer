/*include.js*/

var basPrefix
  , cnfPrefix
  , extPrefix
  , lclPrefix
  , plrPrefix
  , thmPrefix

  , BaseModule = {}
  , include;

function Include(pref){
  basPrefix = pref;
  cnfPrefix = 'config/';
  extPrefix = 'extensions/';
  lclPrefix = 'locales/';
  plrPrefix = 'player/';
  thmPrefix = 'themes/';
  include = this;

  BaseModule = this.module('BaseModule').constructor;

  var includeList = include.JSONVar('player/list');
  includeList.forEach(function(name){
    include.module(name);
    new include.constructorList[name].constructor();
    player.log('\''+name+'\' module loaded');
  });


}

Include.prototype = {
  constructor: Include,
  constructorList: {},
  plainText: function (path){
    var textLdr = new XMLHttpRequest();
    textLdr.open('POST', basPrefix+path, false);
    textLdr.send();
    return textLdr.responseText;
  },
  module: function(name){
    if(name in this.constructorList) return this.constructorList[name];
    var src = this.plainText(plrPrefix+name+'/'+name+'.js');
    this.constructorList[name] = makeModule(src, plrPrefix+name+'/');
    return this.constructorList[name];
  },
  JSONVar: function(path){
    var JSONSrc = this.plainText(path+'.json');
    return JSON.parse(JSONSrc);
  }
}

function makeModule(MDLSrc, prefix){
  var fullSrc = MDLSrc + 'return module';
  var MdlInitParam = [
    'module',
    'BaseModule',
    'playerInclude',
    'player',
    'prefix'
  ].join();

  return (new Function(MdlInitParam, fullSrc))(
    {constructor: BaseModule},
    BaseModule,
    include,
    player,
    prefix
  );
}

module.exports = Include;