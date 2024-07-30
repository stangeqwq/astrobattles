class ScoreBoardHandler {
  constructor(Main) {
    this.body = document.getElementById("body");
    this.main = Main;
  }

  displayScoreBoard() {
    this.ScoreBoard = document.createElement("h1");
    this.ScoreBoard.className = "title";
    this.ScoreBoard.id = "title";
    this.ScoreBoard.innerText = "Scoreboard";
    this.body.appendChild(this.ScoreBoard);

    this.playerNameGroup = document.createElement("div");
    this.playerNameGroup.className = "playerName";
    this.body.appendChild(this.playerNameGroup);
    this.renderPlayers();
  }

  async fetchPlayer(rank) {
    // GET request on /api/score endpoint with json {rank: (int)}
    const url = new URL('/api/score', window.location.origin);
    url.searchParams.append('rank', rank);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return { name: "???", score: 0 };
    }
  }
  async renderPlayers() {
    for (let r = 1; r <= 50; r++) {
      // fetch from database with ranking
      const { name, score } = await this.fetchPlayer(r);
      // render HTML
      const playerName = document.createElement("div");
      playerName.innerText = `${r}. ${name} | Score: ${score}`;
      this.playerNameGroup.appendChild(playerName);
    }
  }
}
