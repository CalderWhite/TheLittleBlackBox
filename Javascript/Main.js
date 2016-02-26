/* PROPERTY OF CALDER READE MILSOM WHITE 
 * COPYRIGHT 2016 Feb. 15th
 * contact : calderwhite1@gmail.com
 */

var game = {
	gameMode : null,
	checkGameMode : function() {
		//for now I'm not going to do the html prompt, so I'll use the built in method prompt()
		/*
		var gameMode = prompt("Select your game mode please.\nType \"local\" to play offline.\n Type \"online\" for plaing online ");
		if(gameMode.toLowerCase() === "local"){
			game.initializeLocal();
		}
		if(gameMode.toLowerCase() === "online"){
			alert("Sorry, online play is not available right now.\nYou have been automatically switched to offline");
			game.initializeLocal();
		}
		if(gameMode.toLowerCase() != "local" && gameMode.toLowerCase != "online"){
			alert("Could not read input, automatically switched offline");
			game.initializeLocal();
		}
		*/
		//***update - now using custom pop-up box ***\\
		document.body.appendChild(funcs.popup("Please select your game mode.\n(online is not available at the moment.","gameMode"))
		document.body.appendChild(funcs.popup("Please choose how you Would like to play the game.\nMouse or keyboard.","settings1"))
	},
	initializeLocal : function() {
		//this is here just because..., there would be lots of truoble to put it in the boot()
		//placing in the dom
		document.getElementsByClassName("reloadBox")[0].style.top = (window.innerHeight - 65).toString() + "px";
		document.getElementById("bstatus").style.top = (window.innerHeight - (17 + 25) ).toString() + "px";
		//starts player code
		player.initialize();
		//when ctrl + p is pressed  the player.togglePause() method will fire
		Mousetrap.bind('ctrl+p', function(){
            player.togglePause();
            return false; 
        });
		Mousetrap.bind('ctrl+s', function(){
            game.spawn.enemy("averageJoe");
            return false; 
        });
		Mousetrap.bind('ctrl+t', function(){
            game.spawn.enemy("tracker");
            return false; 
        });
		//at the end so there's no confusion
		player.pause = false
		//this is also to be more orginized with O.O.P. instead of putting it in boot()
		//for those that don't know O.O.P. is Object Oriented Programming, and it's very useful (google it!)
		player.weapons.bulletPower = 2;
		player.weapons.bulletSpeed = 0.5;
		//200 for fun mode :D (1000 for boring realistic mode)
		player.weapons.reloadTime = 200;
		player.health = 3;
		game.gameMode = "local";
	},
	reloadBar : {
		reloading : false,
		newWidth : null,
		tryReload : function() {
			if(game.reloadBar.reloading === true){

			}
			if(game.reloadBar.reloading === false){
				game.reloadBar.reloading = true;
				var x = document.getElementsByClassName("LLBar")[0];
				x.style.width = "0px";
				game.reloadBar.newWidth = 0;
				//dividing up the width of the reload bar and how long I want it to take.
				var updateInterval = 300 / player.weapons.reloadTime;
				//setting the interval, and yes the variables carry through, I tested.
				var d = new Date();
				var rn =  d.getTime(d.toDateString());
				var reload = window.setInterval(function(){
					if(game.reloadBar.newWidth >= 300){
						game.reloadBar.reloading = false;
						var nd = new Date();
						//console.log(nd.getTime(nd.toDateString()) - rn)
						//fixing porblem where it doesn't catch the div in time
						x.style.width = "300px"
						window.clearInterval(reload)
						document.getElementById("reloadPercent").textContent = "100%"
					}
					else{
					var adder = (game.reloadBar.newWidth + updateInterval) * 1.0189;
					//console.log(Math.floor((adder / 30)*10) + "%");
					game.reloadBar.newWidth = adder;//* 1.009;
					$("#reloadPercent")[0].textContent = Math.floor((adder / 30)*10) + "%";
					x.style.width = game.reloadBar.newWidth.toString() + "px";						
					}

				},1)
			}
		}
	},
	enemyCounter : 0,
	bulletArray : [],
	enemyArray : [],
	enemyObjects : [],
	spawn : {
		enemy : function(type) {
			switch(type){
				case "averageJoe":
				var b = new enemy(1,3);
				b.initialize();
				break;
				case "tracker":
				//the second perameter is roughly half the width of my laptop screen
				var b = new trackerEnemy(1,750);
				b.initialize();
				break;
			}
		}
	}
};

