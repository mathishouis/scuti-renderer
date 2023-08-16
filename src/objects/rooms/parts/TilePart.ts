import { RoomPart } from "./RoomPart.ts";
import { TileConfiguration } from "../../../interfaces/TileConfiguration.ts";
import { Room } from "../Room.ts";
import {Container, Point, Polygon} from "pixi.js";
import { FloorMaterial } from "../materials/FloorMaterial.ts";
import { Cube } from "../../geometry/Cube.ts";

export class TilePart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();

    constructor(
        public configuration: TileConfiguration
    ) {
        super();
    }

    public render(): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);
        const cube: Cube = new Cube({
            material: material,
            size: {
                x: this.configuration.size.x,
                y: this.configuration.size.y,
                z: this.configuration.thickness / 32
            }
        });

        this.container.hitArea = new Polygon(
            new Point(0, 0),
            new Point(32 * this.configuration.size.y, -16 * this.configuration.size.y),
            new Point(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1)),
            new Point(32 * this.configuration.size.x, 16 * this.configuration.size.x),
            new Point(0, 0)
        );

        this.container.interactive = true;
        this.container.onmouseenter = () => console.log("enter");
        this.container.onmouseleave = () => console.log("leave");
        this.container.onmousemove = (event) => {
            const localPosition: Point = this.container.toLocal(event.global);
            const localX: number = Math.floor(localPosition.x / 64 + localPosition.y / 32),
                localY: number = Math.floor(localPosition.y / 32 - localPosition.x / 64) + this.configuration.size.y;
            const globalX: number = localX + this.configuration.position.x,
                globalY: number = localY + this.configuration.position.y;
            console.log(globalX, globalY);
        };

        this.container.addChild(cube);
        this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y + this.configuration.size.y);
        this.container.y = 16 * this.configuration.position.x + 16 * (this.configuration.position.y + this.configuration.size.y) - 32 * this.configuration.position.z;
    }
}
