import {Position2D, TileInfo} from "../../interfaces/Room.interface";
import {WallType} from "../../types/WallType";
import {StairType} from "../../types/StairType";
import {Direction} from "../../types/Direction";

export class RoomTileMap {

    /**
     * TileMap
     * @private
     */
    private _tileMap: string[][];

    /**
     * RoomTileMap class
     * @param tileMap - The room tileMap
     */
    constructor(tileMap: string) {
        this._parse(tileMap);
    }

    /**
     * Parse the tilemap into a matrix with tiles
     * @param tileMap
     * @private
     */
    private _parse(tileMap: string): void {
        const matrix: string[][] = [[]];
        let lines: number = 0;
        for(let i: number = 0; i < tileMap.length; i++) {
            if(tileMap[i] === "\n" || tileMap[i] === "\r") {
                matrix.push([]);
                lines++;
            } else {
                matrix[lines].push(tileMap[i]);
            }
        }
        this._tileMap = matrix;
    }

    /**
     * Return the tilemap
     */
    public get tileMap(): string[][] {
        return this._tileMap;
    }

    /**
     * Return the tile character
     * @param position
     */
    public getTile(position: Position2D): string {
        if(position.x < 0) return "x";
        if(position.y < 0) return "x";
        if(this._tileMap[position.y] === undefined) return "x";
        if(this._tileMap[position.y][position.x] === undefined) return "x";
        return this._tileMap[position.y][position.x];
    }

    /**
     * Convert the tile character into a number that is the height of the tile
     * @param position
     */
    public getTileHeight(position: Position2D): number {
        if(this.getTile(position) === 'x') return 0;
        const height: number = Number(this.getTile(position));
        if(isNaN(height)) {
            return this.getTile(position).charCodeAt(0) - 96 + 9;
        }
        return height;
    }

    /**
     * Return informations about the tile (if it's a stair, a door, if there is walls, ...)
     * @param position
     */
    public getTileInfo(position: Position2D): TileInfo {
        return {
            tile: this.isTile(position),
            door: this.isDoor(position),
            height: this.getTileHeight(position),
            stairType: this._getStairType(position),
            wallType: this._getWallType(position)
        }
    }

    /**
     * Return walls informations about the given tile
     * @param position
     * @private
     */
    private _getWallType(position: Position2D): WallType {
        const topLeftTile: Position2D = { x: position.x - 1, y: position.y - 1 };
        const topTile: Position2D = { x: position.x, y: position.y - 1 };
        const midLeftTile: Position2D = { x: position.x - 1, y: position.y };

        if(this.isDoor(position)) return null;

        if(!this.isTile(topLeftTile) && !this.isTile(topTile) && !this.isTile(midLeftTile) && this.isTile(position)) return WallType.CORNER_WALL;
        if(!this.isTile(midLeftTile) && this.isTile(position)) return WallType.LEFT_WALL;
        if(!this.isTile(topTile) && this.isTile(position)) return WallType.RIGHT_WALL;

        return null;
    }

