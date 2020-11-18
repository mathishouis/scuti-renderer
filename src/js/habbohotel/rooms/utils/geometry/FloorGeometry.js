export class FloorGeometry {
    constructor(map) {
        this.map = map;
    }

    highest() {
        var finalMapValue = []
        const heightMap = {0: 0, x: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}
        for(let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                this.map[y][x] = heightMap[this.map[y][x]]
            }
        }
        for(let y = 0; y < this.map.length; y++) {
            finalMapValue.push(Math.max.apply(Math, this.map[y]))
        }
        return Math.max.apply(Math, finalMapValue);
    }

    valid(x,y) {
        if(this.map[y][x] != 'x') {
            return true;
        }
        return false;
    }
}