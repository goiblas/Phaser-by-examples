function Bullet(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'bullet');

    this.anchor.setTo(0.5, 1);
    const speed = 400;
    this.game.physics.arcade.enable(this);
    this.body.velocity.y = -speed;
}
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.reset = function(x, y){
    Phaser.Sprite.prototype.reset.call(this, x, y);
    this.body.velocity.y = -400;
}

Bullet.prototype.update = function(){
    if(this.y < 0){
        this.kill();
    }
}


Bullet.spawn = function(group, x, y){
    let bullet  = group.getFirstExists(false);
    if (bullet === null){
        bullet = new Bullet(group.game, x, y);
        group.add(bullet);
    } else {
        bullet.reset(x, y)
    }
    return bullet;
}
