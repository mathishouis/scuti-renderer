import { getTileInfo, getTileNumber, hasWall } from "./TileInfo";
import {StairType} from "../types/StairType";
import {WallType} from "../types/WallType";

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

    let parsedTileMap: { type: string; z: number; direction?: number, shape?: StairType, wall: WallType }[][] = [];

    for (let y = 0; y < matrix.length; y++) {
        parsedTileMap[y] = []
        for (let x = 0; x < matrix[y].length; x++) {

            const tileInfo = getTileInfo(matrix, x, y);
            if(tileInfo.walls !== null) {
                if(tileInfo.walls.type === "right" && hasWall(matrix, x, y).y) {
                    tileInfo.walls = null;
                }
            }
            if(tileInfo.walls !== null) {
                if (tileInfo.walls.type === "left" && hasWall(matrix, x, y).x) {
                    tileInfo.walls = null;
                }
            }
            if(!tileInfo.door || door) {
                if(isTile(matrix[y][x]) && tileInfo.stairs === null) {
                    parsedTileMap[y][x] = {
                        type: "tile",
                        z: tileInfo.height,
                        wall: tileInfo.walls?.type,
                    }
                } else if(isTile(matrix[y][x]) && tileInfo.stairs !== null) {
                    parsedTileMap[y][x] = {
                        type: "stair",
                        z: tileInfo.height,
                        direction: tileInfo.stairs.direction,
                        shape: tileInfo.stairs.type,
                        wall: tileInfo.walls?.type,
                    }
                }  else {
                    parsedTileMap[y][x] = {
                        type: "hidden",
                        z: tileInfo.height,
                        wall: tileInfo.walls?.type,
                    }
                }
            } else {
                door = true;
                parsedTileMap[y][x] = {
                    type: "door",
                    z: tileInfo.height,
                    wall: undefined
                }
            }
        }
    }

    return parsedTileMap;
}

export function getTile(tiles: [[]], x: number, y: number) {
    if(x < 0) return 'x';
    if(y < 0) return 'x';
    if(tiles[y] === undefined) return 'x';
    if(tiles[y][x] === undefined) return 'x';
    return tiles[y][x]
}

export function getMaxZ(tilemap: { type: string, z: number, direction?: number, shape?: StairType, wall: WallType }[][]): number {
    let z = 0;
    for(let y = 0; y < tilemap.length; y++) {
        for (let x = 0; x < tilemap[y].length; x++) {
            if(tilemap[y][x].z > z) z = tilemap[y][x].z;
        }
    }
    return z;
}