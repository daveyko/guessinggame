function generateWinningNumber(){
	var randnum = Math.floor(Math.random()*100) + 1;
	if (randnum === 0){
		return 1;
	}
	else{
		return randnum;
	}
}

function shuffle(arr){
	var m = arr.length, t, i; 
	while(m){
		i = Math.floor(Math.random() * m--)
		t = arr[m]
		arr[m] = arr[i]; 
		arr[i] = t; 
	}
	return arr; 
}

function Game(){
	this.playersGuess = null; 
	this.pastGuesses = []; 
	this.winningNumber = generateWinningNumber(); 
}

Game.prototype.difference = function(){
	return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.isLower = function(){
	if (this.playersGuess < this.winningNumber){
		return true
	}
	else{
		return false
	}
}

Game.prototype.playersGuessSubmission = function(guess){
	if(guess < 1 || guess > 100 || typeof(guess) !== 'number'){
		throw "That is an invalid guess."; 
	}
	this.playersGuess = guess;
	return this.checkGuess();    
}

Game.prototype.checkGuess = function(){
	if (this.winningNumber === this.playersGuess){ 
			return 'You Win!';
	}

	else if (this.pastGuesses.indexOf(this.playersGuess) !== -1) {
			return "You have already guessed that number."; 
		}
	else if (this.pastGuesses.indexOf(this.playersGuess) === -1){
		this.pastGuesses.push(this.playersGuess);
		if (this.pastGuesses.length >= 5){
			return 'You Lose.'
		}
		else{
			if (this.difference() < 10){
			return 'You\'re burning up!'
			}
			else if (this.difference() < 25){
			return 'You\'re lukewarm.'
			}
			else if (this.difference() < 50){
			return 'You\'re a bit chilly.'
			}

			else if (this.difference() < 100){
			return 'You\'re ice cold!'
			}
		
			}
		}

}

function newGame(){
	return new Game();
}

Game.prototype.provideHint = function(){
	var resarr = []; 
	var numTimes = 2; 
	while (numTimes){
		resarr.push(generateWinningNumber())
		numTimes --; 
	}
	resarr.push(this.winningNumber); 
	return shuffle(resarr); 
}


$(document).ready(function(){
	var game = newGame();
	var h1default = $('#headers h1').text();
	var h2default = $('#headers h2').text();

	var gameAction = function(game){
		var initialguess = +$('#Initial-Guess').val(); 
		$('#Initial-Guess').val("");
		if (isNaN(initialguess)){
			initialguess = 'non-number';
			$('#headers h2').text('Wrong input type. Enter a valid number between 1-100.');
		}; 
		var checkguess = game.playersGuessSubmission(initialguess) 
		var len = game.pastGuesses.length - 1; 
		if (checkguess === 'You have already guessed that number.'){
			$('#headers').find('h1').text('Guess Again!'); 
		}
		else if (checkguess === 'You Win!' || checkguess === 'You Lose.'){
			$('.guess-list').find('li').eq(len).text(game.playersGuess);
			$('#Go').prop('disabled', true); 
			$('#Hint').prop('disabled', true); 
			var statement =  (checkguess === 'You Win!') ? 'You Win!' : 'You Lose.'
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
		$('#headers h2').text(hint); 
		$('#Hint').prop('disabled', true); 
	})

	
}); 





