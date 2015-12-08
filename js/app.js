// Project Word Cloud by Kevin Yan, Peter Lu, Hai Nguyen, Hamzah Aly
// An HTML5 video game that tests the user's vocabulary and typing ability.

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Drop = function(game, char) {

    var x = getRandomInt(0, game.world.width);
    var y = 0;
    Phaser.Sprite.call(this, game, x, y, char);
    this.game.physics.arcade.enableBody(this);

}

Drop.prototype = Object.create(Phaser.Sprite.prototype);
Drop.prototype.constructor = Drop;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var GameState = {
    preload: preload, create: create, update: update
};

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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 10;

    background = game.add.tileSprite(0, 0, 1000, 600, "background");

    var word = 'fuck'
    for (var i=0; i<word.length; i++) {
        game.add.existing(new Drop(game, word.charAt(i)));
    }
}

function update() {

}

game.state.add('GameState', GameState);
game.state.start('GameState');