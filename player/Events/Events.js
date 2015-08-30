/*Events.js*/

var eventsNames;

function Events(param){
  var self = player.events = {};
  eventsNames = this.include.JSONVar('baseEvents');

  self.add = function(name){
    if(name in eventsNames) return;
    eventsNames[name] = [];
  };
  self.addListener = function(name, cb){
    try{
      eventsNames[name].push(cb);
    }catch(e){
      player.error('Event name \''+name+'\' was not found');
    }
  };
  self.catch = function(name){
    try{
      eventsNames[name].forEach(function(cb){
        cb.call(player, name);
      });
    }catch(e){
      player.error('Event name \''+name+'\' was not found');
    }
  };

  self.addListener('init', function(){
    player.log('jVPlayer: All modules loaded');
  });
}

Events.prototype = new BaseModule(prefix);

Events.prototype.constructor = Events;

module.constructor = Events;
