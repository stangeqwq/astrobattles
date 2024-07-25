class Asteroid {
    constructor(game, player) {
      this.game = game;
      this.player = player;
      this.asteroid = document.createElement("img");
      this.asteroid.setAttribute("id", `asteroid${this.game.numAsteroids++}`);
      this.asteroid.setAttribute("src", "assets/asteroid2.png");
      this.asteroid.setAttribute("width", "30"); // random
      this.asteroid.setAttribute("height", "30"); // random
      this.asteroid.style.position = "absolute";
 
      this.posX = 20; // random on the corners of game-container
      this.posY = 20;
      this.rotationAngle = 90; 
      this.accA = 300; // random acceleration for asteroid
  
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
  }
  