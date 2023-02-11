import {IAvatarPartSets, IAnimationFrameData} from "../../../interfaces/Avatar.interface";
import {Assets} from "pixi.js";
import {AvatarAction} from "../actions/AvatarAction";
import {AvatarAnimation} from "./AvatarAnimation";

export class AvatarAnimationManager {

    private _animations: Map<AvatarAction, AvatarAnimation> = new Map<AvatarAction, AvatarAnimation>();

    private _avatarAnimationsLib: IAvatarPartSets = Assets.get("figures/animations");

    public registerAnimation(action: AvatarAction): void {
        if(this._avatarAnimationsLib[action] === undefined) return;
        this._animations.set(action, new AvatarAnimation(action, this._avatarAnimationsLib[action]));
    }

    public getAnimation(action: AvatarAction): AvatarAnimation {
        return this._animations.get(action);
    }

    public getLayerData(action: AvatarAction, frame: number, type: string): IAnimationFrameData {
        const animation: AvatarAnimation = this.getAnimation(action);
        if(animation === undefined) return;
        return animation.getFrame(frame, type);
    }

    public get animations(): IAvatarPartSets {
        return this._avatarAnimationsLib;
    }

}
