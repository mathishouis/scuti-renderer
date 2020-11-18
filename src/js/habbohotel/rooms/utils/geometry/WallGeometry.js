

export class WallGeometry {
    constructor(map) {
        this.map = map;

        this.leftX = 10000;
        this.leftY = 10000;
        this.rightX = 10000;
        this.rightY = 0;
        this.takenX = [];
    }


    left(x, y) {
        if(this.map[y][x - 1] === 'x' && this.map[y][x] !== 'x') {
            if(x <= this.leftX) {
                this.leftX = x;
                return true;
            }
        }
    }

    right(x, y) {
        if(this.map[y - 1][x] === 'x' && this.map[y][x] !== 'x') {

            if(y >= this.rightY || x - 1 === this.rightX || x === this.rightX) {
                if(this.takenX.includes(x) === false) {
                    this.rightY = y;
                    this.rightX = x;
                    this.takenX.push(x);
                    return true;
                }
            }
        }
    }

    corner(x, y) {
        if(this.map[y - 1][x - 1] === 'x' && this.map[y - 1][x] === 'x' && this.map[y][x - 1] === 'x' && this.map[y][x] !== 'x') {
            if(this.takenX.includes(x) === false && x <= this.leftX) {
                return true;
            }
        }
    }

}