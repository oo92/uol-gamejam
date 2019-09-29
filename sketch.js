var projectiles = [];
var enemyProjectiles = [];

var enemies = [];


// Player object and sprite
var player =  {x: 500, y: 500, rotation: 0, dy: 0, dx: 0, projRange: 200, maxRange: 400, minRange: 30, hitBoxRadius: 50, lives: 3, ammo: 5};
var playerSprite;

var reloadTime = 0;
var reloading = false;
var projTimeCounter = 0;
var enemySpawnTimer = 0;
var numOfEnemy = 0;
var jumpSound;

// Player's real position in the world
var player_world = {x: 0, y: 0};
// Background scroll position
var scrollPos = {x: 0, y: 0};

//Powerups
var moveSpeed = 1;
var rotationSpeed = 0.02;
var projectileSpeed = 1;
var powerBool = true;
var speedUpSprite;
var shotUpSprite;

function preload() 
{
    //soundFormats('mp3', 'wav');
    
    //load your sounds here
    //jumpSound = loadSound('assets/jump.wav');
    //jumpSound.setVolume(0.1);

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
    //If space is pressed instatiate a new projectile
    if(keyCode == 32)
    {
        if(player.ammo > 0 && projTimeCounter > 50 && !reloading)
        {
            projectiles.push(new Projectile(player.x + player.dx, player.y + player.dy, player.rotation));  
            player.ammo--;
            projTimeCounter = 0;
        }
    }
    
    if(keyCode == 71)
    {
        enemyProjectiles.push(new Projectile(100, 400, PI));
    }
    
    if(keyCode == 82 && reloading == false)
    {
        reloading = true;
        reloadTime = 0;
    }
}

function draw()
{   
    clear();
    background(120,200,200);

    reloadTime++;
    projTimeCounter++;
    enemySpawnTimer++;
    
    
    // Push scrolling background
    push();
    // Scroll background
    translate(scrollPos.x, scrollPos.y);
    
    if(reloading == true)
    {
        push();
        fill(255,100,100);
        text("Reloading!", 300, 50);
        if(reloadTime > 300)
        {
            player.ammo = 5;
            reloading = false;
        }
        pop();
    }
    
    if(enemySpawnTimer > 100 && numOfEnemy < 3)
    {
        enemies.push(new Enemy(random(0, width), random(0, height)));
        enemySpawnTimer = 0;
        numOfEnemy++;
    }
    
    for(var i = 0; i < projectiles.length; i++)
    {
        projectiles[i].drawProjectile();
        //Increments the projectiles time in flight
        projectiles[i].projTime += 1;    
        
        //If the projectiles time of flight is > than its lifetime or, the projectile has lef the bounds of the screen, remove the projectile from the array
        if(projectiles[i].projTime > projectiles[i].lifetime || projectiles[i].shipX < 0 || projectiles[i].shipX > width || projectiles[i].shipY < 0 || projectiles[i].shipY > height)
        {
            projectiles.splice(i,1);
            i--;
        }else{
            for(var j = 0; j < enemies.length; j++)
            {
                if(dist(enemies[j].x, enemies[j].y, projectiles[i].shipX, projectiles[i].shipY) < enemies[j].radius/2 && dist(enemies[j].x, enemies[j].y, projectiles[i].projEndPointX, projectiles[i].projEndPointY) < enemies[j].radius/2)
                {
                    projectiles.splice(i,1);
                    i--;  
                    enemies.splice(j,1);
                    j--;
                    break;
                }
            }
        }
        //If the projectile is within the distance threshold of the enemy and the endpoint of the projectile is within the threshold distance of the enemy remove the projectile
    }
    
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].drawEnemy();
        enemies[i].drawRadius();
    }

    for(var i = 0; i < enemyProjectiles.length; i++)
    {
        enemyProjectiles[i].drawProjectile();
        push();
        rotate(player.rotation);
        
        if(enemyProjectiles[i].shipX < 0 || enemyProjectiles[i].shipX > width || enemyProjectiles[i].shipY < 0 || enemyProjectiles[i].shipY > height)
        {
            enemyProjectiles.splice(i,1);
            i--;
        }
        else if(dist(player.x + player.dx, player.y + player.dy, enemyProjectiles[i].shipX, enemyProjectiles[i].shipY) < player.hitBoxRadius/2)
        {
            enemyProjectiles.splice(i,1);
            i--; 
            if(player.lives > 0)
            {
                player.lives--;
            }
        }
        
        pop();
    }

    
    // Draw player
    push();
    translate(player.x, player.y)
    rotate(player.rotation);
    noSmooth();
    imageMode(CENTER);
    image(playerSprite, 0, 0, 17 * 2, 64 * 2);
    //Draw player hitbox - delete later
    noFill();
    stroke(255,0,0);
    ellipse(0,0, player.hitBoxRadius);
    //
    pop();
    
    //Draws the line representing the path of the projectile
    drawProjectilePath();
    
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
    
    textSize(30);
    fill(255);
    text("Lives: " + player.lives, 50, 50);
    text("Ammo: " + player.ammo, 50, 90);
}

