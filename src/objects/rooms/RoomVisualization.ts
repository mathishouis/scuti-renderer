import { Room } from "./Room";
import { Container } from "pixi.js";
import { Position, TileInfo } from "../../interfaces/Room.interface";
import { Tile } from "./parts/Tile";
import { Wall } from "./parts/Wall";
import { Stair } from "./parts/Stair";
import { WallType } from "../../types/WallType";
import { StairType } from "../../types/StairType";

export class RoomVisualization extends Container {

    /**
     * The room that is being rendered
     * @private
     */
    private _room: Room;

    /**
     * The pixi container that contain all the walls parts
     * @private
     */
    private _wallLayer: Container = new Container();

    /**
     * The pixi container that contain all the tiles parts
     * @private
     */
    private _tileLayer: Container = new Container();

    /**
     * List containing all the walls instances
     * @private
     */
    private _walls: (Wall)[] = [];

    /**
     * List containing all the tiles and stairs instances
     * @private
     */
    private _tiles: (Tile | Stair)[] = [];

    /**
     * RoomVisualization class
     * @param room - The room instance
     */
    constructor(room: Room) {
        super();

        this._room = room;

        this.addChild(this._wallLayer);
        this.addChild(this._tileLayer);

        this._draw();
    }

    /**
     * Destroy all the parts (tiles, walls, stairs, ...)
     * @private
     */
    private _destroyParts(): void {
        [...this._tiles, ...this._walls].forEach((part: Tile | Stair | Wall) =>
            part.destroy()
        );
        this._tiles = [];
        this._walls = [];
    }

    /**
     * Draw the room visualization
     * @private
     */
    private _draw(): void {
        this._destroyParts();
        for (let y = 0; y < this._room.tileMap.tileMap.length; y++) {
            for (let x = 0; x < this._room.tileMap.tileMap[y].length; x++) {
                const tileInfo: TileInfo = this._room.tileMap.getTileInfo({
                    x: x,
                    y: y
                });
                this._createPart(tileInfo, {
                    x: x,
                    y: y,
                    z: tileInfo.height
                });
            }
        }
    }

    /**
     * Create a room part
     * @param tileInfo
     * @param position
     * @private
     */
    private _createPart(
        tileInfo: TileInfo,
        position: Position
    ): void {
        if(tileInfo.wallType !== null || tileInfo.door) {
            if(tileInfo.wallType === WallType.CORNER_WALL && !this._room.tileMap.hasWall(position).x && !this._room.tileMap.hasWall(position).y) {
                this._createWall(position, WallType.CORNER_WALL);
                this._createWall(position, WallType.LEFT_WALL);
                this._createWall(position, WallType.RIGHT_WALL);
            }
            if(tileInfo.wallType === WallType.LEFT_WALL && !this._room.tileMap.hasWall(position).x) this._createWall(position, WallType.LEFT_WALL);
            if(tileInfo.wallType === WallType.RIGHT_WALL && !this._room.tileMap.hasWall(position).y) this._createWall(position, WallType.RIGHT_WALL);
            if(tileInfo.door) this._createWall(position, WallType.DOOR_WALL);
        }
        if(tileInfo.stairType !== null) {
            position.direction = tileInfo.stairType.direction;
            this._createStair(position, tileInfo.stairType.type);
        } else if(tileInfo.door) {
            this._createTile(position); // TODO: Door tile
        } else if(tileInfo.tile) {
            this._createTile(position);
        }
    }

    /**
     * Create a tile
     * @param position
     * @private
     */
    private _createTile(
        position: Position
    ): void {
        const tile = new Tile(this._room, {
            position: position,
            material: this._room.floorMaterial,
            thickness: this._room.floorThickness
        });
        this._tileLayer.addChild(tile);
        this._tiles.push(tile);
    }

    /**
     * Create a wall
     * @param position
     * @param type
     * @param door
     * @private
     */
    private _createWall(
        position: Position,
        type: WallType
    ): void {
        const wall = new Wall(this._room, {
            position: position,
            material: this._room.wallMaterial,
            thickness: this._room.wallThickness,
            type: type
        });
        this._wallLayer.addChild(wall);
        this._walls.push(wall);
    }

    /**
     * Create stairs
     * @param position
     * @param type
     * @private
     */
    private _createStair(
        position: Position,
        type: StairType
    ): void {
        const stair = new Stair(this._room, {
            position: position,
            material: this._room.floorMaterial,
            thickness: this._room.floorThickness,
            type: type
        });
        this._tileLayer.addChild(stair);
        this._tiles.push(stair);
    }

    /**
     * Return the room
     */
    public get room(): Room {
        return this._room;
    }

    /**
     * Change the room
     * @param room
     */
    public set room(room: Room) {
        this._room = room;
    }

}
