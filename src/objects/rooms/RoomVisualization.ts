import { Room } from "./Room";
import { Container, Ticker } from "pixi.js";
import { IPosition3D, ITileInfo } from "../../interfaces/Room.interface";
import { Tile } from "./parts/Tile";
import { Wall } from "./parts/Wall";
import { Stair } from "./parts/Stair";
import { WallType } from "../../enums/WallType";
import { StairType } from "../../enums/StairType";
import { Cursor } from "./parts/Cursor";
import {RoomObjectContainer} from "./RoomObjectContainer";

/**
 * RoomVisualization class that manage all the rendering part of the room.
 *
 * @class
 * @memberof Scuti
 */
export class RoomVisualization extends Container {

    /**
     * The room instance that will be managed by the camera.
     *
     * @member {Room}
     * @private
     */
    private readonly _room: Room;

    /**
     * The container that will contains all the walls objects.
     *
     * @member {Container}
     * @private
     */
    private _wallLayer: Container = new Container();

    /**
     * The container that will contains all the tiles objects.
     *
     * @member {Container}
     * @private
     */
    private _tileLayer: Container = new Container();

    /**
     * The container that will contains all the objects like avatars or furnitures.
     *
     * @member {RoomObjectContainer}
     * @private
     */
    private _objectLayer: RoomObjectContainer;

    /**
     * List containing all the walls instances.
     *
     * @member {Wall}
     * @private
     */
    private _walls: (Wall)[] = [];

    /**
     * List containing all the tiles and stairs instances.
     *
     * @member {Tile | Stair}
     * @private
     */
    private _tiles: (Tile | Stair)[] = [];

    /**
     * The room tile cursor instance.
     *
     * @member {Cursor}
     * @private
     */
    private _cursor: Cursor;

    /**
     * The room animation ticker instance that will manage all the objects animations
     *
     * @member {Ticker}
     * @private
     */
    private _animationTicker: Ticker = new Ticker();

    // TODO: Comment this and also add furniture interaction
    private _onTileClick: (position: IPosition3D) => void;
    private _onTileOver: (position: IPosition3D) => void;
    private _onTileOut: (position: IPosition3D) => void;

    /**
     * @param {Room} [room] - The room instance that we want to visualize.
     */
    constructor(
        room: Room
    ) {
        super();

        this._room = room;
        this._objectLayer = new RoomObjectContainer(this._room);
        /** Add layers to the visualization */
        this.addChild(this._wallLayer);
        this.addChild(this._tileLayer);
        this.addChild(this._objectLayer);
        /** Start the animation ticker */
        //this._animationTicker.maxFPS = 15.666;
        this._animationTicker.maxFPS = 4;
        this._animationTicker.start();
        /** Render everything */
        this._draw();
    }

    /**
     * Destroy all the parts (tiles, walls, stairs, ...).
     *
     * @return {void}
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
     * Draw the room visualization with all the tiles and walls.
     *
     * @return {void}
     * @private
     */
    private _draw(): void {
        this._destroyParts();
        for (let y = 0; y < this._room.tileMap.tileMap.length; y++) {
            for (let x = 0; x < this._room.tileMap.tileMap[y].length; x++) {
                const tileInfo: ITileInfo = this._room.tileMap.getTileInfo({
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
     * Create a room part and add it into the visualization.
     *
     * @param {ITileInfo} [tileInfo] - The tile informations where we want to create the part.
     * @param {IPosition3D} [position] - And the position.
     * @return {void}
     * @private
     */
    private _createPart(
        tileInfo: ITileInfo,
        position: IPosition3D
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
     * Destroy the current cursor and draw a new one at the new position.
     *
     * @param {IPosition3D} [position] - The cursor position.
     * @return {void}
     * @private
     */
    private _createCursor(
        position: IPosition3D
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
     *
     * @return {void}
     * @private
     */
    private _destroyCursor(): void {
        this._objectLayer.removeChild(this._cursor);
        this._cursor?.destroy();
    }

    /**
     * Create a tile.
     *
     * @param {IPosition3D} [position] - The tile position.
     * @return {void}
     * @private
     */
    private _createTile(
        position: IPosition3D
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
     * Create a door.
     *
     * @param {IPosition3D} [position] - The door position.
     * @return {void}
     * @private
     */
    private _createDoor(
        position: IPosition3D
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
     * Create a wall.
     *
     * @param {IPosition3D} [position] - The wall position.
     * @param {WallType} [type] - The wall type.
     * @return {void}
     * @private
     */
    private _createWall(
        position: IPosition3D,
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
     * Create stairs.
     *
     * @param {IPosition3D} [position] - The stairs position.
     * @param {StairType} [type] - The stairs type.
     * @return {void}
     * @private
     */
    private _createStair(
        position: IPosition3D,
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
     * Reference to the room visualization room instance.
     *
     * @member {Room}
     * @readonly
     * @public
     */
    public get room(): Room {
        return this._room;
    }

    /**
     * Reference to the tile layer container.
     *
     * @member {Container}
     * @readonly
     * @public
     */
    public get tileLayer(): Container {
        return this._tileLayer;
    }

    /**
     * Reference to the wall layer container.
     *
     * @member {Container}
     * @readonly
     * @public
     */
    public get wallLayer(): Container {
        return this._wallLayer;
    }

    /**
     * Reference to the object layer container.
     *
     * @member {RoomObjectContainer}
     * @readonly
     * @public
     */
    public get objectLayer(): RoomObjectContainer {
        return this._objectLayer;
    }

    // TODO: Comment this part
    /**
     * Get the onTileClick event
     */
    public get onTileClick(): (position: IPosition3D) => void {
        return this._onTileClick;
    }

    /**
     * Update the onTileClick event
     * @param event
     */
    public set onTileClick(
        event: (position: IPosition3D) => void
    ) {
        this._onTileClick = event;
    }

    /**
     * Get the onTileOver event
     */
    public get onTileOver(): (position: IPosition3D) => void {
        return this._onTileOver;
    }

    /**
     * Update the onTileClick event
     * @param event
     */
    public set onTileOver(
        event: (position: IPosition3D) => void
    ) {
        this._onTileOver = event;
    }

    /**
     * Get the onTileOut event
     */
    public get onTileOut(): (position: IPosition3D) => void {
        return this._onTileOut;
    }

    /**
     * Update the onTileOutEvent
     * @param event
     */
    public set onTileOut(
        event: (position: IPosition3D) => void
    ) {
        this._onTileOut = event;
    }

    /**
     * Reference to the room animation ticker instance.
     *
     * @member {Ticker}
     * @readonly
     * @public
     */
    public get animationTicker(): Ticker {
        return this._animationTicker;
    }

}
