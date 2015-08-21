
function jVPlayer(DBG){
  var player = this
    , prefix
    , include = {};

  DBG = DBG || false;

  function createElement(tn){
    return document.createElement(tn);
  }

  this.log = function(msg){
    console.log('['+this.timer.getTime()+'] '+msg);
  };

  this.error = function(msg){
    console.error('['+this.timer.getTime()+'] '+msg);
  };

  if(!DBG)
  this.error = this.log = function(){};

  var beginTime = new Date();
  this.timer = {
    getTime: function(){
      return (new Date() - beginTime) / 1000;
    }
  };

  player.log('jVPlayer init begin');

  var rootLayer = createElement('div')
    , v = createElement('video');

  rootLayer.classList.add('jvp-root-layer');
  rootLayer.appendChild(v);

  prefix = (function (){
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i){
      if(scripts[i].src.indexOf('jVPlayer.js') > -1){
        var tmp = scripts[i].src.replace(window.location, '')
        tmp = tmp.split('/');
        tmp.pop();
        return '/'+tmp.join('/')+'/';
      }
    }
  })();

  var includeLDR = new XMLHttpRequest();
  includeLDR.open('POST', prefix+'player/include.js', false);
  includeLDR.send();
  var includeSRC = includeLDR.responseText
    , Include = (new Function('module, player', includeSRC+'return module.exports;'))({}, this);


  // TODO
  this.controls = function(state){
    v.controls = state;
  }

  this.init = function(param){

    window.addEventListener('load', function(e){
      player.log('Window load');
      init.call(player, param);
    });
  }

  include = new Include(prefix);

  this.events.catch('init');
  function init(param){
    var rootRoot = document.querySelector(param.selector);
    try{
      rootRoot.appendChild(rootLayer);
    } catch(e){
      player.error('Selector was not specified');
      return;
    }

    param.size = param.size || 'auto';
    v.controls = false;

    v.src = param.src
    if(param.size === 'auto'){
      v.addEventListener('loadstart', function(e){        
        rootLayer.style.width = v.clientWidth+'px';
        rootLayer.style.height = v.clientHeight+'px';
      });
    } else if(param.size.indexOf('%') > -1){
      rootLayer.style.width = param.size;
      rootLayer.style.height = param.size;
    } else if(param.size.indexOf('x') > -1){
      var w = param.size.split('x')[0];
      var h = param.size.split('x')[1];
      rootLayer.style.width = w+'px';
      rootLayer.style.height = h+'px';
    }else{
      rootLayer.style.width = '100%';
      rootLayer.style.height = '100%';
    }
    v.style.width = '100%';
    v.style.height = '100%';

  }
}
