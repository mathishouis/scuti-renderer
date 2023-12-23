import { Vector2D, Vector3D } from '../../../../../../types/Vector';
import { Container, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';
import { Cube } from '../../../../geometry/Cube';
import { CubeFace } from '../../../../../../enums/CubeFace';
import { Direction } from '../../../../../../enums/Direction';

export abstract class LandscapeLayer {
  public container: Container = new Container();
  public abstract part: LandscapePart;
  public abstract color: number;
  public abstract get texture(): Texture;

  public get size(): Vector3D {
    const { configuration, room } = this.part;
    const { direction, length, height } = configuration;

    return {
      x: direction === Direction.NORTH ? length : 0,
      y: direction === Direction.WEST ? length : 0,
      z: height === -1 ? room.heightMap.maxHeight + 115 / 32 : 115 / 32 + (64 / 32) * height,
    };
  }

  public get position(): Vector2D {
    return {
      x: 0,
      y: 0,
    };
  }

  public render(): void {
    const cube: Cube = new Cube({
      layer: this.part.room.renderer.layer,
      size: this.size,
      zOrders: {
        [CubeFace.TOP]: -4,
        [CubeFace.LEFT]: -4 - 0.5,
        [CubeFace.RIGHT]: -4 - 0.6,
      },
      color: this.color,
      texture: this.texture,
      shadows: false,
    });

    const { x, y } = this.position;
    cube.x = x;
    cube.y = y;

    this.part.container.addChild(cube);
  }
}