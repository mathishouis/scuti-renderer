import { Container } from "pixi.js";
import { RoomObject } from "./RoomObject";
import { Room } from "./Room";

/**
 * RoomObjectContainer class that manage all the room objects.
 *
 * @class
 * @memberof Scuti
 */
export class RoomObjectContainer extends Container {

    /**
     * The room instance that will be managed by the camera.
     *
     * @member {Room}
     * @private
     */
    private readonly _room: Room;

    /**
     * @param {Room} [room] - The room instance that we want to visualize.
     */
    constructor(
        room: Room
    ) {
        super();

        this._room = room;
    }

    /**
     * Add the given room object into the object layer of the room.
     *
     * @return {void}
     * @public
     */
    public add(
        object: RoomObject
    ): void {
        object.room = this._room;
        object.startAnimation();
        this.addChild(object);
    }

    /**
     * Remove the given room object into the object layer of the room.
     *
     * @return {void}
     * @public
     */
    public remove(
        object: RoomObject
    ): void {
        object.stopAnimation();
        this.removeChild(object);
    }

}
