import { Room } from "./Room.ts";
import { Container } from "pixi.js";
import { gsap } from "gsap";

export class RoomCamera extends Container {
    public dragging: boolean = false;
    public hasDragged: boolean = false;
    private lastClickTime: number = 0;
    private clickThreshold: number = 75;

    constructor(
        public room: Room
    ) {
        super();

        this._initializeListeners();

        this.position.x = this.room.renderer.application.view.width / 2
        this.position.y = this.room.renderer.application.view.height / 2

        this.addChild(room.visualization.container);
    }

    private _initializeListeners(): void {
        if (this.room.configuration.dragging) {
            this.room.renderer.application.renderer.events.domElement.addEventListener("pointerdown", this._dragStart)
            this.room.renderer.application.renderer.events.domElement.addEventListener("pointerup", this._dragEnd)
            this.room.renderer.application.renderer.events.domElement.addEventListener("pointermove", (event: PointerEvent) => this._dragMove(event.movementX, event.movementY))
        }
    }

    private _dragStart = (): void => {
        const currentTime = Date.now();
        if (currentTime - this.lastClickTime > this.clickThreshold) {
            this.dragging = true;
        }
    }

    private _dragEnd = (): void => {
        this.hasDragged = false;
        this.dragging = false;

        this.lastClickTime = Date.now();

        if (this.isOutOfBounds() && this.room.configuration.centerCamera) this.centerCamera();
    }

    private _dragMove = (
        x: number,
        y: number
    ): void => {
        if (this.dragging) {
            this.hasDragged = true;
            this.pivot.x -= x / this.scale.x
            this.pivot.y -= y / this.scale.y
        }
    }

    public isOutOfBounds(): boolean {
        if (this.x > this.room.renderer.application.view.width) return true;
        if (this.x + this.width < 0) return true;
        if (this.y > this.room.renderer.application.view.height) return true;
        if (this.y + this.height < 0) return true;
        return false;
    }

    public centerCamera(duration: number = 0.8): void {
        gsap.to(this, {
            x: Math.floor(this.room.renderer.application.view.width - this.width / 2),
            y: Math.floor(this.room.renderer.application.view.height - this.height / 2),
            duration: duration,
            ease: "easeOut"
        });
    }

    public zoom(zoom: number, duration: number = 0.8) {
        this.room.configuration.zoom = zoom;

        gsap.to(this.scale, {
            x: zoom,
            y: zoom,
            duration,
        });
    }
}
