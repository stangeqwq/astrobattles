class Game {
    constructor() {
      this.body = document.getElementById('body');
      this.audio = new AudioHandler();
      this.player = new Player(this);
      this.bullets = [];
      this.numBullets = 1;
      this.isGameOver = false;
    }
  
    init() {
      this.setUpGame();
    }
  
    start() {
      this.detectMovementCollision();
    }
  
    setUpGame() {
      const gameContainer = document.createElement("div");
      gameContainer.setAttribute("id", "game-container");
      this.body.appendChild(gameContainer);
      
      this.player.init(gameContainer);
      this.audio.playSpace();
    }
  
    detectMovementCollision() {
      let prevTime = performance.now();
  
      const movement = (currentTime) => {
        const deltaTime = (currentTime - prevTime) / 1000;
        if (!this.isGameOver) {
          prevTime = currentTime;
          this.player.update(deltaTime);
          this.moveBullets(deltaTime);
          this.checkCollisions();
        }
        window.requestAnimationFrame(movement);
      };
  
      window.requestAnimationFrame(movement);
    }
  
    moveBullets(deltaTime) {
      this.bullets.forEach((bullet, index) => {
        bullet.update(deltaTime);
        if (bullet.isOutOfBound()) {
          bullet.remove();
          this.bullets.splice(index, 1);
        }
      });
    }
  
    checkCollisions() {
      const playerRect = this.player.getBoundingClientRect();
      const containerRect = this.player.gameContainer.getBoundingClientRect();
  
      if (playerRect.left < containerRect.left || playerRect.right > containerRect.right || playerRect.top < containerRect.top || playerRect.bottom > containerRect.bottom) {
        this.gameOver();
      }
    }
  
    gameOver() {
      this.isGameOver = true;
      const gameoverScreen = document.createElement("img");
      gameoverScreen.setAttribute("id", "game-over");
      gameoverScreen.setAttribute("src", "assets/gameover.png");
      this.body.appendChild(gameoverScreen);
      this.audio.pauseSpace();
      this.audio.playGameOver();
    }
  
    shoot() {
      if (!this.player.isShooting) {
        const bullet = new Bullet(this, this.player);
        this.bullets.push(bullet);
        this.player.isShooting = true;
      }
    }
  }
  