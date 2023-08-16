import { RoomPart } from "./RoomPart.ts";
import { Room } from "../Room.ts";
import { Container } from "pixi.js";
import { FloorMaterial } from "../materials/FloorMaterial.ts";
import { Cube } from "../../geometry/Cube.ts";
import { StairConfiguration } from "../../../interfaces/StairConfiguration.ts";
import { Direction, Position2D } from "../../../interfaces/Position.ts";

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
                this._renderStair({
                    x: 8,
                    y: -4
                });
                break;
        }
    }

    private _renderStair(offsets: Position2D): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);

        for (let i: number = 0; i < 4; i++) {
            const cube: Cube = new Cube({
                material: material,
                size: {
                    x: this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH ? this.configuration.length : 8 / 32,
                    y: this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST ? this.configuration.length : 8 / 32,
                    z: 8 / 32
                }
            });

            cube.x = offsets.x * i;
            cube.y = offsets.y * i;

            this.container.addChild(cube);
        }
    }
}
