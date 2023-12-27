import { Sprite } from 'pixi.js';
import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector';
import { asset } from '../../../../utils/Assets';

interface Configuration {
  furniture: RoomFurniture;
  position: Vector3D;
}

export class FurniturePlaceholder {
  public furniture: RoomFurniture;
  public sprite!: Sprite;
  public position: Vector3D;

  constructor({ furniture, position }: Configuration) {
    this.furniture = furniture;
    this.position = position;
  }

  public render(): void {
    this.sprite = new Sprite(asset('room/content').textures['floor_placeholder']);
    this.sprite.x = 32 * this.position.x - 32 * this.position.y;
    this.sprite.y = 16 * this.position.x + 16 * this.position.y - 32 * this.position.z - 50;

    this.furniture.room.visualization.container.addChild(this.sprite);
  }

  public destroy(): void {
    this.sprite.destroy();
  }
}
