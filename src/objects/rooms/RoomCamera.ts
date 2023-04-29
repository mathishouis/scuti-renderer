import { Container, EventBoundary, FederatedPointerEvent } from 'pixi.js';
import { gsap } from 'gsap';

import type { Room } from './Room';
import type { Tile } from './parts/Tile';
import type { Stair } from './parts/Stair';

/**
 * RoomCamera class that manage things like the room dragging or detecting if the room is out of bounds.
 *
 * @class
 * @memberof Scuti
 */
export class RoomCamera extends Container {
  /**
   * The room instance that will be managed by the camera.
   *
   * @member {Room}
   * @private
   */
  private readonly _room: Room;

  /**
   * A boolean indicating if the room is being dragged.
   *
   * @member {boolean}
   * @private
   */
  private _dragging!: boolean;

  /**
   * The container that will act as a trigger to drag the room container.
   *
   * @member {Container}
   * @private
   */
  private readonly _viewContainer: Container;

  /**
   * The container that will contain the room.
   *
   * @member {Container}
   * @private
   */
  private readonly _roomContainer: Container;

  /**
   * The current selected tile.
   *
   * @member {Tile | Stair}
   * @private
   */
  private _selectedTile!: Tile | Stair;

  /**
   * The current zoom level.
   *
   * @member {number}
   * @private
   */
  private _zoomLevel: number;

  /**
   * @param {Room} [room] - The room instance that will be managed by this camera.
   */
  constructor(room: Room) {
    super();

    this._room = room;
    this._zoomLevel = 1;

    /** Initialise the view container */
    this._viewContainer = new Container();

    /** Initialise the room container */
    this._roomContainer = new Container();
    this._roomContainer.addChild(this._room);
    this._viewContainer.addChild(this._roomContainer);
    this.addChild(this._viewContainer);

    /** Handle interactions */
    this._room.engine.application.renderer.events.domElement.addEventListener('pointerdown', this._dragStart);
    this._room.engine.application.renderer.events.domElement.addEventListener('pointerup', this._dragEnd);
    // @ts-expect-error
    this._room.engine.application.renderer.events.domElement.addEventListener('pointermove', this._dragMove);

    /** Handle tile interactions */
    this._room.engine.application.renderer.events.domElement.addEventListener('pointerdown', this._tilePointerDown);
    this._room.engine.application.renderer.events.domElement.addEventListener('pointerup', this._tilePointerUp);
    this._room.engine.application.renderer.events.domElement.addEventListener('pointermove', this._tilePointerMove);

    this._updateBounds();
    this._centerCamera();
  }

  /**
   * Update the room container bounds.
   *
   * @return {void}
   * @private
   */
  private _updateBounds(): void {
    this._roomContainer.pivot.x = this._room.view.wallLayer.getBounds().x;
    this._roomContainer.pivot.y = this._room.view.wallLayer.getBounds().y;
  }

  /**
   * Tween the room container at the center of the PixiJS view.
   *
   * @return {void}
   * @private
   */
  private _centerCamera(): void {
    gsap.to(this._roomContainer, {
      x: Math.floor(this._room.engine.application.view.width / 2 - this._room.view.width / 2),
      y: Math.floor(this._room.engine.application.view.height / 2 - this._room.view.height / 2),
      duration: 0.8,
      ease: 'easeOut'
    });
  }

  /**
   * This method is called when the user start dragging the room.
   *
   * @return {void}
   * @private
   */
  private readonly _dragStart = (): void => {
    this._dragging = true;
  };

  /**
   * This method is called when the user stop dragging the room.
   *
   * @return {void}
   * @private
   */
  private readonly _dragEnd = (): void => {
    this._dragging = false;
    if (this._isOutOfBounds()) this._centerCamera();
  };

  /**
   * This method is called when the user is moving the dragged room in the canvas.
   *
   * @param {FederatedPointerEvent} [event] - The mouse event.
   * @return {void}
   * @private
   */
  private readonly _dragMove = (event: FederatedPointerEvent): void => {
    if (this._dragging) {
      this._roomContainer.x = Math.floor(this._roomContainer.x + event.movementX * (1 / this._zoomLevel));
      this._roomContainer.y = Math.floor(this._roomContainer.y + event.movementY * (1 / this._zoomLevel));
    }
  };

  /**
   * Indicate if the room container is out of bounds of the PixiJS view.
   *
   * @return {boolean}
   * @private
   */
  private _isOutOfBounds(): boolean {
    /** Out of bounds on the right */
    if (this._roomContainer.x > this._room.engine.application.view.width) return true;
    /** Out of bounds on the left */
    if (this._roomContainer.x + this._roomContainer.width < 0) return true;
    /** Out of bounds on the bottom */
    if (this._roomContainer.y > this._room.engine.application.view.height) return true;
    /** Out of bounds on the top */
    if (this._roomContainer.y + this._roomContainer.height < 0) return true;
    /** It is not out of bounds */
    return false;
  }

  /**
   * Manage pointer down event on the canvas for tile interaction.
   *
   * @return {void}
   * @private
   */
  private readonly _tilePointerDown = (event: PointerEvent): void => {
    const tile = this._room.tiles.getTileFromGlobal({ x: event.clientX, y: event.clientY });

    if (tile != null) tile.emit('pointerdown', new FederatedPointerEvent(new EventBoundary()));
  };

  /**
   * Manage pointer up event on the canvas for tile interaction.
   *
   * @return {void}
   * @private
   */
  private readonly _tilePointerUp = (event: PointerEvent): void => {
    const tile = this._room.tiles.getTileFromGlobal({ x: event.clientX, y: event.clientY });

    if (tile != null) tile.emit('pointerup', new FederatedPointerEvent(new EventBoundary()));
  };

  /**
   * Manage pointer move event on the canvas for tile interaction.
   *
   * @return {void}
   * @private
   */
  private readonly _tilePointerMove = (event: PointerEvent): void => {
    const object: Tile | Stair = this._room.tiles.getTileFromGlobal({ x: event.clientX, y: event.clientY });

    if (object === undefined) return;

    if (this._selectedTile === object) {
      object.emit('pointermove', new FederatedPointerEvent(new EventBoundary()));
    } else {
      if (this._selectedTile !== undefined) {
        this._selectedTile.emit('pointerout', new FederatedPointerEvent(new EventBoundary()));
      }
      if (object !== undefined) {
        object.emit('pointerover', new FederatedPointerEvent(new EventBoundary()));
      }
      this._selectedTile = object;
    }
  };

  /**
   * Zoom the room container.
   *
   * @return {void}
   * @private
   */
  public set zoomLevel(zoomLevel: number) {
    const origWidth: number = this.width / this._zoomLevel;
    const origHeight: number = this.height / this._zoomLevel;
    this._zoomLevel = zoomLevel;
    this.scale.x = zoomLevel;
    this.scale.y = zoomLevel;
    const diffWidth: number = origWidth - this.width;
    const diffHeight: number = origHeight - this.height;
    const offsetX: number = (this._room.engine.application.view.width / 2) - (this.x + (origWidth / 2));
    const offsetY: number = (this._room.engine.application.view.height / 2) - (this.y + (origHeight / 2));
    this.x += Math.floor((diffWidth / 2) + offsetX);
    this.y += Math.floor((diffHeight / 2) + offsetY);
  }

  /**
   * Return the zoom level of the room container.
   *
   * @member {Application}
   * @readonly
   * @public
   */
  public get zoomLevel(): number {
    return this._zoomLevel;
  }
}
