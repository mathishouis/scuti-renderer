import { Container, Graphics } from "pixi.js";
import { Room } from "./Room.ts";

export class RoomVisualization extends Container {
    constructor(
        public room: Room
    ) {
        super();

        const graphic = new Graphics()
            .beginFill(0xFF0000)
            .drawRect(0, 0, 200, 150)
            .beginFill(0x00FF00)
            .drawRect(95, 70, 10, 10)
            .endFill();

        this.addChild(graphic);
    }
}