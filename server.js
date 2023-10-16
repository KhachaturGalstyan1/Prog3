const express = require("express")
const app = express()
const http = require("http")

const server = http.createServer(app)
const io = require('socket.io')(server)
app.use(express.static("."));

app.get("/", (req , res)=>{
    res.redirect("index.html")
})


let cellNum = 40;

matrix = []
 grassArr = []
grassEaterArr = []
PredatorArr = []
FireArr = []
WaterArr = []

function fillMatrix(cellNum, grassNum, grEaterNum, predatorNum, FireNum, WaterNum) {
    let matrix = [];
    for (let y = 0; y < cellNum; y++) {
    matrix[y] = [];
    for (let x = 0; x < cellNum; x++) {
    matrix[y][x] = 0;
    }
    }
    function fillRandomCells(value, count) {
    while (count > 0) {
    const col = Math.floor(Math.random() * cellNum);
    const row = Math.floor(Math.random() * cellNum);
    if (matrix[col][row] === 0) {
    matrix[col][row] = value;
    count--;
    }
    }
    }
    
    fillRandomCells(1, grassNum);
    fillRandomCells(2, grEaterNum);
    fillRandomCells(3, predatorNum);
    fillRandomCells(4, FireNum);
    fillRandomCells(5, WaterNum);

    return matrix;
    }

function initGame(){
   matrix = fillMatrix(cellNum, 200, 18, 12, 4, 4)

   
}
io.on("connection", function(socket){
    socket.emit("draw matrix", matrix );
    initGame()
}) 


server.listen(3500 ,()=>{
    console.log("Server is Listenin to port 3500");
    
})