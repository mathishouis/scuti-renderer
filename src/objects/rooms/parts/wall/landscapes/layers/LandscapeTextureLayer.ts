import { LandscapeLayer } from './LandscapeLayer';
import { Container, Sprite, Spritesheet, Texture } from 'pixi.js';
import { AssetLoader } from '../../../../../assets/AssetLoader';
import { LandscapePart } from '../LandscapePart';
import { Vector2D, Vector3D } from '../../../../../../types/Vector';
import { Direction } from '../../../../../../enums/Direction';

interface Configuration {
  part: LandscapePart;
  name: string;
}

export class LandscapeTextureLayer extends LandscapeLayer {
  public container: Container = new Container();
  public part: LandscapePart;
  public name: string;
  public align: 'top' | 'bottom' | 'stretch' = 'stretch';

  constructor({ part, name }: Configuration) {
    super();

    this.part = part;
    this.name = name;
  }

  public get size(): Vector3D {
    const { configuration, room } = this.part;
    const { direction, length, height } = configuration;

    return {
      x: direction === Direction.NORTH ? length : 0,
      y: direction === Direction.WEST ? length : 0,
      z: height === -1 ? room.heightMap.maxHeight + 115 / 32 : 115 / 32 + (64 / 32) * height,
    };
  }

  public get position(): Vector2D {
    return {
      x: 0,
      y: 0,
    };
  }

  public get texture(): Texture {
    const spritesheet: Spritesheet = AssetLoader.get('room/materials');
    const sprite: Sprite = new Sprite(spritesheet.textures[this.name]);

    return this.part.room.renderer.application.renderer.generateTexture(sprite);
  }
}
