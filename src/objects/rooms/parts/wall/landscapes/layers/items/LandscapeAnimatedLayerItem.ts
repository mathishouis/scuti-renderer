import { LandscapeAnimatedLayer } from '../LandscapeAnimatedLayer';
import { Sprite } from 'pixi.js';
import { LandscapeSpritesheet } from '../../entities/Landscape';
import { asset } from '../../../../../../../utils/Assets';
import { random } from '../../../../../../../utils/Random';
import { Direction } from '../../../../../../../enums/Direction';
import { DoorMaskFilter } from '../../../../../../filters/DoorMaskFilter';

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
  public sprite!: Sprite;

  constructor({ layer, index, texture, speedX, randomX, randomY }: Configuration) {
    this.layer = layer;
    this.index = index;
    this.texture = texture;
    this.speedX = speedX;
    this.randomX = randomX;
    this.randomY = randomY;
  }

  public render(): void {
    const { door } = this.layer.part.room.visualization.layers.parts;
    const spritesheet: LandscapeSpritesheet = asset('room/materials');

    this.sprite = new Sprite(spritesheet.textures[this.texture]);
    this.sprite.skew.x = 0;
    this.sprite.skew.y = (this.layer.part.configuration.direction === Direction.WEST ? -1 : 1) * 0.466;

    if (door) {
      const filter: DoorMaskFilter = new DoorMaskFilter(door.sprite);
      this.sprite.filters = [filter];
    }

    this.layer.part.container.addChild(this.sprite);
  }

  public next(): void {
    const { room, configuration } = this.layer.part;
    const { direction, position, length } = configuration;
    const seed = room.heightMap.sizeY * room.heightMap.sizeX * this.index;
    const maxY = (155 - this.sprite.height) * this.randomY; // todo(): i'm not very sure if it's the real use of randomY... :(
    const minY = 0;
    const width = room.heightMap.sizeY * 32 + room.heightMap.sizeX * 32 + this.sprite.width;
    const percentage = (random(seed, 0, 12300, 0) + new Date().getTime() / (50 + this.speedX * 1.5)) % width;

    this.sprite.x = Math.floor(
      (direction === Direction.WEST ? length * 32 : 0) -
        this.sprite.width -
        (room.heightMap.sizeY - configuration.position.y) * 32 -
        position.x * 32 +
        percentage,
    );
    this.sprite.y = random(seed, 0, 1, 2) * (maxY - minY) + minY + (direction === Direction.WEST ? -1 : 1) * (this.sprite.x / 2);
  }
}
