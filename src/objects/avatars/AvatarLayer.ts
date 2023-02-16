import {Avatar} from "./Avatar";
import {
    IAvatarLayerConfiguration,
    IAvatarPart,
    IActionDefinition
} from "../../interfaces/Avatar.interface";
import {AnimatedSprite, Assets, BLEND_MODES, Container, utils} from "pixi.js";
import {HitSprite} from "../interactions/HitSprite";
import {AvatarAction} from "./actions/AvatarAction";
import {Direction} from "../../enums/Direction";
import {AvatarUtil} from "../../utilities/AvatarUtil";
import {IInteractionEvent} from "../../interfaces/Interaction.interface";

export class AvatarLayer extends Container {

    private _avatar: Avatar;

    private _type: string;
    private _part: IAvatarPart;
    private _gesture: string;


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

    private _frame: number;

    private _alpha: number;

    constructor(
        avatar: Avatar,
        configuration: IAvatarLayerConfiguration
    ) {
        super();

        this._avatar = avatar;
        this._type = configuration.type;
        this._part = configuration.part;
        this._gesture = configuration.gesture;
        this._tint = configuration.tint;
        this._z = configuration.z;
        this._flip = configuration.flip;
        this._direction = configuration.direction;
        this._frame = configuration.frame;
        this._alpha = configuration.alpha;

        this._draw();
    }

    private _draw(): void {
        let tempDirection: number = this._direction;
        if(this._flip && [4, 5, 6].includes(tempDirection)) this.scale.x = -1;
        if(this._flip && [4, 5, 6].includes(tempDirection)) this.x = 64;
        if([4, 5, 6].includes(tempDirection) && this._flip) {
            tempDirection = 6 - tempDirection
        }
        const avatarActions: IActionDefinition[] = Assets.get("figures/actions");
        //if(this._type === "ls" || this._type === "lh" || this._type === "lc") console.log(2, this._part.lib.id + "_h_" + this._gesture + "_" + this._type + "_" + this._part.id + "_" + tempDirection + "_" + this._frame);
        const sprite: HitSprite = new HitSprite(Assets.get("figures/" + this._part.lib.id).textures[this._part.lib.id + "_h_" + this._gesture + "_" + this._type + "_" + this._part.id + "_" + tempDirection + "_" + this._frame]);
        if(this._tint !== undefined) sprite.tint = utils.premultiplyTint(this._tint, 0.999);
        if(this._z !== undefined) this.zIndex = this._z;
        if(this._alpha !== undefined) sprite.alpha = this._alpha;
        //sprite.animationSpeed = 0.167;
        //sprite.play();
        sprite.interactive = true;
        sprite.on("pointerdown", (event: PointerEvent) => this._avatar.interactionManager.handlePointerDown({ mouseEvent: event }));
        sprite.on("pointerup", (event: PointerEvent) => this._avatar.interactionManager.handlePointerUp({ mouseEvent: event }));
        sprite.on("pointermove", (event: PointerEvent) => this._avatar.interactionManager.handlePointerMove({ mouseEvent: event }));
        sprite.on("pointerout", (event: PointerEvent) => this._avatar.interactionManager.handlePointerOut({ mouseEvent: event }));
        sprite.on("pointerover", (event: PointerEvent) => this._avatar.interactionManager.handlePointerOver({ mouseEvent: event }));
        this.addChild(sprite);
    }

    public get avatar(): Avatar {
        return this._avatar;
    }

}
