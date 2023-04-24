import { Container, Point } from 'pixi.js';

import type { Room } from '../Room';
import type { IInteractionEvent } from '../../../interfaces/Interaction';
import { InteractionManager } from '../../interactions/InteractionManager';
import type { Tile } from '../parts/Tile';
import type { Stair } from '../parts/Stair';
import type { IPosition2D } from '../../../interfaces/Room';

/**
 * RoomTileLayer class that manage all the room tiles.
 *
 * @class
 * @memberof Scuti
 */
export class RoomTileLayer extends Container {
  /**
   * The room instance that will be managed by the camera.
   *
   * @member {Room}
   * @private
   */
  // @ts-expect-error
  private readonly _room: Room;

  /**
   * The room tiles interaction manager.
   *
   * @member {InteractionManager}
   * @private
   */
  private readonly _interactionManager: InteractionManager = new InteractionManager();

  /**
   * @param {Room} [room] - The room instance that we want to visualize.
   */
  constructor(room: Room) {
    super();

    this._room = room;
  }

  /**
   * Return the tile or the stair at the specified screen position.
   *
   * @param {IPosition2D} [position] - The screen position.
   * @return {Tile | Stair}
   * @public
   */
  public getTileFromGlobal(position: IPosition2D): Tile | Stair {
    // @ts-expect-error
    const container = this.children.find((container: Container) => {
      const point: Point = new Point(position.x, position.y);
      // @ts-expect-error
      if (container.hitArea.contains(container.toLocal(point).x, container.toLocal(point).y)) return container;
    });
    // @ts-expect-error
    return container;
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
}
