import { LandscapeAnimatedLayer } from '../LandscapeAnimatedLayer';
import { Sprite } from 'pixi.js';
import { LandscapeSpritesheet } from '../../entities/Landscape';
import { asset } from '../../../../../../../utils/Assets';
import { random } from '../../../../../../../utils/Random';
import { Direction } from '../../../../../../../enums/Direction';

interface Configuration {
  layer: LandscapeAnimatedLayer;
  index: number;
  texture: string;
  speedX: number;
  randomX: number;
  randomY: number;
}

export class LandscapeAnimatedLayerItem {
  public layer: LandscapeAnimatedLayer;
  public index: number;
  public texture: string;
  public speedX: number;
  public randomX: number;
  public randomY: number;

  constructor({ layer, index, texture, speedX, randomX, randomY }: Configuration) {
    this.layer = layer;
    this.index = index;
    this.texture = texture;
    this.speedX = speedX;
    this.randomX = randomX;
    this.randomY = randomY;
  }

  public render(): void {
    const { room, configuration } = this.layer.part;
    const { direction, position, length } = configuration;
    const spritesheet: LandscapeSpritesheet = asset('room/materials');
    const seed = room.heightMap.sizeY * room.heightMap.sizeX * this.index;
    const sprite = new Sprite(spritesheet.textures[this.texture]);
    const maxY = (155 - sprite.height) * 0.55;
    const minY = 0;
    const width = room.heightMap.sizeY * 32 + room.heightMap.sizeX * 32;
    const percentage = random(seed, 0, 12300, 0) % width;

    sprite.y = random(seed, 0, 1, 2) * (maxY - minY) + minY + (direction === Direction.WEST ? -1 : 1) * (sprite.x / 2);
    sprite.skew.x = 0;
    sprite.skew.y = (direction === Direction.WEST ? -1 : 1) * 0.466;

    sprite.x =
      (direction === Direction.WEST ? length * 32 : 0) -
      sprite.width -
      (room.heightMap.sizeY - configuration.position.y) * 32 -
      position.x * 32 +
      percentage;
    sprite.y += (direction === Direction.WEST ? -1 : 1) * (sprite.x / 2);

    this.layer.part.container.addChild(sprite);
  }

  public next(): void {}
}
