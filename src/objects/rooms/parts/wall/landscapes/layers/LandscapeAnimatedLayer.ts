import { LandscapeLayer } from './LandscapeLayer';
import { Sprite, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';
import { asset } from '../../../../../../utils/Assets';
import { LandscapeSpritesheet } from '../entities/Landscape.ts';
import { Direction } from '../../../../../../enums/Direction.ts';

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
  randomX: string;
  randomY: string;
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
    const { id, items }: LandscapeAnimation = spritesheet.data.materials.landscapes.animations.find(
      (animation: LandscapeAnimation): boolean => animation.id === this.name,
    )!;

    items.forEach((item: LandscapeAnimationItem) => {
      const sprite = new Sprite(spritesheet.textures[item.texture]);
      //sprite.parentLayer = this.part.room.renderer.layer;
      //sprite.zOrder = 1000000;
      //sprite.x = 0;
      //sprite.y = 0;
      const minY = 0;
      const maxY = 155 - sprite.height;

      const minX = 0;
      const maxX = this.part.container.width - sprite.width;

      //sprite.x = Math.random() * (maxX - minX) + minX - this.part.configuration.length * 32;
      /*sprite.y = Math.random() * (maxY - minY) + minY - sprite.x / 2;
      if (this.part.configuration.direction === Direction.NORTH)
        sprite.y = Math.random() * (maxY - minY) + minY + sprite.x / 2;*/
      console.log(item.texture);
      if (item.texture === 'cloud_2') sprite.y += 100;

      if (this.part.configuration.direction === Direction.NORTH) sprite.tint = 0xffff00;
      if (this.part.configuration.direction === Direction.NORTH) sprite.zIndex = 1000;
      sprite.skew.set(0, -0.466);

      let y = this.part.room.heightMap.sizeY - this.part.configuration.position.y;

      const percentage = 945;
      //const percentage = 120;

      //console.log(y);

      if (this.part.configuration.direction === Direction.WEST) {
        sprite.x =
          this.part.configuration.length * 32 -
          sprite.width -
          y * 32 -
          this.part.configuration.position.x * 32 +
          percentage;
        sprite.y -= sprite.x / 2;
      } else {
        sprite.x = -sprite.width - y * 32 - this.part.configuration.position.x * 32 + percentage;
        sprite.y += sprite.x / 2;
      }

      //sprite.x = -(this.part.room.heightMap.sizeX - this.part.configuration.position.y) * 32;
      if (this.part.configuration.direction === Direction.NORTH) sprite.skew.set(0, 0.466);
      this.part.container.addChild(sprite);
    });

    //console.log(id, items);

    /*const cube: Cube = new Cube({
      layer: this.part.room.renderer.layer,
      size: this.size,
      zOrders: {
        [CubeFace.TOP]: -4,
        [CubeFace.LEFT]: -4 - 0.5,
        [CubeFace.RIGHT]: -4 - 0.6,
      },
      color: this.color,
      texture: this.texture,
      shadows: false,
    });

    const { x, y } = this.position;
    cube.x = x;
    cube.y = y;

    this.part.container.addChild(cube);*/
  }
}
