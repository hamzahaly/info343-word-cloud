// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var GameState = {
    preload: preload, create: create, update: update
};

var dictionary = ['word', 'echo', 'halo', 'game', 'gun', 'assault', 'hill', 'chief', 'lock', 'spartan', 'thrust', 'slide'];
var textInput = "";
console.log(textInput.toString());

function preload() {
    game.load.image('background', 'assets/img/background.jpg')
}

function create() {
    background = game.add.tileSprite(0, 0, 1000, 600, "background");
    textInput = game.make.bitmapData(800, 600);
    textInput.context.font = '18px Arial';
    textInput.context.fillStyle = '#FFF';
    textInput.addToWorld();

    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    textInput = game.add.text(game.world.centerX, game.world.centerY, {
        font: "24px Arial",
        fill: "#000",
        align: "center"
    });

    textInput.setText(textInput.text);
}

function update() {
}

function keyPress(char) {
    console.log(textInput);
    var x = 64;
    var idx;
    console.log(char);
    textInput += char;
    console.log(textInput);
    for (idx = 0; idx < dictionary.length; idx++) {
      if (textInput === dictionary[idx]) {
          console.log('Word Completed');
      } else {
          console.log('Word Incomplete');
      }
    }
}

game.state.add('GameState', GameState);
game.state.start('GameState');




