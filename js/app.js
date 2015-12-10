// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.
var app = function(game) {

};



app.prototype = {
    preload: preload, create: create, update: update
};

var dictionary;
var textInput;
var deleteKey;
var enterKey;
var drops;
var textboxline1;
var textboxline2;
var textboxline3;
var textboxline4;
var startTyping;
var scoreText;
var score = 0;

function preload() {


}

function create() {
    dictionary = this.game.cache.getText('dictionary').split(/\s+/);
    background = this.game.add.tileSprite(0, 0, 1000, 600, "background");

    background = this.game.add.tileSprite(0, 0, 650, 700, "background");
    textInput = this.game.make.bitmapData(800, 600);
    textInput.context.font = '18px Arial';
    textInput.context.fillStyle = '#FFF';
    textInput.addToWorld();

    //Build a makeshift text box
    textboxline1 = new Phaser.Line(this.game.world.centerX,this.game.world.centerY + 200,this.game.world.centerX + 300,this.game.world.centerY + 200);
    textboxline2 = new Phaser.Line(this.game.world.centerX,this.game.world.centerY + 250,this.game.world.centerX + 300,this.game.world.centerY + 250);
    textboxline3 = new Phaser.Line(this.game.world.centerX,this.game.world.centerY + 200,this.game.world.centerX,this.game.world.centerY + 250);
    textboxline4 = new Phaser.Line(this.game.world.centerX + 300,this.game.world.centerY + 200,this.game.world.centerX + 300,this.game.world.centerY + 250);

   this.game.input.keyboard.addCallbacks(this, null, null, keyPress);
    textInput =this.game.add.text(this.game.world.centerX + 5, 560, "", {
        font: "28px Arial",
        fill: "#000",
        align: "center"
    });
    textInput.setText(textInput.text);

    startTyping =this.game.add.text(this.game.world.centerX - 175, 560, "Start Typing!");
    console.log(score);
    scoreText =this.game.add.text(this.game.world.centerX + 150,this.game.world.centerY + 300, "score: " + score, {
        font: '28px Arial',
        fill: '#000',
        align: 'center'
    });

    this.deleteKey =this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    this.enterKey =this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
   this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.ENTER ]);

    //Adds gravity to the drops
   this.game.physics.startSystem(Phaser.Physics.ARCADE);
   this.game.physics.arcade.gravity.y = 2;

    //creates the drops group that Phaser implements
    drops =this.game.add.group();
    //example word for debugging
    //var word = 'ffffffuck';
    //createDrops(word);
    createDrops();

    console.log(dropMap);

    keyPressFX =this.game.add.audio('keyPress');
    buttonClickFX =this.game.add.audio('buttonClick');
    
    buttonClickFX.addMarker('start', 0, 5);
    buttonClickFX.addMarker('leaderboard', 0, 5);
    buttonClickFX.addMarker('replay', 0, 5);
                            
    makeButton('start', 300, 300);
    makeButton('leaderboard', 300, 400);
                            
    playBackground();
}

function update() {
   this.game.debug.geom(textboxline1, '#000');
   this.game.debug.geom(textboxline2, '#000');
   this.game.debug.geom(textboxline3, '#000');
   this.game.debug.geom(textboxline4, '#000');

    //Delete a letter from the word being typed.
    if (this.deleteKey.isDown) {
        this.deleteKey.onDown.add(deleteText, this);
    }

    if (this.enterKey.isDown) {
        this.enterKey.onDown.add(submitText, this)
    }

    scoreText.setText("Score: " + score);
}

function keyPress(char) {
    //console.log("here");
    //console.log("HELLO");
    //console.log(textInput.text);
    var x = 64;
    var idx;
    console.log(char);
    textInput.text += char;
    console.log(textInput.text);
}

function submitText() {
    if (checkIfOnScreen(textInput.text)) {
        //remove letters
        console.log(textInput.text);
        if (dictionary.indexOf(textInput.text) > -1) {
            console.log("correct mofugga");
            score += textInput.text.length * 10;
            destroyDrops(textInput.text)
            textInput.setText("");
        }
        console.log("not in dictionary");
    } else {
        console.log('false!')
    }
}

function deleteText() {
    textInput.text = textInput.text.substring(0, textInput.text.length - 1);
}

function playBackground() {
    music =this.game.add.audio('theme');
    music.autoplay = true;
    music.play("", 0, 1, true);
}

function makeButton(name, x, y) {
    var button =this.game.add.button(x, y, name, click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(0.2, 0.2);
    button.smoothed = false;

}

function click(button) {
	buttonClickFX.play(button.name, 0);
}

//Gets some random int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// map for letters and their corresponding drops currently on screen
// Map where keys are letters and value are arrays of dropObjects
var dropMap = new Map();

// Creates drops from a given word
function createDrops() {
    //var word = 'fuck';
    var word = dictionary[getRandomInt(0, dictionary.length)];
    console.log(word);
    var chars = word.split('');
    console.log(chars);
    var uniqueNums = [];
    console.log('out');
    while (uniqueNums.length < chars.length) {
        console.log('in');
        // pick a random index of the char array
        var random = getRandomInt(0, chars.length);
        // checks that the index hasn't been called already, making sure that each letter
        // is only called once
        if (uniqueNums.indexOf(random) == -1) {
            uniqueNums.push(random);
            var newDrop = new Drop(this.game, chars[random]);
            drops.add(newDrop);
            if (dropMap.has(chars[random])) {
                dropMap.get(chars[random]).push(newDrop);
            } else {
                dropMap.set(chars[random], new Array());
                dropMap.get(chars[random]).push(newDrop);
            }
        }
        // else, the index isnt unique, the letter has already been inserted, and nothing
        // happens
    }

}

//return if the given word is onscreen
function checkIfOnScreen(word) {

    var result;
    var wordArray = word.split('');
    for (var i = 0; i < wordArray.length; i++) {
        var char = wordArray[i];
        if (dropMap.has(char)) {
            result = !(dropMap.get(char).length === 0);
            if (result === false) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}

function destroyDrops(word) {

    var wordArray = word.split('');
    for (var i = 0; i < wordArray.length; i++) {
        var char = wordArray[i];
        dropMap.get(char).shift().destroy();
    }
}

//Prototype/template for the drop object
Drop = function(game, char) {
    var x = getRandomInt(0, 650);
    var y = 0;
    Phaser.Sprite.call(this, game, x, y, char);
    this.game.physics.arcade.enableBody(this);

};

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

Drop.prototype = Object.create(Phaser.Sprite.prototype);
Drop.prototype.constructor = Drop;

//game.state.add('GameState', GameState);
//game.state.start('GameState');
