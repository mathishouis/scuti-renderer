import type { Texture } from 'pixi.js';
import { Assets, Container, Sprite } from 'pixi.js';

import type { Room } from '../Room';
import type { ICursorConfiguration, IPosition3D } from '../../../interfaces/Room';
import type { RoomObjectLayer } from '../layers/RoomObjectLayer';

/**
 * Cursor class that show up when we move the cursor on a room tile.
 *
 * @class
 * @memberof Scuti
 */
export class Cursor extends Container {
  /**
   * The room tile cursor instance.
   *
   * @member {Cursor}
   * @private
   */
  private _cursor!: Cursor;

  /**
   * The room instance where the cursor will be drawn.
   *
   * @member {Room}
   * @private
   */
  private readonly _room: Room;

  /**
   * The cursor position.
   *
   * @member {IPosition3D}
   * @private
   */
  private _position: IPosition3D | undefined;

  /**
   * @param {Room} [room] - The room instance where the cursor will be drawn.
   * @param {ICursorConfiguration} [configuration] - The tile configuration.
   * @param {IPosition3D} [configuration.position] - The cursor position.
   **/
  constructor(room: Room, configuration?: ICursorConfiguration) {
    super();

    /** Store the configuration */
    this._room = room;
    this._position = configuration?.position;

    /** Draw the cursor */
    this._draw();
  }

  /**
   * Draw the cursor.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    if (this._position == null) return;

    /** Creating the sprite */
    const texture: Texture = Assets.get('room/cursors').textures['tile_cursor_64_a_0_0.png'];
    const sprite = new Sprite(texture);
    sprite.y = -20;
    this.addChild(sprite);

    /** Positionate the cursor */
    this.moveTo(this._position);
  }

  /**
   * Apply position of the cursor on the x, y axis relative to the local coordinates of the parent.
   *
   * @param {IPosition3D} [position] - The cursor position.
   * @return {void}
   * @private
   */
  private moveTo(position: IPosition3D): void {
    this._position = position;
    this.x = 32 * this._position.x - 32 * this._position.y;
    this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
  }

  /**
   * Destroy the room cursor
   *
   * @return {void}
   * @public
   */
  public destroyCursor(): void {
    if (this != null) this.visible = false;
  }

  /**
   * Destroy the current cursor and draw a new one at the new position in its container.
   *
   * @param {IPosition3D} [position] - The cursor position.
   * @param {RoomObjectLayer} [objectLayer] - The container which renders the cursor.
   * @return {void}
   * @oublic
   */
  public createCursor(position: IPosition3D, objectLayer: RoomObjectLayer): void {
    if (this._cursor != null) {
      this._cursor.visible = true;
      return this._cursor.moveTo(position);
    }

    this.destroyCursor();
    const cursor = new Cursor(this._room, { position });
    this._cursor = cursor;
    objectLayer.addChild(cursor);
  }
}
