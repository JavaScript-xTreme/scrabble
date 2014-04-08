(function(){

  'use strict';

  $(document).ready(initialize);

  var socket;

  function initialize(){
    initializeSocketIO();
    $('#reg-btn').click(register);
    $('#start').click(start);
    $('#letters').click(letters);
  }

 function initializeSocketIO(){
    socket = io.connect('/game');
    socket.on('online', function(data){console.log(data);});
    socket.on('joined', joined);
    socket.on('begin', begin);
    socket.on('roll', roll);
  }

  function roll(data){
    for(var i = 0; i < data.letters.length; i++){
      $('#pieces').append('<li>'+data.letters[i]+'</li>');
    }
  }

  function register(){
    var name = $('#reg').val();
    $('#user').text(name);
    $('#reg').val('');
    socket.emit('register', {name:name});
  }

  function joined(data){
    $('#users').append('<li>'+data.name+'</li>');
  }

  function start(){
    socket.emit('start');
  };

  function begin(){
    $('#start').detach();
  }

  function letters(){
    socket.emit('letters');
  }

})();
