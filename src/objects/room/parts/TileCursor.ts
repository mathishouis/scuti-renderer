import { Texture, Container, Sprite } from 'pixi.js';
import {ITileCursorProps} from "../../../interfaces/ITileCursorProps";
import {Room} from "../Room";
import {getZOrderTileCursor} from "../../../utils/ZOrder";

export class TileCursor extends Container {

    private _x: number;
    private _y: number;
    private _z: number;
    private _room: Room;

    private _texture?: Texture;

    constructor(props: ITileCursorProps) {
        super();

        this._x = props.x;
        this._y = props.y;
        this._z = props.z;
        this._room = props.room;

        this._texture = props.texture;
        // @ts-ignore
        this.parentLayer = this._room.roomObjectLayer;
        // @ts-ignore
        this.zOrder = getZOrderTileCursor(this._x, this._y);

        this._draw();
    }

    private _draw(): void {

        let sprite = new Sprite(this._texture);
        sprite.y = -20;
        this.addChild(sprite);

    }

}