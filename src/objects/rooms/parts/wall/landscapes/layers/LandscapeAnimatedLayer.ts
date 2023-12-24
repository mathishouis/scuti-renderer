import { LandscapeLayer } from './LandscapeLayer';
import { Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';
import { asset } from '../../../../../../utils/Assets';
import { LandscapeSpritesheet } from '../entities/Landscape';
import { LandscapeAnimatedLayerItem } from './items/LandscapeAnimatedLayerItem';

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
  public items: LandscapeAnimatedLayerItem[] = [];

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
      this.items.push(
        new LandscapeAnimatedLayerItem({
          layer: this,
          index,
          texture: item.texture,
          speedX: item.speedX,
          randomX: item.randomX,
          randomY: item.randomY,
          door: this.door,
        }),
      ),
    );

    this.items.forEach((item: LandscapeAnimatedLayerItem) => item.render());
    this.part.room.renderer.application.ticker.add(() => this.next());
  }

  public next(): void {
    this.items.forEach((item: LandscapeAnimatedLayerItem) => item.next());
  }
}
