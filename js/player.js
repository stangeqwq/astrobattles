class Player {
    constructor(game) {
      this.game = game;
      this.rotationAngle = 0;
      this.angularV = 0;
      this.posX = 0;
      this.posY = 0;
      this.velX = 0;
      this.velY = 0;
      this.accR = 0;
      this.accF = 0;
      this.isShooting = false;
    }
  
    init(gameContainer) {
      this.gameContainer = gameContainer;
      this.player = document.createElement("img");
      this.player.setAttribute("src", "assets/character.png");
      this.player.setAttribute("id", "player");
      gameContainer.appendChild(this.player);
      this.addEventListeners();
    }
  
    addEventListeners() {
      document.addEventListener("keydown", this.keydownHandler.bind(this));
      document.addEventListener("keyup", this.keyupHandler.bind(this));
    }
  
    keydownHandler(event) {
      if (event.key === "a") {
        this.accR = -5;
      } else if (event.key === "d") {
        this.accR = 5;
      } else if (event.key === "s") {
        this.accF = 5;
      } else if (event.key === "w" || event.key === "j") {
        this.shoot();
      }
    }
  
    keyupHandler(event) {
      if (event.key === "a" || event.key === "d") {
        this.accR = 0;
        this.angularV = 0;
      } else if (event.key === "s") {
        this.accF = 0;
        this.velX = 0;
        this.velY = 0;
      } else if (event.key === "w" || event.key === "j") {
        this.isShooting = false;
      }
    }
  
    update(deltaTime) {
      this.velX += this.accF * Math.cos((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2);
      this.velY += this.accF * Math.sin(-1 * ((-1 * this.rotationAngle * Math.PI) / 180 + Math.PI / 2));
      this.angularV += this.accR;
      this.posX += this.velX * deltaTime;
      this.posY += this.velY * deltaTime;
      this.rotationAngle += this.angularV * deltaTime;
  
      if (this.rotationAngle > 360) {
        this.rotationAngle %= 360;
      }
  
      this.player.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotationAngle}deg)`;
    }
    shoot() {
      if (!this.isShooting) {
        const bullet = new Bullet(this.game, this);
        this.game.bullets.push(bullet);
        this.isShooting = true;
      }
    }
    getBoundingClientRect() {
      return this.player.getBoundingClientRect();
    }
}
  