/*Layers.js*/

var DOMElement = document.createElement('div');

function Layer(param, parent){
  var layer = this
    , _DOMElement = DOMElement.cloneNode()
    , prop = param.properties
    , style = prop.sizeAndPosition;

  for(var i in style){
    _DOMElement.style[i] = style[i];
  };
  _DOMElement.style.position = 'absolute';
  player.dir(prop);
  prop.classList.split(' ').forEach(function(className){
    if(className)
      _DOMElement.classList.add(className);
  });

  param.childs = param.childs || [];

  layer.parent = parent;
  layer.childs = [];
  layer.name = prop.name;
  layer.role = prop.role;
  layer.getDOMElement = function(){
    return _DOMElement;
  };
  layer.setDOMElement = function(newDOMElement){
    var childs = _DOMElement.children;
    _DOMElement = newDOMElement;
    for(var i = 0; i < childs.length; ++i){
      _DOMElement.appendChild(childs[i]);
    }
  };
  if(parent){
    parent.childs.push(this);
    var PDOMEl = parent.getDOMElement();
    PDOMEl.appendChild(_DOMElement);
  }
  param.childs.forEach(function(child){
    layer.childs.push(
      new Layer(child, layer)
    );
  });
}

Layer.prototype = new BaseModule(prefix);
Layer.prototype.constructor = Layer;

module.constructor = Layer;
module.independent = false;
