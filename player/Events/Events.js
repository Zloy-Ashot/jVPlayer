/*Events.js*/

var eventsNames = {};

function Events(param){
  var self = player.events = {};
  self.add = function(name){
    eventsNames[name] = [];
  };
  self.addListener = function(name, cb){
    try{
      eventsNames[name].push(cb);
    }catch(e){
      console.error('Event name \''+name+'\' was not found');
    }
  };
  self.catch = function(name){
    try{
      eventsNames[name].forEach(function(cb){
        cb.call(player, name);
      });
    }catch(e){
      console.error('Event name \''+name+'\' was not found');
    }
  };
}

Events.prototype = new BaseModule(prefix);

Events.prototype.constructor = Events;

module.constructor = Events;
