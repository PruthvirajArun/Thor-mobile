var PLAY = 1;
var END = 0;
var gameState = PLAY;

var thor, thorImg;
var hela, helaImg;
var bifrost, bifrostImg;
var knife, knifeImg, knivesGroup;
var score;
var lightning, lightningImg, lightningGroup;
var gameover, gameoverImg;
var restart, restartImg;


function preload(){
thorImg = loadImage("thor.png");
helaImg = loadImage("hela.png");
bifrostImg = loadImage("bifrost.png");
knifeImg = loadImage("knife.png");
lightningImg = loadImage("lightning.png");
gameoverImg = loadImage("gameover.png");
restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    bifrost = createSprite(300,300);
    bifrost.addImage("bifrost",bifrostImg);
    bifrost.velocityY = 1;

    knivesGroup = new Group();
    lightningGroup = new Group();
    
    thor = createSprite(200, height - 100, 50, 50);
    thor.scale = 0.3;
    thor.addImage("thor", thorImg);

    hela = createSprite(200, height - 570, 50, 50);
    hela.scale = 0.17;
    hela.addImage("hela", helaImg);

gameover = createSprite(width/2 - 50, height/2 - 60);
gameover.addImage("gameover", gameoverImg);
gameover.visible = false;

restart = createSprite(width/2 - 50, height/2 + 20);
restart.addImage("restart", restartImg);
restart.visible = false;
restart.scale = 0.3;

    score  = 0;

    thor.setCollider("rectangle",0,0,100,350);
}

function draw() {
    background(200);

    drawSprites();  
    textSize(20);
    fill(255);
    text("Score: "+ score, width - 220,30);

    if (gameState===PLAY){
     
      score = score + Math.round(getFrameRate()/60);

      if((touches.width > width/2 || keyDown("right_arrow"))) {
        thor.x = thor.x + 10;
        touches = [];
      }

      if((touches.width < width/2 || keyDown("left_arrow"))) {
        thor.x = thor.x - 10;
        touches = [];
      }

      if(bifrost.y > 400){
          bifrost.y = 300
        }
  
  
            if(knivesGroup.isTouching(thor)){
             gameState = END;

            }    
              
            if(lightningGroup.isTouching(thor)){
              score = score + 250;
              lightningGroup.destroyEach();
            }
          
            hela.x = thor.x;
  
      
      
      
      spawnKnives();
      spawnLightning();
  
    }

    else if (gameState === END){
      knife.velocityY = 0;
      lightning.velocityY = 0;
      bifrost.velocityY  = 0;
      gameover.visible = true;
      restart.visible = true;

 if(mousePressedOver(restart)) {
      reset();
    }

    }


             
    
}

function spawnKnives() {
if(frameCount % 200 == 0){
    knife = createSprite(240, 110);
    knife.addImage("knife", knifeImg);
    knife.scale = 0.55;
    knife.x = Math.round(random(width + 100, width - 250));
    knife.velocityY = 4;
    knife.lifetime = 800;
    knivesGroup.add(knife);
    

}

}

function spawnLightning() {
  if(frameCount % 250 == 0){
      lightning = createSprite(200, -55);
      lightning.addImage("lightning", lightningImg);
      lightning.scale = 0.35;
      lightning.x = Math.round(random(width -500, width - 200));
      lightning.velocityY = 4;
      lightning.lifetime = 800;
      lightningGroup.add(lightning);
  }
  
  }

  function reset(){
    gameState = PLAY;
    gameover.visible = false;
    restart.visible = false;
    
    knivesGroup.destroyEach();
    lightningGroup.destroyEach();
        
    score = 0;
    
  }