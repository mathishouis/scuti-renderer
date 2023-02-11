import {
    IAvatarPartSets,
    IAnimationFrameData,
    IAvatarPart,
    IBodyPartConfiguration
} from "../../interfaces/Avatar.interface";
import {AvatarAction} from "./actions/AvatarAction";
import {Assets, Spritesheet} from "pixi.js";
import {Direction} from "../../enums/Direction";
import {AvatarLayer} from "./AvatarLayer";
import {AvatarUtil} from "../../utilities/AvatarUtil";
import {Avatar} from "./Avatar";

export class AvatarBodyPart {

    private _avatar: Avatar;

    private _type: string; // hr - hd - ch - lg - sh

    private _setId: number;

    private _colors: number[];

    private _parts: IAvatarPart[];  // lib.id, etc...

    private _actions: AvatarAction[];

    private _frames: Map<number, Map<string, { action: String, frame: number, repeat: number }>> = new Map();

    constructor(
        avatar: Avatar,
        configuration: IBodyPartConfiguration
    ) {
        this._avatar = avatar;
        this._type = configuration.type;
        this._setId = configuration.setId;
        this._colors = configuration.colors;
        this._parts = configuration.parts;
        this._actions = configuration.actions;
    }

    private _draw(): void {
        this._parts.forEach((part: IAvatarPart) => {
            Assets.add("figures/" + part.lib.id, "http://localhost:8081/figure/" + part.lib.id + "/" + part.lib.id + ".json");
            Assets.load("figures/" + part.lib.id).then(() => this._createPart(part));
        });
    }

    private _createPart(
        part: IAvatarPart
    ): void {
        if(!this._frames.has(part.id)) this._frames.set(part.id, new Map());

        const spritesheet: Spritesheet = Assets.get("figures/" + part.lib.id);

        Object.keys(spritesheet.data.partsType).forEach((type: string) => {
            // We register the part type if it's not already registered
            if(!this._frames.get(part.id).has(type)) this._frames.get(part.id).set(type, {
                action: "Default",
                frame: 0,
                repeat: 0
            });
            let direction: Direction = this._avatar.bodyDirection;

            // We get the actions, check if it's valid and if the action is included in the active part set
            const sortedActions: AvatarAction[] = this._avatar.actionManager.filterActions(this._actions, type);

            let finalAction: AvatarAction = this._avatar.actionManager.sortActions(sortedActions)[0];

            // If this part type is in the head part set, we put the direction equal to the head direction
            if (this._isHeadPart(type)) direction = this._avatar.headDirection;

            // We get the animation gesture and frame
            const frameData: IAnimationFrameData = this._avatar.animationManager.getLayerData(finalAction, this._frames.get(part.id).get(type).frame, type)
            let gesture: string = this._avatar.actionManager.getActionDefinition(finalAction).assetpartdefinition
            let frame: Number = 0;
            if(frameData !== undefined) {
                this._frames.get(part.id).get(type).action = finalAction;
                frame = frameData.frame;
                gesture = frameData.assetpartdefinition
            }

            let tempDirection: number = direction;
            if([4, 5, 6, 7].includes(tempDirection)) tempDirection = 6 - tempDirection;

            // If the texture don't exist we reinitalise the gesture and the final action
            if(spritesheet.textures[part.lib.id + "_h_" + gesture + "_" + type + "_" + part.id + "_" + tempDirection + "_" + frame] === undefined) {
                gesture = "std";
                finalAction = AvatarAction.Default;
                this._frames.get(part.id).get(type).action = finalAction;
            }

            // We create the layer
            if(spritesheet.textures[part.lib.id + "_h_" + gesture + "_" + type + "_" + part.id + "_" + tempDirection + "_" + frame] !== undefined) {
                this._avatar.addChild(new AvatarLayer(this._avatar, {
                    type: type,
                    part: part,
                    gesture: gesture,
                    tint: part.colorable === 1 && type !== "ey" ? AvatarUtil.getColor(this._type, this._colors[part.index]) : undefined,
                    z: AvatarUtil.getDrawOrder(type, gesture, direction),
                    flip: true,
                    direction: direction,
                    frame: frame
                }));
            }
        });
    }

    private _isHeadPart(type: string): boolean {
        return this._avatar.actionManager.partSets.activePartSets.head.includes(type);
    }

    public updateParts(): void {
        const avatarAnimations: [] = Assets.get("figures/animations");
        this._frames.forEach((types: Map<string, { action: string, frame: number, repeat: number }>, partId: number) => {
            types.forEach((value: { action: string, frame: number, repeat: number }, type: string) => {
                const animation = avatarAnimations[value.action];
                if (animation !== undefined && animation.frames[value.frame] !== undefined && animation.frames[value.frame].bodyparts[type] !== undefined) {
                    const currentFrame = this._frames.get(partId).get(type);
                    if (animation.frames[value.frame].bodyparts[type].repeats !== undefined) {
                        if (currentFrame.repeat >= Number(animation.frames[value.frame].bodyparts[type].repeats)) {
                            currentFrame.repeat = 0;
                            currentFrame.frame = currentFrame.frame >= animation.frames.length - 1 ? 0 : currentFrame.frame + 1;
                        } else {
                            currentFrame.repeat += 1;
                        }
                    } else {
                        currentFrame.frame = currentFrame.frame >= animation.frames.length - 1 ? 0 : currentFrame.frame + 1;
                    }
                }
            });
        });
        this._draw();
    }

}
