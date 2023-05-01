class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");

    }

    preload()
    {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('fastSpaceship', './assets/fastSpaceship.png',);
        this.load.image('newStarfield', './assets/newStarfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight:32, startFrame:0, endFrame:9});
        this.load.audio("music", './assets/playSceneAudio.mp3');
        this.load.image('star', './assets/star3.png');
    }
    
    create()
    {
        // place tile sprite 
        this.starfield = this.add.tileSprite(0,0,640,480, 'newStarfield').setOrigin(0,0);

        // green UI background 
        this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize * 2,0x00FF00).setOrigin(0,0);

        // white borders 
        this.add.rectangle(0,0,game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0,borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        // add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);

        // add spaceship(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);

        /* 
        this is for  Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
        */ 
        this.fastShip = new SpaceshipFast(this, game.config.width + borderUISize * 6, borderUISize * 10 + borderPadding * 2, 'fastSpaceship', 0, 40).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        this.globalHighScore = 0;
        // display score 
        let scoreConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        this.displayHighScore = this.add.text(400,50, "High Score : " + this.globalHighScore, {fontFamily: 'Courier', fontSize: '18px', color: '#843605'}).setOrigin(0,0);

        // game over flag
        this.gameOver = false;

        // 60 second play clock 
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => 
        {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
        // https://www.youtube.com/watch?v=COncYQLGJS8&ab_channel=LuisZuno
        this.music = this.sound.add("music");
        var musicConfig = {
            mute: false,
            volume: 0.12,
            rate: 1,
            detune: 0, 
            seek: 0,
            loop: false,
            delay:0
        }
        this.music.play(musicConfig);

        // fire text 
        // Implement the 'FIRE' UI text from the original game (5)
        this.fireUIText = this.add.text(300, borderUISize + borderPadding * 2, 'FIRE', {fontFamily: 'Courier', fontSize: '28px', color: '#843605'}).setOrigin(0,0);
        this.fireUIText.visible = false;

        // this is for the explosion randomizing sound 
        this.rndInteger = Phaser.Math.Between(1, 4);

        // Display the time remaining (in seconds) on the screen (10)
        this.showTimer = this.add.text(200, borderUISize + borderPadding * 2, game.settings.gameTimer, {fontFamily: 'Courier', fontSize: '28px', color: '#843605'}).setOrigin(0,0);
    }

    update()
    {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR))
        {
            this.scene.restart();
            this.setHighScore();
            console.log("set High SCore");
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -=4;

        if(!this.gameOver)
        {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.fastShip.update();
        }

        // Implement the 'FIRE' UI text from the original game (5)
        if(this.p1Rocket.isFiring)
        {
            this.fireUIText.visible = true;
         
        } else {
            this.fireUIText.visible = false;
        }

        // check collisions 
        if(this.checkCollision(this.p1Rocket,this.ship03))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.showTimer.setText(Math.round(0.001 * game.settings.gameTimer - this.clock.getElapsedSeconds()));
        }
        else if(this.checkCollision(this.p1Rocket,this.ship02))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.showTimer.setText(Math.round(0.001 * game.settings.gameTimer - this.clock.getElapsedSeconds()));
        }
        else if(this.checkCollision(this.p1Rocket,this.ship01))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.showTimer.setText(Math.round(0.001 * game.settings.gameTimer - this.clock.getElapsedSeconds()));
        }
        /* 
            this is for: Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)  
        */ 
        else if(this.checkCollision(this.p1Rocket,this.fastShip))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.fastShip);
            this.showTimer.setText(Math.round(0.001 * game.settings.gameTimer - this.clock.getElapsedSeconds()));
        }
        else
        {
            //this is for displaying timer
            this.showTimer.setText(Math.round(0.001 * game.settings.gameTimer - this.clock.getElapsedSeconds()));
        }

        const pointer = this.input.activePointer;
    }

    checkCollision(rocket,ship)
    {
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    shipExplode(ship)
    {
        // temp hide ship
        ship.alpha = 0;
        // create explosion sprite 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.add.particles(ship.x, ship.y, 'star', {
            speed: 100,
            lifespan: 30,
            gravityY: 200
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        if(this.rndInteger == 1)
        {
            this.sound.play('sfx_explosion');
            this.rndInteger = Phaser.Math.Between(1, 4);

        }
        else if(this.rndInteger == 2)
        {
            this.sound.play('sfx_explosion2');
            this.rndInteger = Phaser.Math.Between(1, 4);
        }
        else if(this.rndInteger == 3)
        {
            this.sound.play('sfx_explosion3');
            this.rndInteger = Phaser.Math.Between(1, 4);
        }
        else if(this.rndInteger == 4)
        {
            this.sound.play('sfx_explosion4');
            this.rndInteger = Phaser.Math.Between(1, 4);
        }
        else
        {
            this.sound.play('sfx_explosion');
            this.rndInteger = Phaser.Math.Between(1, 4);
        }
    }

    setHighScore()
    {
        if(this.p1Score > localStorage.getItem(this.globalHighScore))
        {
            localStorage.setItem(this.globalHighScore, this.p1Score);
        }
    }
}