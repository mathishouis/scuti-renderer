import {RoomPart} from "./RoomPart.ts";
import {Room} from "../Room.ts";
import {Container, FederatedPointerEvent, Point, Polygon} from "pixi.js";
import {FloorMaterial} from "../materials/FloorMaterial.ts";
import {Cube} from "../geometry/Cube.ts";
import {IStairConfiguration} from "../../../interfaces/IStairConfiguration.ts";
import {Vector2D, Vector3D} from "../../../types/Vector.ts";
import {CubeFace} from "../../../enums/CubeFace.ts";
import {EventManager} from "../../events/EventManager.ts";
import {StairType} from "../../../enums/StairType.ts";
import {Direction} from "../../../enums/Direction.ts";

export class StairPart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();
    public eventManager: EventManager = new EventManager();

    constructor(
        public configuration: IStairConfiguration
    ) {
        super();

        this._registerEvents();
    }

    private _registerEvents(): void {
        this.container.onpointerdown = (event: FederatedPointerEvent) => this.eventManager.handlePointerDown({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointerup = (event: FederatedPointerEvent) => this.eventManager.handlePointerUp({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointermove = (event: FederatedPointerEvent) => this.eventManager.handlePointerMove({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointerout = (event: FederatedPointerEvent) => this.eventManager.handlePointerOut({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointerover = (event: FederatedPointerEvent) => this.eventManager.handlePointerOver({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
    }

    public render(): void {
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
            this.container.x = 32 * this.configuration.position.x - 32 * this.configuration.position.y;
            this.container.y = 16 * this.configuration.position.x + 16 * this.configuration.position.y - 32 * this.configuration.position.z;
        } else {
            this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y + this.configuration.length - 1);
            this.container.y = 16 * this.configuration.position.x + 16 * (this.configuration.position.y + this.configuration.length - 1) - 32 * this.configuration.position.z;
        }

        switch (this.configuration.direction) {
            case Direction.NORTH:
                this._renderStair({
                    x: 8,
                    y: -12
                });
                break;
            case Direction.WEST:
                this.container.y -= 24;
                this._renderStair({
                    x: 8,
                    y: 12
                });
                break;
            case Direction.SOUTH:
                this.container.x += 24;
                this.container.y -= 12;
                this._renderStair({
                    x: -8,
                    y: -4
                });
                break;
            case Direction.EAST:
                this.container.x += 24;
                this.container.y -= 12;
                this._renderStair({
                    x: -8,
                    y: 4
                });
                break;
        }

        if (this.configuration.direction === Direction.NORTH) {
            this.container.hitArea = new Polygon(
                new Point(0, 0),
                new Point(32 * 1, -16 * 1),
                new Point(32 * (this.configuration.length + 1) + 32 * (1 - 1), -16 * (1 - 1) + 16 * (this.configuration.length - 1)),
                new Point(32 * this.configuration.length, 16 * this.configuration.length),
                new Point(0, 0)
            );
        } else if (this.configuration.direction === Direction.WEST) {
            this.container.hitArea = new Polygon(
                new Point(0, 24),
                new Point(32 * this.configuration.length, -16 * this.configuration.length + 24),
                new Point(64 + 32 * (this.configuration.length - 1), -16 * (this.configuration.length - 1) + 24),
                new Point(32, 40),
                new Point(0, 24)
            );
        } else if (this.configuration.direction === Direction.SOUTH) {
            this.container.hitArea = new Polygon();
            /*this.container.addChild(new Graphics().beginFill(0x00FF00, 0.3).drawPolygon(
                new Point(0 - 24, 0 + 12),
                new Point(32 * 1 - 24, -16 * 1 + 12),
                new Point(32 * (this.configuration.length + 1) + 32 * (1 - 1) - 24, -16 * (1 - 1) + 16 * (this.configuration.length - 1) + 12),
                new Point(32 * this.configuration.length - 24, 16 * this.configuration.length + 12),
                new Point(0 - 24, 0 + 12)
            ).endFill());*/
        } else if (this.configuration.direction === Direction.EAST) {
            this.container.hitArea = new Polygon();
            /*this.container.addChild(new Graphics().beginFill(0xFF0000, 0.3).drawPolygon(
                new Point(0 - 24, 24 - 12),
                new Point(32 * this.configuration.length - 24, -16 * this.configuration.length + 24 - 12),
                new Point(64 + 32 * (this.configuration.length - 1) - 24, -16 * (this.configuration.length - 1) + 24 - 12),
                new Point(32 - 24, 40 - 12),
                new Point(0 - 24, 24 - 12)
            ).endFill());*/
        }

        this.container.eventMode = "static";

        this.room.visualization.container.addChild(this.container);
    }

    private _renderStair(offsets: Vector2D): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);

        for (let i: number = 0; i < 4; i++) {
            const size: Vector3D = {
                x: this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH ? this.configuration.length : 8 / 32,
                y: this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST ? this.configuration.length : 8 / 32,
                z: this.configuration.thickness / 32
            }

            if (this.configuration.corners.left === StairType.OUTER_CORNER_STAIR && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x -= (8 / 32) * i;
            } else if (this.configuration.corners.left === StairType.OUTER_CORNER_STAIR && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y -= (8 / 32) * (3 - i);
            }

            if (this.configuration.corners.right == StairType.OUTER_CORNER_STAIR && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x -= (8 / 32) * i;
            } else if (this.configuration.corners.right === StairType.OUTER_CORNER_STAIR && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y += (8 / 32) * (i - 3);
            }

            if (this.configuration.corners.left === StairType.INNER_CORNER_STAIR && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x += (8 / 32) * (i - 4);
            } else if (this.configuration.corners.left === StairType.INNER_CORNER_STAIR && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y -= (8 / 32) * i;
            }

            if (this.configuration.corners.right === StairType.INNER_CORNER_STAIR && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x += (8 / 32) * (i - 4) + 0.25;
            } else if (this.configuration.corners.right === StairType.INNER_CORNER_STAIR && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y -= (8 / 32) * i;
                if (this.configuration.direction === Direction.WEST) size.y -= 0.25;
            }

            const textureOffset: Vector2D = {
                x: 0,
                y: 0
            }

            if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
                switch (this.configuration.corners.left) {
                    case StairType.STAIR:
                        textureOffset.x = 0;
                        textureOffset.y = 0;
                        break;
                    case StairType.OUTER_CORNER_STAIR:
                        textureOffset.x = -i * 8;
                        textureOffset.y = -i * 4;
                        break;
                    case StairType.INNER_CORNER_STAIR:
                        textureOffset.x = (i + 1) * 8;
                        textureOffset.y = (i + 1) * 4;
                        break;
                }
            } else {
                switch (this.configuration.corners.left) {
                    case StairType.STAIR:
                        textureOffset.x = 8;
                        textureOffset.y = 4;
                        break;
                    case StairType.OUTER_CORNER_STAIR:
                        textureOffset.x = (i + 2) * 8;
                        textureOffset.y = -i * 4;
                        break;
                    case StairType.INNER_CORNER_STAIR:
                        textureOffset.x = -(i + 3) * 8;
                        textureOffset.y = (i + 5) * 4;
                        break;
                }
            }

            const zOrders = {
                [CubeFace.TOP]: (this.configuration.position.z - 1) * 4,
                [CubeFace.LEFT]: (this.configuration.position.z - 1) * 4,
                [CubeFace.RIGHT]: (this.configuration.position.z - 1) * 4
            }

            if (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST) {
                zOrders[CubeFace.TOP] += (3 - i);
                zOrders[CubeFace.LEFT] += (3 - i);
                zOrders[CubeFace.RIGHT] += (3 - i);

                if (this.configuration.direction === Direction.EAST) zOrders[CubeFace.RIGHT] -= 100;
            } else {
                zOrders[CubeFace.TOP] += i;
                zOrders[CubeFace.LEFT] += i;
                zOrders[CubeFace.RIGHT] += i;

                if (this.configuration.direction === Direction.SOUTH) zOrders[CubeFace.LEFT] -= 100;
            }

            const cube: Cube = new Cube({
                layer: this.room.renderer.layer,
                zOrders: zOrders,
                material: material,
                size: size,
                offsets: {
                    [CubeFace.TOP]: textureOffset,
                    [CubeFace.LEFT]: textureOffset,
                    [CubeFace.RIGHT]: textureOffset
                }
            });

            cube.x = offsets.x * i;
            cube.y = offsets.y * i;

            if (this.configuration.corners.left === StairType.OUTER_CORNER_STAIR && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                cube.x += 8 * i;
                cube.y += 4 * i;
            } else if (this.configuration.corners.left === StairType.OUTER_CORNER_STAIR && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                cube.x += 8 * (3 - i);
                cube.y -= 4 * (3 - i);
            }

            if (this.configuration.corners.left === StairType.INNER_CORNER_STAIR && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                cube.x += 8 * (3 - i);
                cube.y += 4 * (3 - i);
            } else if (this.configuration.corners.left === StairType.INNER_CORNER_STAIR && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                cube.x += 8 * i;
                cube.y -= 4 * i;
            }

            if (this.configuration.direction === Direction.EAST) cube.zIndex = -i;

            this.container.addChild(cube);
        }
    }

    public getGlobalTilePosition(point: Point): Vector3D {
        const localPosition: Point = this.container.toLocal(point);
        let localX: number;
        let localY: number;
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
            localX = Math.floor(localPosition.x / 64 + localPosition.y / 32);
            localY = Math.floor(localPosition.y / 32 - localPosition.x / 64) + 1;
        } else {
            localX = Math.floor(localPosition.x / 64 + localPosition.y / 32 + 0.3) - 1;
            localY = Math.floor(localPosition.y / 32 - localPosition.x / 64 + 0.24) + this.configuration.length - 1;
        }
        return {
            x: localX + this.configuration.position.x,
            y: localY + this.configuration.position.y,
            z: this.configuration.position.z
        }
    }
}
