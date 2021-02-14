//creating global variables
var bullet,bulletCenter,bulletTrunk;
var speed,weight;
var wall,deformation;

function setup() {
  //creating canvas
  createCanvas(1600,400);

  //creating carCenter sprite
  bulletCenter = createSprite(100,200,50,50);
  bulletCenter.shapeColor = "white";

  //creating carBonnet sprite
  bullet = createSprite(100,210,30,30);
  bullet.x = bulletCenter.x + 40;
  bullet.shapeColor = "white";

  //creating carTrunk sprite
  bulletTrunk = createSprite(100,210,30,30);
  bulletTrunk.x = bulletCenter.x - 40;
  bulletTrunk.shapeColor = "white";

  //creating wall sprite
  wall = createSprite(1500,200,60,400);
  wall.shapeColor = color (21, 96, 189);

  //giving weight to the car
  weight = random(400,1500);

  //giving speed to the car
  speed = random(30,95);
  bullet.velocityX = speed;
  bulletCenter.velocityX = speed;
  bulletTrunk.velocityX = speed;
}

function draw() {
  //giving background color
  background(0,0,0);

  //giving text
  fill(255,0,255); 
  textSize(20);
  text("This is a simulator that can test car reliability.",720,100);

  fill(64,224,208);
  textSize(22);
  text("GLOBAL CAR SAFETY ORGANISATION(GCSO)",680,50);

  fill(255,69,0);
  textSize(20);
  text("bulb",1415,170);

  fill("orange");
  textSize(20);
  text("Here's the calculated deformation :",980,380);

  fill("green");
  textSize(18);
  text("If green light is blinking,it is SAFE for passengers",380,300);

  fill("yellow");
  textSize(17);
  text("If yellow light is blinking,it is AVERAGE for passengers",380,330);

  fill("red");
  textSize(18);
  text("If red light is blinking,it is DANGEROUS for passengers",380,360);
  
  //calculating the deformation when the car collides with the wall
  if(wall.x - bullet.x < (bullet.width/2 + wall.width/2)){
    //giving 0 velocity to the car
    bullet.velocityX = 0;
    bulletCenter.velocityX = 0;
    bulletTrunk.velocityX = 0;
    //calling function deform
    deform();
  }
 
  //drawing the sprites
  drawSprites();
}

function deform(){
  //calculation of the deformation
  deformation = (0.5 * weight * speed * speed) / 22500;

  //creating a bulb like object
  bulletCenter.x = 1435;
  bullet.visible = false;
  bulletTrunk.visible = false;
  
  //things to happen when deformation is less than 100
  if(deformation<100){
    //giving green light to the bulb
    bulletCenter.shapeColor = color (0, 255, 0);

    //making the bulb blink
    if(frameCount%22 === 0){
      bulletCenter.visible = true;
    } 
    if(frameCount%44 === 0){
      bulletCenter.visible = false;
    }

    //giving the count of deformation
    fill("green");
    textSize(20);
    text(Math.round(deformation),1300,380);
    text("{Safe}",1340,380);
  }

  //things to happen when deformation is between 100 and 180
  if(deformation > 100 && deformation < 180){
    //giving yellow light to the bulb
    bulletCenter.shapeColor = color (230, 230, 0);
    
    //making the bulb blink
    if(frameCount%15=== 0){
      bulletCenter.visible = true;
    }
    if(frameCount%30 === 0){
      bulletCenter.visible = false;
    }

    //giving the count of deformation
    fill("yellow");
    textSize(20);
    text(Math.round(deformation),1300,380);
    text("{Average}",1340,380);
  }

  //things to happen when deformation is greater than 180
  if(deformation > 180){
    //giving red light to the bulb
    bulletCenter.shapeColor = color (255, 0, 0);
    
    //making the bulb blink
    if(frameCount%7 === 0){
      bulletCenter.visible = true;
    }
    if(frameCount%14 === 0){
      bulletCenter.visible = false;
    }

    //giving the count of deformation
    fill("red");
    textSize(20);
    text(Math.round(deformation),1300,380);
    text("{Dangerous}",1340,380);
  }
}