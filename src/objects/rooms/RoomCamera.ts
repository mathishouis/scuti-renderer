import { Room } from "./Room.ts";
import { Container } from "pixi.js";
import { gsap } from "gsap";

export class RoomCamera extends Container {
    public dragging: boolean = false;

    private _zoom!: number = 1;

    constructor(
        public room: Room
    ) {
        super();

        this._initializeListeners();

        //this.zoom = room.zoom;

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
        this.dragging = true;
    }

    private _dragEnd = (): void => {
        this.dragging = false;
        if (this.isOutOfBounds() && this.room.configuration.centerCamera) this.centerCamera();
    }

    private _dragMove = (
        x: number,
        y: number
    ): void => {
        if (this.dragging) gsap.to(this, {
            x: Math.floor(this.x + x),
            y: Math.floor(this.y + y),
            duration: 0
        });
    }

    public isOutOfBounds(): boolean {
        if (this.x > this.room.renderer.application.view.width) return true;
        if (this.x + this.width < 0) return true;
        if (this.y > this.room.renderer.application.view.height) return true;
        if (this.y + this.height < 0) return true;
        return false;
    }

    public centerCamera(): void {
        gsap.to(this, {
            x: Math.floor(this.room.renderer.application.view.width / 2 - this.width / 2),
            y: Math.floor(this.room.renderer.application.view.height / 2 - this.height / 2),
            duration: 0.8,
            ease: "easeOut"
        });
    }

    public zoom(zoom: number, duration: number = 0.8) {
        this._zoom = zoom;

        let originalWidth: number = this.width;
        let originalHeight: number = this.height;

        gsap.to(this.scale, {
            x: zoom,
            y: zoom,
            duration: duration,
            onUpdate: () => {
                const widthDifference: number = this.width - originalWidth;
                const heightDifference: number = this.height - originalHeight;

                this.x = this.x - this.width / ((this.width / widthDifference) * 2);
                this.y = this.y - this.height / ((this.height / heightDifference) * 2);

                originalWidth = this.width;
                originalHeight = this.height;
            }
        });
    }
}
