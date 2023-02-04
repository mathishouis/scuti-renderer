import { Texture } from "pixi.js";

export class Material {

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
     * Material class
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
     * Set the material color
     * @param color
     */
    public set color(color: number) {
        this._color = color;
    }

    /**
     * Return the material texture
     */
    public get texture(): Texture {
        return this._texture;
    }

    /**
     * Set the material texture
     * @param texture
     */
    public set texture(texture: Texture) {
        this._texture = texture;
    }

}
