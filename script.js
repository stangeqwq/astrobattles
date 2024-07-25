var space = new Audio("assets/space.mp3");
var gameOver = new Audio("assets/gameover.mp3")

let numBullets = 1;

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
  let isPressed = false;

  /* 
    This part required some thinking and knowledge of physics and math. Normal coordinate system does not apply here. We have positive x-axis towards the right with y-axis positive below.
    This is why there is that "-1" at the end of the Math.sin() argument. The additional "-1"s beside the rotationAngle is to account for CW is read as positive
    when rendering in the transform but Math.cos and Math.sin interprets it negatively. Finally, "Math.PI/2" accounts for the initial CCW angle position of the player.
    Math.cos((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2);
    Math.sin(-1 * ((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2));
  */
  function Movement(currentTime) {
    const deltaTime = (currentTime - prevTime) / 1000; // convert milliseconds to seconds
    if(!isGameOver) {
      prevTime = currentTime;

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
    moveBullets(deltaTime);

    window.requestAnimationFrame(Movement);
  }

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
  console.log(posX);
  console.log(posY);
  console.log(rotationAngle);
  isPressed = shoot(posX, posY, rotationAngle, isPressed);

  let prevTime = performance.now();
  window.requestAnimationFrame(Movement);

  return posX, posY, rotationAngle;
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
function bullet(){
  const bullet = document.createElement("img");
  bullet.setAttribute("id", `bullet${numBullets}`);
  numBullets += 1;
  bullet.setAttribute("src", "assets/bullet.jpeg");
  bullet.setAttribute("width", "10");
  bullet.setAttribute("height", "10");

  // Get the 'player' element
  const playerElement = document.getElementById('player');
  // Extract transform values
  const { posX, posY, rotationAngle } = getTransformValuesFromElement(playerElement);

  console.log(`posX: ${posX}px, posY: ${posY}px, rotationAngle: ${rotationAngle}deg`);

  bullet.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotationAngle}deg)`
  gameContainer.appendChild(bullet);
}

function shoot(isPressed) {
  /* to create a shoot function, we need to a new css element to be generated with id "bullet" that 
  would have some movement speed going in the direction "forward" of the "player" id element
   */
  //the code below occurs whenever the player presses "w" keyup
  document.addEventListener('keydown', function(event) {
    if ((event.key === 'w' || event.key === 'W') && isPressed == false) {
        bullet();
        isPressed = true;
    }
  });
  document.addEventListener('keyup', function(event) {
    if ((event.key === 'w' || event.key === 'W')) {
        isPressed = false;
    }
  });
  return isPressed;
}

function getTransformValuesFromElement(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform;

  if (!transform || transform === 'none') {
      return { posX: 0, posY: 0, rotationAngle: 0 };
  }

  const values = transform.match(/matrix\(([^)]+)\)/)[1].split(',').map(parseFloat);
  const [a, b, c, d, e, f] = values;
  
  // posX and posY are e and f respectively
  const posX = e;
  const posY = f;
  
  // Calculate the rotation angle in degrees
  const rotationAngle = Math.atan2(b, a) * (180 / Math.PI);

  return { posX, posY, rotationAngle };
}

function moveBullets(deltaTime) {
  for (let currentNum = 1; currentNum < numBullets; currentNum++) {
    const currentBullet = document.getElementById(`bullet${currentNum}`);
    let { posX, posY, rotationAngle } = getTransformValuesFromElement(currentBullet);
    let accB = 1000; // constant for bullet movement
    velX = accB * Math.cos((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2);
    velY = accB * Math.sin(-1 * ((-1 * rotationAngle * Math.PI) / 180 + Math.PI / 2));
    posX += velX * deltaTime;
    posY += velY * deltaTime;
    currentBullet.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotationAngle}deg)`;

  }

}
