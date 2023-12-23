import { LandscapeLayer } from './LandscapeLayer';
import { Sprite, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';
import { asset } from '../../../../../../utils/Assets';
import { LandscapeSpritesheet } from '../entities/Landscape.ts';
import { Direction } from '../../../../../../enums/Direction.ts';
import { random } from '../../../../../../utils/Random.ts';
import { LandscapeAnimatedLayerItem } from './items/LandscapeAnimatedLayerItem.ts';

interface Configuration {
  part: LandscapePart;
  name: string;
}

interface LandscapeAnimation {
  id: string;
  items: LandscapeAnimationItem[];
}

interface LandscapeAnimationItem {
  texture: string;
  speedX: number;
  randomX: number;
  randomY: number;
}

export class LandscapeAnimatedLayer extends LandscapeLayer {
  public part: LandscapePart;
  public name: string;
  public color: number = 0xffffff;

  constructor({ part, name }: Configuration) {
    super();

    this.part = part;
    this.name = name;
  }

  public get texture(): Texture {
    return Texture.WHITE;
  }

  public render(): void {
    const spritesheet: LandscapeSpritesheet = asset('room/materials');
    const { items }: LandscapeAnimation = spritesheet.data.materials.landscapes.animations.find(
      (animation: LandscapeAnimation): boolean => animation.id === this.name,
    )!;

    items.forEach((item: LandscapeAnimationItem, index: number) =>
      new LandscapeAnimatedLayerItem({
        layer: this,
        index,
        texture: item.texture,
        speedX: item.speedX,
        randomX: item.randomX,
        randomY: item.randomY,
      }).render(),
    );
  }
}
