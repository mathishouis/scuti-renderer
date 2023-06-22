import { Assets } from 'pixi.js';

import type { AvatarAction } from './AvatarAction';
import type { IActionDefinition, IAvatarPartSets } from '../../../types/Avatar';

export class AvatarActionManager {
  private readonly _avatarActionsLib: IActionDefinition[] = Assets.get('figures/actions');
  private readonly _avatarPartSetsLib: IAvatarPartSets = Assets.get('figures/partsets');

  constructor(private readonly _defaultAction: AvatarAction) {}

  public filterActions(actions: AvatarAction[], partType: string): AvatarAction[] {
    return actions.filter((action: AvatarAction) => {
      const actionDefinition: IActionDefinition = this._avatarActionsLib[action];
      return (
        actionDefinition !== undefined &&
        this._avatarPartSetsLib.activePartSets[actionDefinition.activepartset].includes(partType)
      );
    });
  }

  public sortActions(actions: AvatarAction[]): AvatarAction[] {
    if (actions.length === 0) return [this._defaultAction];
    return actions.sort((a: AvatarAction, b: AvatarAction) => {
      const actionDefinitionA: IActionDefinition = this._avatarActionsLib[a];
      const actionDefinitionB: IActionDefinition = this._avatarActionsLib[b];
      if (Number(actionDefinitionA.precedence) < Number(actionDefinitionB.precedence)) return -1;
      if (Number(actionDefinitionA.precedence) > Number(actionDefinitionB.precedence)) return 1;
      return 0;
    });
  }

  public getActionDefinition(action: AvatarAction): IActionDefinition {
    return this._avatarActionsLib[action];
  }

  public get defaultAction(): AvatarAction {
    return this._defaultAction;
  }

  public get definitions(): IActionDefinition[] {
    return this._avatarActionsLib;
  }

  public get partSets(): IAvatarPartSets {
    return this._avatarPartSetsLib;
  }
}
