import {Room} from "../Room";
import {Position, Position2D, StairConfiguration} from "../../../interfaces/Room.interface";
import {Container, Graphics, Matrix, Texture, utils} from "pixi.js";
import {RoomMaterial} from "../RoomMaterial";
import {StairType} from "../../../types/StairType";
import {Direction} from "../../../types/Direction";

export class Stair extends Container {

    private _room: Room;

    private _thickness: number;

    private _material: RoomMaterial;

    private _position: Position;

    private _type: StairType;

    constructor(
        room: Room,
        configuration: StairConfiguration
    ) {
        super();

        this._room = room;
        this._position = configuration.position;
        this._thickness = configuration.thickness ?? 8;
        this._material = configuration.material ?? new RoomMaterial(0xFFFFFF, Texture.WHITE);
        this._type = configuration.type;

        this._draw();
    }

    private _draw(): void {
        if(this._type === StairType.STAIR) {
            switch (this._position.direction) {
                case Direction.NORTH:
                    this._drawStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 40, y: 12},
                        {x: 32, y: 16},
                    ], [
                        {x: 8, y: -12},
                        {x: 0, y: 0}
                    ]);
                    break;
                case Direction.EAST:
                    this._drawStair([
                        {x: 0, y: 0},
                        {x: 32, y: -16},
                        {x: 40, y: -12},
                        {x: 8, y: 4},
                    ], [
                        {x: 8, y: -4},
                        {x: 0, y: 0}
                    ]);
                    break;
                case Direction.SOUTH:
                    this._drawStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 40, y: 12},
                        {x: 32, y: 16},
                    ], [
                        {x: -8, y: -4},
                        {x: 24, y: -12}
                    ]);
                    break;
                case Direction.WEST:
                    this._drawStair([
                        {x: 0, y: 0},
                        {x: 32, y: -16},
                        {x: 40, y: -12},
                        {x: 8, y: 4},
                    ], [
                        {x: -8, y: -12},
                        {x: 24, y: 12}
                    ]);
                    break;
            }
        } else if(this._type === StairType.OUTER_CORNER_STAIR) {
            switch (this._position.direction) {
                case Direction.NORTH_EAST:
                    this._drawCornerStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ], [
                        {x: 16, y: -8},
                        {x: 24, y: -12},
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                    ]);
                    break;
                case Direction.SOUTH_EAST:
                    this._drawCornerStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: -8, y: 4},
                        {x: 24, y: -12},
                        {x: 0, y: 0},
                    ]);
                    break;
                case Direction.SOUTH_WEST:
                    this._drawCornerStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ], [
                        {x: -8, y: -4},
                        {x: 16, y: 16},
                        {x: 24, y: -12},
                        {x: -16, y: -8},
                    ]);
                    break;
                case Direction.NORTH_WEST:
                    this._drawCornerStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ], [
                        {x: 8, y: -12},
                        {x: 48, y: 0},
                        {x: 0, y: 0},
                        {x: -8, y: -12},
                    ]);
                    break;
            }
        } else if(this._type === StairType.INNER_CORNER_STAIR) {
            switch (this._position.direction) {
                case Direction.NORTH_EAST:
                    this._drawCornerStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ], [
                        {x: -8, y: 12},
                        {x: 16, y: 16},
                        {x: 24, y: -36},
                        {x: -16, y: 8},
                    ]);
                    break;
                case Direction.SOUTH_EAST:
                    break;
                case Direction.SOUTH_WEST:
                    this._drawCornerStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ], [
                        {x: 16, y: 8},
                        {x: 24, y: -12},
                        {x: 0, y: -24},
                        {x: 8, y: 12},
                    ]);
                    break;
                case Direction.NORTH_WEST:
                    this._drawCornerStair([
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ], [
                        {x: 0, y: 16},
                        {x: -8, y: 4},
                        {x: 24, y: -36},
                        {x: 0, y: 16},
                    ]);
                    break;
            }
        }
    }

    private _drawStair(
        points: Position2D[],
        offsets: Position2D[]
    ): void {
        for (let i: number = 0; i < 4; i++) {
            const step: Container = new Container();
            const top: Graphics = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 1),
                    matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
                })
                .moveTo(points[0].x, points[0].y)
                .lineTo(points[1].x, points[1].y)
                .lineTo(points[2].x, points[2].y)
                .lineTo(points[3].x, points[3].y)
                .lineTo(points[0].x, points[0].y)
                .endFill();
            const left: Graphics = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 0.8),
                    matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
                })
                .moveTo(points[0].x, points[0].y)
                .lineTo(points[0].x, points[0].y + this._thickness)
                .lineTo(points[3].x, points[3].y + this._thickness)
                .lineTo(points[3].x, points[3].y)
                .endFill();
            const right: Graphics = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 0.71),
                    matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
                })
                .moveTo(points[3].x, points[3].y)
                .lineTo(points[3].x, points[3].y + this._thickness)
                .lineTo(points[2].x, points[2].y + this._thickness)
                .lineTo(points[2].x, points[2].y)
                .lineTo(points[3].x, points[3].y)
                .endFill();

            step.addChild(top);
            step.addChild(left);
            step.addChild(right);

            step.x = offsets[0].x * i;
            step.y = offsets[0].y * i;

            this.addChild(step);
        }

        this.x = 32 * this._position.x - 32 * this._position.y + offsets[1].x;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z + offsets[1].y;
    }

    private _drawCornerStair(
        points: Position2D[],
        pointsOffsets: Position2D[],
        offsets: Position2D[]
    ): void {
        for (let i: number = 0; i < 3; i++) {
            const step: Container = new Container();
            const top: Graphics = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 1),
                    matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
                })
                .moveTo(points[0].x + (-pointsOffsets[2].x * (2 - i)), points[0].y + (pointsOffsets[2].y * (2 - i)))
                .lineTo(points[1].x + (pointsOffsets[1].x * (2 - i)), points[1].y + (pointsOffsets[1].y * (2 - i)))
                .lineTo(points[2].x + (pointsOffsets[0].x * (2 - i)), points[2].y + (pointsOffsets[0].y * (2 - i)))
                .lineTo(points[3].x + (-pointsOffsets[3].x * (2 - i)), points[3].y + (pointsOffsets[3].y * (2 - i)))
                .lineTo(points[0].x + (-pointsOffsets[2].x * (2 - i)), points[0].y + (pointsOffsets[2].y * (2 - i)))
                .endFill();
            const left: Graphics = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 0.8),
                    matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
                })
                .moveTo(points[0].x + (-pointsOffsets[2].x * (2 - i)), points[0].y + (pointsOffsets[2].y * (2 - i)))
                .lineTo(points[0].x + (-pointsOffsets[2].x * (2 - i)), points[0].y + (pointsOffsets[2].y * (2 - i)) + this._thickness)
                .lineTo(points[3].x + (-pointsOffsets[3].x * (2 - i)), points[3].y + (pointsOffsets[3].y * (2 - i)) + this._thickness)
                .lineTo(points[3].x + (-pointsOffsets[3].x * (2 - i)), points[3].y + (pointsOffsets[3].y * (2 - i)))
                .endFill();
            const right: Graphics = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 0.71),
                    matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
                })
                .moveTo(points[3].x + (-pointsOffsets[3].x * (2 - i)), points[3].y + (pointsOffsets[3].y * (2 - i)))
                .lineTo(points[3].x + (-pointsOffsets[3].x * (2 - i)), points[3].y + (pointsOffsets[3].y * (2 - i)) + this._thickness)
                .lineTo(points[2].x + (-pointsOffsets[0].x * (2 - i)), points[2].y + (pointsOffsets[0].y * (2 - i)) + this._thickness)
                .lineTo(points[2].x + (-pointsOffsets[0].x * (2 - i)), points[2].y + (pointsOffsets[0].y * (2 - i)))
                .lineTo(points[3].x + (-pointsOffsets[3].x * (2 - i)), points[3].y + (pointsOffsets[3].y * (2 - i)))
                .endFill();

            step.addChild(top);
            step.addChild(left);
            step.addChild(right);

            step.x = offsets[3].x * i + offsets[1].x;
            step.y = offsets[3].y * i + offsets[1].y;

            if(this._type === StairType.OUTER_CORNER_STAIR) step.zIndex = -i;
            if(this._type === StairType.INNER_CORNER_STAIR || (this._type === StairType.OUTER_CORNER_STAIR && this._position.direction === Direction.SOUTH_WEST)) step.zIndex = 4 - i;

            this.addChild(step);
        }

        for (let i: number = 0; i < 4; i++) {
            const step: Container = new Container();
            const top: Graphics = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 1),
                    matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
                })
                .moveTo(points[0].x + (pointsOffsets[0].x * (3 - i)), points[0].y + (pointsOffsets[0].y * (3 - i)))
                .lineTo(points[1].x + (pointsOffsets[1].x * (3 - i)), points[1].y + (pointsOffsets[1].y * (3 - i)))
                .lineTo(points[2].x + (pointsOffsets[2].x * (3 - i)), points[2].y + (pointsOffsets[2].y * (3 - i)))
                .lineTo(points[3].x + (pointsOffsets[3].x * (3 - i)), points[3].y + (pointsOffsets[3].y * (3 - i)))
                .lineTo(points[0].x + (pointsOffsets[0].x * (3 - i)), points[0].y + (pointsOffsets[0].y * (3 - i)))
                .endFill();
            const left: Container = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 0.8),
                    matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
                })
                .moveTo(points[0].x + (pointsOffsets[0].x * (3 - i)), points[0].y + (pointsOffsets[0].y * (3 - i)))
                .lineTo(points[0].x + (pointsOffsets[0].x * (3 - i)), points[0].y + (pointsOffsets[0].y * (3 - i)) + this._thickness)
                .lineTo(points[3].x + (pointsOffsets[3].x * (3 - i)), points[3].y + (pointsOffsets[3].y * (3 - i)) + this._thickness)
                .lineTo(points[3].x + (pointsOffsets[3].x * (3 - i)), points[3].y + (pointsOffsets[3].y * (3 - i)))
                .endFill();
            const right: Container = new Graphics()
                .beginTextureFill({
                    texture: this._material.texture,
                    color: utils.premultiplyTint(this._material.color, 0.71),
                    matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
                })
                .moveTo(points[3].x + (pointsOffsets[3].x * (3 - i)), points[3].y + (pointsOffsets[3].y * (3 - i)))
                .lineTo(points[3].x + (pointsOffsets[3].x * (3 - i)), points[3].y + (pointsOffsets[3].y * (3 - i)) + this._thickness)
                .lineTo(points[2].x + (pointsOffsets[2].x * (3 - i)), points[2].y + (pointsOffsets[2].y * (3 - i)) + this._thickness)
                .lineTo(points[2].x + (pointsOffsets[2].x * (3 - i)), points[2].y + (pointsOffsets[2].y * (3 - i)))
                .lineTo(points[3].x + (pointsOffsets[3].x * (3 - i)), points[3].y + (pointsOffsets[3].y * (3 - i)))
                .endFill();

            step.addChild(top);
            step.addChild(left);
            step.addChild(right);

            step.x = offsets[0].x * i;
            step.y = offsets[0].y * i;

            if(this._type === StairType.INNER_CORNER_STAIR) step.zIndex = 3 - i;

            this.addChild(step);
        }

        this.sortableChildren = true;

        this.x = 32 * this._position.x - 32 * this._position.y + offsets[2].x;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z + offsets[2].y;
    }

}
