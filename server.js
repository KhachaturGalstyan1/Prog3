const express = require("express")
const app = express()
const http = require("http")

const server = http.createServer(app)
const io = require('socket.io')(server);

app.use(express.static("."));
app.get("/", (req, res) => {
    res.redirect("index.html")
})


let cellNum = 40;
let side = 20;

matrix = []
grassArr = []
grassEaterArr = []
PredatorArr = []
FireArr = []
WaterArr = []
let Grass = require("./grass.js")
let GrassEater = require("./grassEater.js")
let Predator = require("./predator.js")
let Water = require("./water.js")
let Fire = require("./fire.js")

function fillMatrix(cellNum, grassNum, grassEaterNum, PredatorNum, FireNum, WaterNum) {
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
    fillRandomCells(2, grassEaterNum);
    fillRandomCells(3, PredatorNum);
    fillRandomCells(4, FireNum);
    fillRandomCells(5, WaterNum);

    return matrix;
}

function initArrays() {
    grassArr = []
    grassEaterArr = []
    PredatorArr = []
    FireArr = []
    WaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y, 1)
                grassArr.push(grass)
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] == 3) {
                var pre = new Predator(x, y, 3)
                PredatorArr.push(pre)

            }
            else if (matrix[y][x] == 4) {
                var Firen = new Fire(x, y, 4)
                FireArr.push(Firen)

            }
            else if (matrix[y][x] == 5) {
                var Watern = new Water(x, y, 5)
                WaterArr.push(Watern)

            }
        }
    }


}
let speed = 300;

let inId;

function handlePauseGame(ifPaused){
    if(ifPaused){
        clearInterval(intId)
    }else{
        startInterval()
    }
}

// function handleRestartGame(){
//     clearInterval()
//     gameInit()
// }

function startInterval() {
    clearInterval(inId)
    intId = setInterval(function () {
        playGame()
    }, speed)
}


function gameInit() {
    matrix = fillMatrix(cellNum, 200, 18, 12, 4, 4)
    initArrays()
    startInterval()
}

function playGame() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in PredatorArr) {
        PredatorArr[i].eat()
    }
    for (let i in FireArr) {
        FireArr[i].mul()
    }
    for (let i in WaterArr) {
        WaterArr[i].mul()
    }

    io.emit("draw matrix", matrix)
}



io.on("connection", function (socket){
    socket.emit("draw matrix", matrix);
    gameInit()
    socket.on("pause game", handlePauseGame)
    // socket.on("restart game", handleRestartGame)
})


server.listen(3500, () => {
    console.log("Server is Listenin to port 3500");

})

console.log(matrix)