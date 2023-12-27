import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization.ts';
import { RoomFurniture } from '../RoomFurniture.ts';
import { Texture } from 'pixi.js';

interface Configuration {
  furniture: RoomFurniture;
  primaryColor?: number;
  secondaryColor?: number;
  badge?: string;
}

export class FurnitureGuildCustomizedVisualization extends FurnitureAnimatedVisualization {
  public static PRIMARY_COLOR_TAG: string = 'COLOR1';
  public static SECONDARY_COLOR_TAG: string = 'COLOR2';
  public static BADGE_TAG: string = 'BADGE';
  public static PRIMARY_COLOR_DEFAULT: number = 0xeeeeee;
  public static SECONDARY_COLOR_DEFAULT: number = 0x4b4b4b;

  private _primaryColor: number | undefined;
  private _secondaryColor: number | undefined;
  private _badge: string | undefined;

  constructor({ furniture, primaryColor, secondaryColor, badge }: Configuration) {
    super({ furniture });

    this._primaryColor = primaryColor;
    this._secondaryColor = secondaryColor;
    this._badge = badge;
  }

  protected getLayerColor(id: number): number {
    const tag = this.getLayerTag(id);

    if (tag === FurnitureGuildCustomizedVisualization.PRIMARY_COLOR_TAG)
      return this._primaryColor ?? FurnitureGuildCustomizedVisualization.PRIMARY_COLOR_DEFAULT;
    if (tag === FurnitureGuildCustomizedVisualization.SECONDARY_COLOR_TAG)
      return this._secondaryColor ?? FurnitureGuildCustomizedVisualization.SECONDARY_COLOR_DEFAULT;

    return super.getLayerColor(id);
  }

  protected getLayerTexture(id: number): Texture {
    const tag = this.getLayerTag(id);
    const trim = super.getLayerTexture(id)?.trim;

    if (tag === FurnitureGuildCustomizedVisualization.BADGE_TAG && this._badge && trim) {
      const texture = Texture.from(this._badge);
      texture.trim = trim;

      return texture;
    }

    return super.getLayerTexture(id);
  }

  public get primaryColor(): number {
    return this._primaryColor ?? FurnitureGuildCustomizedVisualization.PRIMARY_COLOR_DEFAULT;
  }

  public set primaryColor(color: number) {
    this._primaryColor = color;
    this.reset();
  }

  public get secondaryColor(): number {
    return this._secondaryColor ?? FurnitureGuildCustomizedVisualization.SECONDARY_COLOR_DEFAULT;
  }

  public set secondaryColor(color: number) {
    this._secondaryColor = color;
    this.reset();
  }

  public get badge(): string | undefined {
    return this._badge;
  }

  public set badge(value: string) {
    this._badge = value;
    this.reset();
  }
}
