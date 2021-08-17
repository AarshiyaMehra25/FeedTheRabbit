var bgImg;
var r1,r2,r3,r4,rabbit;
var edges,points;
var p1,p2,p3,p4;
var pointsGroup;
var score=0;
var sound;
var obstacle,obstacle_img,obstacleGroup;
var lives=3;
var gamestate="play";

function preload(){
bgImg=loadImage("images/grass.jpg");
r1=loadImage("images/bunny1.png");
r2=loadImage("images/bunny2.png");
r3=loadImage("images/bunny3.png");
r4=loadImage("images/bunny4.png");
p1=loadImage("images/carrot.png");
p2=loadImage("images/GRAPES.png");
p3=loadImage("images/tomato.png");
p4=loadImage("images/cheese.png");
obstacle_img=loadImage("images/snake1.jpg");
sound=loadSound("images/rabbiteating.wav");
}

function setup() {
  createCanvas(800,400);
  rabbit=createSprite(150,365,10,10);
  rabbit.scale=2.5;
  rabbit.addImage("r2",r2);
  rabbit.addImage("r3",r3);
  rabbit.addImage("r1",r1);
  rabbit.addImage("r4",r4);
  edges=createEdgeSprites();
  pointsGroup=new Group();
  obstacleGroup=new Group();
  obstacle=createSprite(1000,600)
  points=createSprite(1100,600);
}

function draw() {
background(bgImg);
if(gamestate==="play"){
textSize(25);
fill("black")
text("Score:"+score,100,50);
fill("red")
text("Lives Left:"+lives,400,50);
if(lives>0){


if(keyDown("up_arrow")){
  rabbit.y=rabbit.y-5;
  rabbit.changeImage("r4",r4);
}
if(keyDown("down_arrow")){
  rabbit.y=rabbit.y+5;
  rabbit.changeImage("r3",r3);
}

if(keyDown("left_arrow")){
  rabbit.x=rabbit.x-5;
  rabbit.changeImage("r1",r1);
}

if(keyDown("right_arrow")){
  rabbit.x=rabbit.x+5;
  rabbit.changeImage("r2",r2);
}

rabbit.collide(edges[0]);
rabbit.collide(edges[1]);
rabbit.collide(edges[2]);
rabbit.collide(edges[3]);
Points();
if(points.isTouching(rabbit)){
  //pointsGroup.destroyEach();
  points.lifetime=0;
  score=score+1;
  sound.play();
}
if(obstacle.isTouching(rabbit)&&lives>0){
  lives=lives-1;
  obstacle.lifetime=0;
}
}
if(lives==0){
text("GAME OVER",300,200);
text("Press R to replay",270,250);
obstacleGroup.destroyEach();
pointsGroup.destroyEach();
rabbit.x=150;
rabbit.y=365;
rabbit.changeImage("r2",r2);
//gamestate="end";
}
Obstacles();
drawSprites();  
}
if(keyDown("r")||keyDown("R")){
  gamestate="play";
  lives=3;
  score=0;
}
}
function Points(){
  if(frameCount%100===0){
    points=createSprite(100,100,10,10);
    points.x=Math.round(random(50,750));
    points.y=Math.round(random(50,350));
    points.lifetime=150;
    var fr=Math.round(random(1,4))
    switch(fr){
      case 1:
        points.addImage(p1);
        break;
      case 2:
        points.addImage(p2);
        break;
      case 3:
        points.addImage(p3);
        break;  
      case 4:
        points.addImage(p4);
        break;    
    }
    points.scale=1.5;
    pointsGroup.add(points)
  }
}
function Obstacles(){
  if(frameCount%150===0){
    obstacle=createSprite(100,100,120,4);
    obstacle.shapeColor=rgb(Math.round(random(10,250)),0,Math.round(random(10,250)));
    obstacle.y=Math.round(random(10,390))
    //obstacle.addImage("obstacle_img",obstacle_img);
    ox=Math.round(random(1,2))
    if(ox==1){
      obstacle.x=0;
      obstacle.velocityX=6;
    }
    if(ox==2){
    obstacle.x=1000
    obstacle.velocityX=-6;
    }
    obstacleGroup.add(obstacle);
  }
}
