// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.

var game = new Phaser.Game(650, 700, Phaser.AUTO, '');

var states = {};
states.Loading = function() {};
states.MainMenu = function() {};
states.GameOver = function() {};
states.LeaderBoard = function() {};
//
//states.GameOver.prototype = {
//    create: function() {
//        background = game.add.tileSprite(0, 0, 650, 700, "background");
//        //Game audio
//        keyPressFX = game.add.audio('keyPress');
//        buttonClickFX = game.add.audio('buttonClick');
//
//        buttonClickFX.addMarker('start', 0, 5);
//        buttonClickFX.addMarker('leaderboard', 0, 5);
//        buttonClickFX.addMarker('replay', 0, 5);
//
//        //var startButton = makeButton('start', 300, 300);
//        var startButton = this.game.add.button(game.world.centerX, game.world.centerY, "start", this.startGame, this);
//        startButton.anchor.setTo(0.5, 0.5);
//        makeButton('leaderboard', 300, 400);
//
//        playBackground();
//    }
//};

states.MainMenu.prototype = {
    //Preload all assets into the game
    preload: function() {
        this.game.load.text('dictionary', 'assets/dictionary.txt');
        this.game.load.image('background', 'assets/img/background.png');
        this.game.load.image('a', 'assets/img/drops/a.png');
        this.game.load.image('b', 'assets/img/drops/b.png');
        this.game.load.image('c', 'assets/img/drops/c.png');
        this.game.load.image('d', 'assets/img/drops/d.png');
        this.game.load.image('e', 'assets/img/drops/e.png');
        this.game.load.image('f', 'assets/img/drops/f.png');
        this.game.load.image('g', 'assets/img/drops/g.png');
        this.game.load.image('h', 'assets/img/drops/h.png');
        this.game.load.image('i', 'assets/img/drops/i.png');
        this.game.load.image('j', 'assets/img/drops/j.png');
        this.game.load.image('k', 'assets/img/drops/k.png');
        this.game.load.image('l', 'assets/img/drops/l.png');
        this.game.load.image('m', 'assets/img/drops/m.png');
        this.game.load.image('n', 'assets/img/drops/n.png');
        this.game.load.image('o', 'assets/img/drops/o.png');
        this.game.load.image('p', 'assets/img/drops/p.png');
        this.game.load.image('q', 'assets/img/drops/q.png');
        this.game.load.image('r', 'assets/img/drops/r.png');
        this.game.load.image('s', 'assets/img/drops/s.png');
        this.game.load.image('t', 'assets/img/drops/t.png');
        this.game.load.image('u', 'assets/img/drops/u.png');
        this.game.load.image('v', 'assets/img/drops/v.png');
        this.game.load.image('w', 'assets/img/drops/w.png');
        this.game.load.image('x', 'assets/img/drops/x.png');
        this.game.load.image('y', 'assets/img/drops/y.png');
        this.game.load.image('z', 'assets/img/drops/z.png');
        this.game.load.image('start', 'assets/img/start.png');
        this.game.load.image('leaderboard', 'assets/img/leaderboard.png');
        this.game.load.image('replay', 'assets/img/replay.png');
        this.game.load.audio('theme', 'assets/audio/theme.mp3');
        this.game.load.audio('buttonClick', 'assets/audio/buttonClick.mp3');
        this.game.load.audio('keyPress', 'assets/audio/keyPress.mp3');
        console.log('loaded sprites');
    },
    create: function() {
        //background
        background = game.add.tileSprite(0, 0, 650, 700, "background");
        //Game audio
        keyPressFX = game.add.audio('keyPress');
        buttonClickFX = game.add.audio('buttonClick');

        buttonClickFX.addMarker('start', 0, 5);
        buttonClickFX.addMarker('leaderboard', 0, 5);
        buttonClickFX.addMarker('replay', 0, 5);

        //Start the game by clicking this button
        var startButton = this.game.add.button(game.world.centerX, game.world.centerY, "start", this.startGame, this);
        startButton.anchor.setTo(0.5, 0.5);
        startButton.scale.set(0.2, 0.2);

        makeButton('leaderboard', 300, 400);

        playBackground();
    },
    startGame: function() {
        keyPressFX = game.add.audio('keyPress');
        buttonClickFX = game.add.audio('buttonClick');
        buttonClickFX.play('buttonClick', 0);
        this.game.state.start('GameState');
    }
};

var GameState = {
    create: create, update: update
};

var dictionary;
var textInput;
var deleteKey;
var enterKey;
var drops;
var textboxlinetop;
var textboxlinebottom;
var textboxlineleft;
var textboxlineright;
var startTyping;
var scoreText;
var score = 0;
var tween;
var hype;



