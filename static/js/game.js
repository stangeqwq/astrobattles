class Game {
  constructor(Main) {
    this.main = Main;
    this.body = document.getElementById("body");
    this.audio = new AudioHandler();
    this.player = new Player(this);
    this.gameoverhandler = new GameOverHandler(this);
    this.asteroids = [];
    this.bullets = [];
    this.numBullets = 1;
    this.numAsteroids = 1;
    this.isGameOver = false;
    this.scorepoints = 0;
    this.asteroidFrequency = this.main.settingsHandler.asteroidFrequency;
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
    const scoreCounter = document.createElement("div");
    scoreCounter.setAttribute("id", "scoreCounter");
    //game-container posY: -300 to 300, posX: -700 to 700
    gameContainer.appendChild(scoreCounter);
    scoreCounter.innerHTML = this.scorepoints;

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
        this.checkPlayerCollisions();
        if (currentTime - asteroidTime >= scheduledRandomAsteroidTime) {
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
      } else {
        this.asteroids.forEach((asteroid, index2) => {
          // it has to be in this function to remember the index of bullet in the list
          if (this.isColliding(bullet, asteroid)) {
            bullet.remove();
            this.bullets.splice(index, 1);
            asteroid.remove();
            this.asteroids.splice(index2, 1);
            this.scorepoints++;
            this.audio.playScore();
            // render the new points when bullet hits asteroid
            const scoreCounter = document.getElementById("scoreCounter");
            scoreCounter.innerText = this.scorepoints;
          }
        });
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
    });
  }

  randomAsteroidEvent() {
    // Define the random event logic here
    console.log("Random asteroid triggered!");
    const asteroid = new Asteroid(this, this.player);
    this.asteroids.push(asteroid);
  }

  scheduleRandomAsteroid() {
    const randomTime = (1 / this.asteroidFrequency) * Math.random() * (2000 - 1000) + 200; // Random time between 1 and 5 seconds
    return randomTime;
  }

  checkPlayerCollisions() {
    const playerRect = this.player.getBoundingClientRect();
    const containerRect = this.player.gameContainer.getBoundingClientRect();

    if (
      playerRect.left < containerRect.left ||
      playerRect.right > containerRect.right ||
      playerRect.top < containerRect.top ||
      playerRect.bottom > containerRect.bottom
    ) {
      this.gameoverhandler.gameOver();
    } else {
      // check if player collides with an asteroid
      this.asteroids.forEach((asteroid, index) => {
        //console.log(this.isColliding(asteroid, this.player));
        if (this.isColliding(asteroid, this.player)) {
          this.asteroids.splice(index, 1); // stop the asteroid moving (remove it from the list) to emphasize the collision
          this.gameoverhandler.gameOver();
        }
      });
    }
  }

  isColliding(square1, square2) {
    const s1 = square1.getPosSize();
    const s2 = square2.getPosSize();
    //console.log(s1);
    //console.log(s2);

    return (
      s1.posX < s2.posX + s2.size &&
      s1.posX + s1.size > s2.posX &&
      s1.posY < s2.posY + s2.size &&
      s1.posY + s1.size > s2.posY
    );
  }
}
