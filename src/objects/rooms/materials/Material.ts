import type { Texture } from 'pixi.js'

/**
 * Material class that regroup the color and texture to be applied on the wall or the floor.
 *
 * @class
 * @memberof Scuti
 */
export class Material {
  /**
   * The material color.
   *
   * @member {number}
   * @private
   */
  private _color: number

  /**
   * The material texture.
   *
   * @member {Texture}
   * @private
   */
  private _texture: Texture

  /**
   * @param {number} [color] - The material color.
   * @param {Texture} [texture] - The material texture.
   **/
  constructor(color: number, texture: Texture) {
    this._color = color
    this._texture = texture
  }

  /**
   * Reference to the material color.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get color(): number {
    return this._color
  }

  /**
   * Update the material color.
   *
   * @param {number} [color] - The new material color.
   * @public
   */
  public set color(color: number) {
    this._color = color
  }

  /**
   * Reference to the material texture.
   *
   * @member {Texture}
   * @readonly
   * @public
   */
  public get texture(): Texture {
    return this._texture
  }

  /**
   * Update the material texture.
   *
   * @param {Texture} [texture] - The new material texture.
   * @public
   */
  public set texture(texture: Texture) {
    this._texture = texture
  }
}
