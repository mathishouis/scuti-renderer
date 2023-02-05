import { IPointData, Sprite, Texture } from "pixi.js";
import { HitTexture } from "./HitTexture";

export class HitSprite extends Sprite {

    /**
     * The hit texture
     * @private
     */
    private _hitTexture: HitTexture;

    /**
     * HitSprite class
     * @param texture
     */
    constructor(texture: Texture) {
        super(texture);
    }

    /**
     * Check if the pointer is on the sprite
     * @param point
     */
    public containsPoint(point: IPointData): boolean {
        if(!this.interactive) return false;

        const width: number = this.texture.orig.width;
        const height: number = this.texture.orig.height;

        const x1: number = this.getGlobalPosition().x + this.texture.trim.x;
        let y1: number = 0;
        let flag: boolean = false;

        if (point.x >= x1 && point.x < x1 + width) {
            y1 = this.getGlobalPosition().y + this.texture.trim.y;
            if (point.y >= y1 && point.y < y1 + height) flag = true;
        }

        if (!flag) return false;

        if(!this._hitTexture) this._hitTexture = new HitTexture(this);

        return this._hitTexture.hit(point.x - x1, point.y - y1, this.scale.x === -1);
    }

}
