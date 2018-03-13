$(document).ready(function(){
  var game = newGame();
  var h1default = $('#headers h1').text();
  var h2default = $('#headers h2').text();

  var gameAction = function(game){
    var initialguess = +$('#Initial-Guess').val();
    $('#Initial-Guess').val("");
    if (isNaN(initialguess)){
      initialguess = 'non-number';
      $('#headers h2').text('Wrong input type. Enter a valid number between 1-100.')
    }
    var checkguess = game.playersGuessSubmission(initialguess)
    var len = game.pastGuesses.length - 1;
    if (checkguess === 'You have already guessed that number.'){
      $('#headers').find('h1').text('Guess Again!');
    }
    else if (checkguess === 'You Win!' || checkguess === 'You Lose.'){
      $('#Go').prop('disabled', true);
      $('#Hint').prop('disabled', true);
      var statement =  (checkguess === 'You Win!') ? 'You Win!' : 'You Lose.'
      len = (statement === 'You Win!') ? len + 1  : len;
      $('.guess-list').find('li').eq(len).text(game.playersGuess);
      $('#headers').find('h1').text(statement);
      $('#headers').find('h2').text('Press reset to play again!')
    }
    else if(checkguess === undefined){
      $('#headers h2').text('Wrong input. Please enter a number!')
    }
    else{
      var highlow = (game.playersGuess > game.winningNumber) ? 'Too High':'Too Low'
      $('#headers').find('h2').text(checkguess + ' and ' + highlow);
      $('.guess-list').find('li').eq(len).text(game.playersGuess);
    }
  }


  $('#Go').on('click', function(){
    gameAction(game);
    }
  );
  $('#Initial-Guess').on('keyup', function(key){
    if(key.which === 13){
    gameAction(game);
    }
  })

  $('#Reset').on('click', function(){
    game = newGame();
    $('#headers h1').text(h1default);
    $('#headers h2').text(h2default);
    $('.guess-list li').text('-');
    $('#Go').prop('disabled', false)
    $('#Hint').prop('disabled', false)
  })
  $('#Hint').on('click', function(){
    var hint = game.provideHint();
    $('#headers h2').text('One of these numbers is right : ' + hint);
    $('#Hint').prop('disabled', true);
  })


});
