import { Vector2D, Vector3D } from '../../../../../../types/Vector';
import { Container, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';
import { Cube } from '../../../../geometry/Cube';
import { CubeFace } from '../../../../../../enums/CubeFace';
import { Direction } from '../../../../../../enums/Direction';
import { DoorMaskFilter } from '../../../../../filters/DoorMaskFilter';

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
      z: height === -1 ? room.parsedHeightMap.maxHeight + 115 / 32 : 115 / 32 + (64 / 32) * height,
    };
  }

  public get position(): Vector2D {
    return {
      x: 0,
      y: 0,
    };
  }

  public get door(): boolean {
    const { room, configuration } = this.part;

    return (
      (room.parsedHeightMap.door &&
        room.visualization.layers.parts.door &&
        configuration.position.x - 1 === room.parsedHeightMap.door.x &&
        configuration.position.y <= room.parsedHeightMap.door.y &&
        room.parsedHeightMap.door.y <= configuration.position.y + configuration.length - 1 &&
        configuration.direction === Direction.WEST) ??
      false
    );
  }

  public render(): void {
    const { visualization, renderer } = this.part.room;
    const { door } = visualization.layers.parts;
    const cube: Cube = new Cube({
      layer: this.part.container.parentLayer,
      size: this.size,
      zOrders: {
        [CubeFace.TOP]: -3,
        [CubeFace.LEFT]: -3 - 0.5,
        [CubeFace.RIGHT]: -3 - 0.6,
      },
      shadows: {
        [CubeFace.TOP]: 1,
        [CubeFace.LEFT]: 1,
        [CubeFace.RIGHT]: 0.8,
      },
      color: this.color,
      texture: this.texture,
    });

    if (this.door) {
      const filter: DoorMaskFilter = new DoorMaskFilter(door.sprite);
      cube.faces[CubeFace.RIGHT].filters = [filter];
      cube.faces[CubeFace.RIGHT].filterArea = door.sprite.filterArea;
    }

    const { x, y } = this.position;
    cube.x = x;
    cube.y = y;

    this.part.container.addChild(cube);
  }
}
