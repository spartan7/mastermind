var canvas = document.getElementById('myCanvas');
var canvasContext = canvas.getContext('2d');

var background = new Image(1200, 800);
background.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2247986/background.png';

var alienYPosition = 100
var aliens = new Image(50, 50);
aliens.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2247986/aliens.png';

var fighterX = 550;
var fighter = new Image(50, 50);
fighter.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2247986/fighter.png';

function draw() {
  if (alienYPosition >= 650) alienYPosition = +100;
  canvasContext.clearRect(0, 0, 500, 500);
  canvasContext.drawImage(background, 0, 0);
  canvasContext.drawImage(fighter, fighterX, 700);
  canvasContext.drawImage(aliens, 550, alienYPosition);
  requestAnimationFrame(draw);
  alienYPosition++;
  
}

draw();

// Movement of the fighter left and right with keypress
document.onkeydown = function(e){
		console.log(e.keyCode);

		if (e.keyCode == 37) {
			console.log("LEFT");
      fighterX = fighterX - 5;
		}
		
		else if (e.keyCode == 39) {
			console.log ("RIGHT");
      fighterX = fighterX + 5;
		}
		else if (e.keyCode == 32) {
			console.log("FIRE");
		}
	}