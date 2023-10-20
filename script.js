// import { Socket } from "socket.io";
cellNum = 40;
side = 20;


function setup() {
    createCanvas(cellNum * side, cellNum * side);
    background('#acacac');
}

const socket = io()

function drawMatrix(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
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

            rect(x * side, y * side, side, side);
        }
    }

}
 socket.on("draw matrix", drawMatrix)