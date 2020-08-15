export class Room {
    constructor(tiles) {
        this.tiles = tiles;
    }

    getTiles() {
        return this.tiles;
    }

    getTile(coords) {
        return this.tiles[coords.y][coords.x];
    }
}