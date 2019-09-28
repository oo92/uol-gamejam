var cor={
    x:50,
    y:50
    
  };
  
  var speed=3;


function setup()
{
	createCanvas(windowWidth, windowHeight);
}

function draw()
{
    background(0);
    ellipse(width/2, height/2, 50)
}


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
