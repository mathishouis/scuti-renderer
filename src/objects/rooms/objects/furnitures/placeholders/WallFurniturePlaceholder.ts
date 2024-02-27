import { Sprite } from 'pixi.js';
import { OffsetVector2D } from '../../../../../types/Vector';
import { asset } from '../../../../../utils/Assets';
import { Direction } from '../../../../../enums/Direction';
import { WallFurniture } from '../WallFurniture';

interface Configuration {
  furniture: WallFurniture;
  position: OffsetVector2D;
}

export class WallFurniturePlaceholder {
  public furniture: WallFurniture;
  public sprite: Sprite | undefined;
  public position: OffsetVector2D;

  constructor({ furniture, position }: Configuration) {
    this.furniture = furniture;
    this.position = position;
  }

  public render(): void {
    const { floorThickness, wallHeight, parsedHeightMap } = this.furniture.room;
    this.sprite = new Sprite(asset('room/content').textures['wall_placeholder']);

    const wallSize =
      floorThickness -
      parsedHeightMap.getTileHeight(this.position) +
      115 +
      (wallHeight === -1 ? parsedHeightMap.maxHeight * 32 : 64 * wallHeight);

    if (this.furniture.direction === Direction.EAST) {
      this.sprite.x = 32 + 32 * this.position.x - 32 * this.position.y + this.position.offsets.x * 2;
      this.sprite.y = 16 * this.position.x + 16 * this.position.y - 32 + this.position.offsets.y * 2 + 31 - wallSize + 8;
    } else if (this.furniture.direction === Direction.SOUTH) {
      this.sprite.x = 32 + 32 * this.position.x - 32 * this.position.y + this.position.offsets.x * 2 - 32;
      this.sprite.y = 16 * this.position.x + 16 * this.position.y - 32 + this.position.offsets.y * 2 + 31 - wallSize + 8;
      this.sprite.scale.x = -1;
    }

    this.furniture.room.visualization!.container.addChild(this.sprite);
  }

  public destroy(): void {
    if (this.sprite !== undefined) {
      this.sprite.destroy();
      this.sprite = undefined;
    }
  }
}
