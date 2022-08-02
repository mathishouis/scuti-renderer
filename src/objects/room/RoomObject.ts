import { Container, Ticker } from "pixi.js";
import {Room} from "./Room";

export class RoomObject extends Container {

    private _room: Room;

    public set room(room: Room) {
        this._room = room;
    }

    public get room() {
        return this._room;
    }

    public get animationTicker(): Ticker {
        return this.room.animationTicker;
    }

}