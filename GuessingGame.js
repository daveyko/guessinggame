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








