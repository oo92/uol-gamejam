var projectiles = [];

// Player object and sprite
var player =  {x: 0, y: 0, rotation: 0, dy: 0, dx: 0};
var playerSprite

// Player's real position in the world
var player_world = {x: 0, y: 0};
// Background scroll position
var scrollPos = {x: 0, y: 0};

//Powerups
var moveSpeed=1;
var rotationSpeed=0.02;
var projectileSpeed=1;
var powerBool=true;
var speedUpSprite;
var shotUpSprite;

function preload()
{
    // Load player sprite from file
    playerSprite = loadImage('assets/ship.png');
    shotUpSprite = loadImage('assets/shotsup.png');
    speedUpSprite = loadImage('assets/speedup.png');
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
    image(playerSprite, 0, 0, 17 * 2, 64 * 2);
    pop();

    //powerups it provides two options and you can choose one and the other disappears
    powerup=new powerUps(500,600,600,500);
    if(powerBool)
    {
        powerup.moveUp();
        powerup.projectileUp();
        
    }
    if(dist(powerup.moveX,powerup.moveY,player.x + player.dx,player.y + player.dy)<40)
    {
        moveSpeed=4;
        powerBool=false;
    }
    if(dist(powerup.projX,powerup.projY,player.x + player.dx,player.y + player.dy)<40)
    {
        projectileSpeed=3;
        powerBool=false;
    }
    
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
        this.shipX +=  cos(this.projAng)*projectileSpeed;
        this.shipY += sin(this.projAng)*projectileSpeed;
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
        player.rotation -= 0.02*moveSpeed;
    }
    if (keyIsDown(RIGHT_ARROW))
    {
        player.rotation += 0.02*moveSpeed;
    }
    if (keyIsDown(UP_ARROW))
    {
        player.x += sin(player.rotation)*moveSpeed;
        player.y -= cos(player.rotation)*moveSpeed;
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
        scrollPos.x -= sin(player.rotation) * moveSpeed;
        scrollPos.y += cos(player.rotation) * moveSpeed;
    }
}

// TODO: Create function to smoothly follow player
function cameraSmooth()
{
    pass;
}

function powerUps(moveX,moveY,projX,projY)
{
    this.moveX=moveX;
    this.moveY=moveY;
    this.projX=projX;
    this.projY=projY;

    this.moveUp =function()
    {
        push();
        noSmooth();
        imageMode(CENTER);
        image(speedUpSprite, this.moveX, this.moveY, 13 * 2, 16 * 2)
        pop();
    }

    this.projectileUp=function()
    {
        push();
        noSmooth();
        imageMode(CENTER);
        image(shotUpSprite, this.projX, this.projY, 13 * 2, 13 * 2)
        pop();
    }
}
