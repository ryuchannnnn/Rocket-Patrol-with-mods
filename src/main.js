// Danny Chan
// Rocket Patrol 2 The Sequel
// time I took(total): 
/*
    15 minutes 
    30 minutes
    10 minutes
    10 minutes 
    15 minutes 
    10 minutes

*/

// mods I chose(done in order)
/*
    1.
    Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15): 
    
    Explanation:
    My artwork was drawn on piskel because aseprite costs money
    I was able to implement this by making a new Spaceship type, but just making it faster by a little bit.

    2.
    Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5): 
    
    Explanation:
    I chose my Background music via https://www.FesliyanStudios.com, their audio is permitted for video games as long as I do not upload to youtube, and citing just requires to put their website.
    I am not gaining ANY profit off this but I will still cite where I got the audio from. (as well as their policy) https://www.fesliyanstudios.com/policy
    see citations for how I implemented this **1

    3.
    Create a new scrolling tile sprite for the background (5)
    Explanation: 
    I got the moon artwork from opengameart 
    https://opengameart.org/content/vector-moon-0
    I used piskel and made a fully black background to represent space. **2

    4. 
    Implement the 'FIRE' UI text from the original game (5) **3 

    5.
    Create 4 new explosion sound effects and randomize which one plays on impact (10)

    6. 
    Create a new title screen (e.g., new artwork, typography, layout) (10) **4

    7.
    Display the time remaining (in seconds) on the screen (10) **5

    
*/

// citations:
/*
    **1 
    I used this for audio: https://www.fesliyanstudios.com/royalty-free-music/download/arcade-kid/618 
    Background music via https://www.FesliyanStudios.com
    I followed this guide for adding copyright free background music
    https://www.youtube.com/watch?v=COncYQLGJS8&ab_channel=LuisZuno 

    **2
    https://opengameart.org/content/vector-moon-0

    **3
    https://www.youtube.com/watch?v=7gGjBkKM_8M&ab_channel=MitchellHudson

    **4 
    https://opengameart.org/content/space-rocket-2d

    **5
    https://phaser.discourse.group/t/how-to-make-a-timer-that-displays-the-games-run-time/5175/4


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