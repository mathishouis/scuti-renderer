import {Avatar} from "./Avatar";
import {
    AvatarFrameId,
    AvatarLayerConfiguration,
    AvatarLayerId, AvatarPart,
    AvatarPartAction
} from "../../interfaces/Avatar.interface";
import {AnimatedSprite, Assets, BLEND_MODES, Container, utils} from "pixi.js";
import {HitSprite} from "../interactions/HitSprite";
import {AvatarAction} from "./AvatarAction";
import {Direction} from "../../types/Direction";

export class AvatarLayer extends Container {

    private _avatar: Avatar;

    private _type: string;
    private _part: AvatarPart;
    private _action: AvatarAction;


    /**
     * The layer tint
     * @private
     */
    private _tint: number;

    /**
     * The layer z
     * @private
     */
    private _z: number;

    private _direction: Direction;

    /**
     * Is the layer flipped
     * @private
     */
    private _flip: boolean;

    constructor(
        avatar: Avatar,
        configuration: AvatarLayerConfiguration
    ) {
        super();

        this._avatar = avatar;
        this._type = configuration.type;
        this._part = configuration.part;
        this._action = configuration.action;
        this._tint = configuration.tint;
        this._z = configuration.z;
        this._flip = configuration.flip;
        this._direction = configuration.direction;

        this._draw();
    }

    private _draw(): void {
        const avatarActions: AvatarPartAction[] = Assets.get("figures/actions");
        const sprite: AnimatedSprite = new AnimatedSprite(Assets.get("figures/" + this._part.lib.id).animations[this._type + "_" + this._part.id + "_" + avatarActions[this._action].assetpartdefinition + "_" + this._direction]);
        if(this._tint !== undefined) sprite.tint = utils.premultiplyTint(this._tint, 0.999);
        if(this._flip) {
            [4, 5, 6, 7].includes(this._direction) ? this.scale.x = -1 : null;
            [4, 5, 6, 7].includes(this._direction) ? this.x = 64 : null;
        }
        if(this._z !== undefined) sprite.zIndex = this._z;
        sprite.animationSpeed = 0.167;
        sprite.play();
        sprite.interactive = true;
        sprite.on("pointerdown", () => console.log("XDDDD"));
        this.addChild(sprite);
    }

}
