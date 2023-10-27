// import { Socket } from "socket.io";
const socket = io()
let cellNum = 40;
let side = 20;





// resstp.addEventListener("click", handleResstpGame)

socket.on("change statistics", handleAddStatistics)

function handleAddStatistics(Obj){
    grass.innerText = "New grasses: " + Obj.grass;
    grassEater.innerText = "New grasEaters: " + Obj.grassEater;
    predator.innerText = "New Predator: " + Obj.predator;
    fire.innerText = "New predator: " + Obj.fire;
    water.innerText = "New water: " + Obj.water;
    BlackHole.innerText = "New BlackHoles: " + Obj.BlackHole;
}

// function handleResstpGame(){
//     handleRestartGame()
//     handlePauseGame()
//     socket.emit('restart + stop game',)
// }
let ifPaused = false
function handleResumeGame(){
    ifPaused = false
    socket.emit('resume game', ifPaused)
}

function handleRestartGame(){
    socket.emit('restart game')
}




function handlePauseGame() {
    ifPaused = true
    socket.emit("pause game", ifPaused)
}


function setup() {
    createCanvas(cellNum * side, cellNum * side);
    background('#acacac');
}
let season = 0;



function drawMatrix(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
            if(season == 1){
                fill("white")
            }
            else if(season == 2){
                fill("pink")
            }
            else if(season == 3){
                fill("red")
            }
            else{
                fill("orange")
            }

        }else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("purple")
            }
            else if (matrix[y][x] == 4) {
                fill("red")
            }
            else if (matrix[y][x] == 5) {
                fill("blue")
            }
            else if (matrix[y][x] == 6) {
                fill("black")
            }

            rect(x * side, y * side, side, side);
        }
    }

}
const pauseBtn = document.querySelector("#pause")
const resumeBtn = document.querySelector("#resume")
const restartBtn = document.querySelector("#restart")
const seasonsBtn = document.querySelector("#season")
// const resstpBtn = document.querySelector("#resstp")

// const winterBtn = document.querySelector("#winter")



pause.addEventListener("click", handlePauseGame)
resume.addEventListener("click", handleResumeGame)
restart.addEventListener("click", handleRestartGame)
seasonsBtn.addEventListener("click", handleChangeSeason)

function handleChangeSeason(){
    if (season <4){
        season++;
    } else {
        season = 1;
    }
}
socket.emit("change season", season)
    if(season = 1){
        seasonsBtn.textContent = "Winter"
    }else if(season = 2){
        seasonsBtn.textContent = "Spring"
    }else if(season = 3){
        seasonsBtn.textContent = "Summer"
    }
    else if(season = 4){
        seasonsBtn.textContent = "Autumn"
    }

socket.on("draw matrix", drawMatrix)