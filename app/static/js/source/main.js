(function(){

  'use strict';

  $(document).ready(initialize);

  var socket;

  function initialize(){
    initializeSocketIO();
  }

 function initializeSocketIO(){
    socket = io.connect('/game');
    socket.on('online', function(data){console.log(data);});
  }

})();
