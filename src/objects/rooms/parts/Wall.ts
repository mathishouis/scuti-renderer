import {Room} from "../Room";
import {Position, Position2D, WallConfiguration} from "../../../interfaces/Room.interface";
import {Container, Graphics, Matrix, Texture, utils} from "pixi.js";
import {RoomMaterial} from "../RoomMaterial";
import {WallType} from "../../../types/WallType";

export class Wall extends Container {

    private _room: Room;

    private _thickness: number;

    private _material: RoomMaterial;

    private _height: number;

    private _position: Position;

    private _type: WallType;

    constructor(
        room: Room,
        configuration: WallConfiguration
    ) {
        super();

        this._room = room;
        this._position = configuration.position;
        this._thickness = configuration.thickness ?? 8;
        this._material = configuration.material ?? new RoomMaterial(0xFFFFFF, Texture.WHITE);
        // TODO: Implement wall height
        this._height = configuration.height ?? 1;
        this._type = configuration.type;

        this._draw();
    }

    private _draw(): void {
        if(this._type === WallType.LEFT_WALL) {
            this._drawWall([
                {
                    x: - this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123
                },
                {
                    x: - this._thickness + 32,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 139
                },
                {
                    x: - this._thickness + 32 + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 139 + this._thickness / 2
                },
                {
                    x: - this._thickness + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123 + this._thickness / 2
                },
            ]);
        } else if(this._type === WallType.RIGHT_WALL) {
            this._drawWall([
                {
                    x: 32,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123
                },
                {
                    x: 32 + this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123 - this._thickness / 2
                },
                {
                    x: 64 + this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 107 - this._thickness / 2
                },
                {
                    x: 64,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 107
                },
            ]);
        } else if(this._type === WallType.CORNER_WALL) {
            this._drawWall([
                {
                    x: 32 - this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123 - this._thickness / 2
                },
                {
                    x: 32,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123 - 2 * (this._thickness / 2)
                },
                {
                    x: 32 + this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123 - this._thickness / 2
                },
                {
                    x: 32,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123
                },
            ]);
        } else if(this._type === WallType.DOOR_WALL) {
            this._drawWall([
                {
                    x: - this._thickness + 32,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 107
                },
                {
                    x: - this._thickness + 64,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123
                },
                {
                    x: - this._thickness + 64 + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 123 + this._thickness / 2
                },
                {
                    x: - this._thickness + 32 + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 107 + this._thickness / 2
                },
            ]);
        }
    }

    private _drawWall(points: Position2D[]): void {
        const top: Graphics = new Graphics()
            .beginTextureFill({
                texture: this._material.texture,
                color: utils.premultiplyTint(this._material.color, 0.61)
            })
            .moveTo(points[0].x, points[0].y)
            .lineTo(points[1].x, points[1].y)
            .lineTo(points[2].x, points[2].y)
            .lineTo(points[3].x, points[3].y)
            .lineTo(points[0].x, points[0].y)
            .endFill();
        const left: Graphics = new Graphics()
            .beginTextureFill({
                texture: this._type === WallType.RIGHT_WALL ? this._material.texture : Texture.WHITE,
                color: utils.premultiplyTint(this._material.color, 1),
                matrix: new Matrix(1, 0.5, 0, 1, points[0].x, points[0].y)
            })
            .moveTo(points[0].x, points[0].y)
            .lineTo(points[0].x, points[0].y + 123 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32)
            .lineTo(points[3].x, points[3].y + 123 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32)
            .lineTo(points[3].x, points[3].y)
            .endFill();
        const right: Graphics = new Graphics()
            .beginTextureFill({
                texture: (this._type === WallType.LEFT_WALL || this._type === WallType.DOOR_WALL) ? this._material.texture : Texture.WHITE,
                color: utils.premultiplyTint(this._material.color, 0.8),
                matrix: new Matrix(1, -0.5, 0, 1, points[0].x + this._thickness, points[0].y + 4)
            })
            .moveTo(points[3].x, points[3].y);

        if(this._type === WallType.DOOR_WALL) {
            right
                .lineTo(points[3].x, points[3].y + 37 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32)
                .lineTo(points[2].x, points[2].y + 37 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32);
        } else {
            right
                .lineTo(points[3].x, points[3].y + 123 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32)
                .lineTo(points[2].x, points[2].y + 123 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32);
        }
        right
            .lineTo(points[2].x, points[2].y)
            .lineTo(points[3].x, points[3].y)
            .endFill();

        this.addChild(top);
        this.addChild(left);
        this.addChild(right);

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

}
