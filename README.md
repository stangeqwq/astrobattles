# Astrobattles
This is a 2D shooter website game with the objective of avoiding asteroids and shooting as many as possible of them. It uses the `P3`-stack (Python, postgreSQL, and progessive web technologies) for a simple web game.
# Features
- shooting bullets from spacecraft
- rotation and forward movement of spacecraft
- asteroids and collision detection
- scoring mechanism
# To work on
- setup of database .sql script + proper credential hiding
- improve UI and graphics
- add more features (powerups, bullet reloading, etc.)

# The menu screen
Below is an image of the interactive javascript menu screen.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/start.png)
# Gameplay and Game Over
Below is how the gameplay looks.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/gameplay.gif)

You receive a game over screen if you get hit by a random asteroid or the player exits the game arena.
![alt text](https://github.com/stangeqwq/astrobattles/blob/main/static/assets/GameOverAsteroid.png)

Your score, name, and other data is saved through a python backend with postgreSQL as the database.

