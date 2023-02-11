import {IAnimationFrameData, IAvatarPart, IBodyPartConfiguration} from "../../interfaces/Avatar.interface";
import {AvatarAction} from "./actions/AvatarAction";
import {Assets, Spritesheet} from "pixi.js";
import {Direction} from "../../enums/Direction";
import {AvatarLayer} from "./AvatarLayer";
import {Avatar} from "./Avatar";
import {AvatarAnimation} from "./animations/AvatarAnimation";

export class AvatarBodyPart {

    private _avatar: Avatar;

    private _type: string; // hr - hd - ch - lg - sh

    private _setId: number;

    private _colors: number[];

    private _parts: IAvatarPart[];  // lib.id, etc...

    private _actions: AvatarAction[];

    private _frames: Map<number, Map<string, { action: AvatarAction, frame: number, repeat: number }>> = new Map();

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
            if(Assets.get("figures/" + part.lib.id) === undefined) {
                Assets.add("figures/" + part.lib.id, "http://localhost:8081/figure/" + part.lib.id + "/" + part.lib.id + ".json");
                Assets.load("figures/" + part.lib.id).then(() => this._createPart(part));
            } else {
                this._createPart(part);
            }
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
                action: AvatarAction.Default,
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
            if([4, 5, 6].includes(tempDirection)) tempDirection = 6 - tempDirection;

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
                    tint: part.colorable === 1 && type !== "ey" ? this._getColor(this._type, this._colors[part.index]) : undefined,
                    z: this._getDrawOrder(type, gesture, direction),
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

    private _getColor(type: string, colorId: number): number {
        const figureData: [] = Assets.get('figures/figuredata');
        let paletteId = figureData.settype[type].paletteid;
        let palette = figureData.palette[String(paletteId)];
        if(palette[String(colorId)] === undefined) return Number('0xFFFFFF');
        return Number('0x' + palette[String(colorId)].color);
    }

    private _getDrawOrder(type: string, action: string, direction: number) {
        const drawOrder: [] = Assets.get("figures/draworder");
        const drawOrderList: [string, any] = Object.entries(drawOrder[drawOrder[action] !== undefined ? action : "std"][direction]).find(entry => entry[1] === type);
        return drawOrderList !== undefined ? Number(drawOrderList[0]) : 0;
    }

    public updateParts(): void {
        this._frames.forEach((types: Map<string, { action: AvatarAction, frame: number, repeat: number }>, partId: number) => {
            types.forEach((value: { action: AvatarAction, frame: number, repeat: number }, type: string) => {
                const animation: AvatarAnimation = this._avatar.animationManager.getAnimation(value.action);
                const frameData: IAnimationFrameData = this._avatar.animationManager.getLayerData(value.action, value.frame, type);
                if (frameData !== undefined) {
                    const currentFrame = this._frames.get(partId).get(type);
                    if (frameData.repeats !== undefined) {
                        if (currentFrame.repeat >= Number(frameData.repeats)) {
                            currentFrame.repeat = 0;
                            currentFrame.frame = currentFrame.frame >= animation.getFrameCount() - 1 ? 0 : currentFrame.frame + 1;
                        } else {
                            currentFrame.repeat += 1;
                        }
                    } else {
                        currentFrame.frame = currentFrame.frame >= animation.getFrameCount() - 1 ? 0 : currentFrame.frame + 1;
                    }
                }
            });
        });
        this._draw();
    }

}