var player = {
	DOM : function(){
		//if the array is a property, you can't select a certain Node, so I returned it with a function
		var x = document.getElementsByClassName("box1")[0];
		return x;
	},
	x : function() {
		var a = player.DOM().style.transform;
		var p1 = a.search("e") + 2;
		var p2 = a.search("\,");
		var re = a.substring(p1,p2)
		return re;
	},
	y : function(options) {
		var a = player.DOM().style.transform;
		var p1 = a.search("\,") + 2;
		var p2 = a.length - 1;
		var re = a.substring(p1,p2)
		return re;
	},
	pause : true,
	togglePause : function() {
		//so the second toggle condition statement doesn't run.
		var dontrun = false
		if(player.pause === false){
			document.onmousemove = function(){return "PAUSED"};
			player.pause = true;
			dontrun = true
		}
		if(player.pause === true && dontrun === false){
			player.initialize();
			player.pause = false;
		}
	},
	initialize : function(){
			//This would normally be in boot(), However just to make everything more oragnized I put it in the object
			//Also I used this in the togglePause() property
			document.onmousemove = function(event){
				/*
				console.log("[" 
						+ event.clientX.toString() 
						+ "] ["
					    + event.clientY.toString() 
					    + "]");
				*/
				//follows your cursor by using the css transform proporty
				player.DOM().style.transform 
						= "translate(" 
						+ (event.clientX - 15)
						+ "px," 
						+ (event.clientY -13) 
						+ "px)";
				};
				if(player.shootMode === "keyboard"){
					document.onkeypress = function(event) {	
						if(player.pause === false){
							//while in-game
							var key = event.which || event.keyCode;
							if(key == 32){
								player.shoot();
							}
						}			
					}
				};
				if(player.shootMode === "click"){
					document.onclick = function() {
						if(player.pause === false){
							//while in-game
							player.shoot();
						}						
					};
				};
				if(player.pause === true){
					//so that when the game's paused and you <press a key> on something it doesn't just randomly do something in-game
					console.log("you are paused")
				};
				window.setInterval(function(){
					player.checkHealth();
				},10);
	},
	weapons : {
		//for damage
		bulletPower : null
		,
		//number 0.5 is pretty fast (goes into 0.5s in my fireBullet() function)
		//you probably shouldn't modify this ;)
		bulletSpeed : null
		,
		//denominator for game.reloadBar.tryReload variable "updateInterval"
		//100 : semi automatic
		//200 : non automatic
		reloadTime : null
	},
	shootMode : "click",
	shoot : function(){
		if(game.reloadBar.reloading === false){
			fireBullet(
 				player.weapons.bulletPower,
 				player.weapons.bulletSpeed,
 				(Number(player.x().substring(0,player.x().length - 2)) + 30).toString() + "px",
 				(Number(player.y().substring(0,player.y().length - 2)) - 7.5).toString() + "px"
 			)
 			//sounds
 			if(player.weapons.bulletPower === 2){
 				player.sounds.regularBullet();
 				var x = document.createElement("IMG");
				x.src = "images/flash1.png";
				x.style.height = "50px";
				x.style.width = "100px";
				x.style.position = "absolute";
				x.style.top = "-18px";
				x.style.left = "15px";
				player.DOM().appendChild(x);
				/*
				setTimeout(function() {
					x.src = "images/muzzleflashmachineside.png"
				},25)
				*/
				setTimeout(function(){
					player.DOM().removeChild(x);
				},50);
 				setTimeout(function(){
 					player.sounds.regularShell();
 				},650);
 			}
		}
		game.reloadBar.tryReload();
	},
	health : null,
	checkHealth : function() {
		//checking if you're hit by an enemy
		for(i=0;i<game.enemyArray.length;i++){
			var thisNode = game.enemyArray[i];
			if(funcs.checkCollision($(".box1"),$(thisNode))){
				//you've been hit!
				player.health = player.health - 1;
				game.enemyObjects[i].health = -1;
				//game.togglePause();
				//remeber to remove all enemies
			}
		}
		//checking if you're dead.
		var myHealth = player.health;
		if(myHealth > 0){
			//you're good to go!
		}
		else{
			//you're dead fam...
			player.health = 1;
			//YAAA, BLOWING UP THE PLAYER
			funcs.blowUp($(".box1"),100)
			$(".box1").on("remove",function(){
			setTimeout(function(){
			var x = funcs.popup("Oh no!\nYou died!","alert");
			document.body.appendChild(x);
			$(x).on("remove",function() {
				var y = document.createElement("DIV");
				y.id = "deathFadeOut";
				document.body.appendChild(y);
				//Jquery gets bugs if the Node is not faded out before faded in.
				$(y).fadeOut(0);
				$(y).fadeIn(2000);
				setTimeout(function() {
					//different reboot sequences depending on the game mode.
					if(game.gameMode === "local"){
						var para = document.createElement("P");
						para.className = "DeathText"
						para.textContent = "Reloading the WebPage in: 10"
						document.getElementById("deathFadeOut").appendChild(para)
						var count = 10;
						window.setInterval(function() {
							count = count - 1;
							document.getElementsByClassName("DeathText")[0].textContent = "Reloading the WebPage in: " + count;
							console.log(count);
							if(count === 0){
								location.reload();
							}
						},1000)
					}
					else{
						alert("?\nYou shouldn't be playing anything other than local...")
					}
				},2001)
			});
			},1000)
		})
		$(".box1").remove();
	}
	},
	sounds : {
		regularBullet : function() {
			var a = document.createElement("AUDIO");
			a.id = "regularBullet"
			a.src = "audio/weapons/regularBullet.mp3";
			document.body.appendChild(a);
			a.play();
			setTimeout(function(){a.remove()},1000);
		},
		regularShell : function() {
			var a = document.createElement("AUDIO");
			a.id = "regularBullet"
			a.src = "audio/weapons/regularShell.mp3";
			document.body.appendChild(a);
			a.play();
			setTimeout(function(){a.remove()},1000);
		}
	}
};

