import { Room } from "./Room";
import { Container } from "pixi.js";
import { Position, TileInfo } from "../../interfaces/Room.interface";
import { Tile } from "./parts/Tile";
import { Wall } from "./parts/Wall";
import { Stair } from "./parts/Stair";
import { WallType } from "../../types/WallType";
import { StairType } from "../../types/StairType";
import { Cursor } from "./parts/Cursor";

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
     * The pixi container that contain all the objects
     * @private
     */
    private _objectLayer: Container = new Container();

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
     * The room tile cursor
     * @private
     */
    private _cursor: Cursor;

    private _onTileClick: (position: Position) => void;
    private _onTileOver: (position: Position) => void;
    private _onTileOut: (position: Position) => void;

    /**
     * RoomVisualization class
     * @param room - The room instance
     */
    constructor(room: Room) {
        super();

        this._room = room;

        this.addChild(this._wallLayer);
        this.addChild(this._tileLayer);
        this.addChild(this._objectLayer);

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
            } else if(tileInfo.wallType === WallType.CORNER_WALL && !this._room.tileMap.hasWall(position).x) {
                this._createWall(position, WallType.LEFT_WALL);
            } else if(tileInfo.wallType === WallType.CORNER_WALL && !this._room.tileMap.hasWall(position).y) {
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
            this._createDoor(position);
        } else if(tileInfo.tile) {
            this._createTile(position);
        }
    }

    /**
     * Destroy the current cursor and draw a new one at the new position
     * @param position
     * @private
     */
    private _createCursor(
        position: Position
    ): void {
        this._destroyCursor();
        const cursor = new Cursor(this._room, {
            position: position
        });
        this._objectLayer.addChild(cursor);
        this._cursor = cursor;
    }

    /**
     * Destroy the room cursor
     * @private
     */
    private _destroyCursor(): void {
        this._objectLayer.removeChild(this._cursor);
        this._cursor?.destroy();
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
        tile.onClick = (): void => { if(this._onTileClick) this._onTileClick(position) };
        tile.onOver = (): void => { if(this._onTileOver) this._onTileOver(position); this._createCursor(position) };
        tile.onOut = (): void => { if(this._onTileOut) this._onTileOut(position); this._destroyCursor(); };
        this._tileLayer.addChild(tile);
        this._tiles.push(tile);
    }

    /**
     * Create a door
     * @param position
     * @private
     */
    private _createDoor(
        position: Position
    ): void {
        const tile = new Tile(this._room, {
            position: position,
            material: this._room.floorMaterial,
            thickness: 0
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
            height: this._room.wallHeight,
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

    /**
     * Return the tile layer
     */
    public get tileLayer(): Container {
        return this._tileLayer;
    }

    /**
     * Return the wall layer
     */
    public get wallLayer(): Container {
        return this._wallLayer;
    }

    /**
     * Get the onTileClick event
     */
    public get onTileClick(): (position: Position) => void {
        return this._onTileClick;
    }

    /**
     * Update the onTileClick event
     * @param event
     */
    public set onTileClick(event: (position: Position) => void) {
        this._onTileClick = event;
    }

    /**
     * Get the onTileOver event
     */
    public get onTileOver(): (position: Position) => void {
        return this._onTileOver;
    }

    /**
     * Update the onTileClick event
     * @param event
     */
    public set onTileOver(event: (position: Position) => void) {
        this._onTileOver = event;
    }

    /**
     * Get the onTileOut event
     */
    public get onTileOut(): (position: Position) => void {
        return this._onTileOut;
    }

    /**
     * Update the onTileOutEvent
     * @param event
     */
    public set onTileOut(event: (position: Position) => void) {
        this._onTileOut = event;
    }

}
