import { LandscapeLayer } from './LandscapeLayer';
import { Sprite, Spritesheet, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';
import { asset } from '../../../../../../utils/Assets';

interface Configuration {
  part: LandscapePart;
  name: string;
}

export class LandscapeTextureLayer extends LandscapeLayer {
  public part: LandscapePart;
  public name: string;
  public color: number = 0xffffff;

  private _texture!: Texture;

  constructor({ part, name }: Configuration) {
    super();

    this.part = part;
    this.name = name;
  }

  public get texture(): Texture {
    const spritesheet: Spritesheet = asset('room/materials');
    const sprite: Sprite = new Sprite(spritesheet.textures[this.name]);

    this._texture = this.part.room.renderer.application.renderer.generateTexture(sprite);

    return this._texture;
  }

  public destroy() {
    if (this._texture !== undefined) {
      this._texture.destroy(true);
      this._texture = undefined as any;
    }
  }
}
