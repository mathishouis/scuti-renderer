import { clearTimeout } from "timers";
import { IInteractionEvent } from "../../interfaces/Interaction.interface";

export class InteractionManager {

    private _isDoubleClicking: boolean = false;
    private _doubleClickTimeout: number;

    private _onPointerDown: (event: IInteractionEvent) => void;
    private _onPointerUp: (event: IInteractionEvent) => void;
    private _onPointerMove: (event: IInteractionEvent) => void;
    private _onPointerOut: (event: IInteractionEvent) => void;
    private _onPointerOver: (event: IInteractionEvent) => void;

    private _onDoubleClick: (event: IInteractionEvent) => void;

    public get onPointerDown(): (
        event: IInteractionEvent
    ) => void {
        return this._onPointerDown;
    }

    public set onPointerDown(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerDown = value;
    }

    public get onPointerUp(): (
        event: IInteractionEvent
    ) => void {
        return this._onPointerUp;
    }

    public set onPointerUp(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerUp = value;
    }

    public get onPointerMove(): (
        event: IInteractionEvent
    ) => void {
        return this._onPointerMove;
    }

    public set onPointerMove(
        value: (event: IInteractionEvent
        ) => void) {
        this._onPointerMove = value;
    }

    public get onPointerOut(): (
        event: IInteractionEvent
    ) => void {
        return this._onPointerOut;
    }

    public set onPointerOut(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerOut = value;
    }

    public get onPointerOver(): (
        event: IInteractionEvent
    ) => void {
        return this._onPointerOver;
    }

    public set onPointerOver(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerOver = value;
    }

    public get onDoubleClick(): (
        event: IInteractionEvent
    ) => void {
        return this._onDoubleClick;
    }

    public set onDoubleClick(
        value: (event: IInteractionEvent) => void
    ) {
        this._onDoubleClick = value;
    }

    public handlePointerDown(
        event: IInteractionEvent
    ): void {
        if(!this._isDoubleClicking) {
            if (this.onPointerDown !== undefined) this._onPointerDown(event);
            this._isDoubleClicking = true;
            this._doubleClickTimeout = window.setTimeout(() => this._isDoubleClicking = false, 350)
        } else {
            if(this.onDoubleClick !== undefined) this._onDoubleClick(event);
            this._isDoubleClicking = false;
            window.clearTimeout(this._doubleClickTimeout);
        }
    }

    public handlePointerUp(
        event: IInteractionEvent
    ): void {
        if(this.onPointerUp !== undefined) this._onPointerUp(event);
    }

    public handlePointerMove(
        event: IInteractionEvent
    ): void {
        if(this.onPointerMove !== undefined) this._onPointerMove(event);
    }

    public handlePointerOut(
        event: IInteractionEvent
    ): void {
        if(this.onPointerOut !== undefined) this._onPointerOut(event);
    }

    public handlePointerOver(
        event: IInteractionEvent
    ): void {
        if(this.onPointerOver !== undefined) this._onPointerOver(event);
    }

}
