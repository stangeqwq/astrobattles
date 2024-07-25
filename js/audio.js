class AudioHandler {
    constructor() {
      this.space = new Audio('assets/space.mp3');
      this.space.loop = true; // Loop background music indefinitely

      this.gameOver = new Audio('assets/gameover.mp3');
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
  }
  