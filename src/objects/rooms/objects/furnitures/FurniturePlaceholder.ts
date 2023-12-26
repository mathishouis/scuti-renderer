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
    this.furniture.visualization.container.addChild(this.sprite);
  }

  public destroy(): void {
    this.sprite.destroy();
  }
}