    /**
     * Return stairs informations about the given tile
     * @param position
     * @private
     */
    private _getStairType(position: Position2D): { type: StairType, direction: Direction } {
        const topLeftTile: Position2D = { x: position.x - 1, y: position.y - 1 };
        const topTile: Position2D = { x: position.x, y: position.y - 1 };
        const topRightTile: Position2D = { x: position.x + 1, y: position.y - 1 };

        const midLeftTile: Position2D = { x: position.x - 1, y: position.y };
        const midRightTile: Position2D = { x: position.x + 1, y: position.y };

        const botLeftTile: Position2D = { x: position.x - 1, y: position.y + 1 };
        const botTile: Position2D = { x: position.x, y: position.y + 1 };
        const botRightTile: Position2D = { x: position.x + 1, y: position.y + 1 };

        if(this.isTile(position) && this.isTile(topRightTile) && this._getTileDifference(topRightTile, position) === 1 && this._getTileDifference(midRightTile, position) === 1 && this._getTileDifference(topTile, position) === 1) return { type: StairType.INNER_CORNER_STAIR, direction: Direction.NORTH_EAST };
        if(this.isTile(position) && this.isTile(botRightTile) && this._getTileDifference(botRightTile, position) === 1 && this._getTileDifference(midRightTile, position) === 1 && this._getTileDifference(botTile, position) === 1) return { type: StairType.INNER_CORNER_STAIR, direction: Direction.SOUTH_EAST };
        if(this.isTile(position) && this.isTile(botLeftTile) && this._getTileDifference(botLeftTile, position) === 1 && this._getTileDifference(midLeftTile, position) === 1 && this._getTileDifference(botTile, position) === 1) return { type: StairType.INNER_CORNER_STAIR, direction: Direction.SOUTH_WEST };
        if(this.isTile(position) && this.isTile(topLeftTile) && this._getTileDifference(topLeftTile, position) === 1 && this._getTileDifference(midLeftTile, position) === 1 && this._getTileDifference(topTile, position) === 1) return { type: StairType.INNER_CORNER_STAIR, direction: Direction.NORTH_WEST };
        if(this.isTile(position) && this.isTile(topTile) && this._getTileDifference(topTile, position) === 1) return { type: StairType.STAIR, direction: Direction.NORTH };
        if(this.isTile(position) && this.isTile(topRightTile) && this._getTileDifference(topRightTile, position) === 1 && this._getTileDifference(midRightTile, position) === 0 && this._getTileDifference(topTile, position) === 0) return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.NORTH_EAST };
        if(this.isTile(position) && this.isTile(midRightTile) && this._getTileDifference(midRightTile, position) === 1) return { type: StairType.STAIR, direction: Direction.EAST };
        if(this.isTile(position) && this.isTile(botRightTile) && this._getTileDifference(botRightTile, position) === 1 && this._getTileDifference(midRightTile, position) === 0 && this._getTileDifference(botTile, position) === 0) return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.SOUTH_EAST };
        if(this.isTile(position) && this.isTile(botTile) && this._getTileDifference(botTile, position) === 1) return { type: StairType.STAIR, direction: Direction.SOUTH };
        if(this.isTile(position) && this.isTile(botLeftTile) && this._getTileDifference(botLeftTile, position) === 1 && this._getTileDifference(midLeftTile, position) === 0 && this._getTileDifference(botTile, position) === 0) return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.SOUTH_WEST };
        if(this.isTile(position) && this.isTile(midLeftTile) && this._getTileDifference(midLeftTile, position) === 1) return { type: StairType.STAIR, direction: Direction.WEST };
        if(this.isTile(position) && this.isTile(topLeftTile) && this._getTileDifference(topLeftTile, position) === 1 && this._getTileDifference(midLeftTile, position) === 0 && this._getTileDifference(topTile, position) === 0) return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.NORTH_WEST,  };

        return null;
    }

    /**
     * Calculate the height differencte between two tiles
     * @param position1
     * @param position2
     * @private
     */
    private _getTileDifference(position1: Position2D, position2: Position2D): number {
        return Number(this.getTileHeight(position1)) - Number(this.getTileHeight(position2));
    }

    /**
     * Return a boolean that indicate if the tile exist
     * @param position
     */
    public isTile(position: Position2D): boolean {
        return this.getTile(position) !== "x";
    }

    /**
     * Return a boolean that indicate if the tile is a door
     * @param position
     */
    public isDoor(position: Position2D): boolean {
        const topLeftTile: Position2D = { x: position.x - 1, y: position.y - 1 };
        const topTile: Position2D = { x: position.x, y: position.y - 1 };

        const midLeftTile: Position2D = { x: position.x - 1, y: position.y };
        const midTile: Position2D = { x: position.x, y: position.y };

        const botLeftTile: Position2D = { x: position.x - 1, y: position.y + 1 };
        const botTile: Position2D = { x: position.x, y: position.y + 1 };

        return !this.isTile(topTile) && !this.isTile(topLeftTile) && !this.isTile(midLeftTile) && !this.isTile(botLeftTile) && !this.isTile(botTile) && this.isTile(midTile);
    }

    public get maxZ(): number {
        let z: number = 0;
        for(let y: number = 0; y < this._tileMap.length; y++) {
            for (let x: number = 0; x < this._tileMap[y].length; x++) {
                if(this.getTileHeight({ x: x, y: y }) > z) z = this.getTileHeight({ x: x, y: y });
            }
        }
        return z;
    }

    // TODO: Integrate it in _getWallType()
    public hasWall(position: Position2D): { x: boolean, y: boolean } {
        let wallX: boolean = false;
        let wallY: boolean = false;
        for (let i: number = position.y - 1; i >= 0; i--) {
            const wall: WallType = this._getWallType({ x: position.x, y: i });
            if(wall !== null) {
                if(wall === WallType.RIGHT_WALL || wall === WallType.CORNER_WALL) {
                    wallY = true;
                }
            }
            for (let j: number = position.x - 1; j >= 0; j--) {
                const wall: WallType = this._getWallType({ x: j, y: i });
                if(wall !== null) {
                    if(wall === WallType.LEFT_WALL || wall === WallType.CORNER_WALL) {
                        wallY = true;
                    }
                }
            }
        }
        for (let i: number = position.x - 1; i >= 0; i--) {
            const wall: WallType = this._getWallType({ x: i, y: position.y });
            if(wall !== null) {
                if(wall === WallType.LEFT_WALL || wall === WallType.CORNER_WALL) {
                    wallX = true;
                }
            }
            for (let j: number = position.y - 1; j >= 0; j--) {
                const wall: WallType = this._getWallType({ x: i, y: j });
                if(wall !== null) {
                    if(wall === WallType.RIGHT_WALL || wall === WallType.CORNER_WALL) {
                        wallX = true;
                    }
                }
            }
        }
        return { x: wallX, y: wallY };
    }



}
