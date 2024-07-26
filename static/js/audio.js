class AudioHandler {
  constructor() {
    this.space = new Audio("/static/assets/space.mp3");
    this.space.loop = true; // Loop background music indefinitely

    this.gameOver = new Audio("/static/assets/gameover.mp3");
    this.score = new Audio("/static/assets/score.mp3");
  }

  playSpace() {
    this.space.play();
  }

  pauseSpace() {
    this.space.pause();
  }

  playGameOver() {
    this.pauseSpace();
    this.gameOver.play();
  }

  playScore() {
    this.score.play();
  }
}
