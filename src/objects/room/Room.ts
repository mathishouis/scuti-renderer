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

export class Room {

    private _modelContainer?: Container;
    private _engine: Scuti;

    /*private _tileColor: number;
    private _wallColor: number;

    private _wallTexture: Texture | undefined;
    private _floorTexture: Texture | undefined;*/

    private _floorMaterial: RoomMaterial;
    private _wallMaterial: RoomMaterial;

    private _parsedTileMap: { type: string, z: number, direction?: number, shape?: StairType, wall: WallType }[][];

    private _tiles: (Tile | Stair | StairCorner)[] = [];
    private _walls: (Wall)[] = [];

    private _maxZ: number = 0;

    constructor(engine: Scuti, configuration: IRoomConfiguration) {
        this._engine = engine;

        /*this._tileColor = configuration.tileColor;
        this._wallColor = configuration.wallColor;*/

        this._parsedTileMap = parse(configuration.tilemap);

        this._maxZ = getMaxZ(this._parsedTileMap);

        this._floorMaterial = this._engine.materials.getFloorMaterial(configuration.floorMaterial);
        this._wallMaterial = this._engine.materials.getWallMaterial(configuration.wallMaterial);

        console.log(this._floorMaterial.texture)

        this._updateHeightmap();

        /*this._engine.resources.get('room2', 'generic/room/room_data.json').then((value) => {
            this._engine.resources.get('room', 'generic/room/room.json').then((value2) => {
                let texture = value2.textures['room_wall_texture_64_3_wall_color_brick2.png'];
                let sprite = new Sprite(texture);
                let texture2 = this._engine.application.renderer.generateTexture(sprite);
                let image = this._engine.application.renderer.plugins.extract.image(texture2)
                texture2.baseTexture.resource = new BaseImageResource(image);
                this.floorTexture = new Texture(texture2);
                console.log(value2);
            });
        });
        this._engine.resources.get('room', 'generic/room/room.json').then((value) => {
            this.wallTexture = value.textures['room_floor_texture_64_0_floor_basic.png'];
        });*/
        /*console.log(this._engine.resources.get('room_data'));
        let texture = this._engine.resources.get('room').textures['room_wall_texture_64_3_wall_color_brick2.png'];
        let sprite = new Sprite(texture);
        let texture2 = this._engine.application.renderer.generateTexture(sprite);
        let image = this._engine.application.renderer.plugins.extract.image(texture2)
        texture2.baseTexture.resource = new BaseImageResource(image);
        this.floorTexture = new Texture(texture2);*/
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

        const wall = new Wall({ color: this.wallMaterial.color, thickness: 8, door: door, tileThickness: 8, type: type, maxZ: this._maxZ, roomZ: z, texture: this.wallMaterial.texture });
        const position = Room._getPosition(x, y, z);

        wall.x = position.x;
        wall.y = position.y;

        this._walls.push(wall);
        this._modelContainer?.addChild(wall);
    }

    private _createDoor(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this.floorMaterial.color, thickness: 0, texture: this.floorMaterial.texture });
        const position = Room._getPosition(x, y, z);

        tile.x = position.x;
        tile.y = position.y;

        this._tiles.push(tile);
        this._modelContainer?.addChild(tile);
    }

    private _createTile(x: number, y: number, z: number): void {

        const tile = new Tile({ color: this.floorMaterial.color, thickness: 8, texture: this.floorMaterial.texture });

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

}