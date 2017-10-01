var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'game');
juego.state.add('Menu', Menu);
juego.state.add('Juego', Play);
juego.state.add('Game_hover', GameOver);

juego.state.start('Menu');