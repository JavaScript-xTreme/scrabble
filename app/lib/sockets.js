'use strict';

exports.connection = function(socket){
  socket.emit('online', {date: new Date()});
  socket.on('join', join);
  socket.on('getletters', getletters);
};

function getletters(data){
  var socket = this;

  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  letters = letters.split('');
  var list = [];
  for(var i = 0; i < data.count; i++){
    var index = Math.floor(Math.random() * 26);
    list.push(letters[index]);
  }
  socket.broadcast.emit('setletters', {user:data.user, letters:list});
  socket.emit('setletters', {user:data.user, letters:list});
}

function join(data){
  var socket = this;

  socket.broadcast.emit('joined', data);
}
