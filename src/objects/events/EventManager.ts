import { ITileEvent } from "../../interfaces/IEvents.ts";

export class EventManager {
    private _isDoubleClicking: boolean = false;
    private _doubleClickTimeout!: number;

    public onPointerDown!: (event: ITileEvent) => void;
    public onPointerUp!: (event: ITileEvent) => void;
    public onPointerMove!: (event: ITileEvent) => void;
    public onPointerOut!: (event: ITileEvent) => void;
    public onPointerOver!: (event: ITileEvent) => void;
    public onDoublePointerDown!: (event: ITileEvent) => void;

    public handlePointerDown(event: ITileEvent): void {
        if (!this._isDoubleClicking) {
            if (this.onPointerDown) this.onPointerDown(event);
            this._isDoubleClicking = true;
            this._doubleClickTimeout = window.setTimeout(() => {
                return (this._isDoubleClicking = false);
            }, 350);
        } else {
            if (this.onDoublePointerDown) this.onDoublePointerDown(event);
            this._isDoubleClicking = false;
            window.clearTimeout(this._doubleClickTimeout);
        }
    }

    public handlePointerUp(event: ITileEvent): void {
        if (this.onPointerUp) this.onPointerUp(event);
    }

    public handlePointerMove(event: ITileEvent): void {
        if (this.onPointerMove) this.onPointerMove(event);
    }

    public handlePointerOut(event: ITileEvent): void {
        if (this.onPointerOut) this.onPointerOut(event);
    }

    public handlePointerOver(event: ITileEvent): void {
        if (this.onPointerOver) this.onPointerOver(event);
    }
}
