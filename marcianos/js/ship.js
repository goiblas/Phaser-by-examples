function Ship(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'ship');

    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = 100;
    this.speed = 300;
    this.margin = 10;
}
Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.moveX = function(dir) {
    // const maxpos = (this.x + this.width / 2) + this.margin;
    // const minpos = (this.x - this.width / 2) - this.margin;

    // if( dir > 0 && maxpos > this.game.world.width ||
    //     dir < 0 && minpos < 0){
    //     dir *= 0;
    // } 

    this.body.velocity.x = this.speed * dir;
}
Ship.prototype.moveY = function(dir) {
    // const maxpos = (this.y + this.height / 2) + this.margin;
    // const minpos = (this.y - this.height / 2) - this.margin;

    // if( dir > 0 && maxpos > this.game.world.height ||
    //     dir < 0 && minpos < 0){
    //     dir *= 0;
    // } 

    this.body.velocity.y = this.speed * dir;
}

Ship.prototype.shoot = function(group){
    const y = this.y - 12;
    const half = 22;

    Bullet.spawn(group, this.x + half, y);
    Bullet.spawn(group, this.x - half, y);
}