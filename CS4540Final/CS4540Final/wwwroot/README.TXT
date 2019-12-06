
|*************************************************************************|
Jacob Blomquist - U0843402          |  William Ludwig -  U0905218


                          CS 4540  Final Project

							    Fall 2019						

|*************************************************************************|


This project is a labyrinth game. The player is placed into a randomly generated labyrinth.
The goal is to reach the green end point as quickly as possible. Times are saved upon completing the maze.
High scores are stored in a database and can be viewed by users.

The game was programmed using the P5.js processing framework.
The rendering technique used was raycasting.

The 'wwwroot' folder contains all of the game code in the 'gameFiles' directory. Sketch.js is the main entry point for the game,
maze.js generates the maze, and squareMaze converts the generated maze into a format suitable for raycasting.

There are also some ambient sound files included as well.
The 'p5.dom.min.js' file contains the P5 library for manipulating the DOM, the 'p5.sound.min.js' file contains a framework
for playing sound, and finally the 'p5.min.js' contains the core P5 framework. 

LOGIN INFORMATION:
We have seeded into the Users and Roles database an Administrator with login, wludwig@q.com and password 123abc123ABC! and a player
with login, jacobrb95@gmail.com with password 123abc123ABC!.  To use our program you can use these seeded users or register a user
and give it the roles that you want using the database tables.