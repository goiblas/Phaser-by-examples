function Alien(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'alien');

    this.anchor.setTo(0.5);
    this.game.physics.enable(this);

    this.animations.add('fly', [0,1]);
    this.animations.play('fly', 2, true);

    this.reset(x, y);
}

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

Alien.prototype.reset = function(x, y){
    Phaser.Sprite.prototype.reset.call(this, x, y);

    const minSpeedY = 100,
          maxSpeedY = 400,
          maxSpeedX = 100;

    this.body.velocity.y = this.game.rnd.between(minSpeedY, maxSpeedY);
    this.body.velocity.x = this.game.rnd.between(-maxSpeedX, maxSpeedX);
}

Alien.prototype.update = function(){
    if(this.y > this.game.world.height + this.height){
        this.kill();
    }
}

Alien.spawn = function(group, x, y){
    let alien = group.getFirstExists(false);

    if(alien === null){
        alien = new Alien(group.game, x, y);
        group.add(alien);
    } else {
        alien.reset(x,y);
    }

    return alien;
}