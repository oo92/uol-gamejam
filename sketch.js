var player =  {x: 500, y: 500, rotation: 0};

function setup()
{
	createCanvas(windowWidth - 50, windowHeight - 50);
}

function draw()
{
    clear();
    background(0);
    
    
    // Draw player ship
    translate(player.x, player.y)
    rotate(player.rotation);
    ellipse(0, 0, 50, 180);
    shipSteerControls();
}

function shipSteerControls()
{
    // TODO: Forward movement
    if (keyIsDown(LEFT_ARROW))
    {
        player.rotation -= 0.02;
    }
    if (keyIsDown(RIGHT_ARROW))
    {
        player.rotation += 0.02;
    }
}