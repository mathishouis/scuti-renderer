import { Scuti } from "../../Scuti";
import { IRoomConfiguration } from "../../interfaces/IRoomConfiguration";
import { Container } from 'pixi.js';
import { Tile } from "./parts/Tile";
import {getMaxZ, parse} from "../../utils/TileMap";
import { Stair } from "./parts/Stair";
import { StairCorner } from "./parts/StairCorner";
import { StairType } from "../../types/StairType";
import { WallType } from "../../types/WallType";
import { Wall } from "./parts/Wall";
import { Assets } from '@pixi/assets';
import { Texture } from 'pixi.js';

export class Room {

    private _modelContainer?: Container;
    private _engine: Scuti;

    private _tileColor: number;
    private _wallColor: number;

    private _wallTexture: Texture | undefined;
    private _floorTexture: Texture | undefined;

    private _parsedTileMap: { type: string, z: number, direction?: number, shape?: StairType, wall: WallType }[][];

    private _tiles: (Tile | Stair | StairCorner)[] = [];
    private _walls: (Wall)[] = [];

    private _maxZ: number = 0;

    constructor(engine: Scuti, configuration: IRoomConfiguration) {
        this._engine = engine;

        this._tileColor = configuration.tileColor;
        this._wallColor = configuration.wallColor;

        this._parsedTileMap = parse(configuration.tilemap);

        this._maxZ = getMaxZ(this._parsedTileMap);

        this._engine.resources.get('room', 'generic/room/room.json').then((value) => {
            this.floorTexture = value.textures['room_floor_texture_64_0_floor_basic.png'];
            console.log(value);
        });
        this._engine.resources.get('room', 'generic/room/room.json').then((value) => {
            this.wallTexture = value.textures['room_wall_texture_64_3_wall_color_brick2.png'];
        });
    }

    public set wallTexture(texture: Texture) {
        this._wallTexture = texture;
        this._updateHeightmap();
    }

    public get wallTexture(): Texture {
        return this._wallTexture;
    }

    public set floorTexture(texture: Texture) {
        this._floorTexture = texture;
        this._updateHeightmap();
    }

    public get floorTexture(): Texture {
        return this._floorTexture;
    }

    private _updateHeightmap(): void {

        this._modelContainer?.destroy();
        this._modelContainer = new Container();

        this._modelContainer.x = window.innerWidth / 2;
        this._modelContainer.y = window.innerHeight / 6;

        for (let y = 0; y < this._parsedTileMap.length; y++) {
            for (let x = 0; x < this._parsedTileMap[y].length; x++) {
                if(this._parsedTileMap[y][x].wall || this._parsedTileMap[y][x].type === "door") {
                    if(this._parsedTileMap[y][x].wall === "corner") {
                        this._createWall(x, y, this._parsedTileMap[y][x].z, "corner");
                        this._createWall(x, y, this._parsedTileMap[y][x].z, "left");
                        this._createWall(x, y, this._parsedTileMap[y][x].z, "right");
                    }
                    if(this._parsedTileMap[y][x].wall === "left") {
                        this._createWall(x, y, this._parsedTileMap[y][x].z, "left");
                    }
                    if(this._parsedTileMap[y][x].wall === "right") {
                        this._createWall(x, y, this._parsedTileMap[y][x].z, "right");
                    }
                    if(this._parsedTileMap[y][x].type === "door") {
                        this._createWall(x, y, this._parsedTileMap[y][x].z, "left", true);
                    }
                }
                if(this._parsedTileMap[y][x].type === "tile") {
                    this._createTile(x, y, this._parsedTileMap[y][x].z);
                } else if(this._parsedTileMap[y][x].type === "door") {
                    this._createDoor(x, y, this._parsedTileMap[y][x].z);
                } else if(this._parsedTileMap[y][x].type === "stair") {
                    if(this._parsedTileMap[y][x].direction % 2 === 0) {
                        this._createStair(x, y, this._parsedTileMap[y][x].z, this._parsedTileMap[y][x].direction);
                    } else {
                        this._createStairCorner(x, y, this._parsedTileMap[y][x].z, this._parsedTileMap[y][x].direction, this._parsedTileMap[y][x].shape);
                    }
                }
            }
        }

        this._engine.application.stage.addChild(this._modelContainer);

    }

    private _createWall(x: number, y: number, z: number, type: WallType, door?: boolean): void {

        const wall = new Wall({ color: this._wallColor, thickness: 8, door: door, tileThickness: 8, type: type, maxZ: this._maxZ, roomZ: z, texture: this.wallTexture });
        const position = Room._getPosition(x, y, z);

        wall.x = position.x;
        wall.y = position.y;

        this._walls.push(wall);
        this._modelContainer?.addChild(wall);
    }

    private _createDoor(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this._tileColor, thickness: 0, texture: this.floorTexture });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createTile(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this._tileColor, thickness: 8, texture: this.floorTexture });

        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createStair(x: number, y: number, z: number, direction: number): void {

        const tile = new Stair({ color: this._tileColor, tileThickness: 8, direction: direction, texture: this.floorTexture });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createStairCorner(x: number, y: number, z: number, direction: number, type: StairType): void {

        const tile = new StairCorner({ color: this._tileColor, tileThickness: 8, direction: direction, type: type, texture: this._floorTexture });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private static _getPosition(x: number, y: number, z: number): { x: number, y: number } {
        return { x: 32 * x - 32 * y, y: 16 * x + 16 * y - 32 * z };
    }

}