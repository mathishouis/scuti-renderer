import { LandscapeLayer } from './LandscapeLayer';
import { Sprite, Spritesheet, Texture } from 'pixi.js';
import { AssetLoader } from '../../../../../assets/AssetLoader';
import { LandscapePart } from '../LandscapePart';

interface Configuration {
  part: LandscapePart;
  name: string;
}

export class LandscapeTextureLayer extends LandscapeLayer {
  public part: LandscapePart;
  public name: string;
  public color: number = 0xffffff;

  constructor({ part, name }: Configuration) {
    super();

    this.part = part;
    this.name = name;
  }

  public get texture(): Texture {
    const spritesheet: Spritesheet = AssetLoader.get('room/materials');
    const sprite: Sprite = new Sprite(spritesheet.textures[this.name]);

    return this.part.room.renderer.application.renderer.generateTexture(sprite);
  }
}
