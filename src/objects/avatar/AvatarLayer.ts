import {AnimatedSprite, BLEND_MODES, Graphics} from "pixi.js";
import {IAvatarLayerProps} from "../../interfaces/IAvatarLayerProps";
import {HitTexture} from "../interactions/HitTexture";
import {Scuti} from "../../Scuti";

export class AvatarLayer extends AnimatedSprite {

    private _engine: Scuti;
    private _hitTexture: HitTexture;

    constructor(props: IAvatarLayerProps) {
        super(props.textures);

        this.alpha = props.alpha;
        this.animationSpeed = 0.167;
        this._engine = props.engine;
        console.log(props.z);
        this.parentLayer = props.room?.roomObjectLayer;
        this.zOrder = Number(props.z);
        props.tint ? this.tint = props.tint : null;
        if(props.flip) {
            [4, 5, 6, 7].includes(props.direction) ? this.scale.x = -1 : null;
            [4, 5, 6, 7].includes(props.direction) ? this.x = 64 : null;
        }
        this.play();

    }

    public get engine(): Scuti {
        return this._engine;
    }

    public get hitTexture(): HitTexture {
        return this._hitTexture;
    }

    containsPoint(point) {

        const width = this.texture.orig.width;
        const height = this.texture.orig.height;
        // @ts-ignore
        const x1 = this.getGlobalPosition().x + this.texture.trim.x + (this.scale.x == -1 ? -64 : 0);
        let y1 = 0;

        let flag = false;
        const tempPoint = {
            x: this._engine.application.renderer.plugins.interaction.mouse.global.x,
            y: this._engine.application.renderer.plugins.interaction.mouse.global.y
        }


        if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
            // @ts-ignore
            y1 = this.getGlobalPosition().y + this.texture.trim.y;

            if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
                flag = true;
            }
        }

        if (!flag) {
            return false
        }

        if(!this._hitTexture) {
            this._hitTexture = new HitTexture(this);
        }

        return this._hitTexture.hit(tempPoint.x - x1, tempPoint.y - y1, this.scale.x === -1);
    }


}