var funcs = {
	checkCollision : function ($div1, $div2) {
		//credit to http://stackoverflow.com/users/54838/bc for this one :D
		//http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
		//in this situation, using either .offset() or .position() doesn't matter.
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
        
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    },
    shadeColor1 : function(color, percent) {
    	var num = parseInt(color,16),
    	amt = Math.round(2.55 * percent),
    	R = (num >> 16) + amt,
    	G = (num >> 8 & 0x00FF) + amt,
    	B = (num & 0x0000FF) + amt;
    	return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
	},
	popup : function(msg,Type){
		player.pause = false;
		player.togglePause();
		var bigc = document.createElement("DIV");
		var c = document.createElement("DIV");
		c.className = "mypopup";
		bigc.appendChild(c);
		var n = document.createElement("PRE");
		n.className = "popcontent";
		n.textContent = msg;
		c.appendChild(n)
		var back = document.createElement("DIV");
		back.className = "popupfiller";
		bigc.appendChild(back)
		switch(Type){
			case "gameMode":
				//make the first button's div
				n.textAlign = "center";
				var o1 = document.createElement("DIV");
				o1.id = "mybutton";
				o1.onclick = function(){

					$(c).fadeOut(500);
					$(back).fadeOut(500);
					setTimeout(function(){
						document.body.removeChild(bigc);
						game.initializeLocal();
					},510)
				};
				//create its <p> element
				var p1 = document.createElement("P");
				p1.className = "downloadtxt";
				p1.textContent = "offline";
				//appending
				o1.appendChild(p1);
				//make the second button's div
				var o2 = document.createElement("DIV");
				o2.id = "mybutton";
				
				o2.onclick = function() {
					$(c).fadeOut(500);
					$(back).fadeOut(500);
					setTimeout(function(){
						document.body.appendChild(funcs.popup("That IS NOT AVAILABLE at the moment","alert"));
						document.body.removeChild(bigc);
						game.initializeLocal();
					},510);
				}
				//and <p> element
				var p2 = document.createElement("P");
				p2.className = "downloadtxt";
				p2.textContent = "online"
				//appending
				o2.appendChild(p2);
				//final appending to the box div
				c.appendChild(o1);
				c.appendChild(o2);
				return bigc;
			break;
			case "alert":
				var o1 = document.createElement("DIV");
				o1.id = "mybutton";
				
				o1.onclick = function(){
					$(c).fadeOut(500);
					$(back).fadeOut(500);
					setTimeout(function(){
						$(bigc).remove();
					},510)
					player.togglePause();
				};
				//create its <p> element
				var p1 = document.createElement("P");
				p1.className = "downloadtxt";
				p1.textContent = "ok";
				//appending
				o1.appendChild(p1);
				//final appending to the box div.
				c.appendChild(o1);
				return bigc;
			break;
			case "settings1":
				var o1 = document.createElement("DIV");
				o1.id = "mybutton";
				o1.onclick = function(){
					player.shootMode = "keyboard";
					$(c).fadeOut(500);
					$(back).fadeOut(500);
					setTimeout(function(){
						document.body.removeChild(bigc);
					},510)
					//player.togglePause();
				};
				//create its <p> element
				var p1 = document.createElement("P");
				p1.className = "downloadtxt";
				p1.textContent = "Keyboard";
				//appending
				o1.appendChild(p1);
				//second div
				var o2 = document.createElement("DIV");
				o2.id = "mybutton";
				o2.onclick = function(){
					player.shootMode = "click";
					$(c).fadeOut(500);
					$(back).fadeOut(500);
					setTimeout(function(){
						document.body.removeChild(bigc);
					},510)
					//player.togglePause();
				};
				//create its <p> element
				var p2 = document.createElement("P");
				p2.className = "downloadtxt";
				p2.textContent = "Mouse";
				//appending
				o2.appendChild(p2);
				//final appending to the box div.
				c.appendChild(o1);
				c.appendChild(o2);
				return bigc;
			break;
		}
	},
	blowUp : function(div,amount){
		for(i=0;i<amount;i++){
			createDiv(div)
		};
	}
}

