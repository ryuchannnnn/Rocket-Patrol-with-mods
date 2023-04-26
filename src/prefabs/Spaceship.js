class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,frame,pointValue)
    {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update()
    {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap from left to right
        if(this.x <= 0 - this.width)
        {
            this.reset();
        }
    }

    reset()
    {
        this.x = game.config.width;
    }
}

// this is for 
/* 
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
*/ 
class SpaceshipFast extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,frame,pointValue)
    {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed*2;
    }

    update()
    {
        // move spaceship left
        this.x -= this.moveSpeed * 1.25;
        // wrap from left to right
        if(this.x <= 0 - this.width)
        {
            this.reset();
        }
    }

    reset()
    {
        this.x = game.config.width;
    }
}