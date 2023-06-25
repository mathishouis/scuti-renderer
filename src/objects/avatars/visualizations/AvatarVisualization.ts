import type { IAvatarPosition, Nullable } from '../../../types';
import { AssetLoader } from '../../../utilities/AssetLoader';
import { RoomObjectVisualization } from '../../rooms/objects/RoomObjectVisualization';
import { AvatarAction } from '../actions/AvatarAction';
import type { Avatar } from '../Avatar';
import { AvatarLayer } from './AvatarLayer';

export class AvatarVisualization extends RoomObjectVisualization {
  private readonly _avatar: Avatar;

  private readonly _handItem: Nullable<number>;

  constructor(avatar: Avatar) {
    super();

    this._avatar = avatar;
    this._loadAssets();

    this._avatar.onRoomAdded = (room) => {
      if (this.loaded) room.visualization.animationTicker.add(() => this.render());
    };
  }

  private _loadAssets(): void {
    const assets: Array<Promise<void>> = [];

    if (this._avatar.onLoad !== undefined) this._avatar.onLoad();

    if (this._hasHandItem())
      assets.push(AssetLoader.load('figures/hh_human_item', 'figure/hh_human_item/hh_human_item.json'));
    assets.push(AssetLoader.load('figures/hh_human_body', 'figure/hh_human_body/hh_human_body.json'));

    Promise.all(assets)
      .then(() => {
        if (this._avatar.onLoadComplete !== undefined) this._avatar.onLoadComplete();
        this.loaded = true;

        if (this.placeholder !== undefined) this.placeholder.destroy();
        if (this._avatar.room != null) this._avatar.room.visualization.animationTicker.add(() => this.render());
      })
      .catch(() => {
        this.logger.error('Unable to load the assets');
      });
  }

  render(): void {
    this.destroy();

    if (!this.loaded) return;
    if (this._hasHandItem()) this._createHandItem();

    this._createShadow();

    this._avatar.bodyParts.forEach((bodyPart) => {
      bodyPart.actions = this._avatar.actions;
      bodyPart.updateParts();
    });

    const position = this._avatar.position as IAvatarPosition;

    this._avatar.x = 32 * position.x - 32 * position.y;
    this._avatar.y = 16 * position.x + 16 * position.y - 32 * position.z;
  }

  // todo!(): destroy avatar's bodyparts
  destroy(): void {
    // if (this.placeholder.parent !== null) this.placeholder.destroy();
  }

  // todo!(): add figure placeholder
  renderPlaceholder(): void {
    // const position = this._avatar.position as IAvatarPosition;
    // this.placeholder = new Sprite(Assets.get('furnitures/floor/placeholder').textures['place_holder_furniture_64.png']);
    // if (this._avatar.room != null) this._avatar.addChild(this.placeholder);
    // this.placeholder.x = 32 + 32 * position.x - 32 * position.y - 32;
    // this.placeholder.y = 16 * position.x + 16 * position.y - 32 * position.z - 50;
  }

  updatePosition(): void {}

  private _createShadow(): void {
    this._avatar.addChild(
      new AvatarLayer(this._avatar, {
        type: 'sd',
        part: { id: 1, lib: { id: 'hh_human_body' } },
        gesture: 'std',
        tint: undefined,
        z: 0,
        flip: true,
        direction: 0,
        frame: 0,
        alpha: 0.1
      })
    );
  }

  private _createHandItem(): void {
    const item = this._handItem;
    const handItemCarryId = this._avatar.actionManager.getActionDefinition(AvatarAction.CarryItem).params[String(item)];
    const handItemUseId = this._avatar.actionManager.getActionDefinition(AvatarAction.UseItem).params[String(item)];

    if (this._avatar.actions.includes(AvatarAction.UseItem) && handItemUseId !== undefined) {
      this._avatar.addChild(
        new AvatarLayer(this._avatar, {
          type: 'ri',
          part: { id: handItemUseId, lib: { id: 'hh_human_item' } },
          gesture: 'drk',
          tint: undefined,
          z: 1000,
          flip: false,
          direction: this._avatar.bodyDirection,
          frame: 0
        })
      );
    } else if (this._avatar.actions.includes(AvatarAction.CarryItem) && handItemCarryId !== undefined) {
      this._avatar.addChild(
        new AvatarLayer(this._avatar, {
          type: 'ri',
          part: { id: handItemCarryId, lib: { id: 'hh_human_item' } },
          gesture: 'crr',
          tint: undefined,
          z: 1000,
          flip: false,
          direction: this._avatar.bodyDirection,
          frame: 0
        })
      );
    }
  }

  private _hasHandItem(): boolean {
    return this._handItem !== 0 || this._handItem !== undefined;
  }
}
