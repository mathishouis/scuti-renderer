import {BLEND_MODES, Sprite, Texture, utils} from "pixi.js";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";

export class FurnitureLayer extends Sprite {

    public _texture: Texture;
    private _name: string;
    private _frame: number;

    constructor(props: IFurnitureLayerProps) {
        super(props.texture);

        this._name = props.name;
        this._texture = props.texture;
        this._frame = props.frame;

        props.tint ? this.tint = utils.premultiplyTint(props.tint, 0.999) : null;
        props.z ? this.zIndex = Number(props.z) : null;
        this.blendMode = props.blendMode;
        props.alpha ? this.alpha = props.alpha : null;

    }


}