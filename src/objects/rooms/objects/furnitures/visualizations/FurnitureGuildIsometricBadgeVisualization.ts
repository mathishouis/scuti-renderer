import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture';
import { Container, ImageResource, Matrix, Rectangle, Sprite, Texture } from 'pixi.js';

interface Configuration {
  furniture: RoomFurniture;
  primaryColor?: number;
  secondaryColor?: number;
  thumbnail?: string;
}

export class FurnitureGuildIsometricBadgeVisualization extends FurnitureAnimatedVisualization {
  private static PRIMARY_COLOR_TAG: string = 'COLOR1';
  private static SECONDARY_COLOR_TAG: string = 'COLOR2';
  private static THUMBNAIL_TAG: string = 'THUMBNAIL';
  private static PRIMARY_COLOR_DEFAULT: number = 0xeeeeee;
  private static SECONDARY_COLOR_DEFAULT: number = 0x4b4b4b;

  private _primaryColor: number | undefined;
  private _secondaryColor: number | undefined;
  private _thumbnail: string | undefined;

  constructor({ furniture, primaryColor, secondaryColor, thumbnail }: Configuration) {
    super({ furniture });

    this._primaryColor = primaryColor;
    this._secondaryColor = secondaryColor;
    this._thumbnail = thumbnail;
  }

  public getLayerColor(id: number): number {
    const tag = this.getLayerTag(id);

    if (tag === FurnitureGuildIsometricBadgeVisualization.PRIMARY_COLOR_TAG)
      return this._primaryColor ?? FurnitureGuildIsometricBadgeVisualization.PRIMARY_COLOR_DEFAULT;
    if (tag === FurnitureGuildIsometricBadgeVisualization.SECONDARY_COLOR_TAG)
      return this._secondaryColor ?? FurnitureGuildIsometricBadgeVisualization.SECONDARY_COLOR_DEFAULT;

    return super.getLayerColor(id);
  }

  public getLayerTexture(id: number): Texture {
    const tag = super.getLayerTag(id);
    const trim = super.getLayerTexture(id)?.trim;

    if (tag === FurnitureGuildIsometricBadgeVisualization.THUMBNAIL_TAG && this._thumbnail && trim) {
      const baseTexture = Texture.from(this._thumbnail);
      const scale = 1.1;
      const matrix = new Matrix();
      const difference = trim.width / baseTexture.width;

      switch (this.furniture.direction) {
        case 2:
          matrix.a = -difference;
          matrix.b = -0.5 * difference;
          matrix.c = 0;
          matrix.d = difference * scale;
          matrix.tx = 0;
          matrix.ty = 0.5 * difference * baseTexture.width;
          break;
        case 0:
        case 4:
          matrix.a = difference;
          matrix.b = 0.5 * difference;
          matrix.c = 0;
          matrix.d = difference * scale;
          matrix.tx = 0;
          matrix.ty = 0;
          break;
        default:
          matrix.a = difference;
          matrix.b = 0;
          matrix.c = 0;
          matrix.d = difference;
          matrix.tx = 0;
          matrix.ty = 0;
      }

      const container = new Container();
      const sprite = new Sprite(baseTexture);
      sprite.transform.setFromMatrix(matrix);
      container.addChild(sprite);
      const texture = this.furniture.room.renderer.application.renderer.generateTexture(container);
      texture.trim = new Rectangle(trim.x, trim.y, texture.width, texture.height);

      return texture;
    }

    return super.getLayerTexture(id);
  }

  public get primaryColor(): number {
    return this._primaryColor ?? FurnitureGuildIsometricBadgeVisualization.PRIMARY_COLOR_DEFAULT;
  }

  public set primaryColor(color: number) {
    this._primaryColor = color;
    this.reset();
  }

  public get secondaryColor(): number {
    return this._secondaryColor ?? FurnitureGuildIsometricBadgeVisualization.SECONDARY_COLOR_DEFAULT;
  }

  public set secondaryColor(color: number) {
    this._secondaryColor = color;
    this.reset();
  }

  public get thumbnail(): string | undefined {
    return this._thumbnail;
  }

  public set thumbnail(value: string) {
    this._thumbnail = value;
    this.reset();
  }
}
