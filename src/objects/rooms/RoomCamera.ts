import { Room } from "./Room.ts";
import {Container} from "pixi.js";

export class RoomCamera extends Container {
    public dragging: boolean = false;

    constructor(
        public room: Room
    ) {
        super();

        this._initializeListeners();

        this.addChild(room.visualization);
    }

    private _initializeListeners(): void {
        this.room.renderer.application.renderer.events.domElement.addEventListener("pointerdown", this._dragStart)
        this.room.renderer.application.renderer.events.domElement.addEventListener("pointerup", this._dragEnd)
        this.room.renderer.application.renderer.events.domElement.addEventListener("pointermove", (event: PointerEvent) => this._dragMove(event.movementX, event.movementY))
    }

    private _dragStart = (): void => {
        this.dragging = true;
    }

    private _dragEnd = (): void => {
        this.dragging = false;
    }

    private _dragMove = (
        x: number,
        y: number
    ): void => {
        if (this.dragging) {
            this.x = Math.floor(this.x + x);
            this.y = Math.floor(this.y + y);
        }
    }
}