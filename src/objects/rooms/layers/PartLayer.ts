import { RoomLayer } from "./RoomLayer.ts";
import { Room } from "../Room.ts";
import { RoomPart } from "../parts/RoomPart.ts";

export class PartLayer extends RoomLayer {
    public childrens: RoomPart[] = [];

    constructor(
        public room: Room
    ) {
        super();
    }

    public add(item: RoomPart): void {
        this.childrens.push(item);
    }

    public remove(item: RoomPart): void {
        this.childrens = this.childrens.filter((filteredItem: RoomPart) => filteredItem !== item);
    }
}
