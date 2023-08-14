import { Room } from "./Room.ts";
import { Container } from "pixi.js";

export class RoomCamera extends Container {
    constructor(
        public room: Room
    ) {
        super();

        this.addChild(room.visualization);
    }
}