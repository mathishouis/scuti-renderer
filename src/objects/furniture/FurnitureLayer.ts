import {BLEND_MODES, Sprite, Texture, utils, Graphics, BaseImageResource, Rectangle, RenderTexture} from "pixi.js";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";
import {Scuti} from "../../Scuti";
import {HMap} from "./HMap";

const tempPoint = {x : 0, y : 0};

export class FurnitureLayer extends Sprite {

    private _texture: Texture;
    private _name: string;
    private _alpha: number;
    private _tint: string;
    private _z: number;
    private _blendMode: BLEND_MODES;
    private _frame: number;

    constructor(props: IFurnitureLayerProps) {
        super(props.texture);

        this._name = props.name;
        this._alpha = props.alpha;
        this._tint = props.tint;
        this._z = props.z;
        this._blendMode = props.blendMode;
        this._texture = props.texture;
        this._frame = props.frame;

        this._draw();

    }

    private _draw(): void {

        this._tint ? this.tint = utils.premultiplyTint(this._tint, 0.999) : null;
        this._z ? this.zIndex = Number(this._z) : null;
        this.blendMode = this._blendMode;
        this._alpha ? this.alpha = this._alpha : null;

        //this.hitArea = new Rectangle(this._texture.trim.x, this._texture.trim.y, this._texture.trim.width, this._texture.trim.height);
    }

}