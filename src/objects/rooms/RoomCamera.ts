import { Room } from "./Room";
import { Container, FederatedPointerEvent } from "pixi.js";
import { gsap } from "gsap";

export class RoomCamera extends Container {

    /**
     * The room instance
     * @private
     */
    private _room: Room;

    /**
     * If the client is dragging the room.
     * @private
     */
    private _dragging: boolean;

    /**
     * The view container
     * @private
     */
    private _viewContainer: Container;

    /**
     * The room container
     * @private
     */
    private _roomContainer: Container;

    /**
     * RoomCamera class
     * @param room - The room
     */
    constructor(
        room: Room
    ) {
        super();

        this._room = room;

        this._viewContainer = new Container();
        this._viewContainer.hitArea = this._room.engine.application.screen;
        this._viewContainer.interactive = true;
        this._roomContainer = new Container();
        this._roomContainer.addChild(this._room);
        this._viewContainer.addChild(this._roomContainer);
        this.addChild(this._viewContainer);

        this._viewContainer
            .on('pointerdown', this._dragStart)
            .on('pointerup', this._dragEnd)
            .on('pointerupoutside', this._dragEnd)
            .on('pointermove', this._dragMove);

        this._updateBounds();
        this._centerCamera();
    }

    /**
     * Update the room container bounds
     * @private
     */
    private _updateBounds(): void {
        this._roomContainer.pivot.x = this._room.visualization.wallLayer.getBounds().x;
        this._roomContainer.pivot.y = this._room.visualization.wallLayer.getBounds().y;
    }

    /**
     * Center the room
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
     * When the client start dragging.
     * @private
     */
    private _dragStart = (): void => {
        this._dragging = true;
    }

    /**
     * When the client stop dragging.
     * @private
     */
    private _dragEnd = (): void => {
        this._dragging = false;
        if(this._isOutOfBounds()) {
            this._centerCamera();
        }
    }

    /**
     * When the client is dragging.
     * @param event
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
     * Check if the room container is out of bounds
     * @private
     */
    private _isOutOfBounds(): boolean {
        // Out of bounds on the right
        if(this._roomContainer.x > this._room.engine.application.view.width) {
            return true;
        }
        // Out of bounds on the left
        if((this._roomContainer.x + this._roomContainer.width) < 0) {
            return true;
        }
        // Out of bounds on the bottm
        if(this._roomContainer.y > this._room.engine.application.view.height) {
            return true;
        }
        // Out of bounds on the top
        if((this._roomContainer.y + this._roomContainer.height) < 0) {
            return true;
        }
        return false;
    }

}
