const { Socket } = require("dgram")
const express = require("express")
const app     = express()
const http    = require("http")
const server  = http.createServer(app)

//Using Socket Io
const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

//Detect all connection to ocket
io.on("connection", (socket) => {
    console.log("Socket Connected");

    //Listening to Chat socket
    socket.on("chat", (val) => {
        //Send msg to all client that listening to chat
        io.emit("chat", val)
    })
})

server.listen(3333, () => {
    console.log("Listening to port " + 3333);
})