import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture';
import { Vector3D } from '../../../../../types/Vector';
import { Texture } from 'pixi.js';

interface Configuration {
  furniture: RoomFurniture;
  image: string;
  offsets: Vector3D;
}

export class FurnitureBrandedImageVisualization extends FurnitureVisualization {
  protected static BRANDED_IMAGE: string = 'branded_image';

  protected _image: string;
  protected _offsets: Vector3D;

  constructor({ furniture, image, offsets }: Configuration) {
    super({ furniture });

    this._image = image;
    this._offsets = offsets;
  }

  public getLayerTexture(id: number): Texture {
    const tag = this.getLayerTag(id);

    if (tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE && this._image) return Texture.from(this._image);

    return super.getLayerTexture(id);
  }
}
