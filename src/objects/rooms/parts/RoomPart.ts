import { Container } from "pixi.js";
import { Room } from "../Room.ts";

export abstract class RoomPart {
    public abstract container: Container;
    public abstract room: Room;
    public abstract render(): void;
}
