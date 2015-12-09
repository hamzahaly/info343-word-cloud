// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var GameState = {
    preload: preload, create: create, update: update
};

var dictionary = ['word', 'echo', 'halo', 'game', 'gun', 'assault', 'hill', 'chief', 'lock', 'spartan', 'thrust', 'slide'];
var textInput;
var deleteKey;
var deleteKeyTxt;
var enterKey;
var enterKeyTxt;
var drops;

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
    game.load.image('start', 'assets/img/start.png');
    game.load.image('leaderboard', 'assets/img/leaderboard.png');
    game.load.image('replay', 'assets/img/replay.png');
    game.load.audio('theme', 'assets/audio/theme.mp3');
    game.load.audio('buttonClick', 'assets/audio/buttonClick.mp3');
    game.load.audio('keyPress', 'assets/audio/keyPress.mp3');
}

function create() {
    background = game.add.tileSprite(0, 0, 1000, 600, "background");
    textInput = game.make.bitmapData(800, 600);
    textInput.context.font = '18px Arial';
    textInput.context.fillStyle = '#FFF';
    textInput.addToWorld();

    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    textInput = game.add.text(game.world.centerX, game.world.centerY, "", {
        font: "24px Arial",
        fill: "#000",
        align: "center"
    });
    textInput.setText(textInput.text);

    this.deleteKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.ENTER ]);
    this.enterKeyTxt = game.add.text(20, 80, "Enter is pressed? No");
    this.deleteKeyTxt = game.add.text(20, 20, "Backspace is pressed? No");

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 10;


    drops = game.add.group();
    var word = 'ffffffuck';
    createDrops(word);

    console.log(dropMap);

    keyPressFX = game.add.audio('keyPress');
    buttonClickFX = game.add.audio('buttonClick');
    
    buttonClickFX.addMarker('start', 0, 5);
    buttonClickFX.addMarker('leaderboard', 0, 5);
    buttonClickFX.addMarker('replay', 0, 5);
                            
    makeButton('start', 300, 300);
    makeButton('leaderboard', 300, 400);
    //makeButton('replay', 300, 300);
                            
    playBackground();
}

function update() {
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

function keyPress(char) {
    console.log("here");
    console.log("HELLO");
    console.log(textInput.text);
    var x = 64;
    var idx;
    console.log(char);
    textInput.text += char;
    console.log(textInput.text);
    for (idx = 0; idx < dictionary.length; idx++) {
      if (textInput.text === dictionary[idx]) {
          console.log('Word Completed');
      } else {
          console.log('Word Incomplete');
      }
    }
}

function submitText() {
    //Logic for determining if the text is in the dictionary
}

function deleteText() {
    textInput.text = textInput.text.substring(0, textInput.text.length - 1);
}

function playBackground() {
    music = game.add.audio('theme');
    music.autoplay = true;
    music.play("", 0, 1, true);
}

function makeButton(name, x, y) {
    var button = game.add.button(x, y, name, click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(0.2, 0.2);
    button.smoothed = false;

}

function click(button) {
	buttonClickFX.play(button.name, 0);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


var dropMap = new Map();

function createDrops(word) {
    for (var i = 0; i < word.length; i++) {
        var character = word.charAt(i);
        var newDrop = new Drop(game, character);
        game.add.existing(newDrop);
        drops.add(newDrop);
        if (dropMap.has(character)) {
            console.log('in here');
            dropMap.get(character).push(newDrop);
        } else {

            console.log('olo');
            dropMap.set(character, new Array());
            console.log('after new array set');
            dropMap.get(character).push(newDrop);
            console.log('end');
        }
    }
}

function onScreen(word) {
    for (var i = 0; i < word.length; i++) {
        var char = word.charAt[i];
        if (dropMap.has(char)) {
            return !(dropMap.get(char).length === 0);
        } else {
            return false;
        }
    }
}

Drop = function(game, char) {

    var character = char;
    var x = getRandomInt(0, game.world.width);
    var y = 0;
    Phaser.Sprite.call(this, game, x, y, char);
    this.game.physics.arcade.enableBody(this);

};

Drop.prototype = Object.create(Phaser.Sprite.prototype);
Drop.prototype.constructor = Drop;

game.state.add('GameState', GameState);
game.state.start('GameState');


