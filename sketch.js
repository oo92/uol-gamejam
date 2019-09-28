var player =  {x: 500, y: 500, rotation: 0, dy: 0, dx: 0};

function setup()
{
	createCanvas(windowWidth - 50, windowHeight - 50);
}

function draw()
{
    clear();
    background(0);
    
    
    // Draw player ship
    translate(player.x + player.dx, player.y + player.dy)
    rotate(player.rotation);
    ellipse(0, 0, 50, 180);
    shipSteerControls();
}

function shipSteerControls()
{
    // TODO: Change forward to increment acceleration rather than move forward at constant velocity
    if (keyIsDown(LEFT_ARROW))
    {
        player.rotation -= 0.02;
    }
    if (keyIsDown(RIGHT_ARROW))
    {
        player.rotation += 0.02;
    }
    if (keyIsDown(UP_ARROW))
    {
        player.dx += sin(player.rotation);
        player.dy -= cos(player.rotation);
    }
}