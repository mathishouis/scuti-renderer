import {Room} from "./Room.ts";
import {Container, DisplayObject} from "pixi.js";

export class RoomCamera {
    public room!: Room;
    public view: Container;

    constructor(room: Room) {
        this.room = room;
        this.view = new Container<DisplayObject>();
    }
}