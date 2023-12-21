import { RoomMaterial } from './RoomMaterial.ts';
import { Sprite, Texture } from 'pixi.js';
import { AssetLoader } from '../../assets/AssetLoader.ts';
import { Material } from '../../../types/Material.ts';
import { Room } from '../Room.ts';

export class WallMaterial extends RoomMaterial {
  public color!: number;
  public texture!: Texture;
  public room!: Room;

  constructor(public id: number) {
    super();
  }

  public render(): void {
    const material: Material = AssetLoader.get('room/materials').data.materials.walls.find(
      (material: Material) => material.id === this.id,
    );
    const sprite: Sprite = new Sprite(AssetLoader.get('room/materials').textures[material.texture]);

    this.texture = new Texture(this.room.renderer.application.renderer.generateTexture(sprite).baseTexture);
    this.color = material.color;
  }
}
