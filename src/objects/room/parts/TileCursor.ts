import { Texture, Container, Sprite } from 'pixi.js';
import {ITileCursorProps} from "../../../interfaces/ITileCursorProps";

export class TileCursor extends Container {

    private _x: number;
    private _y: number;
    private _z: number;

    private _texture?: Texture;

    constructor(props: ITileCursorProps) {
        super();

        this._x = props.x;
        this._y = props.y;
        this._z = props.z;

        this._texture = props.texture;

        this._draw();
    }

    private _draw(): void {

        let sprite = new Sprite(this._texture);
        sprite.y = -20;
        this.zIndex = 2;
        this.addChild(sprite);

    }

}