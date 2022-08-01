import { Scuti } from "../../Scuti";
import { IRoomConfiguration } from "../../interfaces/IRoomConfiguration";
import { Container } from 'pixi.js';
import { Tile } from "./parts/Tile";
import { getMaxZ, parse } from "../../utils/TileMap";
import { Stair } from "./parts/Stair";
import { StairCorner } from "./parts/StairCorner";
import { StairType } from "../../types/StairType";
import { WallType } from "../../types/WallType";
import { Wall } from "./parts/Wall";
import { RoomMaterial } from "./RoomMaterial";
import { TileCursor } from "./parts/TileCursor";

export class Room {

    private _modelContainer?: Container;
    private _engine: Scuti;

    private _floorMaterial: RoomMaterial;
    private _wallMaterial: RoomMaterial;

    private _tileCursor: TileCursor;

    private _parsedTileMap: { type: string, z: number, direction?: number, shape?: StairType, wall: WallType }[][];

    private _tiles: (Tile | Stair | StairCorner)[] = [];
    private _walls: (Wall)[] = [];

    private _maxZ: number = 0;

    private _tileClick: (x: number, y: number, z: number) => void;
    private _tileOver: (x: number, y: number, z: number) => void;
    private _tileOut: (x: number, y: number, z: number) => void;

    constructor(engine: Scuti, configuration: IRoomConfiguration) {

        this._engine = engine;

        this._parsedTileMap = parse(configuration.tilemap);

        this._maxZ = getMaxZ(this._parsedTileMap);

        this._floorMaterial = this._engine.materials.getFloorMaterial(configuration.floorMaterial);
        this._wallMaterial = this._engine.materials.getWallMaterial(configuration.wallMaterial);

        this._updateHeightmap();

    }

    public set floorMaterial(material: RoomMaterial) {
        this._floorMaterial = material;
        this._updateHeightmap();
    }

    public get floorMaterial(): RoomMaterial {
        return this._floorMaterial;
    }

    public set wallMaterial(material: RoomMaterial) {
        this._wallMaterial = material;
        this._updateHeightmap();
    }

    public get wallMaterial(): RoomMaterial {
        return this._wallMaterial;
    }

    private _updateHeightmap(): void {

        this._modelContainer?.destroy();
        this._modelContainer = new Container();
        this._modelContainer.sortableChildren = true;

        this._modelContainer.x = window.innerWidth / 2;
        this._modelContainer.y = window.innerHeight / 6;

        this._createTileCursor(2, 2, 2);

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

    private _createTileCursor(x: number, y: number, z: number): void {

        const tilecursor = new TileCursor({ x: x, y: y, z: z, texture: this._engine.resources.get('tile_cursor').textures['tile_cursor_64_a_0_0.png'] });

        const position = Room._getPosition(x, y, z);

        tilecursor.x = position.x;
        tilecursor.y = position.y;

        this._modelContainer.removeChild(this._tileCursor);
        this._tileCursor?.destroy();
        this._tileCursor = tilecursor;
        this._modelContainer.addChild(tilecursor);

    }

    private _hideTileCursor() {
        this._modelContainer.removeChild(this._tileCursor);
        this._tileCursor?.destroy();
    }

    private _createWall(x: number, y: number, z: number, type: WallType, door?: boolean): void {

        const wall = new Wall({ color: this.wallMaterial.color, thickness: 8, door: door, tileThickness: 8, type: type, maxZ: this._maxZ, roomZ: z, texture: this.wallMaterial.texture });
        const position = Room._getPosition(x, y, z);

        wall.x = position.x;
        wall.y = position.y;

        this._walls.push(wall);
        this._modelContainer?.addChild(wall);
    }

    private _createDoor(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this.floorMaterial.color, thickness: 0, texture: this.floorMaterial.texture },
            () => { this._tileClick(x, y, z); },
            () => { this._tileOver(x, y, z); this._createTileCursor(x, y, z); },
            () => { this._tileOut(x, y, z); this._hideTileCursor(); });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createTile(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this.floorMaterial.color, thickness: 8, texture: this.floorMaterial.texture },
            () => { this._tileClick(x, y, z); },
            () => { this._tileOver(x, y, z); this._createTileCursor(x, y, z); },
            () => { this._tileOut(x, y, z); this._hideTileCursor(); });

        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createStair(x: number, y: number, z: number, direction: number): void {

        const tile = new Stair({ color: this.floorMaterial.color, tileThickness: 8, direction: direction, texture: this.floorMaterial.texture });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createStairCorner(x: number, y: number, z: number, direction: number, type: StairType): void {

        const tile = new StairCorner({ color: this.floorMaterial.color, tileThickness: 8, direction: direction, type: type, texture: this.floorMaterial.texture });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private static _getPosition(x: number, y: number, z: number): { x: number, y: number } {
        return { x: 32 * x - 32 * y, y: 16 * x + 16 * y - 32 * z };
    }

    public get tileClick() {
        return this._tileClick;
    }

    public set tileClick(value) {
        this._tileClick = value;
    }

    public get tileOver() {
        return this._tileOver;
    }

    public set tileOver(value) {
        this._tileOver = value;
    }

    public get tileOut() {
        return this._tileOut;
    }

    public set tileOut(value) {
        this._tileOut = value;
    }

}