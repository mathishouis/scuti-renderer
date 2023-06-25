import { gsap } from 'gsap';

import type { Direction } from '../../enums/Direction';
import { AvatarAction } from './actions/AvatarAction';
import { AvatarActionManager } from './actions/AvatarActionManager';
import { AvatarAnimationManager } from './animations/AvatarAnimationManager';
import type { AvatarBodyPart } from './visualizations/AvatarBodyPart';
import type { IAvatarConfig, IAvatarPosition } from '../../types/Avatar';
import { RoomObject } from '../rooms/objects/RoomObject';
import { AvatarVisualization } from './visualizations/AvatarVisualization';
import { AvatarFigure } from './AvatarFigure';

export class Avatar extends RoomObject {
  private readonly _figure: AvatarFigure;
  private _bodyDirection: Direction;
  private _headDirection: Direction;
  private _actions: AvatarAction[];
  private readonly _actionManager: AvatarActionManager;
  private readonly _animationManager: AvatarAnimationManager;
  private readonly _bodyParts: AvatarBodyPart[] = [];

  constructor(config: IAvatarConfig) {
    super(config);

    this._headDirection = config.headDirection;
    this._bodyDirection = config.bodyDirection;
    this._actions = config.actions;

    this._figure = new AvatarFigure(this, config.figure);
    this._visualization = new AvatarVisualization(this);
    this._actionManager = new AvatarActionManager(AvatarAction.Default);
    this._animationManager = new AvatarAnimationManager(config.actions);
  }

  public addAction(action: AvatarAction): void {
    if (!Boolean(this._animationManager.getAnimation(action))) this._animationManager.registerAnimation(action);
    if (!this._actions.includes(action)) this._actions.push(action);
  }

  public removeAction(action: AvatarAction): void {
    this._actions = this._actions.filter((fAction) => {
      return fAction !== action;
    });
  }

  move(position: IAvatarPosition, duration: number = 0.5): void {
    if (this._visualization === undefined) return;
    gsap.to(this.position, {
      x: 32 * position.x - 32 * position.y,
      y: 16 * position.x + 16 * position.y - 32 * position.z,
      duration,
      ease: 'linear',
      onUpdate: () => this._visualization.updatePosition()
    });
  }

  public get actions(): AvatarAction[] {
    return this._actions;
  }

  public set actions(actions: AvatarAction[]) {
    actions.forEach((action) => this._animationManager.registerAnimation(action));
    actions.forEach((action) => this.actions.push(action));
    this._actions = actions;
  }

  public get headDirection(): Direction {
    return this._headDirection;
  }

  public set headDirection(direction: Direction) {
    this._headDirection = direction;
  }

  public get bodyDirection(): Direction {
    return this._bodyDirection;
  }

  public set bodyDirection(direction: Direction) {
    this._bodyDirection = direction;
  }

  public get actionManager(): AvatarActionManager {
    return this._actionManager;
  }

  public get bodyParts(): AvatarBodyPart[] {
    return this._bodyParts;
  }

  public get animationManager(): AvatarAnimationManager {
    return this._animationManager;
  }

  public get figure(): AvatarFigure {
    return this._figure;
  }
}
