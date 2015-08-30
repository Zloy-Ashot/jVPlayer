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
    if(include.constructorList[name].independent)
      new include.constructorList[name].constructor();
    player.log('\''+name+'\': module loaded');
  });

}

Include.prototype = {
  constructor: Include,
  constructorList: {},
  plainText: function (path){
    var textLdr = new XMLHttpRequest();
    textLdr.open('POST', basPrefix+path, false);
    textLdr.send();
    if(textLdr.status != 200) return null;
    return textLdr.responseText;
  },
  module: function(name){
    if(name in this.constructorList) return this.constructorList[name];
    var src = this.plainText(plrPrefix+name+'/'+name+'.js');
    this.constructorList[name] = makeModule(src, plrPrefix+name+'/');
    return this.constructorList[name];
  },
  JSONVar: function(path){
    var JSONSrc;
    JSONSrc = this.plainText(path+'.json');
    if(!JSONSrc) return {};
    return JSON.parse(JSONSrc);
  },
  theme: function(themeName, layoutName){
    player.log('Using theme: \''+themeName+'\'');
    var thmConfig = include.JSONVar(thmPrefix+themeName+'/conf');
    var layoutRules;
    if(layoutName){
      layoutRules = include.JSONVar(thmPrefix+themeName+'/layout/'+layoutName);
      player.log('Theme loaded with layout: \''+layoutName+'\'');
    }else{
      layoutRules = include.JSONVar(thmPrefix+themeName+'/layout/'+thmConfig.defaultLayout);
      player.log('No layout name. Using default: \''+thmConfig.defaultLayout+'\'');
    }
    return layoutRules;
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
    {
      constructor: BaseModule,
      independent: true
    },
    BaseModule,
    include,
    player,
    prefix
  );
}

module.exports = Include;