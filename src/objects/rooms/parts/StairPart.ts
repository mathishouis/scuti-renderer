import { RoomPart } from "./RoomPart.ts";
import { Room } from "../Room.ts";
import { Container } from "pixi.js";
import { FloorMaterial } from "../materials/FloorMaterial.ts";
import { Cube } from "../../geometry/Cube.ts";
import { StairConfiguration } from "../../../interfaces/StairConfiguration.ts";
import { Direction, Position2D, Position3D } from "../../../interfaces/Position.ts";
import { CubeFace } from "../../../interfaces/CubeFace.ts";

export class StairPart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();

    constructor(
        public configuration: StairConfiguration
    ) {
        super();
    }

    public render(): void {
        this.container.x = 32 * this.configuration.position.x - 32 * this.configuration.position.y;
        this.container.y = 16 * this.configuration.position.x + 16 * this.configuration.position.y - 32 * this.configuration.position.z;

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
    }

    private _renderStair(offsets: Position2D): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);

        for (let i: number = 0; i < 4; i++) {
            const size: Position3D = {
                x: this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH ? this.configuration.length : 8 / 32,
                y: this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST ? this.configuration.length : 8 / 32,
                z: this.configuration.thickness / 32
            }

            if (this.configuration.leftCorner && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x -= (8 / 32) * i;
            } else if (this.configuration.leftCorner && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y -= (8 / 32) * (3 - i);
            }

            if (this.configuration.rightCorner && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x -= (8 / 32) * i;
            } else if (this.configuration.rightCorner && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y += (8 / 32) * (i - 3);
            }

            const textureOffset: Position2D = {
                x: 0,
                y: 0
            }

            if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
                textureOffset.x = this.configuration.leftCorner ? (-i) * 8 : 0;
                textureOffset.y = this.configuration.leftCorner ? (-i) * 4 : 0;
            } else {
                textureOffset.x = this.configuration.leftCorner ? (i + 2) * 8 : 0;
                textureOffset.y = this.configuration.leftCorner ? (-i) * 4 : 0;
            }

            const cube: Cube = new Cube({
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

            if (this.configuration.leftCorner && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                cube.x += 8 * i;
                cube.y += 4 * i;
            } else if (this.configuration.leftCorner && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                cube.x += 8 * (3 - i);
                cube.y -= 4 * (3 - i);
            }

            if (this.configuration.direction === Direction.EAST) cube.zIndex = -i;

            this.container.addChild(cube);
        }
    }
}
