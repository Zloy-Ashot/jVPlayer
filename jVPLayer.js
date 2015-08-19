
function jVPlayer(){
  var player = this
    , prefix
    , include = {};

  function createElement(tn){
    return document.createElement(tn);
  }

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

  include = new Include(prefix);

  this.controls = function(state){
    v.controls = state;
  }

  this.init = function(param){
    window.addEventListener('load', function(e){
      init.call(player, param);
    });
  }

  function init(param){
    var rootRoot = document.querySelector(param.selector);
    try{
      rootRoot.appendChild(rootLayer);
    } catch(e){
      console.error('Selector was not specified');
      return;
    }

    param.size = param.size || 'auto';
    v.controls = param.controls || false;

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
