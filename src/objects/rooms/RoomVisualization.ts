import { Container, Graphics } from "pixi.js";
import { Room } from "./Room.ts";
import { TilePart } from "./parts/TilePart.ts";
import { PartLayer } from "./layers/PartLayer.ts";
import { RoomPart } from "./parts/RoomPart.ts";
import { RoomLayers } from "../../interfaces/RoomLayers.ts";
import { FloorMaterial } from "./materials/FloorMaterial.ts";

export class RoomVisualization {
    public container: Container = new Container();
    public layers: RoomLayers = {} as RoomLayers;

    constructor(
        public room: Room
    ) {
        this._initializeLayers();

        const graphic = new Graphics()
            .beginFill(0xFFFFFF)
            .drawRect(0, 0, 200, 150)
            .beginFill(0x00FF00)
            .drawRect(95, 70, 10, 10)
            .endFill();

        this.container.addChild(graphic);
        const tilePart = new TilePart({
            position: { x: 0, y: 0, z: 0 },
            size: { x: 1, y: 2, z: 1 }
        });
        this.add(tilePart);
        const tilePart2 = new TilePart({
            material: new FloorMaterial(111),
            position: { x: 1, y: 0, z: 0.5 },
            size: { x: 10, y: 13, z: 0.25 }
        });
        this.add(tilePart2);
    }

    private _initializeLayers(): void {
        this.layers.parts = new PartLayer(this.room);
    }

    public add(item: RoomPart): void {
        item.room = this.room;
        item.render();

        this.container.addChild(item.container);
        this.layers.parts.add(item);
    }
}
