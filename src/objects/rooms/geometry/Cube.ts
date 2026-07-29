import { Color, Container, Graphics, Matrix, Texture } from 'pixi.js';
import { CubeFace } from '../../../enums/CubeFace';
import { Vector2D, Vector3D } from '../../../types/Vector';

interface Configuration {
  texture?: Texture;
  color?: number;
  size: Vector3D;
  offsets?: Record<number, Vector2D>;
  zOrders?: Record<number, number>;
  shadows?: Record<number, number>;
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

    if (this.configuration.size.x > 0 && this.configuration.size.y > 0)
      this.faces[CubeFace.TOP] = new Graphics()
        .moveTo(0, 0)
        .lineTo(32 * this.configuration.size.y, -16 * this.configuration.size.y)
        .lineTo(
          32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1),
          -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1),
        )
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
        .lineTo(0, 0)
        .fill({
          texture,
          color: new Color(color).premultiply(this.configuration.shadows?.[CubeFace.TOP] ?? 1).toNumber(),
          matrix: new Matrix(
            1,
            0.5,
            1,
            -0.5,
            this.configuration.offsets?.[CubeFace.TOP]?.x ?? 0,
            this.configuration.offsets?.[CubeFace.TOP]?.y ?? 0,
          ),
          textureSpace: 'global', // ← indispensable pour retrouver le comportement v7
        });

    if (this.configuration.size.x > 0 && this.configuration.size.z > 0) {
      const leftMatrix = new Matrix(
        1, 0.5, 0, 1,
        this.configuration.offsets?.[CubeFace.LEFT]?.x ?? 0,
        this.configuration.offsets?.[CubeFace.LEFT]?.y ?? 0,
      );
      // Si la texture est inversée par rapport à v7, décommentez :
      // leftMatrix.invert();

      this.faces[CubeFace.LEFT] = new Graphics()
        .moveTo(0, 0)
        .lineTo(0, this.configuration.size.z * 32)
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x + this.configuration.size.z * 32)
        .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
        .fill({
          texture,
          textureSpace: 'global',
          color: new Color(color).premultiply(this.configuration.shadows?.[CubeFace.LEFT] ?? 0.8).toNumber(),
          matrix: leftMatrix,
        });
    }

    if (this.configuration.size.y > 0 && this.configuration.size.z > 0) {
      const rightMatrix = new Matrix(
        1, -0.5, 0, 1,
        this.configuration.offsets?.[CubeFace.RIGHT]?.x ?? 0,
        this.configuration.offsets?.[CubeFace.RIGHT]?.y ?? 0,
      );
      // Si la texture est inversée par rapport à v7, décommentez :
      // rightMatrix.invert();

      this.faces[CubeFace.RIGHT] = new Graphics()
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
        .fill({
          texture,
          textureSpace: 'global',
          color: new Color(color).premultiply(this.configuration.shadows?.[CubeFace.RIGHT] ?? 0.71).toNumber(),
          matrix: rightMatrix,
        });
    }

    if (this.faces[CubeFace.TOP]) this.addChild(this.faces[CubeFace.TOP]);
    if (this.faces[CubeFace.LEFT]) this.addChild(this.faces[CubeFace.LEFT]);
    if (this.faces[CubeFace.RIGHT]) this.addChild(this.faces[CubeFace.RIGHT]);
  }
}
