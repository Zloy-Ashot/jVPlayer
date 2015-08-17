var basPrefix
  , cnfPrefix
  , extPrefix
  , lclPrefix
  , plrPrefix
  , thmPrefix;

function makeExtension(MDLSrc){
  var fullSrc = MDLSrc + 'return module.exports';
  return (new Function('module', fullSrc))({exports:{}});
}

function Include(pref){
  basPrefix = pref;
  cnfPrefix = 'config/';
  extPrefix = 'extensions/';
  lclPrefix = 'locales/';
  plrPrefix = 'player/';
  thmPrefix = 'themes/';
}

Include.prototype = {
  constructor: Include,
  plainText: function (path){
    var textLdr = new XMLHttpRequest();
    textLdr.open('POST', path, false);
    return textLdr.responseText;
  },
  module: function(name){
    var src = this.plainText(basPrefix+plrPrefix+name+'/'+name+'.js');
    return makeExtension(src);
  },
  JSON: function(path){
    var JSONSrc = this.plainText(path);
    return JSON.parse(JSONSrc);
  }
}

module.exports = Include;