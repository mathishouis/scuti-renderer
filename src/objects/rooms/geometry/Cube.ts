import { Color, Container, Graphics, Matrix, Texture } from 'pixi.js';
import { FloorMaterial } from '../materials/FloorMaterial';
import { CubeFace } from '../../../enums/CubeFace';
import { WallMaterial } from '../materials/WallMaterial';
import { Vector2D, Vector3D } from '../../../types/Vector';
import { Layer } from '@pixi/layers';

interface Configuration {
  texture?: Texture;
  color?: number;
  size: Vector3D;
  offsets?: Record<number, Vector2D>;
  zOrders?: Record<number, number>;
  layer?: Layer;
  shadows?: boolean;
}

export class Cube extends Container {
  public faces: Record<number, Graphics> = {};
  constructor(public configuration: Configuration) {
    super();

    this._initialize();
  }

  private _initialize(): void {
    const texture: Texture = this.configuration.texture ?? Texture.WHITE;
    const color: number = this.configuration.color ?? 0xffffff;
    let shadows: boolean = true;

    if (this.configuration.shadows === false) shadows = false;

    if (this.configuration.size.x > 0 && this.configuration.size.y > 0)
      this.faces[CubeFace.TOP] = new Graphics()
        .beginTextureFill({
          texture: texture,
          color: new Color(color).premultiply(1).toNumber(),
          matrix: new Matrix(
            1,
            0.5,
            1,
            -0.5,
            this.configuration.offsets?.[CubeFace.TOP]?.x ?? 0,
            this.configuration.offsets?.[CubeFace.TOP]?.y ?? 0,
            //1 % 2 === 0 ? 32 : 64,
            //1 % 2 === 0 ? 16 : 0
          ),
        })
        .moveTo(0, 0)
        .lineTo(32 * this.configuration.size.y, -16 * this.configuration.size.y)
        .lineTo(
          32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1),
          -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1),
        )
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
        .lineTo(0, 0)
        .endFill();
    if (this.configuration.size.x > 0 && this.configuration.size.z > 0)
      this.faces[CubeFace.LEFT] = new Graphics()
        .beginTextureFill({
          texture: texture,
          color: new Color(color).premultiply(shadows ? 0.8 : 1).toNumber(),
          matrix: new Matrix(
            1,
            0.5,
            0,
            1,
            this.configuration.offsets?.[CubeFace.LEFT]?.x ?? 0,
            this.configuration.offsets?.[CubeFace.LEFT]?.y ?? 0,
          ),
        })
        .moveTo(0, 0)
        .lineTo(0, this.configuration.size.z * 32)
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x + this.configuration.size.z * 32)
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
        .endFill();
    if (this.configuration.size.y > 0 && this.configuration.size.z > 0)
      this.faces[CubeFace.RIGHT] = new Graphics()
        .beginTextureFill({
          texture: texture,
          color: new Color(color).premultiply(shadows ? 0.71 : 1).toNumber(),
          matrix: new Matrix(
            1,
            -0.5,
            0,
            1,
            this.configuration.offsets?.[CubeFace.RIGHT]?.x ?? 0,
            this.configuration.offsets?.[CubeFace.RIGHT]?.y ?? 0,
          ),
        })
        .moveTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x + this.configuration.size.z * 32)
        .lineTo(
          32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1),
          -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1) + this.configuration.size.z * 32,
        )
        .lineTo(
          32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1),
          -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1),
        )
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
        .endFill();

    if (this.configuration.layer) {
      if (this.faces[CubeFace.TOP]) {
        this.faces[CubeFace.TOP].parentLayer = this.configuration.layer;
        this.faces[CubeFace.TOP].zOrder = this.configuration.zOrders?.[CubeFace.TOP] ?? 0;
      }

      if (this.faces[CubeFace.LEFT]) {
        this.faces[CubeFace.LEFT].parentLayer = this.configuration.layer;
        this.faces[CubeFace.LEFT].zOrder = this.configuration.zOrders?.[CubeFace.LEFT] ?? 0;
      }

      if (this.faces[CubeFace.RIGHT]) {
        this.faces[CubeFace.RIGHT].parentLayer = this.configuration.layer;
        this.faces[CubeFace.RIGHT].zOrder = this.configuration.zOrders?.[CubeFace.RIGHT] ?? 0;
      }
    }

    if (this.faces[CubeFace.TOP]) this.addChild(this.faces[CubeFace.TOP]);
    if (this.faces[CubeFace.LEFT]) this.addChild(this.faces[CubeFace.LEFT]);
    if (this.faces[CubeFace.RIGHT]) this.addChild(this.faces[CubeFace.RIGHT]);
  }
}
