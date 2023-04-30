import { Assets, BLEND_MODES, Container } from 'pixi.js';

import { FloorFurniture } from './FloorFurniture';
import { WallFurniture } from './WallFurniture';
import { FurnitureLayer } from './FurnitureLayer';
import { FurnitureGuildCustomizedVisualization } from './visualizations/FurnitureGuildCustomizedVisualization';
import { FurnitureRoomBackgroundVisualization } from './visualizations/FurnitureRoomBackgroundVisualization';
import { AssetLoader } from '../../utilities/AssetLoader';
import { ZOrder } from '../../utilities/ZOrder';

/**
 * FurniturePart class that represent a furniture layer.
 *
 * @class
 * @memberof Scuti
 */
export class FurniturePart extends Container {
  /**
   * The furniture instance that is the parent of the part.
   *
   * @member {FloorFurniture | WallFurniture}
   * @private
   */
  private readonly _furniture: FloorFurniture | WallFurniture;

  /**
   * The layer id.
   *
   * @member {number}
   * @private
   */
  private readonly _layer: number;

  /**
   * The current frame id.
   *
   * @member {number}
   * @private
   */
  private _frame!: number;

  /**
   * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance.
   * @param {number} [layer] - The layer id.
   */
  constructor(furniture: FloorFurniture | WallFurniture, layer: number) {
    super();

    /** Store data */
    this._furniture = furniture;
    this._layer = layer;

    /** Draw the part */
    this._draw();
  }

  /**
   * Draw the part.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    /** Remove the old layer */
    this.removeChild(this.children[0]);

    /** Needed resources */
    const visualization = this._furniture.view.property.visualization;
    const spritesheet = this._furniture.view.spritesheet;

    /** Layer data */
    let alpha = 1;
    let tint: number;
    let z = 0;
    let blendMode: BLEND_MODES;
    let flip = false;
    let frame = 0;
    let ignoreMouse = false;
    let tag: string;
    let zOrder: number = 0;

    // TODO: Create FurnitureAnimatedVisualization
    /** We set the state to 0 if it don't exist to avoid any issue */
    if (
      this._furniture.view.property.infos.visualization === 'furniture_animated' &&
      visualization.animation[this._furniture.state] === undefined
    ) {
      this._furniture.state = Number(Object.keys(visualization.animation)[0]);
      return;
    }

    /** Check if the furniture support the current direction */
    if (!visualization.directions.includes(this._furniture.direction))
      this._furniture.direction = visualization.directions[0];

    if (
      visualization.animation[this._furniture.state] !== undefined &&
      visualization.animation[this._furniture.state][this._layer] !== undefined &&
      visualization.animation[this._furniture.state][this._layer].frameSequence.length > 1
    )
      frame = this._frame;

    if (
      visualization.animation[this._furniture.state] !== undefined &&
      visualization.animation[this._furniture.state][this._layer] !== undefined
    )
      frame = visualization.animation[this._furniture.state][this._layer].frameSequence[frame] ?? 0;

    if (
      this._furniture.data.color !== null &&
      visualization.colors[this._furniture.data.color] !== undefined &&
      // @ts-expect-error
      visualization.colors[this._furniture.data.color][this._layer] !== undefined
    )
      // @ts-expect-error
      tint = Number('0x' + String(visualization.colors[this._furniture.data.color][this._layer]));

    /** Set the layer data */
    if (visualization.layers[this._layer] !== undefined) {
      if (visualization.layers[this._layer].z !== undefined) z = visualization.layers[this._layer].z;
      if (visualization.layers[this._layer].alpha !== undefined) alpha = visualization.layers[this._layer].alpha / 255;
      if (visualization.layers[this._layer].ink !== undefined)
        // @ts-expect-error
        blendMode = BLEND_MODES[visualization.layers[this._layer].ink];
      if (visualization.layers[this._layer].ignoreMouse !== undefined)
        ignoreMouse = visualization.layers[this._layer].ignoreMouse;
      if (visualization.layers[this._layer].tag !== undefined) tag = visualization.layers[this._layer].tag;
    }

    if (this._furniture.view.visualization !== undefined) {
      if (this._furniture.view.visualization instanceof FurnitureGuildCustomizedVisualization) {
        // @ts-expect-error
        if (tag === 'COLOR1') tint = this._furniture.view.visualization.primaryColor;
        // @ts-expect-error
        if (tag === 'COLOR2') tint = this._furniture.view.visualization.secondaryColor;
      }
    }

    const name = [
      this._furniture.data.baseName,
      this._furniture.data.baseName,
      64,
      String.fromCharCode(97 + Number(this._layer)),
      this._furniture.direction,
      frame
    ].join('_');

    /** Calculate zOrder */
    /*z =
      (this._furniture.roomPosition.x + this._furniture.roomPosition.y + Math.trunc(z / 100) / 10) * 1000000 +
      // @ts-expect-error
      this._furniture.roomPosition.z * 10000 +
      10000000 * 11;*/

    if (this._furniture instanceof FloorFurniture) zOrder = ZOrder.floorItem(this._furniture.roomPosition, z);
    if (this._furniture instanceof WallFurniture) zOrder = ZOrder.wallItem(this._furniture.roomPosition, z);

    // @ts-expect-error
    if (spritesheet.data.frames[name] !== undefined) flip = spritesheet.data.frames[name].flipH;

    /** Create the layer */
    const layer = this.addChild(
      // @ts-expect-error
      new FurnitureLayer(this._furniture, {
        layer: String.fromCharCode(97 + Number(this._layer)),
        alpha,
        // @ts-expect-error
        tint,
        z: zOrder,
        // @ts-expect-error
        blendMode,
        flip,
        frame,
        ignoreMouse,
        direction: this._furniture.direction,
        // @ts-expect-error
        tag
      })
    );

    if (this._furniture.view.visualization !== undefined) {
      if (
        this._furniture.view.visualization instanceof FurnitureRoomBackgroundVisualization &&
        this._furniture.view.visualization.imageUrl.length > 0
      ) {
        AssetLoader.load(this._furniture.view.visualization.imageUrl, this._furniture.view.visualization.imageUrl)
          .then(() => {
            const visualization: FurnitureRoomBackgroundVisualization = this._furniture.view
              .visualization as FurnitureRoomBackgroundVisualization;
            // @ts-expect-error
            layer.texture = Assets.get(visualization.imageUrl);
            layer.x += visualization.offsetX;
            // @ts-expect-error
            layer.y += visualization.offsetY - layer.texture.height;
            layer.zIndex += visualization.offsetZ;
            // TODO: Implement the offsets for all the directions
          })
          .catch((error) => {
            return console.error(error);
          });
      }
    }
  }

  /**
   * Switch the part to the next frame and rerender it.
   *
   * @return {void}
   * @private
   */
  public nextFrame(): void {
    const visualization = this._furniture.view.property.visualization;
    if (
      // @ts-expect-error
      visualization.animation[String(this._furniture.state)] !== undefined &&
      // @ts-expect-error
      visualization.animation[String(this._furniture.state)][this._layer] !== undefined
    ) {
      // @ts-expect-error
      const frameSequence: number[] = visualization.animation[String(this._furniture.state)][this._layer].frameSequence;
      const currentFrame = this._frame;
      if (frameSequence.length > 1) {
        if (frameSequence.length - 1 > currentFrame) {
          this._frame = currentFrame + 1;
        } else {
          this._frame = 0;
        }

        this._draw();
      } else {
        this._draw();
      }
    }
  }
}
