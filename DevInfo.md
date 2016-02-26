## The Main Structure
The Little Black Box is object oriented!  
This means it'll be easy to learn, and easy to program your own branches of this game.  
### Object : game
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
 *NAME:         |DESCRIPTION
 *averageJoe    |It will spawn a low-level enemy that travels at a decent speed.
 *tracker       |It will spawn the same level as an averageJoe, but it follows the player very quickly!
 *To customize, add some enemies of your own!
 */
game.bulletArray
/*
 *This property (Array) is used to fix a bug with the collision checker for the enemies.
 *When two bullets were on the screen at the same time, it would cause an error with Jquery by not being able to check
 *Both, resulting on a random chance that the bullet would actually work.
 *Thus, I put all bullet nodes in an array and the script goes throught the array node by node insted of
 *Trying to select the first node that comes up when it searches for a <.GameBullet>.
 */
game.enemyArray
/*
 *To avoid the errors I had with the bullets (see game.Bullet Array),
 *I went straight for the array attempt (and it worked).
 *This is used for player health in checking if the player has been hit by an enemy.
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
player.togglePause()
/*
 *This method does exactly what the name depicts. It sets that player.pause property to
 *the opposite of what it previously was. After that it changes some event listeners/ on<foo>s to
 *do nothing
 */
player.initialize()
/*Adds event listeners and on<foo>s
 *Such as the code that makes the player div always go to your mouse.
 */
player.weapons
/*
 *this object contains proporties for weapons (corresponding to the player).
 */
player.weapons.bulletPower
//this manipulates how much damage you bullets do.
player.weapons.reloadTime
/*
 *reloadTime manipulates how fast you reload time is between shots.
 *It IS NOT in miliseconds, due to the fact that the game.reloadBar.tryReload()
 *code is very messy.
 */
player.shootMode
/*
 * "keyboard" and "click" so far... :)
 */
player.shoot()
/*
 *This does a lot of the work for you when attempting to shoot a bullet.
 * (i.e. putting the bullet in front of your character which gives the effect that it comes from your ship).
 */
player.checkHealth()
/*
 *player.checkHealth() does 3 things:
 *1. It checks if the player has been hit by an enemy (and reacts accordingly).
 *2. It checks after #1 if the player's health has dropped to 0 (are they dead).
 *3. If the player is dead it runs a sequnce leading to the restart of the game.
 */
```
### Object : funcs
```javascript
funcs.checkCollision(div1,div2)
/*
 *This checks if the .offset of two divs are overlapping (are the divs touching)
 */
funcs.shadeColor1(color,percent)
/*
 *Really, this is just old code, however we may come back to useing it,
 *and it's still embedded in the code (used).
 */
funcs.popup(msg,Type)
/*This will create a custom popup, according to your <Type> input.
 *It will also display whatever string you pass in for <msg>, regardless of the <Type>.
 *NOTE: There are options in the popup depending on what <Type> it is, and the code that it runs will not change.
 *So use the right <Type>!
 */
```
### Function : fireBullet
```javascript
fireBullet(power,velocity,startx,starty)
/*
 * The function fireBullet() has a couple of nice features
 * 1. <velocity> is actually velocity!
 * The code will plug some numbers into a (custom built physics) equation and there will be a real pixels/second !
 * This is especially cool for the reason that you can customize your bullets and theorize about them.
 * 2. You can manipulate how much damage your bullet does with <power>
 * 3. You may change where the bullet is coming from (with <startx> and <starty>) to give the effect that something is shooting it.
 * This could lead to possibilities like a tower or anything you want!
 * Also, the bullet will self destruct if it doesn't hit anything once it's at the edge of the screen.
 */
```
### Object Constructor : enemy
```javascript
function enemy(health,speed)
/*
 *This constructor creates a div and places it randomly on the right side of the screen.
 *The properties of this are: */
this.health
//it's exactly what the name says
this.initialize()
/*
 *sets the window.setInterval() for checking the health (If zero)
 *and for checking if a bullet has touched the div.
 *UPDATE^^^: It checks the bullets by checking an array in the game object
 *to remove a large bug that prevented accurate results if two (or more) bullets were on screen at the same time.
 *UPDATE:
 *Also they also expoled when they die.
 */
```
### Object Constructor : trackerEnemy
```javascript
function trackerEnemy()
/*
 *This function runs the same as the enemy() function.
 *EXCEPT: it changes its style.transform (translate) to the player's position 
 *constantly until death, and also ajusts its speed according to the distance (retrived by using the pythagorean theorem)
 *from the player
 */
```
### Function : boot
```javascript
function boot()
/*
 *Because we didn't know how to make other functions wait in a list (syncronessly)
 *we made the boot() function only call the game.checkGameMode(), which will lead to another function/method,
 *which will lead to another function/method and so on until the boot sequence is completed - except it isn't all
 *in one function.
 *You may ask why I don't change this now, and that's because I'd like to focus on building up the game
 *rather than rebuilding the parts of the game that do this "hopping" of function/method to function/method until the 
 *desired functions/methods had been called.
 *Fix this error on your own fork, and we'll be happy to give credit and implement the changes you've made!
 *UPDATE: Part of this error has been fixed by using the Jquery UI method .on("remove",callback)
 */
```
