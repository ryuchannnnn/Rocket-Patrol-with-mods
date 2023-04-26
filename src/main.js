// Danny Chan
// Rocket Patrol 2 The Sequel
// time I took(total): 
/*
    Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15) time: 5 min to draw ship, testing took about 10 minutes: total 15 minutes 

*/


// mods I chose(done in order)
/*
    Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15): My artwork was drawn on piskel because aseprite costs money
    I was able to implement this by making a new Spaceship type, but just making it faster by a little bit.
*/

// citations:
/*

*/

let config = 
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);

// reserve keyboard vars 
let keyF,keyR,keyLEFT, keyRIGHT;

// set UI sizes 
let borderUISize = game.config.height/15;
let borderPadding = borderUISize / 3;
