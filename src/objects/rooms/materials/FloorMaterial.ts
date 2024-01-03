import { RoomMaterial } from './RoomMaterial';
import { Sprite, Texture } from 'pixi.js';
import { Material } from '../../../types/Material';
import { Room } from '../Room';
import { asset } from '../../../utils/Assets';

export class FloorMaterial extends RoomMaterial {
  public color!: number;
  public texture!: Texture;
  public room!: Room;

  constructor(public id: number) {
    super();
  }

  public render(): void {
    const material: Material = asset('room/materials').data.materials.floors.find((material: Material) => material.id === this.id);
    const sprite: Sprite = new Sprite(asset('room/materials').textures[material.texture]);

    this.texture = new Texture(this.room.renderer.application.renderer.generateTexture(sprite).baseTexture);
    this.color = material.color;
  }

  public destroy(): void {
    if (this.texture !== undefined) {
      this.texture.destroy(true);
      this.texture = undefined as any;
    }
  }
}
