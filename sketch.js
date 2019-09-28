var projectiles = [];

// Player object and sprite
var player =  {x: 0, y: 0, rotation: 0, dy: 0, dx: 0};
var playerSprite

// Player's real position in the world
var player_world = {x: 0, y: 0};
// Background scroll position
var scrollPos = {x: 0, y: 0};

function preload()
{
    // Load player sprite from file
    playerSprite = loadImage('assets/ship.png');
}

function setup()
{
    // Create canvas
    createCanvas(windowWidth - 50, windowHeight - 50);
    startGame();
}
 
function keyPressed()
{
    if(keyCode == 32)
    {
        projectiles.push(new Projectile(player.x + player.dx, player.y + player.dy, player.rotation));
    }
}

function draw()
{   
    clear();
    background(120,200,200);
    
    // Push scrolling background
    push();
    // Scroll background
    translate(scrollPos.x, scrollPos.y);
    
    for(var i = 0; i < projectiles.length; i++)
    {
        projectiles[i].drawProjectile();
        
        if(projectiles[i].shipX < 0 || projectiles[i].shipX > width || projectiles[i].shipY < 0 || projectiles[i].shipY > height)
        {
            projectiles.splice(i,1);
            i--;
        }
    }
    
    
    // Draw player
    push();
    translate(player.x, player.y)
    rotate(player.rotation);
    noSmooth();
    imageMode(CENTER);
    image(playerSprite, 0, 0, 17 * 2, 64 * 2)
    pop();
    
    // Player input
    shipSteerControls();

    // Update scrollPos
    scrollBackground();
    
    // Updates real position of gameChar for collision detection.
	player_world.x = player.x - scrollPos.x;
    player_world.y = player.y - scrollPos.y;
    
    ////////////////////////////
    // Dummy world props
    ellipse(150,280, 100, 100);
    ellipse(950,180, 100, 100);
    ellipse(750,480, 100, 100);
    ellipse(1250,580, 100, 100);
    ////////////////////////////

    // Pop background scrolling
    pop();
}

function Projectile(shipX, shipY, shipAng)
{
    this.shipX = shipX;
    this.shipY = shipY;
    this.projAng = shipAng + PI;
    this.drawProjectile = function()
    {
        fill(255);
        rect(this.shipX, this.shipY, 10, 10);
        this.shipX +=  cos(this.projAng);
        this.shipY += sin(this.projAng);
    }
}

// Player input
// Left and Right rotate ship
// Up moves player forward
// TODO: Change forward to increment acceleration rather than move forward at constant velocity
function shipSteerControls()
{
    
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
        player.x += sin(player.rotation);
        player.y -= cos(player.rotation);
    }
}

// Set up everything at the beginning of the game
function startGame()
{
    player.x = width/2;
    player.y = height/2;
    
    player_world.x = player_world.x - scrollPos.x;
    player_world.y = player_world.y - scrollPos.y;
}

// Update scrollPos position
function scrollBackground()
{
    if (keyIsDown(UP_ARROW))
    {
        scrollPos.x -= sin(player.rotation) * 1;
        scrollPos.y += cos(player.rotation) * 1;
    }
}

// TODO: Create function to smoothly follow player
function cameraSmooth()
{
    pass;
}
