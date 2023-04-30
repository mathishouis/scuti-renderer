import { Room } from "../Room";
import {EventManager} from "../../interactions/EventManager";
import {IInteractionEvent} from "../../../interfaces/Interaction";
import {Logger} from "../../../utilities/Logger";
import {IPosition3D} from "../../../interfaces/Room";
import {Direction} from "../../../enums/Direction";
import {RoomObjectVisualization} from "./RoomObjectVisualization";
import {IFloorPosition, IWallPosition} from "../../../interfaces/Furniture";
import {gsap} from "gsap";

/**
 * RoomObject class that is extended by the avatars or furnitures.
 *
 * @class
 * @memberof Scuti
 */
export abstract class RoomObject {
  public _position: IFloorPosition | IWallPosition;
  public _visualization!: RoomObjectVisualization;

  /**
   * The room object logger instance.
   *
   * @member {Logger}
   * @private
   */
  private readonly _logger: Logger = new Logger('Room Object');

  /**
   * The furniture interaction manager to handle all the clicks and taps.
   *
   * @member {EventManager}
   * @private
   */
  private readonly _eventManager = new EventManager();

  /**
   * The room instance that will be managed by the camera.
   *
   * @member {Room | undefined}
   * @private
   */
  private _room!: Room | undefined;

  /**
   * Reference to the object event manager.
   *
   * @member {EventManager}
   * @readonly
   * @public
   */
  get eventManager(): EventManager {
    return this._eventManager;
  }

  /**
   * Reference to the room object room instance.
   *
   * @member {Room | undefined}
   * @readonly
   * @public
   */
  get room(): Room | undefined {
    return this._room;
  }

  /**
   * Update the current room instance.
   *
   * @param {Room | undefined} [room] - The new room instance.
   * @public
   */
  set room(room: Room | undefined) {
    this._room = room;
  }

  /**
   * Reference to the pointer down event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  get onPointerDown(): (event: IInteractionEvent) => void {
    return this._eventManager.onPointerDown;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  set onPointerDown(value: (event: IInteractionEvent) => void) {
    this._eventManager.onPointerDown = value;
  }

  /**
   * Reference to the pointer up event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  get onPointerUp(): (event: IInteractionEvent) => void {
    return this._eventManager.onPointerUp;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  set onPointerUp(value: (event: IInteractionEvent) => void) {
    this._eventManager.onPointerUp = value;
  }

  /**
   * Reference to the pointer move event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  get onPointerMove(): (event: IInteractionEvent) => void {
    return this._eventManager.onPointerMove;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  set onPointerMove(value: (event: IInteractionEvent) => void) {
    this._eventManager.onPointerMove = value;
  }

  /**
   * Reference to the pointer out event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  get onPointerOut(): (event: IInteractionEvent) => void {
    return this._eventManager.onPointerOut;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  set onPointerOut(value: (event: IInteractionEvent) => void) {
    this._eventManager.onPointerOut = value;
  }

  /**
   * Reference to the pointer over event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  get onPointerOver(): (event: IInteractionEvent) => void {
    return this._eventManager.onPointerOver;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  set onPointerOver(value: (event: IInteractionEvent) => void) {
    this._eventManager.onPointerOver = value;
  }

  /**
   * Reference to the pointer double click event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  get onDoubleClick(): (event: IInteractionEvent) => void {
    return this._eventManager.onDoubleClick;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  set onDoubleClick(value: (event: IInteractionEvent) => void) {
    this._eventManager.onDoubleClick = value;
  }

  /**
   * Reference to the assets starting load event.
   *
   * @member {() => void}
   * @readonly
   * @public
   */
  public get onLoad(): () => void {
    return this._eventManager.onLoad;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {() => void} [value] - The event function that will be executed.
   * @public
   */
  public set onLoad(value: () => void) {
    this._eventManager.onLoad = value;
  }

  /**
   * Reference to the assets ending load event.
   *
   * @member {() => void}
   * @readonly
   * @public
   */
  public get onLoadComplete(): () => void {
    return this._eventManager.onLoadComplete;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {() => void} [value] - The event function that will be executed.
   * @public
   */
  public set onLoadComplete(value: () => void) {
    this._eventManager.onLoadComplete = value;
  }

  /**
   * Reference to the room add event.
   *
   * @member {(room: Room) => void}
   * @readonly
   * @public
   */
  get onRoomAdded(): (event: Room) => void {
    return this._eventManager.onRoomAdded;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(room: Room) => void} [value] - The event function that will be executed.
   * @public
   */
  set onRoomAdded(value: (room: Room) => void) {
    this._eventManager.onRoomAdded = value;
  }

  /**
   * Reference to the room remove event.
   *
   * @member {(room: Room) => void}
   * @readonly
   * @public
   */
  get onRoomRemoved(): (event: Room) => void {
    return this._eventManager.onRoomRemoved;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(room: Room) => void} [value] - The event function that will be executed.
   * @public
   */
  set onRoomRemoved(value: (room: Room) => void) {
    this._eventManager.onRoomRemoved = value;
  }

  /**
   * Reference to the room object logger instance.
   *
   * @member {Logger}
   * @readonly
   * @public
   */
  public get logger(): Logger {
    return this._logger;
  }

  /**
   * Reference to the visualization instance.
   *
   * @member {RoomObjectVisualization}
   * @readonly
   * @public
   */
  public get visualization(): RoomObjectVisualization {
    return this._visualization;
  }

  move(position: IFloorPosition | IWallPosition, duration?: number = 0.5): void {
    if (!this._visualization) return;
    gsap.to(this._position, {
      x: position.x,
      y: position.y,
      duration: duration,
      ease: 'linear',
      onUpdate: () => {
        this._visualization.updatePosition();
      },
      onComplete: () => {
        this._position = position;
      }
    });
  }

  rotate(direction: Direction, duration?: number = 0): void {
    if (!this._visualization) return;
  }

  destroy(): void {
    if (!this._visualization) return;
    this._visualization.destroy();
    if (!this._room) return;
    this._room.objects.remove(this);
  }
}
