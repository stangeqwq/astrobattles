function Play() {
  document.getElementById("homemenu").remove();
  document.getElementById("title").remove();
  document.getElementById("creator").remove();

  const game = new Game();
  game.init();
  game.start();
}

function Settings() {
  document.getElementById("homemenu").remove();
  const comingSoon = document.createElement("div");
  comingSoon.innerHTML = "Coming Soon!";
  comingSoon.setAttribute("id", "soon");
  const body = document.getElementById("body");
  body.appendChild(comingSoon);
}

function Scoreboard() {
  document.getElementById("homemenu").remove();
  const comingSoon = document.createElement("div");
  comingSoon.innerHTML = "Coming Soon!";
  comingSoon.setAttribute("id", "soon");
  const body = document.getElementById("body");
  body.appendChild(comingSoon);
}
