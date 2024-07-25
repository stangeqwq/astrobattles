class Game {
    constructor() {
      this.body = document.getElementById('body');
      this.audio = new AudioHandler();
      this.player = new Player(this);
      this.asteroids = [];
      this.bullets = [];
      this.numBullets = 1;
      this.isGameOver = false;
    }
  
    init() {
      this.setUpGame();
    }
  
    start() {
      this.startPlayerBullet();
    }
  
    setUpGame() {
      const gameContainer = document.createElement("div");
      gameContainer.setAttribute("id", "game-container");
      this.body.appendChild(gameContainer);
      
      this.player.init(gameContainer);
      this.audio.playSpace();
    }
  
      startPlayerBullet() {
      let prevTime = performance.now();
      let asteroidTime = performance.now();
      let scheduledRandomAsteroidTime = this.scheduleRandomAsteroid();

      const gameLoop = (currentTime) => {
        const deltaTime = (currentTime - prevTime) / 1000;

        if (!this.isGameOver) {
          this.player.update(deltaTime);
          this.checkPlayerExitGameContainer();
          if ((currentTime - asteroidTime) >= scheduledRandomAsteroidTime) {
            scheduledRandomAsteroidTime = this.scheduleRandomAsteroid();
            this.randomAsteroidEvent();
            asteroidTime = currentTime;
          }
        }

        this.moveBullets(deltaTime);
        this.moveAsteroids(deltaTime);
        this.scheduleRandomAsteroid();

        prevTime = currentTime;
        window.requestAnimationFrame(gameLoop);
      };
  
      window.requestAnimationFrame(gameLoop); // initial play
    }
  
    moveBullets(deltaTime) {
      this.bullets.forEach((bullet, index) => {
        bullet.update(deltaTime);
        if (bullet.isOutOfBound()) {
          bullet.remove();
          this.bullets.splice(index, 1); // remove the asteroid at that index
        }
      });
    }

    moveAsteroids(deltaTime) {
      this.asteroids.forEach((asteroid, index) => {
        asteroid.update(deltaTime);
        if (asteroid.isOutOfBound()) {
          asteroid.remove();
          this.asteroids.splice(index, 1); // remove the asteroid at that index
        }
      })
    }

    randomAsteroidEvent() {
      // Define the random event logic here
      console.log("Random asteroid triggered!");
      const asteroid = new Asteroid(this, this.player);
      this.asteroids.push(asteroid);
    }
  
    scheduleRandomAsteroid() {
      const randomTime = Math.random() * (5000 - 1000) + 1000; // Random time between 1 and 5 seconds
      return randomTime;
    }
  
    checkPlayerExitGameContainer() {
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
  }
  