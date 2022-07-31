import { isTile } from "./TileMap";
import {StairType} from "../types/StairType";
import {StairCorner} from "../objects/room/parts/StairCorner";
import {WallType} from "../types/WallType";

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

export function getTileInfo(tiles: [][], x: number, y: number): { door: boolean, leftEdge: boolean, rightEdge: boolean, height: number, stairs: { direction: number, type: StairType } | null, walls: { type: WallType } | null } {
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
    const stairs = getStairs(tiles, x, y);
    const walls = getWalls(tiles, x, y);

    return {
        door: isDoor,
        leftEdge: leftEdge,
        rightEdge: rightEdge,
        height: getTileNumber(midTile),
        stairs: stairs,
        walls: walls
    }
}

export function getWalls(tiles: [][], x: number, y: number): { type: WallType } | null {
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

    if(!isTile(topLeftTile) && !isTile(topTile) && !isTile(midLeftTile)) {
        return { type: "corner" };
    }
    if(!isTile(midLeftTile)) {
        return { type: "left" };
    }
    if(!isTile(topTile)) {
        return { type: "right" };
    }

    return null;
}

export function getStairs(tiles: [][], x: number, y: number): { direction: number, type: StairType } | null {
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

    // Inner Corner
    // 0F1
    // 0xF
    // 000
    if(isTile(midTile) && isTile(topRightTile) && getTileDiff(topRightTile, midTile) === 1 && getTileDiff(midRightTile, midTile) === 1 && getTileDiff(topTile, midTile) === 1) {
        return { direction: 1, type: "innerCorner" };
    }
    // 000
    // 0xF
    // 0F1
    if(isTile(midTile) && isTile(botRightTile) && getTileDiff(botRightTile, midTile) === 1 && getTileDiff(midRightTile, midTile) === 1 && getTileDiff(botTile, midTile) === 1) {
        return { direction: 3, type: "innerCorner" };
    }
    // 000
    // Fx0
    // 1F0
    if(isTile(midTile) && isTile(botLeftTile) && getTileDiff(botLeftTile, midTile) === 1 && getTileDiff(midLeftTile, midTile) === 1 && getTileDiff(botTile, midTile) === 1) {
        return { direction: 5, type: "innerCorner" };
    }
    // 1F0
    // Fx0
    // 000
    if(isTile(midTile) && isTile(topLeftTile) && getTileDiff(topLeftTile, midTile) === 1 && getTileDiff(midLeftTile, midTile) === 1 && getTileDiff(topTile, midTile) === 1) {
        return { direction: 7, type: "innerCorner" };
    }


    // 010
    // 0x0
    // 000
    if(isTile(midTile) && isTile(topTile) && getTileDiff(topTile, midTile) === 1) {
        return { direction: 0, type: "normal" };
    }
    // 0N1
    // 0xN
    // 000
    if(isTile(midTile) && isTile(topRightTile) && getTileDiff(topRightTile, midTile) === 1 && getTileDiff(midRightTile, midTile) === 0 && getTileDiff(topTile, midTile) === 0) {
        return { direction: 1, type: "outerCorner" };
    }
    // 000
    // 0x1
    // 000
    if(isTile(midTile) && isTile(midRightTile) && getTileDiff(midRightTile, midTile) === 1) {
        return { direction: 2, type: "normal" };
    }
    // 000
    // 0xN
    // 0N1
    if(isTile(midTile) && isTile(botRightTile) && getTileDiff(botRightTile, midTile) === 1 && getTileDiff(midRightTile, midTile) === 0 && getTileDiff(botTile, midTile) === 0) {
        return { direction: 3, type: "outerCorner" };
    }
    // 000
    // 0x0
    // 010
    if(isTile(midTile) && isTile(botTile) && getTileDiff(botTile, midTile) === 1) {
        return { direction: 4, type: "normal" };
    }
    // 000
    // Nx0
    // 1N0
    if(isTile(midTile) && isTile(botLeftTile) && getTileDiff(botLeftTile, midTile) === 1 && getTileDiff(midLeftTile, midTile) === 0 && getTileDiff(botTile, midTile) === 0) {
        return { direction: 5, type: "outerCorner" };
    }
    // 000
    // 1x0
    // 000
    if(isTile(midTile) && isTile(midLeftTile) && getTileDiff(midLeftTile, midTile) === 1) {
        return { direction: 6, type: "normal" };
    }
    // 1N0
    // Nx0
    // 000
    if(isTile(midTile) && isTile(topLeftTile) && getTileDiff(topLeftTile, midTile) === 1 && getTileDiff(midLeftTile, midTile) === 0 && getTileDiff(topTile, midTile) === 0) {
        return { direction: 7, type: "outerCorner" };
    }
    return null;
}

export function getTileDiff(tile1: string, tile2: string): number {
    return Number(getTileNumber(tile1)) - Number(getTileNumber(tile2));
}