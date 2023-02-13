import { Container } from "pixi.js";
import { Room } from "./Room";
import { IInteractionEvent } from "../../interfaces/Interaction.interface";
import { InteractionManager } from "../interactions/InteractionManager";

/**
 * RoomTileContainer class that manage all the room tiles.
 *
 * @class
 * @memberof Scuti
 */
export class RoomTileContainer extends Container {

    /**
     * The room instance that will be managed by the camera.
     *
     * @member {Room}
     * @private
     */
    private readonly _room: Room;

    /**
     * The room tiles interaction manager.
     *
     * @member {InteractionManager}
     * @private
     */
    private _interactionManager: InteractionManager = new InteractionManager();

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
     * Reference to the pointer down event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    get onPointerDown(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerDown;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    set onPointerDown(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerDown = value;
    }

    /**
     * Reference to the pointer up event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    get onPointerUp(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerUp;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    set onPointerUp(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerUp = value;
    }

    /**
     * Reference to the pointer move event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    get onPointerMove(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerMove;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    set onPointerMove(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerMove = value;
    }

    /**
     * Reference to the pointer out event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    get onPointerOut(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerOut;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    set onPointerOut(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerOut = value;
    }

    /**
     * Reference to the pointer over event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    get onPointerOver(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerOver;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    set onPointerOver(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerOver = value;
    }

    /**
     * Reference to the pointer double click event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    get onDoubleClick(): (event: IInteractionEvent) => void {
        return this._interactionManager.onDoubleClick;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    set onDoubleClick(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onDoubleClick = value;
    }

}
