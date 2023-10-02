class Water {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
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
        var newCell = random(this.chooseCell(0));//[5,4]
        if (newCell) {
            var water = new Water (newCell[0], newCell[1], this.index);
            WaterArr.push(water);
            matrix[newCell[1]][newCell[0]] = 5;
        }
        let foodsfire = this.chooseCell(4)
        let foodfire = random(foodsfire)
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
                    fill("brown")
                    break;
                }
            }
   }
        
   this.move()
    }
        
    

        eat() {
            let foodsfire = this.chooseCell(4)
            let foodfire = random(foodsfire)
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
                        fill("brown")
                        break;
                    }
                }
       }
            
       this.move()
        }
    move() {
        // this.energy--;
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
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