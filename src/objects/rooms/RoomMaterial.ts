import { Texture } from "pixi.js";

export class RoomMaterial {

    /**
     * The material color
     * @private
     */
    private _color: number;

    /**
     * The material texture
     * @private
     */
    private _texture: Texture;

    /**
     * RoomMaterial class
     * @param color - The material color
     * @param texture - The material texture
     */
    constructor(color: number, texture: Texture) {
        this._color = color;
        this._texture = texture;
    }

    /**
     * Return the material color
     */
    public get color(): number {
        return this._color;
    }

    /**
     * Return the material texture
     */
    public get texture(): Texture {
        return this._texture;
    }

}
