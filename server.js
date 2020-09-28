const PORT = 5555;
const express = require("express");
const app = express();
const socket = require("socket.io")
const {uniqueNamesGenerator, adjectives, animals} = require("unique-names-generator");

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile("index.html")
})

app.get("/uniquename",(req,res)=>{
    const config = {
        dictionaries:[adjectives, animals],
        length:2
    }
    res.send({name:uniqueNamesGenerator(config)})
})

const server = app.listen(PORT,()=>{
    console.log(`Websocket server is running on ${PORT}`);
});

const io = socket(server);

io.on("connection",newConnection);

function newConnection(socketObject){
    console.log(`Client ${socketObject.id} connected to server`)
    socketObject.on('mouse',(data)=>{
        console.log(data)
        io.sockets.emit("draw",data)
    })
}