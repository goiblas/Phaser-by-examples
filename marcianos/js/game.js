

const PlayState = {};
PlayState.preload = function(){
    this.game.load.image('background', './../assets/img/background.png');
    this.game.load.image('ship', './../assets/img/ship.png');
    this.game.load.image('bullet', './../assets/img/bullet.png');
    this.game.load.spritesheet('alien', './../assets/img/alien.png', 40, 44);

    this.game.load.audio('music', './../assets/img/bgm.mp3');
    this.game.load.audio('shoot', './../assets/img/shoot.wav');
    this.game.load.audio('boom', './../assets/img/boom.wav');

    this.game.load.image('font','./../assets/img/retrofont.png');

    this.game.load.image('particle', './../assets/img/particle.png');
};

PlayState.create = function(){
    this.score = 0;
    this.scoreFont = this.game.add.retroFont('font', 16, 24, Phaser.RetroFont.TEXT_SET6);
    this.game.add.image(0, 0, 'background');

    this.ship = new Ship(this.game, 250, 300);
    this.game.add.existing(this.ship);

    this.explosions = new ExplosionEmitter(this.game);

    this.bullets = this.game.add.group();
    this.aliens = this.game.add.group();

    this.scorelabel = this.game.add.image(4, this.game.world.height, this.scoreFont);
    this.scorelabel.anchor.setTo(0, 1);

    this.audio = {
        music: this.game.add.audio('music'),
        shoot: this.game.add.audio('shoot'),
        explosion: this.game.add.audio('boom')
    };

    this.audio.music.loopFull();

    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP,
        down: Phaser.KeyCode.DOWN,
        space: Phaser.KeyCode.SPACEBAR
    });
    
    this.keys.space.onDown.add( function(){
        this.ship.shoot(this.bullets);
        this.audio.shoot.play();
    }, this);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.ship);
    this.ship.body.collideWorldBounds = true;
};


PlayState.update = function(){
    if( this.keys.left.isDown){
        this.ship.moveX(-1);
    } else if ( this.keys.right.isDown) {
        this.ship.moveX(1);
    } else {
        this.ship.moveX(0);
    }

    if( this.keys.up.isDown){
        this.ship.moveY(-1);
    } else if (this.keys.down.isDown){
        this.ship.moveY(1)
    } else {
        this.ship.moveY(0);
    }

    
    if(this.game.rnd.between(0, 100) < 10){
        const x = this.game.rnd.between(0, this.game.world.width);
        Alien.spawn(this.aliens, x, -50);
    }

    this.game.physics.arcade.overlap( 
        this.bullets,
        this.aliens,
        function(bullet, alien){
            bullet.kill();
            alien.kill();

            this.audio.explosion.play();
            this.score += 50;

            this.explosions.spawn(alien.x, alien.y);
        },
        null, this
    );

    this.game.physics.arcade.overlap(
        this.aliens,
        this.ship,
        function(alien, ship){
            this.showGameOver();
        },
        null, this
    )
    this.scoreFont.text = `Score: ${this.score}`;

}

PlayState.showGameOver = function(){
    this.game.paused = true;
    const middle = this.game.world.width / 2;
    let posY = 200;
    const gameOverText = this.game.add.text(middle, posY, 'Game Over', {
        font: '40px "Courier New", Courier, monospace',
        fill: '#fffff0'
    });
    gameOverText.anchor.setTo(0.5);
    posY += 60;
    
    const scoreText = this.game.add.text(middle, posY, this.score + ' Puntos', {
        font: '18px "Courier New", Courier, monospace',
        fill: '#fffff0'
    });
    scoreText.anchor.setTo(0.5);
    posY += 100;
    const playAgainText = this.game.add.text(middle, posY, ' - Play -', {
        font: '30px "Courier New", Courier, monospace',
        fill: '#4caf50'
    });
    playAgainText.anchor.setTo(0.5);
    playAgainText.stroke = '#ffffff';
    playAgainText.strokeThickness = 9;
    playAgainText.inputEnabled = true;
    playAgainText.input.useHandCursor = true;

    playAgainText.events.onInputUp.add(function(){
        this.game.paused = false;
        this.game.state.restart();
    }, this)

}



window.onload = function(){
    new Phaser.Game(512, 512, Phaser.AUTO, 'gameDiv', PlayState);
}
