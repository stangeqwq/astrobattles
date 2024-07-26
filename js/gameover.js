class GameOverHandler {
  constructor(game) {
    this.game = game;
  }
  gameOver() {
    this.game.isGameOver = true;
    const gameoverScreen = document.createElement("img");
    gameoverScreen.setAttribute("id", "game-over");
    gameoverScreen.setAttribute("src", "assets/gameover.png");
    this.game.body.appendChild(gameoverScreen);
    this.game.audio.pauseSpace();
    this.game.audio.playGameOver();

    this.renderGameOverModal();
  }
  renderGameOverModal() {
    // Create modal elements
    const GameOverModal = document.createElement("div");
    GameOverModal.className = "GameOverModal";
    GameOverModal.id = "saveModal";

    const GameOverModalContent = document.createElement("div");
    GameOverModalContent.className = "modal-content";

    const message = document.createElement("p");
    message.innerText = "Do you want to save your result?";

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = "Name:";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "name";
    nameInput.name = "name";

    const saveButton = document.createElement("button");
    saveButton.id = "savebutton";
    saveButton.innerText = "Save";
    //saveButton.onclick = saveScore;

    const cancelButton = document.createElement("button");
    cancelButton.id = "cancelbutton";
    cancelButton.innerText = "Cancel";
    //cancelButton.onclick = closeModal;

    // Append elements
    GameOverModalContent.appendChild(message);
    GameOverModalContent.appendChild(nameLabel);
    GameOverModalContent.appendChild(nameInput);
    GameOverModalContent.appendChild(saveButton);
    GameOverModalContent.appendChild(cancelButton);
    GameOverModal.appendChild(GameOverModalContent);

    // Append modal to the body
    document.body.appendChild(GameOverModal);

    // Show the modal
    GameOverModal.style.display = "block";
  }
}
