class AudioHandler {
    constructor() {
      this.space = new Audio('assets/space.mp3');
      this.gameOver = new Audio('assets/gameover.mp3');
    }
  
    playSpace() {
      this.space.play();
    }
  
    pauseSpace() {
      this.space.pause();
    }
  
    playGameOver() {
      this.gameOver.play();
    }
  }
  