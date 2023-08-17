import { HeightMap } from "../../interfaces/HeightMap.ts";
import {Direction, Position2D} from "../../interfaces/Position.ts";
import {Stair} from "../../interfaces/Stair.ts";
import {StairType} from "../../interfaces/StairType.ts";

export class RoomHeightmap {
    public heightMap: HeightMap;

    constructor(heightMap: string) {
        this.heightMap = RoomHeightmap.parse(heightMap);
    }

    public static parse(heightMap: string): HeightMap {
        heightMap = heightMap.replace(/ /g, "");
        heightMap = heightMap.replace(/\n\n/g, "\n");

        return heightMap.split(/\r?\n/).map((line: string) => {
            return line.split('');
        });
    }

    public isTile({ x, y }: Position2D): boolean {
        return this.getTile({ x, y }) !== "x";
    }

    public getTile({ x, y }: Position2D): string {
        return x < 0 || y < 0 || this.heightMap[y] === undefined || this.heightMap[y][x] === undefined ? 'x' : this.heightMap[y][x];
    }

    public getTileHeight({ x, y }: Position2D): number {
        const tile: string = this.getTile({ x, y });

        return tile === 'x' ? 0 : isNaN(Number(tile)) ? tile.charCodeAt(0) - 96 + 9 : Number(tile);
    }

    public getTileDifference(position1: Position2D, position2: Position2D): number {
        return Number(this.getTileHeight(position1)) - Number(this.getTileHeight(position2));
    }

    public getStair({ x, y }: Position2D): Stair | undefined {
        const topLeftTile: Position2D = { x: x - 1, y: y - 1 };
        const topTile: Position2D = { x: x, y: y - 1 };
        const topRightTile: Position2D = { x: x + 1, y: y - 1 };

        const midLeftTile: Position2D = { x: x - 1, y: y };
        const midRightTile: Position2D = { x: x + 1, y: y };

        const botLeftTile: Position2D = { x: x - 1, y: y + 1 };
        const botTile: Position2D = { x: x, y: y + 1 };
        const botRightTile: Position2D = { x: x + 1, y: y + 1 };

        if (
            this.isTile({ x, y }) &&
            this.isTile(topRightTile) &&
            this.getTileDifference(topRightTile, { x, y }) === 1 &&
            this.getTileDifference(midRightTile, { x, y }) === 1 &&
            this.getTileDifference(topTile, { x, y }) === 1
        )
            return { type: StairType.INNER_CORNER_STAIR, direction: Direction.NORTH_EAST };

        if (
            this.isTile({ x, y }) &&
            this.isTile(botRightTile) &&
            this.getTileDifference(botRightTile, { x, y }) === 1 &&
            this.getTileDifference(midRightTile, { x, y }) === 1 &&
            this.getTileDifference(botTile, { x, y }) === 1
        )
            return { type: StairType.INNER_CORNER_STAIR, direction: Direction.SOUTH_EAST };

        if (
            this.isTile({ x, y }) &&
            this.isTile(botLeftTile) &&
            this.getTileDifference(botLeftTile, { x, y }) === 1 &&
            this.getTileDifference(midLeftTile, { x, y }) === 1 &&
            this.getTileDifference(botTile, { x, y }) === 1
        )
            return { type: StairType.INNER_CORNER_STAIR, direction: Direction.SOUTH_WEST };

        if (
            this.isTile({ x, y }) &&
            this.isTile(topLeftTile) &&
            this.getTileDifference(topLeftTile, { x, y }) === 1 &&
            this.getTileDifference(midLeftTile, { x, y }) === 1 &&
            this.getTileDifference(topTile, { x, y }) === 1
        )
            return { type: StairType.INNER_CORNER_STAIR, direction: Direction.NORTH_WEST };

        if (this.isTile({ x, y }) && this.isTile(topTile) && this.getTileDifference(topTile, { x, y }) === 1)
            return { type: StairType.STAIR, direction: Direction.NORTH };

        if (
            this.isTile({ x, y }) &&
            this.isTile(topRightTile) &&
            this.getTileDifference(topRightTile, { x, y }) === 1 &&
            this.getTileDifference(midRightTile, { x, y }) === 0 &&
            this.getTileDifference(topTile, { x, y }) === 0
        )
            return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.NORTH_EAST };

        if (this.isTile({ x, y }) && this.isTile(midRightTile) && this.getTileDifference(midRightTile, { x, y }) === 1)
            return { type: StairType.STAIR, direction: Direction.EAST };

        if (
            this.isTile({ x, y }) &&
            this.isTile(botRightTile) &&
            this.getTileDifference(botRightTile, { x, y }) === 1 &&
            this.getTileDifference(midRightTile, { x, y }) === 0 &&
            this.getTileDifference(botTile, { x, y }) === 0
        )
            return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.SOUTH_EAST };

        if (this.isTile({ x, y }) && this.isTile(botTile) && this.getTileDifference(botTile, { x, y }) === 1)
            return { type: StairType.STAIR, direction: Direction.SOUTH };

        if (
            this.isTile({ x, y }) &&
            this.isTile(botLeftTile) &&
            this.getTileDifference(botLeftTile, { x, y }) === 1 &&
            this.getTileDifference(midLeftTile, { x, y }) === 0 &&
            this.getTileDifference(botTile, { x, y }) === 0
        )
            return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.SOUTH_WEST };

        if (this.isTile({ x, y }) && this.isTile(midLeftTile) && this.getTileDifference(midLeftTile, { x, y }) === 1)
            return { type: StairType.STAIR, direction: Direction.WEST };

        if (
            this.isTile({ x, y }) &&
            this.isTile(topLeftTile) &&
            this.getTileDifference(topLeftTile, { x, y }) === 1 &&
            this.getTileDifference(midLeftTile, { x, y }) === 0 &&
            this.getTileDifference(topTile, { x, y }) === 0
        )
            return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.NORTH_WEST };

        return;
    }
}
