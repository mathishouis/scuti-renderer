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
        if (this.isOutOfBounds()) this.centerCamera();
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

    public isOutOfBounds(): boolean {
        if (this.x > this.room.renderer.application.view.width) return true;
        if (this.x + this.width < 0) return true;
        if (this.y > this.room.renderer.application.view.height) return true;
        if (this.y + this.height < 0) return true;
        return false;
    }

    public centerCamera(): void {
        this.x = Math.floor(this.room.renderer.application.view.width / 2 - this.room.visualization.width / 2);
        this.y = Math.floor(this.room.renderer.application.view.height / 2 - this.room.visualization.height / 2);
    }
}