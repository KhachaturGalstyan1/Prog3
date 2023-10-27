let Creature = require("./creature")
const io = require('./server');

module.exports = class BlackHole extends Creature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 20;
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
            statisticsObj.BlackHole++
            io.emit('change statistics', statisticsObj)
            var BlackHolen = new BlackHole (newCell[0], newCell[1], this.index);
            BlackHoleArr.push(BlackHolen);
            matrix[newCell[1]][newCell[0]] = 6;

        }
            let foodgrass = this.selectRandomCell(1)
            if (foodgrass) {
                matrix[this.y][this.x] = 0
                let newX = foodgrass[0]
                let newY = foodgrass[1]
                matrix[newY][newX] = 6
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
                matrix[newY][newX] = 6
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
                matrix[newY][newX] = 6
                this.x = newX
                this.y = newY
                for (var i in PredatorArr) {
                    if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                        PredatorArr.splice(i, 1);
                        break;
                    }
           }
       }
       let foodfire = this.selectRandomCell(4)
       if (foodfire) {
           matrix[this.y][this.x] = 0
           let newX = foodfire[0]
           let newY = foodfire[1]
           matrix[newY][newX] = 6
           this.x = newX
           this.y = newY
           for (var i in FireArr) {
               if (newX == FireArr[i].x && newY == FireArr[i].y) {
                   FireArr.splice(i, 1);
                   break;
               }
      }
  }
  let foodwater = this.selectRandomCell(5)
  if (foodwater) {
      matrix[this.y][this.x] = 0
      let newX = foodwater[0]
      let newY = foodwater[1]
      matrix[newY][newX] = 6
      this.x = newX
      this.y = newY
      for (var i in WaterArr) {
          if (newX == WaterArr[i].x && newY == WaterArr[i].y) {
              WaterArr.splice(i, 1);
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
            matrix[newY][newX] = 6
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in BlakcHoleArr) {
            if (this.x == BlackHoleArr[i].x && this.y == BlackHoleArr[i].y) {
                BlackHoleArr.splice(i, 6);
                break;
            }
        }
    }
}