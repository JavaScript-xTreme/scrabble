'use strict';

global.scrabble = {};
global.scrabble.users = {};

exports.connection = function(socket){
  socket.emit('online', {date: new Date()});
  socket.on('register', register);
  socket.on('start', start);
  socket.on('letters', letters);
};

function register(data){
  var socket = this;
  global.scrabble.users[socket.id] = {name: data.name};
  socket.broadcast.emit('joined', data);
}

function start(){
  var socket = this;
  socket.emit('begin');
  socket.broadcast.emit('begin');
}

function letters(){
    var socket = this;

    if(!global.scrabble.users[socket.id].letters || global.scrabble.users[socket.id].letters.length === 0){
      var letters = getString();
      global.scrabble.users[socket.id].letters = letters;
      socket.emit('roll', {letters:letters});
    }
}

function getString(){
  var strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  var string = '';

  for(var i = 0; i < 10; i++){
    var index = Math.floor(Math.random() * 26);
    string += strings[index];
  }

  return string;
}
