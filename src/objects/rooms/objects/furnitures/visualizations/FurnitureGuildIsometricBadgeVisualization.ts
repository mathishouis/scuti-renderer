import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture';
import { Assets, Container, Matrix, Sprite, Texture } from 'pixi.js';

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
      const thumbnailTexture = Texture.from(this._thumbnail);
      if (!thumbnailTexture) {
        Assets.load(this._thumbnail).then((result) => { if (result) this.reset(); }).catch(() => {});
        return super.getLayerTexture(id);
      }
      const scale = 1.1;
      const matrix = new Matrix();
      const difference = trim.width / thumbnailTexture.width;

      switch (this.furniture.direction) {
        case 2:
          matrix.a = -difference;
          matrix.b = -0.5 * difference;
          matrix.c = 0;
          matrix.d = difference * scale;
          matrix.tx = 0;
          matrix.ty = 0.5 * difference * thumbnailTexture.width;
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
      const sprite = new Sprite(thumbnailTexture);

      sprite.scale.set(
        Math.sqrt(matrix.a ** 2 + matrix.b ** 2),
        Math.sqrt(matrix.c ** 2 + matrix.d ** 2),
      );
      sprite.skew.set(Math.atan2(-matrix.c, matrix.d), Math.atan2(matrix.b, matrix.a));
      sprite.rotation = 0;
      sprite.position.set(matrix.tx, matrix.ty);

      container.addChild(sprite);
      return this.furniture.room.renderer.application.renderer.generateTexture(container);
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
