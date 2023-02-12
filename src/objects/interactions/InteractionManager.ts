import { IInteractionEvent } from "../../interfaces/Interaction.interface";

/**
 * InteractionManager class for interaction handling.
 *
 * @class
 * @memberof Scuti
 */
export class InteractionManager {

    /**
     * A boolean indicating if the user have clicked at least one time, indicating that the second click is a double click.
     *
     * @member {boolean}
     * @private
     */
    private _isDoubleClicking: boolean = false;

    /**
     * The double click timeout that set the _isDoubleClicking boolean value to false after 350ms.
     *
     * @member {number}
     * @private
     */
    private _doubleClickTimeout: number;

    /**
     * The pointer down event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @private
     */
    private _onPointerDown: (event: IInteractionEvent) => void;

    /**
     * The pointer up event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @private
     */
    private _onPointerUp: (event: IInteractionEvent) => void;

    /**
     * The pointer move event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @private
     */
    private _onPointerMove: (event: IInteractionEvent) => void;

    /**
     * The pointer out event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @private
     */
    private _onPointerOut: (event: IInteractionEvent) => void;

    /**
     * The pointer ouver event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @private
     */
    private _onPointerOver: (event: IInteractionEvent) => void;

    /**
     * The pointer double click event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @private
     */
    private _onDoubleClick: (event: IInteractionEvent) => void;

    /**
     * Reference to the pointer down event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    public get onPointerDown(): (event: IInteractionEvent) => void {
        return this._onPointerDown;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    public set onPointerDown(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerDown = value;
    }

    /**
     * Reference to the pointer up event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    public get onPointerUp(): (event: IInteractionEvent) => void {
        return this._onPointerUp;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    public set onPointerUp(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerUp = value;
    }

    /**
     * Reference to the pointer move event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    public get onPointerMove(): (event: IInteractionEvent) => void {
        return this._onPointerMove;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    public set onPointerMove(
        value: (event: IInteractionEvent
        ) => void) {
        this._onPointerMove = value;
    }

    /**
     * Reference to the pointer out event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    public get onPointerOut(): (event: IInteractionEvent) => void {
        return this._onPointerOut;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    public set onPointerOut(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerOut = value;
    }

    /**
     * Reference to the pointer over event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    public get onPointerOver(): (event: IInteractionEvent) => void {
        return this._onPointerOver;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    public set onPointerOver(
        value: (event: IInteractionEvent) => void
    ) {
        this._onPointerOver = value;
    }

    /**
     * Reference to the pointer double click event.
     *
     * @member {(event: IInteractionEvent) => void}
     * @readonly
     * @public
     */
    public get onDoubleClick(): (event: IInteractionEvent) => void {
        return this._onDoubleClick;
    }

    /**
     * Update the event function that will be executed.
     *
     * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
     * @public
     */
    public set onDoubleClick(
        value: (event: IInteractionEvent) => void
    ) {
        this._onDoubleClick = value;
    }

    /**
     * Handle the pointer down event.
     *
     * @return {void}
     * @public
     */
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

    /**
     * Handle the pointer up event.
     *
     * @return {void}
     * @public
     */
    public handlePointerUp(
        event: IInteractionEvent
    ): void {
        if(this.onPointerUp !== undefined) this._onPointerUp(event);
    }

    /**
     * Handle the pointer move event.
     *
     * @return {void}
     * @public
     */
    public handlePointerMove(
        event: IInteractionEvent
    ): void {
        if(this.onPointerMove !== undefined) this._onPointerMove(event);
    }

    /**
     * Handle the pointer out event.
     *
     * @return {void}
     * @public
     */
    public handlePointerOut(
        event: IInteractionEvent
    ): void {
        if(this.onPointerOut !== undefined) this._onPointerOut(event);
    }

    /**
     * Handle the pointer over event.
     *
     * @return {void}
     * @public
     */
    public handlePointerOver(
        event: IInteractionEvent
    ): void {
        if(this.onPointerOver !== undefined) this._onPointerOver(event);
    }

}
