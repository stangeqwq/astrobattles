class Main {
  constructor() {
    this.settingsHandler = new SettingsHandler(this);
    this.scoreBoardRender = new ScoreBoardHandler(this);
    document.getElementById("play").onclick = () => this.Play();
    document.getElementById("settings").onclick = () => this.Settings();
    document.getElementById("scoreboard").onclick = () => this.Scoreboard();
  }
  Play() {
    this.game = new Game(this);
    document.getElementById("homemenu").remove();
    document.getElementById("title").remove();
    document.getElementById("creator").remove();
    this.game.init();
    this.game.start();
  }

  Settings() {
    document.getElementById("homemenu").remove();
    document.getElementById("title").remove();
    document.getElementById("creator").remove();
    this.settingsHandler.displaySettings();
  }

  Scoreboard() {
    document.getElementById("homemenu").remove();
    document.getElementById("title").remove();
    document.getElementById("creator").remove();
    this.scoreBoardRender.displayScoreBoard();
  }

  renderMain() {
    const body = document.getElementById("body");
    const title = document.createElement("h1");
    const creator = document.createElement("h2");
    creator.className = "creator";
    creator.id = "creator";
    creator.innerText = "coded by Eric Joshua Stangeland";
    title.className = "title";
    title.id = "title";
    title.innerText = "Astrobattles";
    const homemenu = document.createElement("div");
    homemenu.id = "homemenu";
    homemenu.className = "buttonGroup";
    const playButton = document.createElement("button");
    const settingsButton = document.createElement("button");
    const scoreboardButton = document.createElement("button");
    playButton.id = "play";
    settingsButton.id = "settings";
    scoreboardButton.id = "scoreboard";
    playButton.innerText = "Play";
    settingsButton.innerText = "Settings";
    scoreboardButton.innerText = "Scoreboard";
    body.appendChild(title);
    body.appendChild(homemenu);
    homemenu.appendChild(playButton);
    homemenu.appendChild(settingsButton);
    homemenu.appendChild(scoreboardButton);
    body.appendChild(creator);
    document.getElementById("play").onclick = () => this.Play();
    document.getElementById("settings").onclick = () => this.Settings();
    document.getElementById("scoreboard").onclick = () => this.Scoreboard();
  }
}
