import { Container, Point } from 'pixi.js';

import type { Dimension } from '../../../types/Dimension';
import type { Room } from '../Room';
import type { Stair, Tile } from '.';
import { EventManager } from '../../interactions/EventManager';
import type { IInteractionEvent } from '../../../types/Interaction';

export abstract class RoomPart extends Container {
  /**
   * The part's position in the room.
   *
   * @member {IWallPosition | IPosition3D}
   * @private
   */
  abstract _position: Dimension.IPosition3D;

  /**
   * The part interaction manager to handle all the clicks and taps.
   *
   * @member {EventManager}
   * @private
   */
  private readonly _interactionManager = new EventManager();

  /**
   * The room instance where the ârt will be drawn.
   *
   * @member {Room}
   * @private
   */
  private _room: Room;

  constructor(room: Room) {
    super();

    this._room = room;
  }

  /**
   * Return the part at the specified screen position.
   *
   * @param {IPosition2D} [position] - The screen position.
   * @return {Tile | Stair}
   * @public
   */
  public getFromGlobal(position: Dimension.IPosition2D): Tile | Stair {
    const container = this._room.visualization.children.find((container) => {
      const point = new Point(position.x, position.y);
      if (Boolean(container.hitArea?.contains(container.toLocal(point).x, container.toLocal(point).y)))
        return container;
    });

    // @ts-expect-error
    return container;
  }

  public registerInteractions(position: Dimension.IPosition3D): void {
    this.on('pointerdown', (event) => {
      return this.interactionManager.handlePointerDown({
        event,
        position: { x: position.x, y: position.y, z: position.z }
      });
    });
    this.on('pointerup', (event) => {
      return this.interactionManager.handlePointerUp({
        event,
        position: { x: position.x, y: position.y, z: position.z }
      });
    });
    this.on('pointermove', (event) => {
      return this.interactionManager.handlePointerMove({
        event,
        position: { x: position.x, y: position.y, z: position.z }
      });
    });
    this.on('pointerout', (event) => {
      return this.interactionManager.handlePointerOut({
        event,
        position: { x: position.x, y: position.y, z: position.z }
      });
    });
    this.on('pointerover', (event) => {
      return this.interactionManager.handlePointerOver({
        event,
        position: { x: position.x, y: position.y, z: position.z }
      });
    });
  }

  public set room(room: Room) {
    this._room = room;
  }

  public get room(): Room {
    return this._room;
  }

  public get interactionManager(): EventManager {
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
}