function createDiv (div) {
	var transitionx = Math.floor(Math.random() * 1000);
			var transitiony = Math.floor(Math.random() * 1000);

			var x = document.createElement("DIV");
			x.className = "shrapnel";
			x.style.backgroundColor = $(div).css("backgroundColor");
			x.style.transform = "translate(" + div.offset().left + "px," + div.offset().top + "px)";
			if(transitionx > window.innerWidth){
				transitionx = window.innerWidth - 1;
			}
			if(transitiony > window.innerHeight){
				transitiony = window.innerHeight - 1;
			}
			//pythagoren theorem and graphing stuff...
			var speed = 1000;
					var meX = $(x).offset().left;
					var meY = $(x).offset().top;
			if(transitionx < meX){
				var x1 = meX;
				var x2 = transitionx; 
			}
			else{
			var x1 = transitionx;
			var x2 = meX;	
			};
			if(transitiony < meY){
			var y1 = meY;	
			var y2 = transitiony;
			}
			else{
			var y1 = transitiony;
			var y2 = meY;		
			};
	var distance = Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
	var actualVelocity = distance/speed;
	if(actualVelocity < 0.1){
		actualVelocity = 0.1;
	};
	document.body.appendChild(x)
	setTimeout(function(){
		x.style.transition = "all " + actualVelocity.toString() + "s";
		x.style.transform  = "translate(" + transitionx + "px," + transitiony + "px)";
		setTimeout(function(){
			$(x).fadeOut(200)
			setTimeout(function() {
				$(x).remove();
			},200)
		},actualVelocity * 1000 - 500 )
	},10)
		};

