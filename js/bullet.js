class Bullet {
    constructor(game, player) {
      this.game = game;
      this.player = player;
      this.element = document.createElement("img");
      this.element.setAttribute("id", `bullet${this.game.numBullets++}`);
      this.element.setAttribute("src", "assets/bullet.jpeg");
      this.element.setAttribute("width", "10");
      this.element.setAttribute("height", "10");
  
      const { posX, posY, rotationAngle } = player;
      this.posX = posX;
      this.posY = posY;
      this.rotationAngle = rotationAngle;
      this.accB = 300;
  
      this.element.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotationAngle}deg)`;
      this.game.player.gameContainer.appendChild(this.element);
    }
  
    update(deltaTime) {
      this.velX = this.accB * Math.cos((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2);
      this.velY = this.accB * Math.sin(-1 * ((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2));
      this.posX += this.velX * deltaTime;
      this.posY += this.velY * deltaTime;
  
      this.element.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotationAngle}deg)`;
    }
  
    isOutOfBound() {
      const bulletRect = this.element.getBoundingClientRect();
      const containerRect = this.game.player.gameContainer.getBoundingClientRect();
      return bulletRect.left < containerRect.left || bulletRect.right > containerRect.right || bulletRect.top < containerRect.top || bulletRect.bottom > containerRect.bottom;
    }
  
    remove() {
      this.element.remove();
    }
  }
  