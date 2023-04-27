import { gsap } from 'gsap';

import type { IFloorFurnitureConfiguration, IFloorPosition } from '../../interfaces/Furniture';
import type { Direction } from '../../enums/Direction';
import { FurnitureData } from './FurnitureData';
import { RoomObject } from '../rooms/RoomObject';
import { InteractionManager } from '../interactions/InteractionManager';
import type { IInteractionEvent } from '../../interfaces/Interaction';
import { FurnitureView } from './FurnitureView';
import type { FurnitureVisualization } from './visualizations/FurnitureVisualization';

/**
 * FloorFurniture class that aim to reproduce the floor furnitures on Habbo.
 *
 * @class
 * @memberof Scuti
 */
export class FloorFurniture extends RoomObject {
  /**
   * The furniture id that represent the one in furnidata.
   *
   * @member {number}
   * @private
   */
  private readonly _id: number;

  /**
   * The furniture position in the room.
   *
   * @member {IFloorPosition}
   * @private
   */
  private _position: IFloorPosition;

  /**
   * The furniture direction (0, 2, 4, 6).
   *
   * @member {Direction}
   * @private
   */
  private _direction: Direction;

  /**
   * The furniture state that represent it's current playing animation.
   *
   * @member {number}
   * @private
   */
  private _state: number;

  /**
   * A boolean indicating if we have to apply the wired selection filter to the furniture.
   *
   * @member {boolean}
   * @private
   */
  private _selected: boolean = false;

  /**
   * The furniture data.
   *
   * @member {FurnitureData}
   * @private
   */
  private readonly _data: FurnitureData;

  /**
   * The furniture view.
   *
   * @member {FurnitureView}
   * @private
   */
  private _view: FurnitureView;

  /**
   * The furniture interaction manager to handle all the clicks and taps.
   *
   * @member {InteractionManager}
   * @private
   */
  private readonly _interactionManager = new InteractionManager();

  /**
   * @param {IFloorFurnitureConfiguration} [configuration] - The furniture configuration.
   */
  constructor(configuration: IFloorFurnitureConfiguration) {
    super();
    /** Store the data */
    this._id = configuration.id;
    this._position = configuration.position;
    this._direction = configuration.direction;
    this._state = configuration.state ?? 0;
    this._data = new FurnitureData(this);
    /** Initialise view */
    this._view = new FurnitureView(this);
    this.addChild(this._view);
    /** Set the furniture position in the canvas */
    this._updatePosition();
  }

  /**
   * Update the furniture position in the canvas.
   *
   * @return {void}
   * @private
   */
  private _updatePosition(): void {
    this.x = 32 + 32 * this._position.x - 32 * this._position.y;
    this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
  }

  /**
   * Add the furniture to the ticker to start the animation.
   *
   * @return {void}
   * @public
   */
  // @ts-expect-error
  public start(): void {
    this.animationTicker.add(() => {
      return this._view.tick();
    });
  }

  /**
   * Remove the furniture from the ticker to stop the animation.
   *
   * @return {void}
   * @public
   */
  // @ts-expect-error
  public stop(): void {
    this.animationTicker.remove(() => {
      return this._view.tick();
    });
  }

  /**
   * Move the furniture at the given position and in time.
   *
   * @param {IFloorPosition} [position] - The position where we want to move the furniture.
   * @param {number} [duration] - The time to move the furniture to the given position.
   * @return {void}
   * @public
   */
  public move = (position: IFloorPosition, duration: number = 0.5): void => {
    gsap.to(this, {
      x: 32 + 32 * position.x - 32 * position.y,
      y: 16 * position.x + 16 * position.y - 32 * position.z,
      duration,
      ease: 'linear',
      onComplete: () => {
        this._position = position;
      }
    });
  };

