let Creature = require("./creature")
const io = require('./server')

module.exports = class Fire extends Creature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 14;
        this.directions = [];
        
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var newCell = this.selectRandomCell(0);
        if (newCell) {
            statisticsObj.fire++
            io.emit('change statistics', statisticsObj)
            var Firen = new Fire (newCell[0], newCell[1], this.index);
            FireArr.push(Firen);
            matrix[newCell[1]][newCell[0]] = 4;

        }
            let foodgrass = this.selectRandomCell(1)
            if (foodgrass) {
                matrix[this.y][this.x] = 0
                let newX = foodgrass[0]
                let newY = foodgrass[1]
                matrix[newY][newX] = 4
                this.x = newX
                this.y = newY
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
       }
            let foodgrassEater = this.selectRandomCell(2)
            if (foodgrassEater) {
                matrix[this.y][this.x] = 0
                let newX = foodgrassEater[0]
                let newY = foodgrassEater[1]
                matrix[newY][newX] = 4
                this.x = newX
                this.y = newY
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
           }
       }
            let foodpredator = this.selectRandomCell(3)
            if (foodpredator) {
                matrix[this.y][this.x] = 0
                let newX = foodpredator[0]
                let newY = foodpredator[1]
                matrix[newY][newX] = 4
                this.x = newX
                this.y = newY
                for (var i in PredatorArr) {
                    if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                        PredatorArr.splice(i, 1);
                        break;
                    }
           }
       }
       this.move()
        }
    

        
    move() {
        var newCell = this.selectRandomCell(0);
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in FireArr) {
            if (this.x == FireArr[i].x && this.y == FireArr[i].y) {
                FireArr.splice(i, 4);
                break;
            }
        }
    }
}