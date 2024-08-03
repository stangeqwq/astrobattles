# Astrobattles
This is a 2D shooter website game with the objective of avoiding asteroids and shooting as many as possible of them. It uses the `P3`-stack (Python, postgreSQL, and progessive web technologies). It is a personal primitive 2D game engine.
# Features
- shooting bullets from spacecraft
- rotation and forward movement of spacecraft
- asteroids and collision detection
- show scoreboard (interacts with backend)
- scoring system (save results in postgreSQL)
- change asteroid frequency through settings
# To work on
- improve UI and graphics
- add more features (powerups, bullet reloading, etc.)
- secure `/api/score` endpoint to prevent malicious `POST` and `GET` requests with unfathomably large score points

# The menu screen
Below is an image of the interactive javascript menu screen.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/start.png)
# Gameplay, scoreboard, settings and game over
Below is how the gameplay looks.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/gameplay.gif)

You can also adjust how often random asteroids appear through settings.

![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/asteroidFrequency.png)

You receive a game over screen if you get hit by a random asteroid or the player exits the game arena.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/GameOverAsteroid.png)

Your results can be accessed through scoreboard menu. The results are also saved in the server's backend database postgreSQL.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/scoreboard.png)


# Database
Your score, name, and other data is saved through a python backend with postgreSQL as the database.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/backend.png)

# Setup
If you want to test for yourself this simple full-stack web game:
```bash
git clone https://github.com/stangeqwq/astrobattles
psql -U <your-psql-superuser> -d postgres -f setup.sql
python3 app.py
```

You should get something like this below. When you're done, you need not worry about messy data on your psql server since the database is deleted automatically.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/dynamicdatabasedeletion.png)

