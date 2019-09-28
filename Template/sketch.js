/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/



var jumpSound;

//x and y for the player
var cor={
  x:50,
  y:50,
  z:0
  
};


var speed=0.2;

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
    //jumpSound.play();
}

function draw() {
  background(220);
  rectMode(CENTER);
  cor.x=map(cor.x,0,width,0,width,true);
  cor.y=map(cor.y,0,height,0,height,true);
  
  
  push()
  translate(cor.x,cor.y);
  rotate(cor.z);
  rect(0,0,50,50);
  pop();  
  
  rect(300,300,50,50);
  move(cor);
}

//the move function it uses the arrows
function move(){
  if(keyIsDown(LEFT_ARROW))
  {
    cor.x=cor.x-speed*deltaTime;
  }
  
  if(keyIsDown(RIGHT_ARROW))
  {
    cor.x=cor.x+speed*deltaTime;
  }
  
  if(keyIsDown(UP_ARROW))
  {
    cor.y=cor.y-speed*deltaTime;
  }
  
  if(keyIsDown(DOWN_ARROW))
  {
    cor.y=cor.y+speed*deltaTime;
  }
  
  if(keyIsDown(82))
     {
      cor.z=cor.z+1;
     }
  
  if(keyIsDown(81))
  {
    cor.z=cor.z-1;
  }
    
  }
