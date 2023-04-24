import type { AvatarAction } from '../actions/AvatarAction'
import type { IAnimationDefinition, IAnimationFrameData } from '../../../interfaces/Avatar'

export class AvatarAnimation {
  constructor(_action: AvatarAction, private readonly _definition: IAnimationDefinition) {}

  public getFrame(frame: number, type: string): IAnimationFrameData {
    // @ts-expect-error
    return this._definition.frames[frame].bodyparts[type]
  }

  public getFrameCount(): number {
    return this._definition.frames.length
  }
}
