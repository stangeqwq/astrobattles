class Bullet {
    constructor(game, player) {
      this.game = game;
      this.player = player;
      this.bullet = document.createElement("img");
      this.bullet.setAttribute("id", `bullet${this.game.numBullets++}`);
      this.bullet.setAttribute("src", "assets/bullet.jpeg");
      this.bullet.setAttribute("width", "10");
      this.bullet.setAttribute("height", "10");
      this.bullet.style.position = "absolute";
  
      const { posX, posY, rotationAngle } = player;
      this.posX = posX;
      this.posY = posY;
      this.rotationAngle = rotationAngle;
      this.accB = 300;
  
      this.bullet.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotationAngle}deg)`;
      this.game.player.gameContainer.appendChild(this.bullet);
    }
  
    update(deltaTime) {
      this.velX = this.accB * Math.cos((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2);
      this.velY = this.accB * Math.sin(-1 * ((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2));
      this.posX += this.velX * deltaTime;
      this.posY += this.velY * deltaTime;
  
      this.bullet.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotationAngle}deg)`;
    }
  
    isOutOfBound() {
      const bulletRect = this.bullet.getBoundingClientRect();
      const containerRect = this.game.player.gameContainer.getBoundingClientRect();
      return bulletRect.left < containerRect.left || bulletRect.right > containerRect.right || bulletRect.top < containerRect.top || bulletRect.bottom > containerRect.bottom;
    }
  
    remove() {
      this.bullet.remove();
    }
  }
  