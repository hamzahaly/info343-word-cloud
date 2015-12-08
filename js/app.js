// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('background', 'assets/img/background.jpg');
    game.load.image('start', 'assets/img/start.png');
    game.load.image('leaderboard', 'assets/img/leaderboard.png');
    game.load.image('replay', 'assets/img/replay.png');
    
    game.load.audio('theme', 'assets/audio/theme.mp3');
    game.load.audio('buttonClick', 'assets/audio/buttonClick.mp3');
    game.load.audio('keyPress', 'assets/audio/keyPress.mp3');

}

function create() {
    //add background image
    background = game.add.tileSprite(0, 0, 1000, 600, "background");
    
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