//Constructor function for creating new projectiles
function Projectile(shipX, shipY, shipAng)
{
    //the x and y spawning point of the projectile
    this.shipX = shipX;
    this.shipY = shipY;
    //speed of projectile
    this.projSpeed = 5;
    //angle of projectile (90 degrees) to the ship
    this.projAng = shipAng + PI;
    //The X and Y positions of where the projectile lands
    this.projEndPointX = (player.x + player.dx) + player.projRange * cos(player.rotation + PI);
    this.projEndPointY = (player.y + player.dy) + player.projRange * sin(player.rotation + PI);
    //Distance the projectile travels (distance between ship and endpoint)
    this.projDist = dist(player.x + player.dx,
                         player.y + player.dy,
                         this.projEndPointX,
                         this.projEndPointY
                        );
    //Initial time projectile has been in flight
    this.projTime = 0;
    //The max time the projectile will fly before being removed
    this.lifetime = this.projDist / this.projSpeed;
    //Draws and updates the position of the projectile
    this.drawProjectile = function()
    {
        fill(255);
        ellipse(this.shipX, this.shipY,10);
        //increments x and y by the angle of the projectile so it continues on correct path
        this.shipX +=  cos(this.projAng) * this.projSpeed;
        this.shipY += sin(this.projAng) * this.projSpeed;
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

function Enemy(x,y)
{
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.drawEnemy = function()
    {
        push();
        fill(255,0,0);
        ellipse(this.x, this.y, this.radius, 180);
        pop();
    },
    this.drawRadius = function()
    {
        push();
        fill(0,255,0);
        noFill();
        ellipse(this.x, this.y, this.radius );
        pop();
    }
}

//Draws a line represtning the projectiles path
function drawProjectilePath()
{
    push();
    stroke(255,0,0);
    strokeWeight(3);
    //The endpoint of the range for x and y
    var endRangeX = (player.x + player.dx) + player.projRange * cos(player.rotation + PI);
    var endRangeY = (player.y + player.dy) + player.projRange * sin(player.rotation + PI);
    
    line(player.x + player.dx,
         player.y + player.dy,
         endRangeX,
         endRangeY);
    pop();
    
    //If Q or E is pressed and the distance between ship and endpoint is less/greater than the maxRange/minRange then increment/decrement range
    if(keyIsDown(81) && dist(player.x + player.dx, player.y + player.dy, endRangeX, endRangeY) < player.maxRange)
    {
    
        player.projRange += 1;
        
    }
    
    if(keyIsDown(69) && dist(player.x + player.dx, player.y + player.dy, endRangeX, endRangeY) > player.minRange)
    {
        player.projRange -= 1;
    }
}