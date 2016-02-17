# TheLittleBlackBox
TheLittleBlackBox is an hmtl5 game that uses tags to  
create a fun game that you can play for ages without getting tired of it!
## [Download It!](https://github.com/TheSeceretDevs/TheLittleBlackBox/archive/master.zip)
## [Play it now!](https://theseceretdevs.github.io/TheLittleBlackBox)
# Version
We haven't really reached alpha yet!
# Controls
## Shoot
To shoot there are two options (You will select either at the beginning of the game)
Mouse:
Click To shoot!
Keyboard:
Space To shoot!
## hotkeys
### ctrl + p
Pause game.  
(and un-pause)
### ctrl + s
Spawn a low-level enemy.
# Developers!
If you are a developer, "We want you!". We encourge all  
developers hack our api and find out how it works.  
So fork! fork! fork!  
Also, here are some pointers!
## The Main Structure
The Little Black Box is object oriented!  
This means it'll be easy to learn, and easy to program your own branches of this game.  
### Object : Game
The game object has a couple of different properties and methods,  
but you'll only need to use some.  
```javascript
game.initializeLocal();
/*
 *what this method does is finish off the boot sequence,  
 *the only reason you would touch this is to change the values it sets at the beginning of the game
 *(i.e. player.weapons.reloadTime or player.weapons.bulletPower)
 */
game.reloadBar
/*
 *This object is all to do with the reload bar.
 *However, due to troubles the code is ugly and not even functioning that well.
 *Feel free to improve the code (actually, make a pull request if you do!),
 *but that's not really where the fun is...
 */
game.spawn
/*
 *game.spawn has only one object at the moment, but does a bit of the work for you when spawning
 *an enemy. This is a real oppourtunity to customize the game to you! (read on vvv)
 */
game.spawn.enemy(type)
/*
 *This will spawn an enemy base on what string you pass in for [type]
 *If you pass in averageJoe it will spawn a low-level enemy that travels at a decent speed.
 *To customize, add some enemies of your own!
 */
```
### Object : player
```javascript
player.DOM()
/*
 *player.DOM() really just gives you the Node (.box1)
 */
player.x()
/*
 *player.x() takes the transfrom object, finds the translate and returns the x.
 *This was before I started to use JQuery, so I couldn't use .offset() or .postition()
 */
player.y()
/*
 *It does the same function of player.x(), but It grabs the y transition
 */
//work in progress
```
