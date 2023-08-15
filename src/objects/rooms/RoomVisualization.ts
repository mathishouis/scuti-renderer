import { Container, Graphics } from "pixi.js";
import { Room } from "./Room.ts";
import { TilePart } from "./parts/TilePart.ts";

export class RoomVisualization {
    public container: Container = new Container();

    constructor(
        public room: Room
    ) {
        const graphic = new Graphics()
            .beginFill(0xFF0000)
            .drawRect(0, 0, 200, 150)
            .beginFill(0x00FF00)
            .drawRect(95, 70, 10, 10)
            .endFill();

        this.container.addChild(graphic);
        const tilePart = new TilePart({
            material: 0,
            thickness: 8,
            position: { x: 0, y: 0, z: 0 }
        });
        tilePart.render();
    }
}
