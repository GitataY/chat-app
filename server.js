var express = require("express");
const { listen } = require("socket.io");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
users = [];
connections = [];
server.listen(3000);
app.get("/", function (req, resp){
    //route for localhost: 3000/
    resp.sendFile(__dirname + "/index.html");
})
io.socket.on("Connection", function (socket) {
    //when client connects to server
    connections.push(socket); //add plug details to custom array
    console.log("Connected : %s socket connected", connections.length);  //curr connections
    socket.on("disconnect", function (data) {
        //client disc. from server
        connections.splice(connections.indexOf(socket), 1); //delete plug details
        console.log("Disconnected : %s socket connected", connections.length); //curr connections
    });
    socket.on("send message", function (data) {
        console.log(data);
        io.sockets.emit("new message", { msg: data });
    });
});

console.log('server is listening')