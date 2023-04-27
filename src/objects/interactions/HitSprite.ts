import type { IPointData } from 'pixi.js';
import { Sprite } from 'pixi.js';

import { HitTexture } from './HitTexture';

/**
 * HitSprite class that manage the interactions with sprite transparency.
 *
 * @class
 * @memberof Scuti
 */
export class HitSprite extends Sprite {
  /**
   * The sprite interactivity.
   *
   * @member {boolean}
   * @public
   */
  public interactive!: boolean;

  /**
   * The global sprite position in the canvas.
   *
   * @member {{ x: number, y: number }}
   * @public
   */
  // @ts-expect-error
  public getGlobalPosition: () => { x: number; y: number };

  /**
   * The hit texture that contains the hit map data.
   *
   * @member {HitTexture}
   * @private
   */
  private _hitTexture!: HitTexture;

  /**
   * Return a boolean indicating if the pointer is on the sprite.
   *
   * @return {boolean}
   * @public
   */
  public containsPoint(point: IPointData): boolean {
    /** The sprite is not interactive, so we stop here */
    if (!this.interactive) return false;

    if (this.texture.trim === undefined) return false;

    const width = this.texture.orig.width;
    const height = this.texture.orig.height;

    const x1 = this.getGlobalPosition().x + this.texture.trim.x;
    let y1 = 0;
    let flag = false;

    /** Check if the pointer is out of bound of the sprite */
    if (point.x >= x1 && point.x < x1 + width) {
      y1 = this.getGlobalPosition().y + this.texture.trim.y;
      if (point.y >= y1 && point.y < y1 + height) flag = true;
    }

    /** Return false if the pointer is out of bound */
    if (!flag) return false;

    /** Create the hit texture */
    if (this._hitTexture == null) this._hitTexture = new HitTexture(this);

    /** Check the hit map of the hit texture if the pointer is on a transparent pixel or not */
    return this._hitTexture.hit(point.x - x1, point.y - y1, this.scale.x === -1);
  }
}
