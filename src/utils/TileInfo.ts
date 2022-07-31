import { isTile } from "./TileMap";

export function getTileNumber(tileCode: string): number {
    const number = Number(tileCode);
    if(isNaN(number)) {
        return tileCode.charCodeAt(0) - 96 + 9;
    }
    return number;
}

export function getTile(tiles: [][], x: number, y: number) {
    if(x < 0) return "x";
    if(y < 0) return "x";
    if(tiles[y] === undefined) return "x";
    if(tiles[y][x] === undefined) return "x";
    return tiles[y][x];
}

export function getTileInfo(tiles: [][], x: number, y: number): { door: boolean, leftEdge: boolean, rightEdge: boolean, height: number } {
    // Top
    const topLeftTile = getTile(tiles, x - 1, y - 1);
    const topTile = getTile(tiles, x, y - 1);
    const topRightTile = getTile(tiles, x + 1, y - 1);
    // Mid
    const midLeftTile = getTile(tiles, x - 1, y);
    const midTile = getTile(tiles, x, y);
    const midRightTile = getTile(tiles, x + 1, y);
    // Bot
    const botLeftTile = getTile(tiles, x - 1, y + 1);
    const botTile = getTile(tiles, x, y + 1);
    const botRightTile = getTile(tiles, x + 1, y + 1);

    const isDoor = !isTile(topTile) && !isTile(topLeftTile) && !isTile(midLeftTile) && !isTile(botLeftTile) && !isTile(botTile) && isTile(midTile);
    const leftEdge = !isTile(botTile) && !isTile(midTile);
    const rightEdge = !isTile(midRightTile) && !isTile(midTile);

    return {
        door: isDoor,
        leftEdge: leftEdge,
        rightEdge: rightEdge,
        height: getTileNumber(midTile)
    }
}