function fireBullet(power,velocity,startx,starty){
	/*The Power goes into a property called "damage" on the Node itself,
	 *Velocity is actually the transition time
	 *After all properties are set and the Node is appended to the body, A
	 *	setTimeout()
	 *Is initiated to fire 10 milliseconds later,
	 *What it does is set the transfrom property for the node to translate to the width of the screen (The very far right edge)
	 *The reason for this is a race condition. The computer is trying to do everything instantly, So technacally
	 *The translate would happen at the same time as the transition property is set. Therefore it would transition instantly, and the process
	 *The code that slows transitions.
	 *startingPos is just for the effect that the bullet is being "shot" from somewhere
	 *REMEMBER to add "px" to the end of start x and starty, the player module will do it for you in .x() and .y() but if you call the function
	 *on your own you need to add it.
	 */
	var x = document.createElement("DIV");
	x.className = "GameBullet";
	//putting in place to start
	x.style.transform = "translate(" + startx + "," + starty + ")";
	/*this is to make sure the velocity of the bullet is consistent no matter where the bullet is shot.
	 *If the bullet is shot right before the edge of the screen and the velocity is a direct input, it will travel at a much slower speed
	 *than if it is shot at the left edge of the screen.
	 *This is because the computer is trying to make the bullet traveling time last the same amout no matter where it is shot.
	*/
	x.style.transition = "all " + ((velocity/window.innerWidth) * (window.innerWidth - Number(player.x().substring(0,player.x().length - 2)))).toString() + "s";
	x.damage = power;
	document.body.appendChild(x);
	//adding it to the new array system
	game.bulletArray.push(x);
	setTimeout(function(){
		x.style.transform = "translate(" + window.innerWidth + "px," + starty + ")";
		setTimeout(function(){
			document.body.removeChild(x);
			//This is removing it from my new array system to remove Jquery bugs.
			var Aplace = game.bulletArray.indexOf(x)
			game.bulletArray.splice(Aplace,1);
		},velocity * 1000)
	},10);
};

function enemy (health,speed) {
	//setup
	var x = document.createElement("DIV");
	x.className = "box2";
	var posx = (window.innerWidth - 30);
	var posy = Math.floor(Math.random() * 500);
	x.style.transform = "translate(" + posx + "px," + posy + "px)";
	x.style.transition = "all " + speed + "s";
	setTimeout(function(){
		x.style.transform = "translate(-35px," + posy + "px)";
	},25);
	document.body.appendChild(x);
	//properties & methods

	this.health = health;

	this.initialize = function() {
		var a = this;
		var checker = window.setInterval(function(){
			for(i=0;i<game.bulletArray.length;i++){
				var thisNode = game.bulletArray[i];
				if(funcs.checkCollision($(x),$(thisNode))){
					a.health = a.health - thisNode.damage;
					document.body.removeChild(thisNode);
				}
			}
			if(a.health <= 0 || $(x).offset().left <= 0){
				this.health = -1;
				game.enemyObjects.splice(game.enemyObjects.indexOf(x),1)
				setTimeout(function(){document.body.removeChild(x);},10);
				game.enemyCounter = game.enemyCounter - 1;
				var removePlace = game.enemyArray.indexOf(x);
				game.enemyArray.splice(removePlace,1);
				
				funcs.blowUp($(x),100)
				window.clearInterval(checker);
			}
		},10)

	};
	game.enemyCounter = game.enemyCounter + 1;
	game.enemyArray.push(x)
	game.enemyObjects.push(this)
}

