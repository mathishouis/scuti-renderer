import { Room } from "../Room";
import { Position, Position2D, WallConfiguration } from "../../../interfaces/Room.interface";
import { Container, Graphics, Matrix, Texture, utils } from "pixi.js";
import { Material } from "../materials/Material";
import { WallType } from "../../../types/WallType";
import { WallMaterial } from "../materials/WallMaterial";

export class Wall extends Container {

    /**
     * The room instance
     * @private
     */
    private _room: Room;

    /**
     * The wall thickness
     * @private
     */
    private _thickness: number;

    /**
     * The wall material
     * @private
     */
    private _material: Material;

    /**
     * The wall height
     * @private
     */
    private _height: number;

    /**
     * The wall position
     * @private
     */
    private _position: Position;

    /**
     * The wall type
     * @private
     */
    private _type: WallType;

    /**
     *
     * @param room - The room instance
     * @param configuration - The wall configuration
     */
    constructor(
        room: Room,
        configuration: WallConfiguration
    ) {
        super();

        this._room = room;
        this._position = configuration.position;
        this._thickness = configuration.thickness ?? 8;
        this._material = configuration.material ?? new WallMaterial(this._room.engine, 112);
        // TODO: Implement wall height
        this._height = configuration.height ?? 1;
        this._type = configuration.type;

        this._draw();
    }

    /**
     * Select which wall should be drawn
     * @private
     */
    private _draw(): void {
        if(this._type === WallType.LEFT_WALL) {
            this._drawWall([
                {
                    x: - this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - this._height * 64
                },
                {
                    x: - this._thickness + 32,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 131 - this._height * 64
                },
                {
                    x: - this._thickness + 32 + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 131 + this._thickness / 2 - this._height * 64
                },
                {
                    x: - this._thickness + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 + this._thickness / 2 - this._height * 64
                },
            ]);
        } else if(this._type === WallType.RIGHT_WALL) {
            this._drawWall([
                {
                    x: 32,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - this._height * 64
                },
                {
                    x: 32 + this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - this._thickness / 2 - this._height * 64
                },
                {
                    x: 64 + this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 99 - this._thickness / 2 - this._height * 64
                },
                {
                    x: 64,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 99 - this._height * 64
                },
            ]);
        } else if(this._type === WallType.CORNER_WALL) {
            this._drawWall([
                {
                    x: 32 - this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - this._thickness / 2 - this._height * 64
                },
                {
                    x: 32,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - 2 * (this._thickness / 2) - this._height * 64
                },
                {
                    x: 32 + this._thickness,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - this._thickness / 2 - this._height * 64
                },
                {
                    x: 32,
                    y: - 16 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - this._height * 64
                },
            ]);
        } else if(this._type === WallType.DOOR_WALL) {
            this._drawWall([
                {
                    x: - this._thickness + 32,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 99 - this._height * 64
                },
                {
                    x: - this._thickness + 64,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 - this._height * 64
                },
                {
                    x: - this._thickness + 64 + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 115 + this._thickness / 2 - this._height * 64
                },
                {
                    x: - this._thickness + 32 + this._thickness,
                    y: - this._thickness / 2 + this._position.z * 32 - this._room.tileMap.maxZ * 32 - 99 + this._thickness / 2 - this._height * 64
                },
            ]);
        }
    }

    /**
     * Draw the wall
     * @param points
     * @private
     */
    private _drawWall(points: Position2D[]): void {
        const top: Graphics = new Graphics()
            .beginTextureFill({
                texture: Texture.WHITE,
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
            .lineTo(points[0].x, points[0].y + 115 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32 + this._height * 64)
            .lineTo(points[3].x, points[3].y + 115 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32 + this._height * 64)
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
                .lineTo(points[3].x, points[3].y + 22 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32 + this._height * 64)
                .lineTo(points[2].x, points[2].y + 22 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32 + this._height * 64);
        } else {
            right
                .lineTo(points[3].x, points[3].y + 115 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32 + this._height * 64)
                .lineTo(points[2].x, points[2].y + 115 + this._room.floorThickness + this._room.tileMap.maxZ * 32 - this._position.z * 32 + this._height * 64);
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
