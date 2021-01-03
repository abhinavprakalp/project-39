var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cricketers, cricketer1, cricketer2, cricketer3, cricketer4;
var cricketer1Image,cricketer2Image,cricketer3Image,cricketer4Image;
var trackImage,groundImage;

function preload (){
  cricketer1Image=loadImage("images/1.png");
  cricketer2Image=loadImage("images/2.png");
  cricketer3Image=loadImage("images/3.png");
  cricketer4Image=loadImage("images/4.png");
  trackImage=loadImage("images/track.jpg");
  groundImage=loadImage("images/ground.png");

  obstacle1Image = loadImage("images/obstacle.png");
  obstacle2Image = loadImage("images/spines.png");
  obstacle3Image = loadImage("images/enemy.jpg");

  power1= loadImage("images/power up 1.jpg");
  power2= loadImage("images/power up 2.png");
  power3= loadImage("images/power up 3.jpg");
}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  obstaclesGroup = createGroup();
  PowersGroup = createGroup();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState===2){
    game.end();
  }
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1Image);
               obstacle.scale = 0.1;
               break;
       case 2: obstacle.addImage(obstacle2Image);
               obstacle.scale = 0.2;
               break;
       case 3: obstacle.addImage(obstacle3Image);
                obstacle.scale = 0.3;
               break;
       default: break;
     }
    
     
     obstacle.lifetime = 300;
    
     obstaclesGroup.add(obstacle);
  }
 }
 
 function spawnPowers(){
  if (frameCount % 60 === 0){
    var Powers = createSprite(600,100,10,40);
    Powers.velocityX = -(6 + score/100);
   
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: Powers.addImage(power1);
               Powers.scale = 0.2;
               break;
       case 2: Powers.addImage(power2);
               Powers.scale = 0.4;
               break;
       case 3: Powers.addImage(power3);
               Powers.scale = 0.3;
               break;
       default: break;
     }
    
     
     Powers.lifetime = 300;
    
     PowersGroup.add(Powers);
  }
 }
