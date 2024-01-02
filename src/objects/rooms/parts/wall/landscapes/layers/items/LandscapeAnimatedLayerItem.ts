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
  door: boolean;
}

export class LandscapeAnimatedLayerItem {
  public layer: LandscapeAnimatedLayer;
  public index: number;
  public texture: string;
  public speedX: number;
  public randomX: number;
  public randomY: number;
  public sprite!: Sprite;
  public door: boolean;

  constructor({ layer, index, texture, speedX, randomX, randomY, door }: Configuration) {
    this.layer = layer;
    this.index = index;
    this.texture = texture;
    this.speedX = speedX;
    this.randomX = randomX;
    this.randomY = randomY;
    this.door = door;
  }

  public render(): void {
    const { door } = this.layer.part.room.visualization.layers.parts;
    const spritesheet: LandscapeSpritesheet = asset('room/materials');

    this.sprite = new Sprite(spritesheet.textures[this.texture]);
    this.sprite.skew.x = 0;
    this.sprite.skew.y = (this.layer.part.configuration.direction === Direction.WEST ? -1 : 1) * 0.466;
    this.sprite.parentLayer = this.layer.part.container.parentLayer;
    this.sprite.mask = this.layer.part.mask;

    if (this.door && door) {
      const filter: DoorMaskFilter = new DoorMaskFilter(door.sprite);
      this.sprite.filters = [filter];
    }
  }

  public next(): void {
    const { room, configuration } = this.layer.part;
    const { direction, position, length } = configuration;
    const seed = room.parsedHeightMap.sizeY * room.parsedHeightMap.sizeX * this.index;
    const maxY = (155 - this.sprite.height) * this.randomY; // todo(): i'm not very sure if it's the real use of randomY... :(
    const minY = 0;
    const width = room.parsedHeightMap.sizeY * 32 + room.parsedHeightMap.sizeX * 32 + this.sprite.width;
    const percentage = (random(seed, 0, 12300, 0) + new Date().getTime() / (50 + this.speedX * 1.5)) % width;

    this.sprite.x = Math.floor(
      (direction === Direction.WEST ? length * 32 : 0) -
        this.sprite.width -
        (room.parsedHeightMap.sizeY - configuration.position.y) * 32 -
        position.x * 32 +
        percentage,
    );
    this.sprite.y = random(seed, 0, 1, 2) * (maxY - minY) + minY + (direction === Direction.WEST ? -1 : 1) * (this.sprite.x / 2);
  }

  public destroy(): void {
    if (this.sprite !== undefined) {
      this.sprite.destroy();
      this.sprite = undefined as any;
    }
  }
}
