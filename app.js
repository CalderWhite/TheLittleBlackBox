//Requires
var express = require('express');
var app = express();
var serv = require('http').Server(app);

//Send user to index page
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

//Images and require object are difined here
app.use('/client',express.static(__dirname + '/client'));
// get images
app.use('/img/playerimg',express.static(__dirname + '/img/playerimg.png'));

//server port and begin messages
serv.listen(2000);
console.log("Server started.");
console.log("lisening on port 2000");

//list of socket connects
var SOCKET_LIST = {};

//defining an raw Entity
var Entity = function(){
    var self = {
        x:250,
        y:250,
        spdX:0,
        spdY:0,
        id:"",
    }
    //update the Entity
    self.update = function(){
        self.updatePosition();
    }
    //updating the possitions of an entity
    self.updatePosition = function(){
        self.x += self.spdX;
        self.y += self.spdY;
    }
    return self;
}

//defining the player
var Player = function(id){
    var self = Entity();
    self.id = id;
    self.number = "" + Math.floor(10 * Math.random());
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.maxSpd = 10;

    var super_update = self.update;
    self.update = function(){
        self.updateSpd();
        super_update();
    }

    //Speed and prossesing of events from keypress
    self.updateSpd = function(){
        if(self.pressingRight)
            self.spdX = self.maxSpd;
        else if(self.pressingLeft)
            self.spdX = -self.maxSpd;
        else
            self.spdX = 0;

        if(self.pressingUp)
            self.spdY = -self.maxSpd;
        else if(self.pressingDown)
            self.spdY = self.maxSpd;
        else
            self.spdY = 0;
    }
    Player.list[id] = self;
    return self;
}

//defining the list of plyers
Player.list = {};
//When a player connects
Player.onConnect = function(socket){
    console.log("Player id: " + socket.id + " has connected");
    var player = Player(socket.id);
    socket.on('keyPress',function(data){
        if(data.inputId === 'left')
            player.pressingLeft = data.state;
        else if(data.inputId === 'right')
            player.pressingRight = data.state;
        else if(data.inputId === 'up')
            player.pressingUp = data.state;
        else if(data.inputId === 'down')
            player.pressingDown = data.state;
    });
}
//When a player disconnects
Player.onDisconnect = function(socket){
    console.log("Player id: " + socket.id + " has disconnected");
    delete Player.list[socket.id];
}
Player.update = function(){
    var pack = [];
    for(var i in Player.list){
        var player = Player.list[i];
        player.update();
        pack.push({
            x:player.x,
            y:player.y,
            number:player.number
        });
    }
    return pack;
}

//end requires and connection socketwise
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    Player.onConnect(socket);
//disconnect soccet wise
    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    });




});

setInterval(function(){
    var pack = {
        player:Player.update(),
    }

    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/25);
