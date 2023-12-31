let Creature = require("./creature")
const io = require('./server')

module.exports = class Water extends Creature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 12;
        this.index = index;
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
        return super.chooseCell(character);
    }
    mul() {
        var newCell = this.selectRandomCell(0);//[5,4]
        if (newCell) {
            statisticsObj.water++
            io.emit('change statistics', statisticsObj)
            var water = new Water (newCell[0], newCell[1], this.index);
            WaterArr.push(water);
            matrix[newCell[1]][newCell[0]] = 5;
        }
        let foodfire = this.selectRandomCell(4)
        if (foodfire) {
            matrix[this.y][this.x] = 0
            let newX = foodfire[0]
            let newY = foodfire[1]
            matrix[newY][newX] = 5
            this.x = newX
            this.y = newY
            for (var i in FireArr) {
                if (newX == FireArr[i].x && newY == FireArr[i].y) {
                    FireArr.splice(i, 1);
                    // fill("blue")
                    break;
                }
            }
   }
        
   this.move()
    }
        
        eat() {
            let foodfire = this.selectRandomCell(4)
            if (foodfire) {
                matrix[this.y][this.x] = 0
                let newX = foodfire[0]
                let newY = foodfire[1]
                matrix[newY][newX] = 5
                this.x = newX
                this.y = newY
                for (var i in FireArr) {
                    if (newX == FireArr[i].x && newY == FireArr[i].y) {
                        FireArr.splice(i, 1);
                        // fill("blue")
                        break;
                    }
                }
       }
            
       this.move()
        }
    move() {
        // this.energy--;
        let newCell = this.selectRandomCell(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 5
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in WaterArr) {
            if (this.x == WaterArr[i].x && this.y == WaterArr[i].y) {
                WaterArr.splice(i, 1);
                break;
            }
        }
    }
}