class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    cricketer1 = createSprite(100,200);
    cricketer1.addImage(cricketer1Image);
    cricketer2 = createSprite(300,200);
    cricketer2.addImage(cricketer2Image);
    cricketer3 = createSprite(500,200);
    cricketer3.addImage(cricketer3Image);
    cricketer4 = createSprite(700,200);
    cricketer4.addImage(cricketer4Image);
    cricketers = [cricketer1, cricketer2, cricketer3, cricketer4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
    
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 240;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cricketers[index-1].x = x;
        cricketers[index-1].y = y;

        if (index === player.index){
          cricketers[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(PowersGroup.isTouching(cricketers)){
      PowersGroup.destroyEach();
    }
 
    if(obstaclesGroup.isTouching(cricketers)){
     gameState =2;
    }
    if(player.distance > 4000){
      gameState=2;
    }
    drawSprites();
  }
  end(){
    console.log("game ended");
  }
}
