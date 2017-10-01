var bg, 
    tubos,
    flappy,
    salto,
    timer,
    score,
    scoreTxt;

var Play = {
    preload: function(){
        juego.load.spritesheet('pajaros', '../img/bird.png', 36, 26);
        juego.load.image('tubo', '../img/tube.png');
        juego.load.image('tuboEnd', '../img/tube-end.png');

        juego.forceSingleUpdate = true;
    },
    create: function(){
        bg = juego.add.tileSprite(0, 0, juego.width, juego.height, 'bg');
        
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        tubos = juego.add.group();
        tubos.enableBody = true;
        tubos.createMultiple(20, 'tubo');

        tubosEnd = juego.add.group();
        tubosEnd.enableBody = true;
        tubosEnd.createMultiple(2, 'tuboEnd')

        flappy = juego.add.sprite(100, 240, 'pajaros');
        flappy.frame = 1;
        flappy.animations.add('vuelo', [0,1,2], 10, true);
        flappy.anchor.setTo(0, 0.5);
        
        juego.physics.arcade.enable(flappy);
        flappy.body.gravity.y = 1000;
        
        salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(this.saltar, this);

        timer = juego.time.events.loop(1500, this.crearColumna, this);

        score = -1;
        scoreTxt = juego.add.text(20, 20, "0", {
            font: "30px Arial", fill: "#fff"
        });

    },
    update: function(){
        if(flappy.inWorld === false
            || flappy.position.y > 460
            || flappy.alive === false){
            this.state.start('Game_hover');
        } 


        bg.tilePosition.x -= 1;
        
        flappy.animations.play('vuelo');
        if(flappy.angle < 20){
            flappy.angle +=1;
        }

        juego.physics.arcade.overlap(flappy, tubos, this.colision, null, this);
    },
    saltar: function(){
        flappy.body.velocity.y =- 350;
        juego.add.tween(flappy).to({angle: -20}, 100).start();

    },
    crearColumna: function(){
        var hueco = Math.floor(Math.random() * 5) + 1;
        for(var i = 0; i < 8; i++){
            if(i != hueco && i != hueco + 1){
                this.crearTubo(370, i * 55);
            }
        }
        this.crearHueco(369, hueco * 55 - 27);
        score += 1;
        scoreTxt.text = score;
        
    },
    crearTubo: function(x, y){
        var tubo = tubos.getFirstDead();
        tubo.reset(x, y);
        tubo.body.velocity.x = -180;

        tubo.checkWorldBounds = true;
        tubo.outOfBoundsKill = true;
    },
    crearHueco: function(x, y){
        var hueco = tubosEnd.getFirstDead();
        hueco.reset(x, y);
        hueco.body.velocity.x = -180;

        hueco.checkWorldBounds = true;
        hueco.outOfBoundsKill = true;

    },
    colision: function(){
        if(flappy.alive != true){
            return;
        }

        flappy.alive = false;
        juego.time.events.remove(timer);
    }

}