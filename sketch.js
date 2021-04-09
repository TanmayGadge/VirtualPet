var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood, feedTheDog;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  feedTheDog = createButton("Feed The Dog");
  feedTheDog.position(800, 115);
  feedTheDog.mousePressed(feedDog);

  if (feedTheDog.mousePressed(feedDog)) {
    lastFed = hour();
  }

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feed = database.ref('FeedTime');
  
  // feed.on("value", function (data){
  //   FeedTime = data.val();
  // });

  //write code to display text lastFed time here
  textSize(30);
  strokeWeight(3);
  fill("black");
  if (lastFed >= 12) {
    // show the time in PM format
    text("Last Fed: " + (lastFed - 12) + " PM", 350, 30);
  } else if (lastFed === 0) {
    text("Last Fed: 12 AM", 350, 30);
  } else {
    // show time in AM format
    text("Last Fed: " + lastFed + " AM", 350, 30);
  }


  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS -= 1;
  feed += 1;
  database.ref('/').update({
    Food: foodS,
    FeedTime: feed
  })

}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

