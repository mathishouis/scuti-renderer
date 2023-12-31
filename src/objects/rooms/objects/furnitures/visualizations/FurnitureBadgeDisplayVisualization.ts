import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture';
import { Texture } from 'pixi.js';

interface Configuration {
  furniture: RoomFurniture;
  badge?: string;
}

export class FurnitureBadgeDisplayVisualization extends FurnitureAnimatedVisualization {
  public static BADGE_TAG: string = 'BADGE';

  private _badge: string | undefined;

  constructor({ furniture, badge }: Configuration) {
    super({ furniture });

    this._badge = badge;
  }

  public getLayerTexture(id: number): Texture {
    const tag = super.getLayerTag(id);
    const trim = super.getLayerTexture(id)?.trim;

    if (tag === FurnitureBadgeDisplayVisualization.BADGE_TAG && this._badge && trim) {
      const texture = new Texture(Texture.from(this._badge).baseTexture);
      texture.trim = trim;

      return texture;
    }

    return super.getLayerTexture(id);
  }

  public get badge(): string | undefined {
    return this._badge;
  }

  public set badge(value: string) {
    this._badge = value;
    this.reset();
  }
}
