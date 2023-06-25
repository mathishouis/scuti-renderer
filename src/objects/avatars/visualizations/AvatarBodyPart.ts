import { Assets } from 'pixi.js';

import type { IAvatarPart, IBodyPartConfiguration } from '../../../types/Avatar';
import { AssetLoader } from '../../../utilities/AssetLoader';
import { ZOrder } from '../../../utilities/ZOrder';
import { AvatarAction } from '../actions/AvatarAction';
import type { Avatar } from '../Avatar';
import { AvatarLayer } from './AvatarLayer';

export class AvatarBodyPart {
  private readonly _avatar: Avatar;

  private readonly _type: string; // hr - hd - ch - lg - sh

  private readonly _setId: number;

  private readonly _colors: number[];

  private readonly _parts: IAvatarPart[]; // lib.id, etc...

  private _actions: AvatarAction[];

  private readonly _frames: Map<number, Map<string, { action: AvatarAction; frame: number; repeat: number }>> =
    new Map();

  private areAllAssetsLoaded = false;

  constructor(avatar: Avatar, config: IBodyPartConfiguration) {
    this._avatar = avatar;
    this._type = config.type;
    this._setId = config.setId;
    this._colors = config.colors;
    this._parts = config.parts;
    this._actions = config.actions;

    const assets: Array<Promise<void>> = [];

    this._parts.forEach((part: IAvatarPart) => {
      if (part.lib != null)
        assets.push(AssetLoader.load('figures/' + part.lib.id, 'figure/' + part.lib.id + '/' + part.lib.id + '.json'));
    });

    Promise.all(assets)
      .then(() => (this.areAllAssetsLoaded = true))
      .catch((error) => this._avatar.logger.error(error));
  }

  private _draw(): void {
    if (!this.areAllAssetsLoaded) return;
    this._parts.forEach((part) => this._createPart(part));
  }

