var projectiles = [];

var player =  {x: 500, y: 500, rotation: 0, dy: 0, dx: 0};
var playerSprite

function preload()
{
    playerSprite = loadImage('assets/ship.png');
}

function setup()
{
    createCanvas(windowWidth - 50, windowHeight - 50);
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
    
    for(var i = 0; i < projectiles.length; i++)
    {
        projectiles[i].drawProjectile();
        
        if(projectiles[i].shipX < 0 || projectiles[i].shipX > width || projectiles[i].shipY < 0 || projectiles[i].shipY > height)
        {
            projectiles.splice(i,1);
            i--;
        }
    }
    
    push();
    translate(player.x + player.dx, player.y + player.dy)
    rotate(player.rotation);
    noSmooth();
    imageMode(CENTER);
    image(playerSprite, 0, 0, 17 * 2, 64 * 2)
    //ellipse(0, 0, 50, 180);
    shipSteerControls();
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
