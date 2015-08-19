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

  BaseModule = this.module('BaseModule').constructor;
  this.module('Events');
  new this.constructorList.Events.constructor();

  include = this;
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
    var JSONSrc = this.plainText(path);
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