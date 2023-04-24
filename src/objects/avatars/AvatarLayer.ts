import { Assets, Container } from 'pixi.js';
import { Color } from '@pixi/color';

import type { Avatar } from './Avatar';
import type { IAvatarLayerConfiguration, IAvatarPart } from '../../interfaces/Avatar';
import { HitSprite } from '../interactions/HitSprite';
import type { Direction } from '../../enums/Direction';

export class AvatarLayer extends Container {
  private readonly _avatar: Avatar;

  private readonly _type: string;
  private readonly _part: IAvatarPart;
  private readonly _gesture: string;

  /**
   * The layer tint
   * @private
   */
  private readonly _tint: number;

  /**
   * The layer z
   * @private
   */
  private readonly _z: number;

  private readonly _direction: Direction;

  /**
   * Is the layer flipped
   * @private
   */
  private readonly _flip: boolean;

  private readonly _frame: number;

  private readonly _alpha: number;

  constructor(avatar: Avatar, configuration: IAvatarLayerConfiguration) {
    super();

    this._avatar = avatar;
    this._type = configuration.type;
    this._part = configuration.part;
    this._gesture = configuration.gesture;
    this._tint = configuration.tint;
    this._z = configuration.z;
    this._flip = configuration.flip;
    this._direction = configuration.direction;
    this._frame = configuration.frame;
    // @ts-expect-error
    this._alpha = configuration.alpha;

    this._draw();
  }

  private _draw(): void {
    let tempDirection: number = this._direction;
    if (this._flip && [4, 5, 6].includes(tempDirection)) this.scale.x = -1;
    if (this._flip && [4, 5, 6].includes(tempDirection)) this.x = 64;
    if ([4, 5, 6].includes(tempDirection) && this._flip) {
      tempDirection = 6 - tempDirection;
    }
    // const avatarActions: IActionDefinition[] = Assets.get('figures/actions')
    // if(this._type === "ls" || this._type === "lh" || this._type === "lc") console.log(2, this._part.lib.id + "_h_" + this._gesture + "_" + this._type + "_" + this._part.id + "_" + tempDirection + "_" + this._frame);
    const sprite: HitSprite = new HitSprite(
      Assets.get('figures/' + this._part.lib.id).textures[
        this._part.lib.id +
          '_h_' +
          this._gesture +
          '_' +
          this._type +
          '_' +
          String(this._part.id) +
          '_' +
          String(tempDirection) +
          '_' +
          String(this._frame)
      ]
    );
    if (this._tint !== undefined) sprite.tint = new Color(this._tint).premultiply(1).toNumber();
    if (this._z !== undefined) this.zIndex = this._z;
    if (this._alpha !== undefined) sprite.alpha = this._alpha;
    //sprite.animationSpeed = 0.167;
    //sprite.play();
    sprite.interactive = true;
    sprite.on('pointerdown', (event) => {
      return this._avatar.interactionManager.handlePointerDown({ mouseEvent: event });
    });
    sprite.on('pointerup', (event) => {
      return this._avatar.interactionManager.handlePointerUp({ mouseEvent: event });
    });
    sprite.on('pointermove', (event) => {
      return this._avatar.interactionManager.handlePointerMove({ mouseEvent: event });
    });
    sprite.on('pointerout', (event) => {
      return this._avatar.interactionManager.handlePointerOut({ mouseEvent: event });
    });
    sprite.on('pointerover', (event) => {
      return this._avatar.interactionManager.handlePointerOver({ mouseEvent: event });
    });
    // @ts-expect-error
    this.addChild(sprite);
  }

  public get avatar(): Avatar {
    return this._avatar;
  }
}
