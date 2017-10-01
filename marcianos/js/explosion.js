function ExplosionEmitter(game){
    const maxParticles = 256;

    Phaser.Particles.Arcade.Emitter.call(this, game, 0 ,0, maxParticles);

    this.makeParticles('particle');
    this.gravity = 0 ;
    this.blendMode = 1;
}

ExplosionEmitter.prototype = Object.create(
    Phaser.Particles.Arcade.Emitter.prototype
);
ExplosionEmitter.prototype.constructor = ExplosionEmitter;

ExplosionEmitter.prototype.spawn = function(x, y){
    const particlesPerBurt = 8,
          particleLifeSpan =1;

    this.position.setTo(x, y);
    this.explode(particleLifeSpan * 1000, particlesPerBurt);
}