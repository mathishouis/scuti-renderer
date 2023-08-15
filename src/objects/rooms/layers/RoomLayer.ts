import { Room } from "../Room.ts";
import { RoomPart } from "../parts/RoomPart.ts";

export abstract class RoomLayer {
    public abstract room: Room;
    public abstract childrens: RoomPart[];
    public abstract add(item: RoomPart): void;
    public abstract remove(item: RoomPart): void;
}
