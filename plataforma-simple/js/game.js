var mainState = {
    preload: function() {  
        game.load.image('hero', 'img/hero.png');
        game.load.image('grass', 'img/grass.png');

    },

    create: function() {  

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.cursor = game.input.keyboard.createCursorKeys();
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

        this.hero = game.add.sprite(70, 100, 'hero');
        this.hero.body.gravity.y = 1200;
        this.hero.body.collideWorldBounds = true;


        this.walls = game.add.group();
        this.btns = game.add.group();

        for(var x = 0; x < game.width; x += 42){
            var wallx = game.add.sprite(x, game.height - 1, 'grass');
            this.walls.add(wallx);
            wallx.body.immovable = true; 
            
            for(var y = 0; y < game.height; y += 100){

                if(Math.random() > 0.7){
                    var wally = game.add.sprite(x, y, 'grass');
                    this.walls.add(wally);
                    wally.body.immovable = true; 
                }
            }
        }

        links.forEach(function(elem) {

            let coords = elem.getBoundingClientRect();
                var elw = elem.offsetWidth;
                var elh = elem.offsetHeight;
                let rect = game.add.sprite(coords.left,coords.top, null);
                rect.body.setSize(elw, elh, 0, 0);
                rect.link = elem;
                this.btns.add(rect);
            
        }.bind(this));
    },

    update: function() {  
        
        
        if(this.cursor.left.isDown ||
            this.cursor.right.isDown ||
            this.cursor.up.isDown ||
            this.cursor.down.isDown ||
            this.spaceKey.isDown ){
                clearTimeout(timer);
                timer = setTimeout(changeClass, 2000);
                if(!opacidad){
                    opacidad = true;
                    wrap.classList.remove('alpha');
                }
        }

        game.physics.arcade.collide(this.hero, this.walls);
   

        if (this.cursor.left.isDown) {
            this.hero.body.velocity.x = -300;
        }
        else if (this.cursor.right.isDown) {
            this.hero.body.velocity.x = 300;
        } else {
            this.hero.body.velocity.x = 0;
        }


    if (this.cursor.up.isDown && this.hero.body.touching.down) {
        clearInterval(timer);
        this.hero.body.velocity.y = - 700;
    }

    if( this.spaceKey.isDown){
       
        var x = this.hero.x;
        var y = this.hero.y;

        game.physics.arcade.overlap(this.hero, this.btns, function(hero, btn) { 
            btn.link.click();
        });        
    }
    },
};

var game, wrap, links, timer,
    opacidad = false;


document.addEventListener("DOMContentLoaded", function(event) {

    wrap = document.getElementById('game');
    links = document.querySelectorAll('button');
    
    game = new Phaser.Game(wrap.offsetWidth, wrap.offsetHeight, Phaser.CANVAS, 'game', null, true);
    game.state.add('mainState', mainState);
    game.state.start('mainState');

});

function changeClass(){
    wrap.classList.add('alpha');
    opacidad = false;
}



