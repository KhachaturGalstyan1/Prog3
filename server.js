const express = require("express")
const app = express()
const http = require("http")

const server = http.createServer(app)

app.use(express.static("."));

app.get("/", (req , res)=>{
    res.redirect("index.html")
})

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



 grassArr = []
grassEaterArr = []
PredatorArr = []
FireArr = []
WaterArr = []

server.listen(3500 ,()=>{
    console.log("Server is Listenin to port 3500");
    
})