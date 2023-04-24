import type { BaseTexture, DisplayObject, ICanvas, Renderer } from 'pixi.js';
import { BaseImageResource, Extract, Rectangle, RenderTexture, Sprite, Texture } from 'pixi.js';
import { CanvasRenderTarget } from '@pixi/utils';

import type { HitSprite } from './HitSprite';
import { FurnitureLayer } from '../furnitures/FurnitureLayer';
import { AvatarLayer } from '../avatars/AvatarLayer';

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
    /** Generate the texture */
    this._texture = this._generateTexture();
  }

  /**
   * Return the cached hit map of the sprite.
   *
   * @return {Uint32Array} - A Uint32Array that is the cached hit map of the sprite.
   * @private
   */
  private _getHitMap(): Uint32Array {
    if (this._hitMap == null) {
      this._hitMap = this._generateHitMap(this._texture.baseTexture);
    }
    return this._hitMap;
  }

  /**
   * Generate the hit map from a specified base texture.
   *
   * @param {BaseTexture} baseTexture - The base texture that we want to have the hit map.
   * @return {Uint32Array} - An Uint32Array that is the hit map of the specified baseTexture.
   * @private
   */
  private _generateHitMap(baseTexture: BaseTexture): Uint32Array {
    // @ts-expect-error
    const image: HTMLImageElement = baseTexture.resource.source;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    // @ts-expect-error
    const context: CanvasRenderingContext2D = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    let w: number = canvas.width;
    let h: number = canvas.height;
    if (w > canvas.width) w = canvas.width;
    if (h > canvas.height) h = canvas.height;

    if (w === 0) return new Uint32Array();

    const imageData: ImageData = context.getImageData(0, 0, w, h);
    const threshold: number = 255;
    const hitmap: Uint32Array = new Uint32Array(Math.ceil((w * h) / 32));
    for (let i = 0; i < w * h; i++) {
      const ind1: number = i % 32;
      const ind2: number = (i / 32) | 0;
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
    const sprite: Sprite = new Sprite(this._sprite.texture.clone());
    sprite.x = this._sprite.getGlobalPosition().x + this._sprite.texture.trim.x;
    sprite.y = this._sprite.getGlobalPosition().y + this._sprite.texture.trim.y;
    sprite.texture.trim.x = 0;
    sprite.texture.trim.y = 0;

    let renderTexture = {} as RenderTexture;

    if (this._sprite instanceof FurnitureLayer) {
      this._sprite.furniture.room.engine.application.stage.addChild(sprite);
      renderTexture = this._sprite.furniture.room.engine.application.renderer.generateTexture(sprite);
    } else if (this._sprite.parent instanceof AvatarLayer) {
      this._sprite.parent.avatar.room.engine.application.stage.addChild(sprite);
      renderTexture = this._sprite.parent.avatar.room.engine.application.renderer.generateTexture(sprite);
    }
    sprite.destroy();
    const image: HTMLImageElement = this._image(renderTexture);
    renderTexture.baseTexture.resource = new BaseImageResource(image);
    const baseTexture: BaseTexture = renderTexture.baseTexture;
    renderTexture.destroy();

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
    const hitmap: Uint32Array = this._getHitMap();
    const dx: number = flip
      ? this._texture.baseTexture.realWidth - Math.round(x * this._texture.baseTexture.resolution)
      : Math.round(x * this._texture.baseTexture.resolution);
    const dy: number = Math.round(y * this._texture.baseTexture.resolution);
    const ind: number = dx + dy * this._texture.baseTexture.realWidth;
    const ind1: number = ind % 32;
    const ind2: number = (ind / 32) | 0;

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
    const image: HTMLImageElement = new Image();

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
    // @ts-expect-error
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
    const TEMP_RECT: Rectangle = new Rectangle();
    const BYTES_PER_PIXEL: number = 4;

    let renderer: Renderer;
    if (this._sprite instanceof FurnitureLayer) {
      renderer = this._sprite.furniture.room.engine.application.renderer as Renderer;
    } else if (this._sprite.parent instanceof AvatarLayer) {
      renderer = this._sprite.parent.avatar.room.engine.application.renderer as Renderer;
    }

    let resolution: number;
    let frame: Rectangle;
    let flipY: boolean;
    let renderTexture: RenderTexture;
    let generated: boolean = false;

    if (target != null) {
      if (target instanceof RenderTexture) {
        renderTexture = target;
      } else {
        // @ts-expect-error
        renderTexture = renderer.generateTexture(target);
        generated = true;
      }
    }

    // @ts-expect-error
    if (renderTexture != null) {
      resolution = renderTexture.baseTexture.resolution;
      frame = renderTexture.frame;
      flipY = false;
      // @ts-expect-error
      renderer.renderTexture.bind(renderTexture);
    } else {
      // @ts-expect-error
      resolution = renderer.resolution;

      flipY = true;

      frame = TEMP_RECT;
      // @ts-expect-error
      frame.width = renderer.width;
      // @ts-expect-error
      frame.height = renderer.height;
      // @ts-expect-error
      renderer.renderTexture.bind(null);
    }

    const width: number = Math.floor(frame.width * resolution + 1e-4);
    const height: number = Math.floor(frame.height * resolution + 1e-4);

    let canvasBuffer: CanvasRenderTarget = new CanvasRenderTarget(width, height, 1);

    const webglPixels: Uint8Array = new Uint8Array(BYTES_PER_PIXEL * width * height);

    /** Read pixels to the array */
    // @ts-expect-error
    const gl: any = renderer.gl;

    gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);

    /** Add the pixels to the canvas */
    const canvasData: ImageData = canvasBuffer.context.getImageData(0, 0, width, height);

    // @ts-expect-error
    Extract.arrayPostDivide(webglPixels, canvasData.data);

    canvasBuffer.context.putImageData(canvasData, 0, 0);

    /** Pulling pixels */
    if (flipY) {
      const target: CanvasRenderTarget = new CanvasRenderTarget(canvasBuffer.width, canvasBuffer.height, 1);

      target.context.scale(1, -1);

      /** We can't render to itself because we should be empty before render. */
      target.context.drawImage(canvasBuffer.canvas, 0, -height);

      canvasBuffer.destroy();
      canvasBuffer = target;
    }

    if (generated) {
      // @ts-expect-error
      renderTexture.destroy(true);
    }

    /** Send the canvas back... */
    return canvasBuffer.canvas;
  }
}
