class Asteroid {
    constructor(game, player) {
      this.game = game;
      this.player = player;
      this.asteroid = document.createElement("img");
      this.size = 50 * Math.random() + 30;
      this.asteroid.setAttribute("id", `asteroid${game.numAsteroids++}`);
      this.asteroid.setAttribute("src", "assets/asteroid2.png");
      this.asteroid.setAttribute("width", `${this.size}`); // random
      this.asteroid.setAttribute("height", `${this.size}`); // random
      this.asteroid.style.position = "absolute";
      //game-container posY -300 to 300, posX -700 to 700
      const {posX, posY, rotationAngle, accA} = this.getRandomStart();

      this.posX = posX;
      this.posY = posY;
      this.rotationAngle = rotationAngle;
      this.accA = accA;
      this.asteroid.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotationAngle}deg)`;
      this.game.player.gameContainer.appendChild(this.asteroid);
    }
  
    update(deltaTime) {
      this.velX = this.accA * Math.cos((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2);
      this.velY = this.accA * Math.sin(-1 * ((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2));
      this.posX += this.velX * deltaTime;
      this.posY += this.velY * deltaTime;
  
      this.asteroid.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotationAngle}deg)`;
    }
  
    isOutOfBound() {
      const asteroidRect = this.asteroid.getBoundingClientRect();
      const containerRect = this.game.player.gameContainer.getBoundingClientRect();
      return asteroidRect.left < asteroidRect.left || asteroidRect.right > containerRect.right || asteroidRect.top < containerRect.top || asteroidRect.bottom > containerRect.bottom;
    }
  
    remove() {
      this.asteroid.remove();
    }

    getRandomStart() {
      let randomVal = Math.random();
      let posX = 0;
      let posY = 0;
      let rotationAngle = 0;
      let accA = 500 * Math.random();
      if (randomVal > 0.75) { // from left
        posX = -700;
        posY = 300 * Math.random();
        rotationAngle = (180-0) * Math.random();
      } else if (randomVal < 0.25){ // from right
        posX = 700; 
        posY = 300 * Math.random();
        rotationAngle = (-180-0) * Math.random();
      } else if (randomVal > 0.25 && randomVal < 0.5) { // from up
        posX = 700 * Math.random(); 
        posY = -300;
        if (Math.random() > 0.5) {
          rotationAngle = 90 + 90*Math.random(); 
        } else {
          rotationAngle = -90 - 90*Math.random();
        }
      } else if (randomVal > 0.5 && randomVal < 0.75) { // from down 
        posX = 700 * Math.random(); 
        posY = 300;
        if (Math.random() > 0.5) {
          rotationAngle = 90*Math.random();
        } else {
          rotationAngle = -90*Math.random();
        }
        rotationAngle = 90 * Math.random() - 90 * Math.random();;
      }
      return {posX, posY, rotationAngle, accA};
    }
    getPosSize() {
      return {posX: this.posX, posY: this.posY, size: this.size / 2}; // divide by two for the width
    }
   
  }
  