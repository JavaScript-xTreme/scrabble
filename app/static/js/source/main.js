(function(){

  'use strict';

  $(document).ready(initialize);

  var socket;
  var game = {};

  function initialize(){
    initializeSocketIO();
    $('#join').click(join);
    $('#pick').click(pick);
    $('#users').on('click', '.primary .letters span', selectLetter);
    $('#board').on('click', 'td', placeLetter);
  }

  function receiveMove(data){
    var $td = $('#board td[data-x="'+data.x+'"][data-y="'+data.y+'"]');
    $td.text(data.letter);
    $td.css('color', data.color);
  }

  function placeLetter(){
    var letter = $('.primary .marked').text();
    var x = $(this).data('x');
    var y = $(this).data('y');

    socket.emit('sendMove', {user:game.user, color:game.color, letter:letter, x:x, y:y});
  }

  function selectLetter(){
    $('.primary .letters span').removeClass();
    $(this).addClass('marked');
  }

  function setletters(data){
    game.letters = data.letters;
    var $row = $('#users tr[data-user="'+data.user+'"]');
    var $td = $row.children('.letters');
    var spans = data.letters.map(function(x){return '<span>' + x + '</span>'});
    $td.append(spans);
  }

  function pick(){
    var count = $('#count').val() * 1;
    var total = game.letters.length + count;
    if(total <= 7){
      socket.emit('getletters', {user:game.user, count:count});
    }
  }

  function join(){
    var user = $('#user').val();
    var color = $('#color').val();
    game.user = user;
    game.color = color;
    game.letters = [];
    var tr = '<tr class="primary" data-user="' + user + '"><td class="user">' + user + '</td><td class="letters"></td></tr>';
    $('#users > tbody').append(tr);
    socket.emit('join', {user:user});
  }

  function joined(data){
    var tr = '<tr class="secondary" data-user="' + data.user + '"><td class="user">' + data.user + '</td><td class="letters"></td></tr>';
    $('#users > tbody').append(tr);
  }

 function initializeSocketIO(){
    socket = io.connect('/game');
    socket.on('online', function(data){console.log(data);});
    socket.on('joined', joined);
    socket.on('setletters', setletters);
    socket.on('receiveMove', receiveMove);
  }
})();
