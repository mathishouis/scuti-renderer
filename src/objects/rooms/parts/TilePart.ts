import { RoomPart } from "./RoomPart.ts";
import { TileConfiguration } from "../../../interfaces/TileConfiguration.ts";
import { Room } from "../Room.ts";
import { Container } from "pixi.js";
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
            size: this.configuration.size
        });

        this.container.addChild(cube);
        this.container.x = 32 * this.configuration.position.x - 32 * this.configuration.position.y;
        this.container.y = 16 * this.configuration.position.x + 16 * this.configuration.position.y - 32 * this.configuration.position.z;
    }
}
