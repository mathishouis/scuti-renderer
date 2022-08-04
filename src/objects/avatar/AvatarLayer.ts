import {BLEND_MODES, Sprite, Texture, utils, AnimatedSprite} from "pixi.js";
import {IAvatarLayerProps} from "../../interfaces/IAvatarLayerProps";

export class AvatarLayer extends AnimatedSprite {

    constructor(props: IAvatarLayerProps) {
        super(props.textures);

        this.alpha = props.alpha;
        this.animationSpeed = 0.167;
        this.zIndex = props.z;
        props.tint ? this.tint = props.tint : null;
        if(props.flip) {
            [4, 5, 6, 7].includes(props.direction) ? this.scale.x = -1 : null;
            [4, 5, 6, 7].includes(props.direction) ? this.x = 64 : null;
        }
        this.play();

    }


}