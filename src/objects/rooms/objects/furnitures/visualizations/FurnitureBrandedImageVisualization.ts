import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture';
import { Vector3D } from '../../../../../types/Vector';
import { Assets, Texture } from 'pixi.js';

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

    if (tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE && this._image) {
      const texture = Texture.from(this._image);
      if (texture) return texture;
      Assets.load(this._image).then((result) => { if (result) this.reset(); }).catch(() => {});
    }

    return super.getLayerTexture(id);
  }
}