function trackerEnemy(health,speed){
	//setup
	var x = document.createElement("DIV");
	x.className = "box2";
	var posx = (window.innerWidth - 30);
	var posy = Math.floor(Math.random() * 500);
	x.style.transform = "translate(" + posx + "px," + posy + "px)";

	x.style.transition = "all " + speed + "s";
	document.body.appendChild(x);
	//properties & methods

	this.health = health;

	this.initialize = function() {
		var a = this;
		var tracker = window.setInterval(function(){
		var meX = $(x).offset().left;
		var meY = $(x).offset().top;
	if($(".box1").offset().left < meX){
	var x1 = meX;
	var x2 = $(".box1").offset().left; 
	}
	else{
	var x1 = $(".box1").offset().left;
	var x2 = meX;	
	};
	if($(".box1").offset().top < meY){
	var y1 = meY;	
	var y2 = $(".box1").offset().top;
	}
	else{
	var y1 = $(".box1").offset().top;
	var y2 = meY;		
	};
	var distance = Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
	//console.log(distance);
	var actualVelocity = distance/speed;
	if(actualVelocity < 0.1){
		actualVelocity = 0.1;
	};
	x.style.transition = "all " + actualVelocity.toString() + "s";
	//x.style.transition = speed;
			x.style.transform = "translate(" + (Number(player.x().substring(0,player.x().length - 2)) - 15).toString() + "px" + "," + (Number(player.y().substring(0,player.y().length - 2)) - 15).toString() + "px" + ")";
		},100)

		var checker = window.setInterval(function(){
			for(i=0;i<game.bulletArray.length;i++){
				var thisNode = game.bulletArray[i];
				//console.log(funcs.checkCollision($(x),$(thisNode)))
				if(funcs.checkCollision($(x),$(thisNode))){
					a.health = a.health - thisNode.damage;
					document.body.removeChild(thisNode);
				}
			}
			if(a.health <= 0 || $(x).offset().left <= 0){
				this.health = -1;
				game.enemyObjects.splice(game.enemyObjects.indexOf(x),1)
				setTimeout(function(){document.body.removeChild(x);},10)
				game.enemyCounter = game.enemyCounter - 1;
				var removePlace = game.enemyArray.indexOf(x);
				game.enemyArray.splice(removePlace,1);
				
				funcs.blowUp($(x),100)
				window.clearInterval(checker);
			}
		},10)

	};
	game.enemyCounter = game.enemyCounter + 1;
	game.enemyArray.push(x);
	game.enemyObjects.push(this);
}

function fallShell (startx,starty) {
	var x = document.createElement("DIV");
	x.className = "shell";
	x.style.top = starty;
	x.style.left = startx;
	var speed = (window.innerHeight - starty)/1000;
	x.style.transition = "all " + speed + "s";
	var endPos = window.innerHeight - starty;
	setTimeout(function(){
		x.style.transform = "translate(" + 0 + "px," + (endPos) + "px) rotate(15deg)";
		console.log(x.style.transform);
	},10)
	setTimeout(function(){
		x.style.transform = "translate(" + 0 + "px," + (endPos - 40) + "px) rotate(-360deg)";
		setTimeout(function(){
			//x.style.transform = "translate(" + 0 + "px," + window.innerHeight + "px) rotate(-360)";
			//x.style.transition = "all 1s ease 0";
			x.style.transform = "translate(" + 0 + "px," + endPos + "px) rotate(-180deg)";
			console.log(x.style.transform);
			setTimeout(function(){
				console.log($(x).offset().top)
				$(x).remove();
			},speed*1000)
		},speed*1000);
	},10 + speed*1000);
	document.body.appendChild(x);
}

function boot (num) {
	switch(num){
		case 0:
		//checks gamemode
		game.checkGameMode();
		//the rest of the boot sequence is in the game.initialize <local> <online>
		//due to having to wait for the user to choose, but not being an acutal alert/confirm/prompt box.
		break;
	}
};
 	
/*
 *For safe keeping:
 *(Number(starty.substring(0,starty.length-2)) - height/2) <-- for middle of div
 *NEW for input ^^^:
 *(Number(player.y().substring(0,player.y().length - 2)) - 7.5)
 *FOR:
 *fireBullet(100,0.7,player.x(),(Number(player.y().substring(0,player.y().length - 2)) - 7.5).toString() + "px")
 *NEWERR VERSION:
 The 30 in the x represents the width and the 7.5 represents half the width (middle)
 *fireBullet(100,0.7,(Number(player.x().substring(0,player.x().length - 2)) + 30).toString() + "px",(Number(player.y().substring(0,player.y().length - 2)) - 7.5).toString() + "px")
 *OR:
 fireBullet(
 	100,
 	0.7,
 	(Number(player.x().substring(0,player.x().length - 2)) + 30).toString() + "px",
 	(Number(player.y().substring(0,player.y().length - 2)) - 7.5).toString() + "px"
 	)
*/
