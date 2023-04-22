import {AvatarAction} from "../actions/AvatarAction";
import {IAnimationDefinition, IAnimationFrameData} from "../../../interfaces/Avatar.interface";

export class AvatarAnimation {

    constructor(
        private _action: AvatarAction,
        private _definition: IAnimationDefinition
    ) {}

    public getFrame(frame: number, type: string): IAnimationFrameData {
        // @ts-ignore
        return this._definition.frames[frame].bodyparts[type];
    }

    public getFrameCount(): number {
        return this._definition.frames.length;
    }

}
