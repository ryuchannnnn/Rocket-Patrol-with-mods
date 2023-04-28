// Danny Chan
// Rocket Patrol 2 The Sequel
// time I took(total): 
/*
    Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15) time: 5 min to draw ship, testing took about 10 minutes: total 15 minutes 
    Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)                                                                : total 30 minutes
    Create a new scrolling tile sprite for the background (5)  : total 10 minutes
    Implement the 'FIRE' UI text from the original game (5): total 10 minutes 

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
    
*/

// citations:
/*
    **1 
    I used this for audio: https://www.fesliyanstudios.com/royalty-free-music/download/arcade-kid/618 Background music via https://www.FesliyanStudios.com
    I followed this guide for adding copyright free background music
    https://www.youtube.com/watch?v=COncYQLGJS8&ab_channel=LuisZuno 

    **2
    https://opengameart.org/content/vector-moon-0

    **3
    https://www.youtube.com/watch?v=7gGjBkKM_8M&ab_channel=MitchellHudson



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
