/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var projectiles = [];

var jumpSound;

//x and y for the player
var cor={
    x:50,
    y:50
    
  };

  var speed=3;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);

}

 
function keyPressed()
{
    jumpSound.play();
    
    
    if(keyCode == 32)
    {
        projectiles.push(new Projectile(width/2, height/2, random(0,PI/2)));
    }

}

function draw()
{
    background(255);
    
    for(var i = 0; i < projectiles.length; i++)
    {
        projectiles[i].drawProjectile();
        
        if(projectiles[i].shipX < 0 || projectiles[i].shipX > width || projectiles[i].shipY < 0 || projectiles[i].shipY > height)
        {
            projectiles.splice(i,1);
            i--;
        }
    }
}

//the move function it uses the arrows
function move(){
    if(keyIsDown(LEFT_ARROW))
    {
      cor.x=cor.x-speed;
    }
    
    if(keyIsDown(RIGHT_ARROW))
    {
      cor.x=cor.x+speed;
    }
    
    if(keyIsDown(UP_ARROW))
    {
      cor.y=cor.y-speed;
    }
    
    if(keyIsDown(DOWN_ARROW))
    {
      cor.y=cor.y+speed; 
    }
    
  }

function Projectile(shipX, shipY, shipAng)
{
    this.shipX = shipX;
    this.shipY = shipY;
    this.projAng = shipAng + PI/2;
    this.drawProjectile = function()
    {
        rect(this.shipX, this.shipY, 10, 10);
        this.shipX +=  cos(this.projAng);
        this.shipY += sin(this.projAng);
    }
}


