import { Container, Graphics } from "pixi.js";
import { Room } from "./Room.ts";

export class RoomVisualization extends Container {
    constructor(
        public room: Room
    ) {
        super();

        const graphic = new Graphics()
            .beginFill(0xFF0000)
            .drawRect(100, 100, 200, 150)
            .endFill();

        this.addChild(graphic);
    }
}