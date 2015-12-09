// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.text('dictionary', 'assets/dictionary.txt');
    game.load.image('background', 'assets/img/background.jpg');

}

function create() {
	var dictionary = this.game.cache.getText('dictionary').split(' ');
    background = game.add.tileSprite(0, 0, 1000, 600, "background");
    var word = "test" // whatever word the user has typed into text box
 
	if(this.game.cache.getText('dictionary').indexOf(' ' + word + ' ') > -1){
	    alert("exists"); // clear text box, remove the used letters, update score
	} else {
	    alert("does not exist"); // clear text box, show error message
	}
}

function update() {
	
}

function addLetters() {
	// takes random word from dictionary
	var word = dictionary[getRandomInt(0, dictionary.length)];
	// splits word into individual letters, a char array
	var chars = word.split('');
	// sets up the randomizer by keeping track of which letters have already been inserted
	var uniqueNums = [];
	// basically runs until all letters have been inserted because the number
	// of unique nums should eventually equal the length of the char array
	while (uniqueNums.length < chars.length) {
		// pick a random index of the char array
		var random = getRandomInt(0, chars.length);
		// checks that the index hasn't been called already, making sure that each letter
		// is only called once
		if (uniqueNums.indexOf(random) == -1) {
			uniqueNums.push(random);
			Drop(game, chars[random]);
		}
		// else, the index isnt unique, the letter has already been inserted, and nothing
		// happens
	}
}