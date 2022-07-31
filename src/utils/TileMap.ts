import { getTileNumber } from "./TileInfo";
import { getTileInfo } from "./TileInfo";

export function isTile(tile: string | undefined) {
    return tile !== 'x';
}

export function parse(tiles: string) {
    let door: boolean = false;
    let lines: number = 0;
    let matrix: [[]] = [[]];
    for(let i = 0; i < tiles.length; i++) {
        if(tiles[i] === "\n" || tiles[i] === "\r") {
            matrix.push([]);
            lines++;
        } else {
            // @ts-ignore
            matrix[lines].push(tiles[i]);
        }
    }

    let parsedTileMap: { type: string; z: number; direction?: number }[][] = [];

    for (let y = 0; y < matrix.length; y++) {
        parsedTileMap[y] = []
        for (let x = 0; x < matrix[y].length; x++) {

            const tileInfo = getTileInfo(matrix, x, y);

            if(!tileInfo.door) {
                if(isTile(matrix[y][x]) && tileInfo.stairs === null) {
                    parsedTileMap[y][x] = {
                        type: "tile",
                        z: tileInfo.height
                    }
                } else if(isTile(matrix[y][x]) && tileInfo.stairs !== null) {
                    parsedTileMap[y][x] = {
                        type: "stair",
                        z: tileInfo.height,
                        direction: tileInfo.stairs.direction
                    }
                }  else {
                    parsedTileMap[y][x] = {
                        type: "hidden",
                        z: tileInfo.height
                    }
                }
            } else {
                door = true;
                parsedTileMap[y][x] = {
                    type: "door",
                    z: tileInfo.height
                }
            }
        }
    }

    return parsedTileMap;
}

export function getTile(tilemap: [[]], x: number, y: number) {
    if(x < 0) return 'x';
    if(y < 0) return 'x';
    if(tilemap[y] === undefined) return 'x';
    if(tilemap[y][x] === undefined) return 'x';
    return tilemap[y][x]
}