// @ts-nocheck
import { Assets } from 'pixi.js';

import type { IAvatarPartSets, IAnimationFrameData } from '../../../interfaces/Avatar';
import type { AvatarAction } from '../actions/AvatarAction';
import { AvatarAnimation } from './AvatarAnimation';

export class AvatarAnimationManager {
  private readonly _animations = new Map<AvatarAction, AvatarAnimation>();

  private readonly _avatarAnimationsLib = Assets.get<IAvatarPartSets>('figures/animations');

  public registerAnimation(action: AvatarAction): void {
    if (this._avatarAnimationsLib[action] === undefined) return;
    this._animations.set(action, new AvatarAnimation(action, this._avatarAnimationsLib[action]));
  }

  public getAnimation(action: AvatarAction): AvatarAnimation {
    return this._animations.get(action);
  }

  public getLayerData(action: AvatarAction, frame: number, type: string): IAnimationFrameData {
    const animation = this.getAnimation(action);
    if (animation === undefined) return;
    return animation.getFrame(frame, type);
  }

  public get animations(): IAvatarPartSets {
    return this._avatarAnimationsLib;
  }
}
