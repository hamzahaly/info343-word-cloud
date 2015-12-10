/**
 * Created by Peter on 12/9/2015.
 */

var boot = {
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
        console.log("start app");
        this.game.state.start("App");
    }
}
console.log('hi2');