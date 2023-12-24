import { LandscapeLayer } from './LandscapeLayer';
import { Container, Sprite, Spritesheet, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';
import { Vector2D, Vector3D } from '../../../../../../types/Vector';
import { random } from '../../../../../../utils/Random';
import { Direction } from '../../../../../../enums/Direction';
import { asset } from '../../../../../../utils/Assets';
import { Column, Extra, LandscapeSpritesheet, Matrice } from '../entities/Landscape';

interface Configuration {
  part: LandscapePart;
  name: string;
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

  // todo(): create a LandscapeMatriceLayerItem class?
  private _extra({ max, texture, offsets }: Extra): Sprite[] {
    const { position, length } = this.part.configuration;
    const spritesheet: Spritesheet = asset('room/materials');
    const sprites: Sprite[] = [];
    const seed: number = position.x + position.y + length;

    offsets.forEach((offset: Vector2D) => {
      const sprite: Sprite = new Sprite(spritesheet.textures[texture]);
      sprite.x = offset.x;
      sprite.y = offset.y;
      sprites.push(sprite);
    });

    const slice: number = random(seed, 0, sprites.length - 1);
    return sprites.slice(slice - max, slice);
  }

  private _column({ texture, extras }: Column): Texture {
    const spritesheet: Spritesheet = asset('room/materials');
    const container: Container = new Container();
    const background: Sprite = new Sprite(spritesheet.textures[texture]);
    const sprites: Sprite[] = extras.flatMap((extra: Extra) => this._extra(extra));

    container.addChild(background);
    sprites.forEach((sprite: Sprite) => container.addChild(sprite));

    return this.part.room.renderer.application.renderer.generateTexture(container);
  }

  private _random(textures: Texture[]): Texture {
    const { position, length, direction } = this.part.configuration;
    const width = length * 32;
    const container: Container = new Container();

    let offset = 0;

    while (offset < width) {
      const seed = position.x + position.y + length + offset;
      const randomIndex = random(seed, 0, 1);
      const sprite = new Sprite(textures[randomIndex]);
      sprite.x = offset;
      if (direction === Direction.NORTH) sprite.scale.x = -1;
      container.addChild(sprite);
      offset += sprite.width;
    }

    return this.part.room.renderer.application.renderer.generateTexture(container);
  }

  private _order(textures: Texture[]): Texture {
    const { length, direction } = this.part.configuration;
    const width: number = length * 32;
    const container: Container = new Container();

    let offset: number = 0;
    let index: number = 0;

    while (offset < width) {
      const sprite = new Sprite(textures[index]);
      sprite.x = offset;
      if (direction === Direction.NORTH) sprite.scale.x = -1;
      container.addChild(sprite);
      offset += sprite.width;
      index = (index + 1) % textures.length;
    }

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
    const spritesheet: LandscapeSpritesheet = asset('room/materials');
    const { align }: Matrice = spritesheet.data.materials.landscapes.matrices.find(
      (matrice: Matrice): boolean => matrice.id === this.name,
    )!;

    return {
      x: 0,
      y:
        align === 'bottom'
          ? configuration.height !== -1
            ? 115 + 64 * configuration.height - this.texture.height
            : room.heightMap.maxHeight * 32 + 115 - this.texture.height
          : 0,
    };
  }

  public get texture(): Texture {
    if (this._texture) return this._texture;

    const spritesheet: LandscapeSpritesheet = asset('room/materials');
    console.log(this.name);
    const { repeat, columns }: Matrice = spritesheet.data.materials.landscapes.matrices.find(
      (matrice: Matrice): boolean => matrice.id === this.name,
    )!;
    const textures: Texture[] = columns.map((column: Column) => this._column(column));

    if (repeat === 'random') this._texture = this._random(textures);
    if (repeat === 'none') this._texture = this._order(textures);

    return this._texture;
  }
}
