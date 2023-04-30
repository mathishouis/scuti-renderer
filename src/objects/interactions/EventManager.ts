import type { IInteractionEvent } from '../../interfaces/Interaction';
import {Room} from "../rooms/Room";

/**
 * InteractionManager class for interaction handling.
 *
 * @class
 * @memberof Scuti
 */
export class EventManager {
  /**
   * A boolean indicating if the user have clicked at least one time, indicating that the second click is a double click.
   *
   * @member {boolean}
   * @private
   */
  private _isDoubleClicking = false;

  /**
   * The double click timeout that set the _isDoubleClicking boolean value to false after 350ms.
   *
   * @member {number}
   * @private
   */
  private _doubleClickTimeout!: number;

  /**
   * The pointer down event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @private
   */
  private _onPointerDown!: (event: IInteractionEvent) => void;

  /**
   * The pointer up event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @private
   */
  private _onPointerUp!: (event: IInteractionEvent) => void;

  /**
   * The pointer move event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @private
   */
  private _onPointerMove!: (event: IInteractionEvent) => void;

  /**
   * The pointer out event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @private
   */
  private _onPointerOut!: (event: IInteractionEvent) => void;

  /**
   * The pointer ouver event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @private
   */
  private _onPointerOver!: (event: IInteractionEvent) => void;

  /**
   * The pointer double click event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @private
   */
  private _onDoubleClick!: (event: IInteractionEvent) => void;

  /**
   * The assets starting load event.
   *
   * @member {() => void}
   * @private
   */
  private _onLoad!: () => void;

  /**
   * The assets ending load event.
   *
   * @member {() => void}
   * @private
   */
  private _onLoadComplete!: () => void;

  /**
   * The room add event.
   *
   * @member {(room: Room) => void}
   * @private
   */
  private _onRoomAdded!: (room: Room) => void;

  /**
   * The room remove event.
   *
   * @member {(room: Room) => void}
   * @private
   */
  private _onRoomRemoved!: (room: Room) => void;

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
  public set onPointerDown(value: (event: IInteractionEvent) => void) {
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
  public set onPointerUp(value: (event: IInteractionEvent) => void) {
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
  public set onPointerMove(value: (event: IInteractionEvent) => void) {
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
  public set onPointerOut(value: (event: IInteractionEvent) => void) {
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
  public set onPointerOver(value: (event: IInteractionEvent) => void) {
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
  public set onDoubleClick(value: (event: IInteractionEvent) => void) {
    this._onDoubleClick = value;
  }

  /**
   * Reference to the assets starting load event.
   *
   * @member {() => void}
   * @readonly
   * @public
   */
  public get onLoad(): () => void {
    return this._onLoad;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {() => void} [value] - The event function that will be executed.
   * @public
   */
  public set onLoad(value: () => void) {
    this._onLoad = value;
  }

  /**
   * Reference to the assets ending load event.
   *
   * @member {() => void}
   * @readonly
   * @public
   */
  public get onLoadComplete(): () => void {
    return this._onLoadComplete;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {() => void} [value] - The event function that will be executed.
   * @public
   */
  public set onLoadComplete(value: () => void) {
    this._onLoadComplete = value;
  }

  /**
   * Reference to the room add event.
   *
   * @member {(room: Room) => void}
   * @readonly
   * @public
   */
  public get onRoomAdded(): (room: Room) => void {
    return this._onRoomAdded;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(room: Room) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onRoomAdded(value: (room: Room) => void) {
    this._onRoomAdded = value;
  }

  /**
   * Reference to the room remove event.
   *
   * @member {(room: Room) => void}
   * @readonly
   * @public
   */
  public get onRoomRemoved(): (room: Room) => void {
    return this._onRoomRemoved;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(room: Room) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onRoomRemoved(value: (room: Room) => void) {
    this._onRoomRemoved = value;
  }

  /**
   * Handle the pointer down event.
   *
   * @return {void}
   * @public
   */
  public handlePointerDown(event: IInteractionEvent): void {
    if (!this._isDoubleClicking) {
      if (this.onPointerDown !== undefined) this._onPointerDown(event);
      this._isDoubleClicking = true;
      this._doubleClickTimeout = window.setTimeout(() => {
        return (this._isDoubleClicking = false);
      }, 350);
    } else {
      if (this.onDoubleClick !== undefined) this._onDoubleClick(event);
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
  public handlePointerUp(event: IInteractionEvent): void {
    if (this.onPointerUp !== undefined) this._onPointerUp(event);
  }

  /**
   * Handle the pointer move event.
   *
   * @return {void}
   * @public
   */
  public handlePointerMove(event: IInteractionEvent): void {
    if (this.onPointerMove !== undefined) this._onPointerMove(event);
  }

  /**
   * Handle the pointer out event.
   *
   * @return {void}
   * @public
   */
  public handlePointerOut(event: IInteractionEvent): void {
    if (this.onPointerOut !== undefined) this._onPointerOut(event);
  }

  /**
   * Handle the pointer over event.
   *
   * @return {void}
   * @public
   */
  public handlePointerOver(event: IInteractionEvent): void {
    if (this.onPointerOver !== undefined) this._onPointerOver(event);
  }

  /**
   * Handle the assets load start event.
   *
   * @return {void}
   * @public
   */
  public handleLoad(): void {
    if (this.onLoad !== undefined) this._onLoad();
  }

  /**
   * Handle the assets load end event.
   *
   * @return {void}
   * @public
   */
  public handleLoadComplete(): void {
    if (this.onLoadComplete !== undefined) this._onLoadComplete();
  }

  /**
   * Handle the room add event.
   *
   * @return {void}
   * @public
   */
  public handleRoomAdded(room: Room): void {
    if (this.onRoomAdded !== undefined) this._onRoomAdded(room);
  }

  /**
   * Handle the room remove event.
   *
   * @return {void}
   * @public
   */
  public handleRoomRemoved(room: Room): void {
    if (this.onRoomRemoved !== undefined) this._onRoomRemoved(room);
  }
}
