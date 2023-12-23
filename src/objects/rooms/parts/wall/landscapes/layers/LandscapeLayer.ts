import { Vector2D, Vector3D } from '../../../../../../types/Vector';
import { Container, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart.ts';
import { Cube } from '../../../../geometry/Cube.ts';
import { CubeFace } from '../../../../../../enums/CubeFace.ts';

export abstract class LandscapeLayer {
  public abstract container: Container;
  public abstract part: LandscapePart;
  public abstract align: 'top' | 'bottom' | 'stretch';
  public abstract get size(): Vector3D;
  public abstract get position(): Vector2D;
  public abstract get texture(): Texture;

  public render(): void {
    const cube: Cube = new Cube({
      layer: this.part.room.renderer.layer,
      size: this.size,
      zOrders: {
        [CubeFace.TOP]: -4,
        [CubeFace.LEFT]: -4 - 0.5,
        [CubeFace.RIGHT]: -4 - 0.6,
      },
      texture: this.texture,
      shadows: false,
    });

    const { x, y } = this.position;
    cube.x = x;
    cube.y = y;

    this.part.container.addChild(cube);
  }
}