  /**
   * Rotate the furniture at the given direction and in time.
   *
   * @param {Direction} [direction] - The new direction of the furniture.
   * @param {number} [duration] - The time to rotate the furniture at the given direction.
   * @return {void}
   * @public
   */
  public rotate = (direction: Direction, duration: number = 0.2): void => {
    gsap.to(this, {
      x: 32 + 32 * this._position.x - 32 * this._position.y,
      y: 16 * this._position.x + 16 * this._position.y - 32 * this._position.z - 6.25,
      duration: duration / 2,
      ease: 'easeIn',
      onComplete: () => {
        this._direction = direction;
        this._view.update();
        gsap.to(this, {
          x: 32 + 32 * this._position.x - 32 * this._position.y,
          y: 16 * this._position.x + 16 * this._position.y - 32 * this._position.z,
          duration: duration / 2,
          ease: 'easeOut'
        });
      }
    });
  };

  /**
   * Reference to the furniture id from the furni data.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Reference to the furniture position in the room.
   *
   * @member {IFloorPosition}
   * @readonly
   * @public
   */
  public get roomPosition(): IFloorPosition {
    return this._position;
  }

  /**
   * Update the furniture position.
   *
   * @param {IFloorPosition} [position] - The new furniture position.
   * @public
   */
  public set roomPosition(position: IFloorPosition) {
    this._position = position;
  }

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
   * Update the furniture direction.
   *
   * @param {Direction} [direction] - The new furniture direction.
   * @public
   */
  public set direction(direction: Direction) {
    this._direction = direction;
    this._view.update();
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
    this._view.update();
  }

  /**
   * Reference to the furniture selection state.
   *
   * @member {boolean}
   * @readonly
   * @public
   */
  public get selected(): boolean {
    return this._selected;
  }

  /**
   * Update the furniture selection state (add the wired selection filter to the furniture).
   *
   * @param {boolean} [selected] - The new furniture selection state.
   * @public
   */
  public set selected(selected: boolean) {
    this._selected = selected;
    this._view.update();
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

  /**
   * Reference to the furniture view.
   *
   * @member {FurnitureView}
   * @readonly
   * @public
   */
  public get view(): FurnitureView {
    return this._view;
  }

  /**
   * Update the furniture view.
   *
   * @param {FurnitureView} [view] - The new furniture view.
   * @public
   */
  public set view(view: FurnitureView) {
    this._view = view;
  }

  /**
   * Reference to the furniture visualization.
   *
   * @member {FurnitureVisualization}
   * @readonly
   * @public
   */
  public get visualization(): FurnitureVisualization {
    return this._view.visualization;
  }

  /**
   * Reference to the furniture interaction manager.
   *
   * @member {InteractionManager}
   * @readonly
   * @public
   */
  public get interactionManager(): InteractionManager {
    return this._interactionManager;
  }

  /**
   * Reference to the pointer down event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  public get onPointerDown(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerDown;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onPointerDown(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerDown = value;
  }

  /**
   * Reference to the pointer up event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  public get onPointerUp(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerUp;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onPointerUp(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerUp = value;
  }

  /**
   * Reference to the pointer move event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  public get onPointerMove(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerMove;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onPointerMove(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerMove = value;
  }

  /**
   * Reference to the pointer out event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  public get onPointerOut(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerOut;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onPointerOut(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerOut = value;
  }

  /**
   * Reference to the pointer over event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  public get onPointerOver(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerOver;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onPointerOver(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerOver = value;
  }

  /**
   * Reference to the pointer double click event.
   *
   * @member {(event: IInteractionEvent) => void}
   * @readonly
   * @public
   */
  public get onDoubleClick(): (event: IInteractionEvent) => void {
    return this._interactionManager.onDoubleClick;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {(event: IInteractionEvent) => void} [value] - The event function that will be executed.
   * @public
   */
  public set onDoubleClick(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onDoubleClick = value;
  }

  /**
   * Reference to the load event.
   *
   * @member {() => void}
   * @readonly
   * @public
   */
  public get onLoad(): () => void {
    return this._view.onLoad;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {() => void} [value] - The event function that will be executed.
   * @public
   */
  public set onLoad(value: () => void) {
    this._view.onLoad = value;
  }
}
