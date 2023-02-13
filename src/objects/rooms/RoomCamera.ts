import { Room } from "./Room";
import { Container, FederatedPointerEvent } from "pixi.js";
import { gsap } from "gsap";

/**
 * RoomCamera class that manage things like the room dragging or detecting if the room is out of bounds.
 *
 * @class
 * @memberof Scuti
 */
export class RoomCamera extends Container {

    /**
     * The room instance that will be managed by the camera.
     *
     * @member {Room}
     * @private
     */
    private readonly _room: Room;

    /**
     * A boolean indicating if the room is being dragged.
     *
     * @member {boolean}
     * @private
     */
    private _dragging: boolean;

    /**
     * The container that will act as a trigger to drag the room container.
     *
     * @member {Container}
     * @private
     */
    private readonly _viewContainer: Container;

    /**
     * The container that will contain the room.
     *
     * @member {Container}
     * @private
     */
    private readonly _roomContainer: Container;

    /**
     * @param {Room} [room] - The room instance that will be managed by this camera.
     */
    constructor(
        room: Room
    ) {
        super();

        this._room = room;
        /** Initialise the view container */
        this._viewContainer = new Container();
        /** Initialise the room container */
        this._roomContainer = new Container();
        this._roomContainer.addChild(this._room);
        this._viewContainer.addChild(this._roomContainer);
        this.addChild(this._viewContainer);
        /** Handle interactions */
        this._room.engine.application.renderer.events.domElement.addEventListener("pointerdown", this._dragStart);
        this._room.engine.application.renderer.events.domElement.addEventListener("pointerup", this._dragEnd);
        this._room.engine.application.renderer.events.domElement.addEventListener("pointermove", this._dragMove);

        this._updateBounds();
        this._centerCamera();
    }

    /**
     * Update the room container bounds.
     *
     * @return {void}
     * @private
     */
    private _updateBounds(): void {
        this._roomContainer.pivot.x = this._room.visualization.wallLayer.getBounds().x;
        this._roomContainer.pivot.y = this._room.visualization.wallLayer.getBounds().y;
    }

    /**
     * Tween the room container at the center of the PixiJS view.
     *
     * @return {void}
     * @private
     */
    private _centerCamera(): void {
        gsap.to(this._roomContainer, {
            x: Math.floor(this._room.engine.application.view.width / 2 - this._room.visualization.width / 2),
            y: Math.floor(this._room.engine.application.view.height / 2 - this._room.visualization.height / 2),
            duration: 0.8,
            ease: "easeOut",
        });
    }

    /**
     * This method is called when the user start dragging the room.
     *
     * @return {void}
     * @private
     */
    private _dragStart = (): void => {
        this._dragging = true;
    }

    /**
     * This method is called when the user stop dragging the room.
     *
     * @return {void}
     * @private
     */
    private _dragEnd = (): void => {
        this._dragging = false;
        if(this._isOutOfBounds()) {
            this._centerCamera();
        }
    }

    /**
     * This method is called when the user is moving the dragged room in the canvas.
     *
     * @param {FederatedPointerEvent} [event] - The mouse event.
     * @return {void}
     * @private
     */
    private _dragMove = (
        event: FederatedPointerEvent
    ): void => {
        if(this._dragging) {
            this._roomContainer.x = Math.floor(this._roomContainer.x + event.movementX);
            this._roomContainer.y = Math.floor(this._roomContainer.y + event.movementY);
        }
    }

    /**
     * Indicate if the room container is out of bounds of the PixiJS view.
     *
     * @return {boolean}
     * @private
     */
    private _isOutOfBounds(): boolean {
        /** Out of bounds on the right */
        if(this._roomContainer.x > this._room.engine.application.view.width) return true;
        /** Out of bounds on the left */
        if((this._roomContainer.x + this._roomContainer.width) < 0) return true;
        /** Out of bounds on the bottom */
        if(this._roomContainer.y > this._room.engine.application.view.height) return true;
        /** Out of bounds on the top */
        if((this._roomContainer.y + this._roomContainer.height) < 0) return true;
        /** It is not out of bounds */
        return false;
    }

}
