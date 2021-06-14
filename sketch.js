//Create variables here
var dog;
var happydog;
var dog2;
var database;
var foodS;
var foodStock;
var lastFed;

function preload()
{
	dog2=loadImage("sprites/Dog.png");
  happydog=loadImage("sprites/happydog.png");
  milkImage=loadImage("sprites/Milk.png")
}

function setup() {

  database=firebase.database();

	createCanvas(1000,400);

  dog = createSprite(800,200,10,10);
  dog.addImage(dog2);
  dog.scale=0.15;
  
    var getFoodStockRef = database.ref("Food")
    getFoodStockRef.on('value' , function(data){
        foodStock = data.val();
    })

  feed = createButton('Feed the Dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  

  background(46,139,87)
  var x=80,y=100;
            
  imageMode(CENTER);
  image(milkImage,720,220,70,70);
            
  if(foodStock!=0){
    for(var i=0;i<foodStock;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(milkImage,x,y,50,50);
      x=x+30;
    }
  }
          
  drawSprites();
  //add styles here
  
  var fedTime = database.ref("feedTime")
  fedTime.on('value' , function(data){
        lastFed = data.val();
  })

  textSize(20);
  fill("black")
  text("food remaining "+foodStock,150,100)

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  
}

function feedDog(){
  dog.addImage(happydog)
  if(foodStock<=0){
    foodStock=0
  }
  else{
    foodStock=foodStock-1;
  }
  database.ref("/").update({
    Food:foodStock,
    feedTime:hour()
  })
}

function addFoods(){
  foodStock=foodStock+1;
  database.ref("/").update({
    Food:foodStock
  })
}



