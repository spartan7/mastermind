var canvas = document.getElementById('myCanvas');
var canvasContext = canvas.getContext('2d');

var background = new Image(1200, 800);
background.src = 'assets/background.png';

var alien =  new Image(50, 50);
alien.src = 'assets/aliens.png';
var alienYPosition = 100;
aliens = [];

var fighterX = 550;
var fighterY = 700;
var fighter = new Image(50, 50);
fighter.src = 'assets/fighter.png';

var missile = new Image(10,28);
missile.src = 'assets/missile1.png';
missiles = [];

var score = 0;

// Movement of the fighter left and right with keypress
document.onkeydown = function(e){
	if (e.keyCode == 37) {
	    fighterX = fighterX - 5;
	}
	else if (e.keyCode == 39) {
		fighterX = fighterX + 5;
	}
	else if (e.keyCode == 32) {
		createMissile(fighterX,fighterY);
		createMissile(fighterX + 45,fighterY);
	}
}

//Alien Creation and Rendering
function createAlien(x,y){
  	aliens.push({
    	x: x,
    	y: y
  	});
}

function createAliensInRow(){
  	var x, y;
  	for (var i = 0; i < 42; i++){
    	x = 70 + (i % 14) * 78;
    	y = 43 + (i % 3) * 50;
    	createAlien(x,y);    
  	}
}

function renderAlien(x,y){
	canvasContext.drawImage(alien, x, y);
}

function renderAliens(){
  	for (var i = 0; i < aliens.length; i++){
    	renderAlien(aliens[i].x, aliens[i].y);
  	}    
}

function moveAliens(){
  	for( var i = 0; i < aliens.length; i++ ){
    	if(aliens[i].y < 630){
      	aliens[i].y +=  2;
   		}
   	}
}

//Bullet Creation and Rendering 
function createMissile(x,y){
  	missiles.push({
    	x: x,
    	y: y
  	});
}

function fireMissile(){
	if(e.keyCode == 32){
		createMissile(fighterX,fighterY);
	}
}

function renderMissile(x,y){
	canvasContext.drawImage(missile, x, y);
}

function renderMissiles(){
	for( var i = 0; i < missiles.length; i++){
		renderMissile(missiles[i].x, missiles[i].y);
	}
}

function moveMissiles() {
	for (var i = 0;i < missiles.length; i++) {
		missiles[i].y -= 10;
  	}
}

function destroyAlien(){
	for (var i = 0; i < missiles.length; i++){
		for(var j = 0; j < aliens.length; j++){
			if (Math.abs(missiles[i].x - aliens[j].x) < 26 && Math.abs(missiles[i].y - aliens[j].y) < 26){
				console.warn('explosion');
				aliens.splice(j, 1);
        		missiles.splice(i, 1);
				score = score + 5;
        		console.log(score);
			}
		} 
	}
}

//Fighter Creation and Rendering       
function drawFighter (){
	canvasContext.drawImage(fighter, fighterX, fighterY);
}

//Game Over creation and rendering
function gameOver(){
	for( var i = 0; i < aliens.length; i++ ){
	    if(aliens[i].y > 620){
			canvasContext.fillStyle = "red";
		    canvasContext.fillRect(0,0,1200,800);
		    canvasContext.font="italic 76px Arial";
		    canvasContext.fillStyle="white";
		    canvasContext.fillText("Game Over", 370 , 420);
		    canvasContext.font="italic 56px Arial";
		    canvasContext.fillStyle="white";  
		    canvasContext.fillText("Score: " + score, 10 , 50);
        }
   	}
}

function drawCanvas() {
 	canvasContext.clearRect(0, 0, 1200, 800);
 	canvasContext.drawImage(background, 0, 0);
 	canvasContext.font="italic 56px Arial";
  	canvasContext.fillStyle="white";
  	canvasContext.fillText("Score: " + score, 10 , 50);
}

createAliensInRow();

function gameLoop(){
  	setTimeout(gameLoop , 100);
  	drawCanvas();
 	drawFighter();
  	moveAliens();
  	renderAliens();
  	moveMissiles();
  	renderMissiles();
  	destroyAlien();
  	gameOver();
}

gameLoop();




