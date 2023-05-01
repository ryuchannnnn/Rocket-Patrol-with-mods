class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        // load audio
        this.load.image('menuBackground', './assets/menuBackground.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_explosion2', './assets/jump.wav');
        this.load.audio('sfx_explosion3', './assets/pickupCoin.wav');
        this.load.audio('sfx_explosion4', './assets/powerUp.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create()
    {
        this.menuScreen = this.add.tileSprite(0,0,640,480, 'menuBackground').setOrigin(0,0);
        let menuConfig = 
        {
            fontFamily: 'Ariel',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0
        }

        // show menu text
        this.add.text(game.config.width/2, 50, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 100, 'Use <- -> arrows to move & (F) to fire the rocket', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 150, 'which will spawn at the bottom of the game screen', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            // ez mode 
            game.settings = 
            {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT))
        {
            // hard mode 
            game.settings = 
            {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}