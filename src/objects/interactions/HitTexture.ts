import type { BaseTexture, DisplayObject, ICanvas, IRenderer, Resource } from 'pixi.js';
import { BaseImageResource, Rectangle, RenderTexture, Sprite, Texture } from 'pixi.js';
import { CanvasRenderTarget } from '@pixi/utils';

import type { HitSprite } from './HitSprite';
import { FurnitureLayer } from '../furnitures/visualizations/FurnitureLayer';
import { AvatarLayer } from '../avatars/visualizations/AvatarLayer';

/**
 * HitTexture class create an hit map from a texture to manage interactions.
 *
 * @class
 * @memberof Scuti
 */
export class HitTexture {
  /**
   * The hit sprite of the hit texture.
   *
   * @member {HitSprite}
   * @readonly
   * @private
   */
  private readonly _sprite: HitSprite;

  /**
   * The hit texture base texture.
   *
   * @member {Texture}
   * @private
   */
  private readonly _texture: Texture;

  /**
   * The hit map array.
   *
   * @member {Uint32Array}
   * @private
   */
  private _hitMap!: Uint32Array;

  /**
   * @param {HitSprite} [sprite] - The hit sprite that we want to retrieve the texture.
   */
  constructor(sprite: HitSprite) {
    this._sprite = sprite;
    this._texture = this._generateTexture();
  }

  /**
   * Return the cached hit map of the sprite.
   *
   * @return {Uint32Array} - A Uint32Array that is the cached hit map of the sprite.
   * @private
   */
  private _getHitMap(): Uint32Array {
    if (!Boolean(this._hitMap)) this._hitMap = this._generateHitMap(this._texture.baseTexture);
    return this._hitMap;
  }

  /**
   * Generate the hit map from a specified base texture.
   *
   * @param {BaseTexture} baseTexture - The base texture that we want to have the hit map.
   * @return {Uint32Array} - An Uint32Array that is the hit map of the specified baseTexture.
   * @private
   */
  private _generateHitMap(baseTexture: BaseTexture<Resource>): Uint32Array {
    const { height: imageHeight, width: imageWidth } = baseTexture.resource;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = imageWidth;
    canvas.height = imageHeight;
    // @ts-expect-error
    context.drawImage(baseTexture.resource.source, 0, 0);

    let w = canvas.width;
    let h = canvas.height;
    if (w > canvas.width) w = canvas.width;
    if (h > canvas.height) h = canvas.height;

    if (w === 0) return new Uint32Array();

    const imageData = context.getImageData(0, 0, w, h);
    const threshold = 255;
    const hitmap = new Uint32Array(Math.ceil((w * h) / 32));
    for (let i = 0; i < w * h; i++) {
      const ind1 = i % 32;
      const ind2 = (i / 32) | 0;
      if (imageData.data[i * 4 + 3] >= threshold) {
        hitmap[ind2] = hitmap[ind2] | (1 << ind1);
      }
    }

    return hitmap;
  }

  /**
   * Generate a sprite texture and not the texture of the entire spritesheet.
   *
   * @return {Texture} - A texture of the sprite (not all the spritesheet).
   * @private
   */
  private _generateTexture(): Texture {
    const sprite = new Sprite(this._sprite.texture.clone());
    let renderTexture = {} as RenderTexture;

    sprite.x = this._sprite.getGlobalPosition().x + this._sprite.texture.trim.x;
    sprite.y = this._sprite.getGlobalPosition().y + this._sprite.texture.trim.y;
    sprite.texture.trim.x = 0;
    sprite.texture.trim.y = 0;

    if (this._sprite instanceof FurnitureLayer) {
      this._sprite.furniture.room.engine.application.stage.addChild(sprite);
      renderTexture = this._sprite.furniture.room.engine.application.renderer.generateTexture(sprite);
    } else if (this._sprite.parent instanceof AvatarLayer) {
      this._sprite.parent.avatar.room.engine.application.stage.addChild(sprite);
      renderTexture = this._sprite.parent.avatar.room.engine.application.renderer.generateTexture(sprite);
    }

    const image = this._image(renderTexture);
    const baseTexture = renderTexture.baseTexture;

    renderTexture.baseTexture.resource = new BaseImageResource(image);
    renderTexture.destroy();
    sprite.destroy();

    return new Texture(baseTexture);
  }

  /**
   * Will return a boolean that indicate if we hit the sprite.
   *
   * @param {number} x - The x coordinate of the hit point
   * @param {number} y - The y coordinate of the hit point
   * @param {boolean} flip - If the sprite is flipped
   * @return {boolean} - A boolean indicating if we hit the sprite.
   * @public
   */
  public hit(x: number, y: number, flip: boolean): boolean {
    const hitmap = this._getHitMap();
    const dx = flip
      ? this._texture.baseTexture.realWidth - Math.round(x * this._texture.baseTexture.resolution)
      : Math.round(x * this._texture.baseTexture.resolution);
    const dy = Math.round(y * this._texture.baseTexture.resolution);
    const ind = dx + dy * this._texture.baseTexture.realWidth;
    const ind1 = ind % 32;
    const ind2 = (ind / 32) | 0;

    return (hitmap[ind2] & (1 << ind1)) !== 0;
  }

