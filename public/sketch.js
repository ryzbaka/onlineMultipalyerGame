let socket;
let r,g,b;
let userId="";
async function setup(){
    createCanvas(windowWidth,windowHeight);
    background(51);
    socket = io.connect("http://localhost:5555");
    socket.on("connect",()=>{
        console.log("Connected to websocket client")
    })
    socket.on("draw",data=>{
        if(data.user!==userId){
            fill(...data.color);
            noStroke();
            ellipse(data.mouseCoords[0],data.mouseCoords[1],60,60);
            fill(255);
            textSize(40);
            fill("red")
            text(data.user,mouseCoords[0]-30,mouseCoords[1]);
        }
    });
    r = random(255);
    g = random(255);
    b = random(255);
    await fetch("/uniquename").then(raw=>raw.json()).then(data=>{
        userId=data.name
        const title = document.querySelector("#title");
        title.innerText = userId;
    });
}
function draw(){
    fill(0,10);
    rect(0,0,windowWidth,windowHeight);
    fill(255);
    textSize(32);
    fill(r,g,b);
    text(userId,100,100)
}
function mouseDragged(){
    textSize(12);
    fill(r,g,b);
    noStroke();
    ellipse(mouseX,mouseY,60,60)
    fill(255)
    //text(userId,mouseX-30,mouseY);
    const data = {
        mouseCoords:[mouseX,mouseY],
        color:[r,g,b],
        user:userId
    }
    socket.emit("mouse",data);
    
}