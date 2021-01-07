//Step 1 - Create an Express App 
const express = require('express'); //by requiring express
const app = express(); // by calling ().... 
const path = require('path').join(__dirname,"public"); //Determine the path.. NOTE not secure! Path Traversal....
app.use(express.static(path)); //pass the path to server static content 

//Step 2 - create http server and pass the express app
const server = require('http').createServer(app);

//Step 3 - instantiate socketio with the server 
const socketio =  require('socket.io')(server);

//Step 4 - Listen!
server.listen(3000,() => {
  console.log('App listening on port 3000');
});

//Step 5 - Wireup 
socketio.on('connection', socket => {
    socket.emit('messaging',"You are Connected");
    //event handler for a chat-message
    socket.on('user-message',(obj)=>{
        //broadvast emits message to everyone except originator 
        socket.broadcast.emit('shared-message',obj);
    });
});
