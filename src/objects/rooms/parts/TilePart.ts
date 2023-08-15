import { RoomPart } from "./RoomPart.ts";
import { TileConfiguration } from "../../../interfaces/TileConfiguration.ts";
import { Room } from "../Room.ts";
import { Container } from "pixi.js";

export class TilePart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();

    constructor(
        public configuration: TileConfiguration
    ) {
        super();
    }

    public render(): void {
        console.log("render!");
    }
}