  /**
   * Will return a HTML Image of the target.
   *
   * @param {DisplayObject|RenderTexture} target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param {string} [format] - Image format, e.g. "image/jpeg" or "image/webp".
   * @param {number} [quality] - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @return {HTMLImageElement} HTML Image of the target.
   * @private
   */
  private _image(target: DisplayObject | RenderTexture, format?: string, quality?: number): HTMLImageElement {
    const image = new Image();
    image.src = this._base64(target, format, quality);
    return image;
  }

  /**
   * Will return a a base64 encoded string of this target. It works by calling
   *  `Extract.getCanvas` and then running toDataURL on that.
   *
   * @param {DisplayObject|RenderTexture} target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param {string} [format] - Image format, e.g. "image/jpeg" or "image/webp".
   * @param {number} [quality] - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @return {string} A base64 encoded string of the texture.
   * @private
   */
  private _base64(target: DisplayObject | RenderTexture, format?: string, quality?: number): string {
    return this._canvas(target).toDataURL(format, quality);
  }

  /**
   * Creates a Canvas element, renders this target to it and then returns it.
   *
   * @param {DisplayObject|RenderTexture} target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @return {HTMLCanvasElement} A Canvas element with the texture rendered on.
   * @private
   */
  private _canvas(target: DisplayObject | RenderTexture): ICanvas {
    const TEMP_RECT = new Rectangle();
    const BYTES_PER_PIXEL = 4;
    let renderer = {} as IRenderer<ICanvas>;

    if (this._sprite instanceof FurnitureLayer) {
      renderer = this._sprite.furniture.room.engine.application.renderer;
    } else if (this._sprite.parent instanceof AvatarLayer) {
      renderer = this._sprite.parent.avatar.room.engine.application.renderer;
    }

    let resolution: number;
    let frame: Rectangle;
    let flipY: boolean;
    let renderTexture: RenderTexture | undefined;
    let generated = false;

    if (Boolean(target)) {
      if (target instanceof RenderTexture) {
        renderTexture = target;
      } else {
        renderTexture = renderer.generateTexture(target);
        generated = true;
      }
    }

    if (Boolean(renderTexture)) {
      resolution = renderTexture.baseTexture.resolution;
      frame = renderTexture.frame;
      flipY = false;
      renderer.renderTexture.bind(renderTexture);
    } else {
      resolution = renderer.resolution;

      flipY = true;

      frame = TEMP_RECT;
      frame.width = renderer.width;
      frame.height = renderer.height;
      renderer.renderTexture.bind(null);
    }

    const width = Math.floor(frame.width * resolution + 1e-4);
    const height = Math.floor(frame.height * resolution + 1e-4);
    const webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);
    let canvasBuffer = new CanvasRenderTarget(width, height, 1);

    /** Read pixels to the array */
    const gl = renderer.gl;
    gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);

    /** Add the pixels to the canvas */
    const canvasData = canvasBuffer.context.getImageData(0, 0, width, height);
    this.arrayPostDivide(webglPixels, canvasData.data);
    canvasBuffer.context.putImageData(canvasData, 0, 0);

    /** Pulling pixels */
    if (flipY) {
      const target = new CanvasRenderTarget(canvasBuffer.width, canvasBuffer.height, 1);
      target.context.scale(1, -1);

      /** We can't render to itself because we should be empty before render. */
      target.context.drawImage(canvasBuffer.canvas, 0, -height);

      canvasBuffer.destroy();
      canvasBuffer = target;
    }

    if (generated) renderTexture.destroy(true);

    /** Send the canvas back... */
    return canvasBuffer.canvas;
  }

  /**
   * Takes premultiplied pixel data and produces regular pixel data
   * @private
   * @param pixels - array of pixel data
   * @param out - output array
   */
  private arrayPostDivide(
    pixels: number[] | Uint8Array | Uint8ClampedArray,
    out: number[] | Uint8Array | Uint8ClampedArray
  ): void {
    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = (out[i + 3] = pixels[i + 3]);

      if (alpha !== 0) {
        out[i] = Math.round(Math.min((pixels[i] * 255) / alpha, 255));
        out[i + 1] = Math.round(Math.min((pixels[i + 1] * 255) / alpha, 255));
        out[i + 2] = Math.round(Math.min((pixels[i + 2] * 255) / alpha, 255));
      } else {
        out[i] = pixels[i];
        out[i + 1] = pixels[i + 1];
        out[i + 2] = pixels[i + 2];
      }
    }
  }
}
