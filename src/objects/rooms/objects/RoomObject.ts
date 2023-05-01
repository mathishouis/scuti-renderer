import { gsap } from 'gsap';

import { EventManager } from '../../interactions/EventManager';
import { Logger } from '../../../utilities/Logger';
import type { Room } from '../Room';
import type { IInteractionEvent } from '../../../interfaces/Interaction';
import type { Direction } from '../../../enums/Direction';
import type { RoomObjectVisualization } from './RoomObjectVisualization';
import type { IFloorPosition, IWallPosition } from '../../../interfaces/Furniture';
import type { FurnitureData } from '../../furnitures/FurnitureData';
import {Filter} from "pixi.js";

/**
 * RoomObject class that is extended by the avatars or furnitures.
 *
 * @class
 * @memberof Scuti
 */
export abstract class RoomObject {
  /**
   * The furniture position in the room.
   *
   * @member {IFloorPosition | IWallPosition}
   * @private
   */
  abstract _position: IFloorPosition | IWallPosition;

  /**
   * The furniture direction (0, 2, 4, 6).
   *
   * @member {Direction}
   * @private
   */
  public _direction!: Direction;

  /**
   * The furniture state that represent it's current playing animation.
   *
   * @member {number}
   * @private
   */
  public _state!: number;

  /**
   * The furniture visualization.
   *
   * @member {FurnitureData}
   * @private
   */
  public _visualization!: RoomObjectVisualization;

  /**
   * The furniture data.
   *
   * @member {FurnitureData}
   * @private
   */
  public _data!: FurnitureData;

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
   * The room object filters.
   *
   * @member {Filter[]}
   * @private
   */
  private _filters: Filter[] = [];

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
   * Reference to the furniture state.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get state(): number {
    return this._state;
  }

  /**
   * Update the furniture state (so the animation).
   *
   * @param {number} [state] - The new furniture state.
   * @public
   */
  public set state(state: number) {
    this._state = state;
    this._visualization.render();
  }

  /**
   * Reference the filters list.
   *
   * @member {Filter[]}
   * @readonly
   * @public
   */
  public get filters(): Filter[] {
    return this._filters;
  }

  /**
   * Add a filter to the room object.
   *
   * @param {Filter} [filter] - The filter.
   * @public
   */
  public addFilter(filter: Filter): void {
    if (this._filters.includes(filter)) return;
    this._filters.push(filter);
    this._visualization.render();
  }

  /**
   * Remove filter from the room object.
   *
   * @param {Filter} [filter] - The filter.
   * @public
   */
  public removeFilter(filter: Filter): void {
    this._filters = this._filters.filter((fFilter: Filter) => fFilter !== filter);
    this._visualization.render();
  }

  /**
   * Reference to the furniture position in the room.
   *
   * @member {IFloorPosition | IWallPosition}
   * @readonly
   * @public
   */
  abstract get position(): IFloorPosition | IWallPosition;

  /**
   * Move the furniture at the given position and in time.
   *
   * @param {IFloorPosition | IWallPosition} [position] - The position where we want to move the furniture.
   * @param {number} [duration] - The time to move the furniture to the given position.
   * @return {void}
   * @public
   */
  abstract move(position: IFloorPosition | IWallPosition, duration: number): void;

  /**
   * Reference to the furniture direction.
   *
   * @member {Direction}
   * @readonly
   * @public
   */
  public get direction(): Direction {
    return this._direction;
  }

  /**
   * Rotate the furniture at the given direction and in time.
   *
   * @param {Direction} [direction] - The new direction of the furniture.
   * @param {number} [duration] - The time to rotate the furniture at the given direction.
   * @return {void}
   * @public
   */
  rotate(direction: Direction, duration: number = 0): void {
    if (this._visualization === undefined) return;
    gsap.to(this._position, {
      x: this._position.x,
      y: this._position.y - 6.25,
      duration: duration / 2,
      ease: 'easeIn',
      onComplete: () => {
        this._direction = direction;
        this._visualization.render();
        gsap.to(this._position, {
          x: this._position.x,
          y: this._position.y,
          duration: duration / 2,
          ease: 'easeOut',
          onComplete: () => {
            this._visualization.render();
          }
        });
      }
    });
  }

  /**
   * Destroy the room object from the room.
   *
   * @return {void}
   * @public
   */
  destroy(): void {
    if (this._visualization === undefined) return;
    this._visualization.destroy();
    if (this._room == null) return;
    this._room.objects.remove(this);
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

  /**
   * Reference to the furniture data.
   *
   * @member {FurnitureData}
   * @readonly
   * @public
   */
  public get data(): FurnitureData {
    return this._data;
  }
}
