// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.


var game = new Phaser.Game(1000, 600, Phaser.AUTO, '');

var GameState = {
    preload: preload, create: create, update: update
};

var dictionary = ['word', 'echo', 'halo', 'game', 'gun', 'assault', 'hill', 'chief', 'lock', 'spartan', 'thrust', 'slide'];
var textInput;
var deleteKey;
var deleteKeyTxt;
var enterKey;
var enterKeyTxt;
var textboxline1;
var textboxline2;
var textboxline3;
var textboxline4;
var startTyping;

//Preload all of the images so they appear on the screen when the game starts.
function preload() {
    game.load.image('background', 'assets/img/background.jpg');
    game.load.image('a', 'assets/img/drops/a.png');
    game.load.image('b', 'assets/img/drops/b.png');
    game.load.image('c', 'assets/img/drops/c.png');
    game.load.image('d', 'assets/img/drops/d.png');
    game.load.image('e', 'assets/img/drops/e.png');
    game.load.image('f', 'assets/img/drops/f.png');
    game.load.image('g', 'assets/img/drops/g.png');
    game.load.image('h', 'assets/img/drops/h.png');
    game.load.image('i', 'assets/img/drops/i.png');
    game.load.image('j', 'assets/img/drops/j.png');
    game.load.image('k', 'assets/img/drops/k.png');
    game.load.image('l', 'assets/img/drops/l.png');
    game.load.image('m', 'assets/img/drops/m.png');
    game.load.image('n', 'assets/img/drops/n.png');
    game.load.image('o', 'assets/img/drops/o.png');
    game.load.image('p', 'assets/img/drops/p.png');
    game.load.image('q', 'assets/img/drops/q.png');
    game.load.image('r', 'assets/img/drops/r.png');
    game.load.image('s', 'assets/img/drops/s.png');
    game.load.image('t', 'assets/img/drops/t.png');
    game.load.image('u', 'assets/img/drops/u.png');
    game.load.image('v', 'assets/img/drops/v.png');
    game.load.image('w', 'assets/img/drops/w.png');
    game.load.image('x', 'assets/img/drops/x.png');
    game.load.image('y', 'assets/img/drops/y.png');
    game.load.image('z', 'assets/img/drops/z.png');
}

function create() {
    //Add background for the game.
    background = game.add.tileSprite(0, 0, 1000, 600, "background");
    game.renderer.renderSession.roundPixels = true;

    //Build a makeshift textbox
    textboxline1 = new Phaser.Line(game.world.centerX, game.world.centerY + 200, game.world.centerX + 300, game.world.centerY + 200);
    textboxline2 = new Phaser.Line(game.world.centerX, game.world.centerY + 250, game.world.centerX + 300, game.world.centerY + 250);
    textboxline3 = new Phaser.Line(game.world.centerX, game.world.centerY + 200, game.world.centerX, game.world.centerY + 250);
    textboxline4 = new Phaser.Line(game.world.centerX + 300, game.world.centerY + 200, game.world.centerX + 300, game.world.centerY + 250);

    //Retrieve keyboard inputs from the user.
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    textInput = game.add.text(game.world.centerX + 5, 505, "", {
        font: "36px Arial",
        fill: "#000",
        align: "center"
    });
    console.log(textInput.text);
    textInput.setText(textInput.text);

    startTyping = game.add.text(game.world.centerX - 175, 500, "Start Typing!")
    //Read in Backspace and Enter keys
    this.deleteKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.ENTER ]);
    this.enterKeyTxt = game.add.text(20, 80, "Enter is pressed? No");
    this.deleteKeyTxt = game.add.text(20, 20, "Backspace is pressed? No");

    //Add physics to the game.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 10;


    var word = 'fuck';
    for (var i = 0; i < word.length; i++) {
        game.add.existing(new Drop(game, word.charAt(i)));
    }
}

function update() {
    game.debug.geom(textboxline1, '#000');
    game.debug.geom(textboxline2, '#000');
    game.debug.geom(textboxline3, '#000');
    game.debug.geom(textboxline4, '#000');


    //Delete a letter from the word being typed.
    if (this.deleteKey.isDown) {
        this.deleteKeyTxt.text = "Backspace is pressed? Yes";
        this.deleteKey.onDown.add(deleteText, this);
    } else {
        this.deleteKeyTxt.text = "Backspace is pressed? No";
    }
    if (this.enterKey.isDown) {
        this.enterKeyTxt.text = "Enter is pressed? Yes";
        this.enterKey.onDown.add(submitText, this)
    } else {
        this.enterKeyTxt.text = "Enter is pressed? No";
    }
}

//Concatenate key presses into a string
function keyPress(char) {
    var x = 64;
    var idx;
    console.log(char);
    textInput.text += char;
    console.log(textInput.text);
    textInput.setText(textInput.text);
    for (idx = 0; idx < dictionary.length; idx++) {
      if (textInput.text === dictionary[idx]) {
          console.log('Word Completed');
      } else {
          console.log('Word Incomplete');
      }
    }
}

//Hitting the enter key submits the text to me checked against the dictionary
function submitText() {
    //Logic for determining if the text is in the dictionary
}

//Delete a letter from the text being typed.
function deleteText() {
    textInput.text = textInput.text.substring(0, textInput.text.length - 1);
    console.log(textInput.text);
}

//Get a random number to add RNG to the game.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Drop = function(game, char) {

    var x = getRandomInt(0, game.world.width);
    var y = 0;
    Phaser.Sprite.call(this, game, x, y, char);
    this.game.physics.arcade.enableBody(this);

};

Drop.prototype = Object.create(Phaser.Sprite.prototype);
Drop.prototype.constructor = Drop;

game.state.add('GameState', GameState);
game.state.start('GameState');

