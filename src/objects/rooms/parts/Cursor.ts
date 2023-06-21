import type { Spritesheet } from 'pixi.js';
import { Container, Assets, Sprite } from 'pixi.js';

import type { Room } from '../Room';
import type { ICursorConfiguration, IPosition3D } from '../../../types/Room';
import { ZOrder } from '../../../utilities/ZOrder';

/**
 * Cursor class that show up when we move the cursor on a room tile.
 *
 * @class
 * @memberof Scuti
 */
export class Cursor extends Container {
  /**
   * The cursor position.
   *
   * @member {IPosition3D}
   * @private
   */
  private _position: IPosition3D;

  /**
   * @param {Room} [_room] - The room instance where the cursor will be drawn.
   * @param {ICursorConfiguration} [configuration] - The tile configuration.
   **/
  constructor(_room: Room, configuration: ICursorConfiguration) {
    super();

    this._position = configuration.position;

    /** Draw the cursor */
    this._draw();
    // todo!(): create the blue circle 'cursor_64_b' cursor when needed
  }

  /**
   * Draw the cursor.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    /** Creating the sprite */
    const texture = Assets.get<Spritesheet>('room/cursors').textures['tile_cursor_64_a_0_0.png'];
    const sprite = new Sprite(texture);

    sprite.y = -20;
    this.addChild(sprite);

    /** Positionate the cursor and its zIndex */
    this.moveTo(this._position);
    this.zIndex = ZOrder.tileCursor(this._position);
  }

  /**
   * Apply position of the cursor on the x, y axis relative to the local coordinates of the parent.
   *
   * @param {IPosition3D} [position] - The cursor position.
   * @return {void}
   * @public
   */
  public moveTo(position: IPosition3D): void {
    // this.zOrder = ZOrder.tileCursor(position);
    this._position = position;
    this.x = 32 * this._position.x - 32 * this._position.y;
    this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
  }
}
