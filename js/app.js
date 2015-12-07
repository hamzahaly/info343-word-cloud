// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('background', 'assets/img/background.jpg')

}

function create() {

    background = game.add.tileSprite(0, 0, 1000, 600, "background");
}

function update() {

}