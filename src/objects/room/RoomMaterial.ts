import { Texture } from "pixi.js";

export class RoomMaterial {

    private _color: number;
    private _texture: Texture;

    constructor(color: number, texture: Texture) {

        this._color = color;
        this._texture = texture;

    }

    public get color() {
        return this._color;
    }

    public get texture() {
        return this._texture;
    }

}