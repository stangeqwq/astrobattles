var space = new Audio("assets/space.mp3");
var gameOver = new Audio("assets/gameover.mp3")

function Settings() {
  document.getElementById("homemenu").remove();
  comingsoon = document.createElement("div");
  comingsoon.innerHTML = "Coming Soon!";
  comingsoon.setAttribute("id", "soon");
  body = document.getElementById("body");
  body.appendChild(comingsoon);
  /* 
  Difficulty (easy, medium, hard, insane) buttons
  Music (analog control)
  */
}
function Scoreboard() {
  document.getElementById("homemenu").remove();
  comingsoon = document.createElement("div");
  comingsoon.innerHTML = "Coming Soon!";
  comingsoon.setAttribute("id", "soon");
  body = document.getElementById("body");
  body.appendChild(comingsoon);
  /*
  interact with database => show top 10 highest scores by category
  */
}
function Play() {
  document.getElementById("homemenu").remove();
  document.getElementById("title").remove();
  document.getElementById("creator").remove();
  setUpGame();
  detectMovementCollision();
  shoot();
}
function setUpGame() {
  /* start creating the game container and character */
  player = document.createElement("img");
  gameContainer = document.createElement("div");
  gameContainer.setAttribute("id", "game-container");
  player.setAttribute("src", "assets/character.png");
  player.setAttribute("id", "player");
  body = document.getElementById("body");
  body.appendChild(gameContainer);
  gameContainer.appendChild(player);
  space.play();
}
function detectMovementCollision() {
  const player = document.getElementById("player");
  let rotationAngle = 0;
  let angularV = 0;
  let posX = 0;
  let posY = 0;
  let velX = 0;
  let velY = 0;
  let accR = 0;
  let accF = 0;
  let isGameOver = false;

  let prevPosX = 0;
  let prevPosY = 0;
  /* 
    This part required some thinking and knowledge of physics and math. Normal coordinate system does not apply here. We have positive x-axis towards the right with y-axis positive below.
    This is why there is that "-1" at the end of the Math.sin() argument. The additional "-1"s beside the rotationAngle is to account for CW is read as positive
    when rendering in the transform but Math.cos and Math.sin interprets it negatively. Finally, "Math.PI/2" accounts for the initial CCW angle position of the player.
    Math.cos((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2);
    Math.sin(-1 * ((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2));
  */
  function Movement(currentTime) {
    if(!isGameOver) {
      const deltaTime = (currentTime - prevTime) / 1000; // convert milliseconds to seconds
      prevTime = currentTime;
  
      const oldPos = { x: posX, y: posY };
      velX += accF * Math.cos((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2);
      velY += accF * Math.sin(-1 * ((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2));
      angularV += accR
      posX += velX * deltaTime;
      posY += velY * deltaTime;
      rotationAngle += angularV * deltaTime;
  
      if (rotationAngle > 360) {
        rotationAngle %= 360;
      } 
  
      player.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotationAngle}deg)`;
    }
    //simple collision detection
    const playerRect = player.getBoundingClientRect(); 
    const containerRect = gameContainer.getBoundingClientRect(); 
    //console.log(playerRect); 
    //console.log(containerRect);

    // check if the player element is outside the game container element
    if (playerRect.left < containerRect.left || playerRect.right > containerRect.right || playerRect.top < containerRect.top || playerRect.bottom > containerRect.bottom) {
      // trigger game over
      gameOverfunc();
    }
    window.requestAnimationFrame(Movement);
  }
  let prevTime = performance.now();
  window.requestAnimationFrame(Movement);


  /* The ship has some "acceleration cap" to avoid system overload */
  document.addEventListener("keydown", function(event) {
    if (event.key === "a") {
      accR = -5;
    }
    if (event.key === "d") {
      accR = 5;
    }
    if (event.key === "s") {
      accF = 5;
    }
  });
  /* 
    We need some type of deceleration while the ship is not made to accelerate, lest the ship spiral out of control. We can reason about that the ship
    has some "calibration" mechanism in-built. 
  */
  document.addEventListener("keyup", function(event) {
    if (event.key === "a" || event.key === "d") {
      accR = 0;
      angularV = 0;
    }
    if (event.key === "s") {
      accF = 0;
      velY = 0;
      velX = 0;
    } 
  });
}
function gameOverfunc() {
  isGameOver = true;
  gameoverScreen = document.createElement("img");
  gameoverScreen.setAttribute("id", "game-over");
  gameoverScreen.setAttribute("src", "assets/gameover.png");
  body.appendChild(gameoverScreen);
  space.pause();
  gameOver.play();
  document.removeEventListener("keydown", keydownHandler);
  document.removeEventListener("keyup", keyupHandler);
}
function shoot() {
  /* to create a shoot function, we need to a new css element to be generated with id "bullet" that 
  would have some movement speed going in the direction "forward" of the "player" id element
   */
  //the code below occurs whenever the player presses "w" keyup
  document.addEventListener("keyup", function(event) {
    if (event.key === "w") {
      bullet();
    }
  });
  function bullet(){
    const bullet = document.createElement("img");
    bullet.setAttribute("id", "bullet");
    bullet.setAttribute("src", "assets/bullet.png");
    bullet.setAttribute("width", "10");
    bullet.setAttribute("height", "10");
    bullet.setAttribute("x", player.getAttribute("x"));
    bullet.setAttribute("y", player.getAttribute("y"));
    body.appendChild(bullet);
  }
}

