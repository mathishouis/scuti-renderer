import { Room } from "./Room";
import { Container, Ticker } from "pixi.js";

export class RoomObject extends Container {

    /**
     * The room instance
     * @private
     */
    private _room: Room;

    /**
     * RoomObject class
     */
    constructor() {
        super();
    }

    /**
     * Destroy the room object
     */
    public destroy(): void {

    }

    /**
     * Return the room instance
     */
    public get room(): Room {
        return this._room;
    }

    /**
     * Update the room instance
     * @param room
     */
    public set room(
        room: Room
    ) {
        this._room = room;
    }

    /**
     * Return the animation ticker
     */
    public get animationTicker(): Ticker {
        return this._room.visualization.animationTicker;
    }

}