  private _createPart(part: IAvatarPart): void {
    if (!this._frames.has(part.id)) this._frames.set(part.id, new Map());

    if (part.lib == null) return;

    const spritesheet = Assets.get('figures/' + part.lib.id);

    Object.keys(spritesheet.data.partsType).forEach((type) => {
      // We register the part type if it's not already registered
      if (!this._frames.get(part.id).has(type))
        this._frames.get(part.id).set(type, {
          action: AvatarAction.Default,
          frame: 0,
          repeat: 0
        });
      let direction = this._avatar.bodyDirection;

      // We get the actions, check if it's valid and if the action is included in the active part set
      const sortedActions = this._avatar.actionManager.filterActions(this._actions, type);

      let finalAction: AvatarAction = this._avatar.actionManager.sortActions(sortedActions)[0];

      // If this part type is in the head part set, we put the direction equal to the head direction
      if (this._isHeadPart(type)) direction = this._avatar.headDirection;

      // We get the animation gesture and frame
      const frameData = this._avatar.animationManager.getLayerData(
        finalAction,
        this._frames.get(part.id).get(type).frame,
        type
      );
      let gesture: string = this._avatar.actionManager.getActionDefinition(finalAction).assetpartdefinition;
      let frame: number = 0;
      let flip: boolean = false;
      if (frameData !== undefined) {
        this._frames.get(part.id).get(type).action = finalAction;
        frame = frameData.frame;
        gesture = frameData.assetpartdefinition;
      }

      if ([4, 5, 6].includes(direction)) {
        flip = true;
      }

      // const zDirection = direction;

      let tempDirection: number = direction;
      if ([4, 5, 6].includes(tempDirection)) tempDirection = 6 - tempDirection;

      // If the texture don't exist we reinitalise the gesture and the final action
      if (
        spritesheet.textures[
          // Skipping type checking because we cannot convert
          part.lib.id + '_h_' + gesture + '_' + type + '_' + part.id + '_' + tempDirection + '_' + frame
        ] === undefined
      ) {
        gesture = 'std';
        finalAction = AvatarAction.Default;
        this._frames.get(part.id).get(type).action = finalAction;
      }

      if (
        ((gesture === 'wav' && (type === 'lh' || type === 'ls' || type === 'lc' || type === 'lcs')) ||
          (gesture === 'drk' && (type === 'rh' || type === 'rs' || type === 'rcs')) ||
          (gesture === 'blw' && type === 'rh') ||
          (gesture === 'sig' && type === 'lh') ||
          (gesture === 'respect' && type === 'lh')) &&
        [4, 5, 6].includes(this._avatar.bodyDirection)
      ) {
        flip = !flip;
      }

      if (
        (gesture === 'crr' || gesture === 'respect' || gesture === 'sig') &&
        [4, 5, 6].includes(this._avatar.bodyDirection)
      ) {
        if (
          this._avatar.actionManager.partSets.partSets[type] !== undefined &&
          this._avatar.actionManager.partSets.partSets[type]['flipped-set-type'] !== undefined &&
          [4, 5, 6, 7].includes(direction)
        ) {
          type = this._avatar.actionManager.partSets.partSets[type]['flipped-set-type'];
        }
      }

      const zOrder = ZOrder.avatar(this._avatar.position, this._getDrawOrder(type, gesture, direction));

      // We create the layer
      if (
        spritesheet.textures[
          // Skipping type checking because we cannot convert
          part.lib.id + '_h_' + gesture + '_' + type + '_' + part.id + '_' + tempDirection + '_' + frame
        ] !== undefined
      ) {
        const layer = new AvatarLayer(this._avatar, {
          type,
          part,
          gesture,
          tint:
            part.colorable === 1 && type !== 'ey' ? this._getColor(this._type, this._colors[part.index]) : undefined,
          z: zOrder,
          flip,
          direction,
          frame
        });
        /*let tempType: string = type;
                if(this._avatar.actionManager.partSets.partSets[type] !== undefined && this._avatar.actionManager.partSets.partSets[type]["flipped-set-type"] !== undefined && [4, 5, 6, 7].includes(direction)) {
                    tempType = this._avatar.actionManager.partSets.partSets[type]["flipped-set-type"];
                    if(spritesheet.data.frames[part.lib.id + "_h_std_" + tempType + "_" + part.id + "_" + tempDirection + "_0"] !== undefined) {
                        layer.x = spritesheet.data.frames[part.lib.id + "_h_std_" + tempType + "_" + part.id + "_" + tempDirection + "_0"].spriteSourceSize.x;
                        layer.y = spritesheet.data.frames[part.lib.id + "_h_std_" + tempType + "_" + part.id + "_" + tempDirection + "_0"].spriteSourceSize.y;
                    }
                }*/
        this._avatar.addChild(layer);
      }
    });
  }

  private _isHeadPart(type: string): boolean {
    return this._avatar.actionManager.partSets.activePartSets.head.includes(type);
  }

  // types must be changed here
  private _getColor(type: string, colorId: number): number {
    const figureData: [] = Assets.get('figures/figuredata');
    const paletteId = figureData.settype[type].paletteid;
    const palette = figureData.palette[String(paletteId)];

    if (palette[String(colorId)] === undefined) return Number('0xFFFFFF');

    return Number('0x' + String(palette[String(colorId)].color));
  }

  private _getDrawOrder(type: string, action: string, direction: number): number {
    const drawOrder: [] = Assets.get('figures/draworder');
    const drawOrderList = Object.entries(
      drawOrder[drawOrder[action] !== undefined ? action : 'std'][direction] ?? drawOrder.std[direction]
    ).find((entry) => {
      return entry[1] === type;
    });
    return drawOrderList !== undefined ? Number(drawOrderList[0]) : 0;
  }

  public updateParts(): void {
    this._frames.forEach((types, partId) => {
      types.forEach((value, type) => {
        const animation = this._avatar.animationManager.getAnimation(value.action);
        const frameData = this._avatar.animationManager.getLayerData(value.action, value.frame, type);
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

    return this._draw();
  }

  public get actions(): AvatarAction[] {
    return this._actions;
  }

  public set actions(actions: AvatarAction[]) {
    this._actions = actions;
  }

  public get frames(): Map<number, Map<string, { action: AvatarAction; frame: number; repeat: number }>> {
    return this._frames;
  }
}
