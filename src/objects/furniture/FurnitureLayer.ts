import { Sprite, BLEND_MODES, Texture, utils, filters } from "pixi.js";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";

export class FurnitureLayer extends Sprite {

    private _texture: Texture;
    private _name: string;
    private _alpha: number;
    private _tint: string;
    private _z: number;
    private _blendMode: BLEND_MODES;

    constructor(props: IFurnitureLayerProps) {
        super(props.texture);

        this._name = props.name;
        this._alpha = props.alpha;
        this._tint = props.tint;
        this._z = props.z;
        this._blendMode = props.blendMode;
        this._texture = props.texture;

        this._draw();

    }

    private _draw(): void {

        this._tint ? this.tint = utils.premultiplyTint(this._tint, 0.999) : null;
        this._z ? this.zIndex = this._z : null;
        this._alpha ? this.filters = [new filters.AlphaFilter(this._alpha)] : null;
        this.blendMode = this._blendMode;

    }

}