//Create objects and add them to the game world
function create() {
    //fix blurry text
    game.renderer.renderSession.roundPixels = true;


    //Add a dictionary to the game.
    dictionary = this.game.cache.getText('dictionary').split(/\s+/);

    //Add a background to the game.
    background = game.add.tileSprite(0, 0, 650, 700, "background");

    //Allow the user to type words into the game.
    textInput = game.make.bitmapData(800, 600);
    textInput.context.font = '18px Arial';
    textInput.context.fillStyle = '#FFF';
    textInput.addToWorld();

    //Build a makeshift text box
    textboxlinetop = new Phaser.Line(game.world.centerX / 2, game.world.centerY + 200, game.world.centerX * 1.5, game.world.centerY + 200);
    textboxlinebottom = new Phaser.Line(game.world.centerX / 2, game.world.centerY + 250, game.world.centerX * 1.5, game.world.centerY + 250);
    textboxlineleft = new Phaser.Line(game.world.centerX / 2, game.world.centerY + 200, game.world.centerX / 2, game.world.centerY + 250);
    textboxlineright = new Phaser.Line(game.world.centerX * 1.5, game.world.centerY + 200, game.world.centerX * 1.5, game.world.centerY + 250);


    //Retrieve keyboard presses from the player
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    textInput = game.add.text(game.world.centerX + 5, 575, "", {
        font: "28px Arial",
        fill: "#000",
        align: "center"
    });
    textInput.setText(textInput.text);
    textInput.anchor.setTo(0.5, 0.5);


    startTyping = game.add.text(game.world.centerX, game.world.centerY, "Start Typing!", {
        font: '48px Arial',
        fill: '#000',
        align: 'center'
    });
    startTyping.anchor.setTo(0.5, 0.5);
    game.time.events.add(Phaser.Timer.SECOND, fadeText, this);

    scoreText = game.add.text(game.world.centerX + 150, game.world.centerY + 300, "score: " + score, {
        font: '28px Arial',
        fill: '#000',
        align: 'center'
    });

    //Keys for backspace and enter
    this.deleteKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.ENTER ]);

    //Adds gravity to the drops
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 2;

    //creates the drops group that Phaser implements

    drops = game.add.group();
    createDrops();
    game.time.events.loop(7000, createDrops, this);
}


//updates the game
function update() {
    game.debug.geom(textboxlinetop, '#000');
    game.debug.geom(textboxlinebottom, '#000');
    game.debug.geom(textboxlineleft, '#000');
    game.debug.geom(textboxlineright, '#000');

    //Delete a letter from the word being typed.
    if (this.deleteKey.isDown) {
        this.deleteKey.onDown.add(deleteText, this);
    }

    if (this.enterKey.isDown) {
        this.enterKey.onDown.add(submitText, this)
    }
    scoreText.setText("Score: " + score);
}

function fadeText() {
    game.add.tween(startTyping).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
}

//Captures the keypress of the player and appends the character to a string
function keyPress(char) {
    textInput.text += char;
}

//When the play presses enter verifies if the word is correct or incorrect
function submitText() {
    if (checkIfOnScreen(textInput.text)) {
        if (dictionary.indexOf(textInput.text) > -1) {
            score += textInput.text.length * 10;
            destroyDrops(textInput.text)
            textInput.setText("");
        }
    }
}

//Allow user to use backspace to delete their typed word
function deleteText() {
    textInput.text = textInput.text.substring(0, textInput.text.length - 1);
}

//Play the background music
function playBackground() {
    music = game.add.audio('theme');
    music.autoplay = true;
    music.play("", 0, 1, true);
}

//Make buttons function for the game
function makeButton(name, x, y) {
    var button = game.add.button(x, y, name, click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(0.2, 0.2);
    button.smoothed = false;
}

//Play sound for clicking a button
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


//Creates the letters that will drop from the top of the screen
function createDrops() {
    var word = dictionary[getRandomInt(0, dictionary.length)];
    var chars = word.split('');
    var uniqueNums = [];

    while (uniqueNums.length < chars.length) {
        // pick a random index of the char array
        var random = getRandomInt(0, chars.length);
        // checks that the index hasn't been called already, making sure that each letter
        // is only called once
        if (uniqueNums.indexOf(random) == -1) {
            uniqueNums.push(random);

            var newDrop = new Drop(game, chars[random]);

            drops.add(newDrop);
            if (dropMap.has(chars[random])) {
                dropMap.get(chars[random]).push(newDrop);
            } else {
                dropMap.set(chars[random], new Array());
                dropMap.get(chars[random]).push(newDrop);
            }
        }
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

//Destroys (removes) the drops from the screen
function destroyDrops(word) {
    var wordArray = word.split('');
    for (var i = 0; i < wordArray.length; i++) {
        var char = wordArray[i];
        dropMap.get(char).shift().destroy();
    }
}

//Prototype/template for the drop object
Drop = function(game, char) {
    var numColumns = 35;
    var numRows = 3;
    var x = numColumns * (getRandomInt(0, game.world.width / numColumns));
    var y = numRows * (getRandomInt(-60 / numRows, -20 / numRows));
    Phaser.Sprite.call(this, game, x, y, char);
    this.game.physics.arcade.enableBody(this);
};


//calculates the distance between two points
function distance(x1, y1, x2, y2) {
    var x = (x2 - x1) * (x2 - x1);
    var y = (y2 - y1) * (y2 - y1);
    return Math.sqrt(x + y);
}

function isColliding(drop1, drop2) {
    return distance(drop1.x, drop1.y, drop2.x, drop2.y) <= 30;
}

Drop.prototype = Object.create(Phaser.Sprite.prototype);
Drop.prototype.constructor = Drop;

game.state.add('GameState', GameState);
game.state.add('MainMenu', states.MainMenu);
game.state.start('MainMenu');
