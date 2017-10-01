var Menu = {};

Menu.preload = function(){
    juego.stage.backgroundColor = '#fff';
    juego.load.image('boton', '../img/btn.png');
    juego.load.image('title', '../img/title.png');
    juego.load.image('bg', '../img/bg_full.png');
}

Menu.create = function(){
   juego.add.tileSprite(0, 0, juego.width, juego.height, 'bg');
    
    var boton = this.add.button(juego.width / 2, juego.height/ 2,'boton', this.iniciarJuego, this);
    boton.anchor.setTo(0.5);
    boton.scale.setTo(0.6);

    var title = this.add.sprite(juego.width / 2, 120, 'title');
    title.anchor.setTo(0.5);
    title.scale.setTo(0.3);
    
}

Menu.iniciarJuego = function(){
    this.state.start('Juego');
}