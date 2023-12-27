import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture.ts';
import { Vector3D } from '../../../../../types/Vector.ts';
import { Texture } from 'pixi.js';

interface Configuration {
  furniture: RoomFurniture;
  image: string;
  offsets: Vector3D;
}

export class FurnitureBrandedImageVisualization extends FurnitureVisualization {
  protected static BRANDED_IMAGE: string = 'branded_image';

  private static STATE_0: number = 0;
  private static STATE_1: number = 1;
  private static STATE_2: number = 2;
  private static STATE_3: number = 3;

  protected _image: string;
  protected _offsets: Vector3D;

  constructor({ furniture, image, offsets }: Configuration) {
    super({ furniture });

    this._image = image;
    this._offsets = offsets;
  }

  public getLayerTexture(id: number): Texture {
    const tag = this.getLayerTag(id);

    if (tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE && this._image) {
      const texture = Texture.from(this._image);

      return texture;
    }

    return super.getLayerTexture(id);
  }
}
