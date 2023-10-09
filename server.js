const express = require("express")
const app = express()
const http = require("http")

const server = http.createServer(app)

app.use(express.static("."));

app.get("/", (req , res)=>{
    res.redirect("index.html")
})


server.listen(3500 ,()=>{
    console.log("Server is Listenin to port 3500");
    
})