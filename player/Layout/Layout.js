/*Layout.js*/

player.makeLayout = function(theme, layout){
  delete player['makeLayout'];
  new Layout(theme, layout);
};

function Layout(theme, layout){
  var DOMRootLayer = player.DOMElementsGet.rootLayer();
  DOMRootLayer.style.position = 'relative'
  var layoutRules = {
    properties:{sizeAndPosition:{}},
    childs: playerInclude.theme(theme, layout)
  };
  var rootLayer = new playerInclude.constructorList.Layers.constructor(layoutRules, null);
  rootLayer.setDOMElement(DOMRootLayer);
}

Layout.prototype = new BaseModule(prefix);
Layout.prototype.constructor = Layout;

module.constructor = Layout;
module.independent = false;
