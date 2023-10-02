var matrix = [];
var side = 25;
var n = 30;
var m = 40;

for (let i = 0; i < n; i++) {
matrix.push([])
for (let j = 0; j <m; j++) {
matrix[i].push(0)
}
}
function characters(index, count) {
for (let a = 0; a < count; a++) {
var v = Math.floor(random(0,n))
var w = Math.floor(random(0,m))
matrix[v][w] = index;
}
}



let grassArr = []
let grassEaterArr = []
let PredatorArr = []
let FireArr = []
let WaterArr = []


function setup() {
    frameRate(5);
    characters(1,200)
    characters(2,18)
    characters(3,12)
    characters(4,4)
    characters(5,4)
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grassn = new Grass(x, y, 1)
                grassArr.push(grassn)
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] == 3){
                var pre = new Predator(x,y,3)
                PredatorArr.push(pre)

            }
            else if (matrix[y][x] == 4){
                var Firen = new Fire(x,y,4)
                FireArr.push(Firen)

            }
            else if (matrix[y][x] == 5){
                var Watern = new Water(x,y,5)
                WaterArr.push(Watern)

            }
        }
    }
}

function draw() {

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
    }for (let i in grassArr){
    grassArr[i].mul()
}
for (let i in grassEaterArr){
    grassEaterArr[i].eat()
}
for (let i in PredatorArr){
    PredatorArr[i].eat()
}
for (let i in FireArr){
    FireArr[i].mul()
}
for(let i in WaterArr){
    WaterArr[i].mul()
}
}