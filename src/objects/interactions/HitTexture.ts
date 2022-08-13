import {Texture, BaseTexture, Sprite, BaseImageResource, RenderTexture} from "pixi.js";
import {FurnitureLayer} from "../furniture/FurnitureLayer";

export class HitTexture {

    private readonly _sprite: FurnitureLayer;

    private readonly _texture: Texture;
    private _cachedHitmap: Uint32Array = undefined;

    constructor(sprite: FurnitureLayer) {
        this._sprite = sprite;

        this._texture = this._generateTexture();
    }

    private _getHitmap(): Uint32Array {
        if(!this._cachedHitmap) {
            this._cachedHitmap = this._generateHitmap(this._texture.baseTexture);
        }
        return this._cachedHitmap;
    }

    private _generateHitmap(baseTexture: BaseTexture): Uint32Array {
        const image: Image = baseTexture.resource['source'];
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
            let ind1 = i % 32;
            let ind2 = i / 32 | 0;
            if (imageData.data[i * 4 + 3] >= threshold) {
                hitmap[ind2] = hitmap[ind2] | (1 << ind1);
            }
        }
        return hitmap;
    }

    private _generateTexture(): Texture {
        const texture: Texture = this._sprite.texture.clone();
        const sprite: Sprite = new Sprite(texture);
        sprite.x = this._sprite.getGlobalPosition().x + this._sprite.texture.trim.x;
        sprite.y = this._sprite.getGlobalPosition().y + this._sprite.texture.trim.y;
        sprite.texture.trim.x = 0;
        sprite.texture.trim.y = 0;
        this._sprite.engine.application.stage.addChild(sprite);
        const renderTexture: RenderTexture = this._sprite.engine.application.renderer.generateTexture(sprite);
        const image: Image = this._sprite.engine.application.renderer.plugins.extract.image(renderTexture);
        renderTexture.baseTexture.resource = new BaseImageResource(image);
        sprite.destroy();
        const baseTexture: BaseTexture = renderTexture.baseTexture;
        return new Texture(baseTexture);
    }

    public hit(x: number, y: number, flip: boolean): boolean {
        const hitmap: Uint32Array = this._getHitmap();
        const dx: number = flip ? this._texture.baseTexture.realWidth - Math.round(x * this._texture.baseTexture.resolution) : Math.round(x * this._texture.baseTexture.resolution);
        const dy: number = Math.round(y * this._texture.baseTexture.resolution);
        const ind: number = (dx + dy * this._texture.baseTexture.realWidth);
        const ind1: number = ind % 32;
        const ind2: number = ind / 32 | 0;
        return (hitmap[ind2] & (1 << ind1)) !== 0;
    }

    public get texture(): Texture {
        return this._texture;
    }
}