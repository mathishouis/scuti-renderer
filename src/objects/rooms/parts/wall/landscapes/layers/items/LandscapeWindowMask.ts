import { Sprite } from 'pixi.js';
import { WallFurniture } from '../../../../../objects/furnitures/WallFurniture';
import { Direction } from '../../../../../../../enums/Direction';

interface Configuration {
  furniture: WallFurniture;
}

export class LandscapeWindowMask {
  public furniture: WallFurniture;
  public sprite!: Sprite;

  constructor({ furniture }: Configuration) {
    this.furniture = furniture;
  }

  public render(): void {
    this.sprite = new Sprite(
      this.furniture.visualization.data.spritesheet.textures[this.furniture.data.name + '_' + this.furniture.direction + '_mask'],
    );

    const { direction, position, visualization } = this.furniture;

    if (direction === Direction.EAST) {
      this.sprite.x = 32 + 32 * position.x - 32 * position.y + position.offsets.x * 2;
      this.sprite.y = 16 * position.x + 16 * position.y - 32 + position.offsets.y * 2 + 31;
    } else if (direction === Direction.SOUTH) {
      this.sprite.scale.x = -1;
      this.sprite.x = 32 + 32 * position.x - 32 * position.y + position.offsets.x * 2 - 32;
      this.sprite.y = 16 * position.x + 16 * position.y - 32 + position.offsets.y * 2 + 31;
    }
  }

  public destroy(): void {
    if (this.sprite !== undefined) {
      this.sprite.destroy();
      this.sprite = undefined as any;
    }
  }
}
