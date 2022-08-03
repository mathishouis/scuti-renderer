import {BLEND_MODES, Sprite, Texture, utils, AnimatedSprite} from "pixi.js";
import {IAvatarLayerProps} from "../../interfaces/IAvatarLayerProps";

export class AvatarLayer extends AnimatedSprite {

    constructor(props: IAvatarLayerProps) {
        super(props.textures);

        this._draw();

    }

    private _draw(): void {


    }

}