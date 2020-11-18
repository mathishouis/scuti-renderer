export class DoorGeometry {
    constructor(map) {
        this.map = map;
    }

    valid(x,y) {
        return this.map[y][x - 1] === 'x' && this.map[y][x + 1] !== 'x' && this.map[y - 1][x] === 'x' && this.map[y + 1][x] === 'x' && this.map[y][x] !== 'x';
    }
}