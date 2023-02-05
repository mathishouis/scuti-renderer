import {
    BaseImageResource,
    BaseTexture,
    DisplayObject,
    Extract,
    ICanvas,
    Rectangle,
    RenderTexture,
    Sprite,
    Texture
} from "pixi.js";

import { CanvasRenderTarget } from '@pixi/utils';
import { HitSprite } from "./HitSprite";


export class HitTexture {

    /**
     * The sprite instance.
     *
     * @private
     */
    private readonly _sprite: HitSprite;

    /**
     * The texture.
     *
     * @private
     */
    private _texture: Texture;

    /**
     * The hit map.
     *
     * @private
     */
    private _hitMap: Uint32Array = undefined;

    /**
     * HitTexture class.
     *
     * @param {HitSprite} sprite - The sprite instance.
     * @constructor
     */
    constructor(
        sprite: HitSprite
    ) {
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
        if(!this._hitMap) {
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
        const image: HTMLImageElement = baseTexture.resource['source'];
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        let w: number = canvas.width, h: number = canvas.height;
        if (w > canvas.width) w = canvas.width;
        if (h > canvas.height) h = canvas.height;

        const imageData: ImageData = context.getImageData(0, 0, w, h);
        const threshold: number = 255;
        const hitmap: Uint32Array = new Uint32Array(Math.ceil(w * h / 32));
        for (let i = 0; i < w * h; i++) {
            let ind1: number = i % 32;
            let ind2: number = i / 32 | 0;
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
        this._sprite.parent.furniture.room.engine.application.stage.addChild(sprite);
        const renderTexture: RenderTexture = this._sprite.parent.furniture.room.engine.application.renderer.generateTexture(sprite);
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
    public hit(
        x: number,
        y: number,
        flip: boolean
    ): boolean {
        const hitmap: Uint32Array = this._getHitMap();
        const dx: number = flip ? this._texture.baseTexture.realWidth - Math.round(x * this._texture.baseTexture.resolution) : Math.round(x * this._texture.baseTexture.resolution);
        const dy: number = Math.round(y * this._texture.baseTexture.resolution);
        const ind: number = (dx + dy * this._texture.baseTexture.realWidth);
        const ind1: number = ind % 32;
        const ind2: number = ind / 32 | 0;

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
    private _image(target: DisplayObject|RenderTexture, format?: string, quality?: number): HTMLImageElement
    {
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
    private _base64(target: DisplayObject|RenderTexture, format?: string, quality?: number): string
    {
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
    private _canvas(target: DisplayObject|RenderTexture): ICanvas
    {
        const TEMP_RECT = new Rectangle();
        const BYTES_PER_PIXEL = 4;

        const renderer = this._sprite.parent.furniture.room.engine.application.renderer;
        let resolution;
        let frame;
        let flipY = false;
        let renderTexture;
        let generated = false;

        if (target)
        {
            if (target instanceof RenderTexture)
            {
                renderTexture = target;
            }
            else
            {
                renderTexture = this._sprite.parent.furniture.room.engine.application.renderer.generateTexture(target);
                generated = true;
            }
        }

        if (renderTexture)
        {
            resolution = renderTexture.baseTexture.resolution;
            frame = renderTexture.frame;
            flipY = false;
            renderer.renderTexture.bind(renderTexture);
        }
        else
        {
            resolution = this._sprite.parent.furniture.room.engine.application.renderer.resolution;

            flipY = true;

            frame = TEMP_RECT;
            frame.width = this._sprite.parent.furniture.room.engine.application.renderer.width;
            frame.height = this._sprite.parent.furniture.room.engine.application.renderer.height;

            renderer.renderTexture.bind(null);
        }

        const width = Math.floor((frame.width * resolution) + 1e-4);
        const height = Math.floor((frame.height * resolution) + 1e-4);

        let canvasBuffer = new CanvasRenderTarget(width, height, 1);

        const webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);

        // read pixels to the array
        const gl = renderer.gl;

        gl.readPixels(
            frame.x * resolution,
            frame.y * resolution,
            width,
            height,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            webglPixels
        );

        // add the pixels to the canvas
        const canvasData = canvasBuffer.context.getImageData(0, 0, width, height);

        Extract.arrayPostDivide(webglPixels, canvasData.data);

        canvasBuffer.context.putImageData(canvasData, 0, 0);

        // pulling pixels
        if (flipY)
        {
            const target = new CanvasRenderTarget(canvasBuffer.width, canvasBuffer.height, 1);

            target.context.scale(1, -1);

            // we can't render to itself because we should be empty before render.
            target.context.drawImage(canvasBuffer.canvas, 0, -height);

            canvasBuffer.destroy();
            canvasBuffer = target;
        }

        if (generated)
        {
            renderTexture.destroy(true);
        }

        // send the canvas back..
        return canvasBuffer.canvas;
    }

}
