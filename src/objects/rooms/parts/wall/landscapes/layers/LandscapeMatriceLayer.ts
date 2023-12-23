import { LandscapeLayer } from './LandscapeLayer';
import { Container, Sprite, Spritesheet, Texture } from 'pixi.js';
import { AssetLoader } from '../../../../../assets/AssetLoader';
import { LandscapePart } from '../LandscapePart';
import { Vector2D, Vector3D } from '../../../../../../types/Vector';
import { random } from '../../../../../../utils/Random';
import { Direction } from '../../../../../../enums/Direction';

interface Configuration {
  part: LandscapePart;
  name: string;
}

interface Extra {
  max: number;
  texture: string;
  offsets: Vector2D[];
}

interface Column {
  texture: string;
  extras: Extra[];
}

interface Matrice {
  id: string;
  repeat: 'random' | 'none';
  align: 'top' | 'bottom' | 'stretch';
  columns: Column[];
}

export class LandscapeMatriceLayer extends LandscapeLayer {
  public part: LandscapePart;
  public name: string;
  public color: number = 0xffffff;

  private _texture!: Texture;

  constructor({ part, name }: Configuration) {
    super();

    this.part = part;
    this.name = name;
  }

  private _extra({ max, texture, offsets }: Extra): Sprite[] {
    const { position, length } = this.part.configuration;
    const spritesheet: Spritesheet = AssetLoader.get('room/materials');
    const sprites: Sprite[] = [];
    const seed: number = position.x + position.y + length;

    offsets.forEach((offset: Vector2D) => {
      const sprite: Sprite = new Sprite(spritesheet.textures[texture]);

      sprite.x = offset.x;
      sprite.y = offset.y;
      sprites.push(sprite);
    });

    // todo(): Seed shuffle cus it never change :(
    return sprites.sort(() => seed).slice(0, max);
  }

  private _column({ texture, extras }: Column): Texture {
    const spritesheet: Spritesheet = AssetLoader.get('room/materials');
    const container: Container = new Container();
    const background: Sprite = new Sprite(spritesheet.textures[texture]);
    const sprites: Sprite[] = extras.flatMap((extra: Extra) => this._extra(extra));

    container.addChild(background);
    sprites.forEach((sprite: Sprite) => container.addChild(sprite));

    return this.part.room.renderer.application.renderer.generateTexture(container);
  }

  public get size(): Vector3D {
    const { direction, length } = this.part.configuration;

    return {
      x: direction === Direction.NORTH ? length : 0,
      y: direction === Direction.WEST ? length : 0,
      z: this.texture.height / 32,
    };
  }

  public get position(): Vector2D {
    const { configuration, room } = this.part;
    const spritesheet: Spritesheet = AssetLoader.get('room/materials');
    const { align }: Matrice = spritesheet.data.materials.landscapes.matrices.find(
      (matrice: Matrice): boolean => matrice.id === this.name,
    );
    const position: Vector2D = {
      x: 0,
      y: 0,
    };

    if (align === 'bottom') {
      if (configuration.height !== -1) {
        position.y = 115 + 64 * configuration.height - this.texture.height;
      } else {
        position.y = room.heightMap.maxHeight * 32 + 115 - this.texture.height;
      }
    }

    return position;
  }

  public get texture(): Texture {
    if (this._texture) return this._texture;

    const { position, length, direction } = this.part.configuration;
    const spritesheet: Spritesheet = AssetLoader.get('room/materials');
    const { repeat, columns }: Matrice = spritesheet.data.materials.landscapes.matrices.find(
      (matrice: Matrice): boolean => matrice.id === this.name,
    );
    const textures: Texture[] = columns.map((column: Column) => this._column(column));
    const container: Container = new Container();
    const width: number = length * 32;

    let offset: number = 0;

    if (repeat === 'random') {
      while (offset < width) {
        const seed = position.x + position.y + length + offset;
        const randomIndex = random(seed, 0, 1);
        const column = textures[randomIndex];
        const sprite = new Sprite(column);

        sprite.x = offset;
        if (direction === Direction.NORTH) sprite.scale.x = -1;
        container.addChild(sprite);
        offset += sprite.width;
      }
    } else if (repeat === 'none') {
    }

    this._texture = this.part.room.renderer.application.renderer.generateTexture(container);

    return this._texture;
  }
}
