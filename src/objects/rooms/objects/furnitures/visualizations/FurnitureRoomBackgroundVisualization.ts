import { FurnitureBrandedImageVisualization } from './FurnitureBrandedImageVisualization';
import { Direction } from '../../../../../enums/Direction';
import { Vector2D, Vector3D } from '../../../../../types/Vector';
import { RoomFurniture } from '../RoomFurniture';
import { Assets, Texture } from 'pixi.js';

interface Configuration {
  furniture: RoomFurniture;
  image: string;
  offsets: Vector3D;
}

export class FurnitureRoomBackgroundVisualization extends FurnitureBrandedImageVisualization {
  protected _directionalOffsets: Map<Direction, Vector2D> = new Map();

  constructor({ furniture, image, offsets }: Configuration) {
    super({ furniture, image, offsets });

    const texture = Texture.from(this._image);

    if (texture) {
      this._setDirectionalOffsets(texture.orig.width, texture.orig.height);
    } else {
      Assets.load(this._image)
        .then((result) => {
          if (!result) return;
          const loaded = Texture.from(this._image);
          if (loaded) this._setDirectionalOffsets(loaded.orig.width, loaded.orig.height);
          this.reset();
        })
        .catch(() => {});
    }
  }

  private _setDirectionalOffsets(w: number, h: number): void {
    this._directionalOffsets.set(1, { x: 0, y: -h });
    this._directionalOffsets.set(3, { x: 0, y: 0 });
    this._directionalOffsets.set(4, { x: -w / 2, y: -h / 2 });
    this._directionalOffsets.set(5, { x: -w, y: 0 });
    this._directionalOffsets.set(7, { x: -w, y: -h });
  }

  public getLayerXOffset(id: number, direction: number): number {
    if (this._directionalOffsets) {
      const offset = this._directionalOffsets.get(direction);

      if (offset) return offset.x + (this._offsets?.x ?? 0);
    }

    return super.getLayerXOffset(id, direction) + (this._offsets?.x ?? 0);
  }

  public getLayerYOffset(id: number, direction: number): number {
    if (this._directionalOffsets) {
      const offset = this._directionalOffsets.get(direction);

      if (offset) return offset.y + (this._offsets?.y ?? 0);
    }

    return super.getLayerYOffset(id, direction) + (this._offsets?.y ?? 0);
  }

  public getLayerZOffset(id: number, direction: number): number {
    return super.getLayerZOffset(id, direction) + (this._offsets?.z ?? 0);
  }
}
