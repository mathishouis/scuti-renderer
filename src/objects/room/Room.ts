import { Scuti } from "../../Scuti";
import { IRoomConfiguration } from "../../interfaces/IRoomConfiguration";
import { Container } from 'pixi.js';
import { Tile } from "./parts/Tile";
import { parse } from "../../utils/TileMap";
import { Stair } from "./parts/Stair";
import { StairCorner } from "./parts/StairCorner";
import {StairType} from "../../types/StairType";

export class Room {

    private _modelContainer?: Container;
    private _engine: Scuti;

    private _tileColor: number;
    private _wallColor: number;

    private _parsedTileMap: { type: string, z: number, direction?: number, shape?: StairType }[][];

    private _tiles: (Tile | Stair | StairCorner)[] = [];

    constructor(engine: Scuti, configuration: IRoomConfiguration) {
        this._engine = engine;

        this._tileColor = configuration.tileColor;
        this._wallColor = configuration.wallColor;

        this._parsedTileMap = parse(configuration.tilemap);

        this._updateHeightmap();
    }

    private _updateHeightmap(): void {

        this._modelContainer?.destroy();
        this._modelContainer = new Container();

        this._modelContainer.x = window.innerWidth / 2;
        this._modelContainer.y = window.innerHeight / 2;



        for (let y = 0; y < this._parsedTileMap.length; y++) {
            for (let x = 0; x < this._parsedTileMap[y].length; x++) {
                if(this._parsedTileMap[y][x].type === "tile") {
                    this._createTile(x, y, this._parsedTileMap[y][x].z);
                } else if(this._parsedTileMap[y][x].type === "door") {
                    this._createDoor(x, y, this._parsedTileMap[y][x].z);
                } else if(this._parsedTileMap[y][x].type === "stair") {
                    if(this._parsedTileMap[y][x].direction % 2 === 0) {
                        this._createStair(x, y, this._parsedTileMap[y][x].z, this._parsedTileMap[y][x].direction, this._parsedTileMap[y][x].shape);
                    } else {
                        this._createStairCorner(x, y, this._parsedTileMap[y][x].z, this._parsedTileMap[y][x].direction);
                    }
                }
            }
        }

        this._engine.application.stage.addChild(this._modelContainer);

    }

    private _createDoor(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this._tileColor, tileThickness: 0 });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createTile(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this._tileColor, tileThickness: 8 });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createStair(x: number, y: number, z: number, direction: number, type: StairType): void {

        const tile = new Stair({ color: this._tileColor, tileThickness: 8, direction: direction, type: type });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createStairCorner(x: number, y: number, z: number, direction: number): void {

        const tile = new StairCorner({ color: this._tileColor, tileThickness: 8, direction: direction });
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