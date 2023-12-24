import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';
import { Container } from 'pixi.js';
import { Cube } from '../../geometry/Cube';
import { EventManager } from '../../../events/EventManager';
import { Vector3D } from '../../../../types/Vector';
import { CubeFace } from '../../../../enums/CubeFace';
import { WallMaterial } from '../../materials/WallMaterial';
import { Direction } from '../../../../enums/Direction';
import { DoorMaskFilter } from '../../../filters/DoorMaskFilter';

interface Configuration {
  material?: WallMaterial;
  position: Vector3D;
  length: number;
  thickness: number;
  floorThickness: number;
  height: number;
  direction: Direction;
  corner: boolean;
}

export class WallPart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  constructor(public configuration: Configuration) {
    super();
  }

  public render(): void {
    const zOrder: number = (this.configuration.position.z - 1) * 4;
    const material: WallMaterial = this.configuration.material ?? new WallMaterial(101);
    const size: Vector3D = {
      x: 0,
      y: 0,
      z: this.configuration.floorThickness / 32 - this.configuration.position.z,
    };

    if (this.configuration.height !== -1) {
      size.z += 115 / 32 + (64 / 32) * this.configuration.height;
    } else {
      size.z += this.room.heightMap.maxHeight + 115 / 32;
    }

    if (this.configuration.direction === Direction.WEST) {
      size.x = this.configuration.thickness / 32;
      size.y = this.configuration.length + (this.configuration.corner ? this.configuration.thickness / 32 : 0);
    } else if (this.configuration.direction === Direction.NORTH) {
      size.x = this.configuration.length;
      size.y = this.configuration.thickness / 32;
    }

    const cube: Cube = new Cube({
      layer: this.room.renderer.layer,
      zOrders: {
        [CubeFace.TOP]: zOrder,
        [CubeFace.LEFT]: zOrder - 0.5,
        [CubeFace.RIGHT]: zOrder - 0.6,
      },
      texture: material.texture,
      color: material.color,
      size: size,
    });
    this.container.addChild(cube);

    if (this.room.visualization.layers.parts.door) {
      const filter: DoorMaskFilter = new DoorMaskFilter(this.room.visualization.layers.parts.door.sprite);
      cube.faces[CubeFace.RIGHT].filters = [filter];
    }

    if (this.configuration.direction === Direction.WEST) {
      this.container.x =
        32 * this.configuration.position.x -
        32 * (this.configuration.position.y + this.configuration.length - 1) -
        this.configuration.thickness;
      this.container.y =
        16 * this.configuration.position.x +
        16 * (this.configuration.position.y + this.configuration.length - 1) -
        32 * this.configuration.position.z -
        this.configuration.thickness / 2 -
        size.z * 32 +
        this.configuration.floorThickness;
    } else if (this.configuration.direction === Direction.NORTH) {
      this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y - 1);
      this.container.y =
        16 * this.configuration.position.x +
        16 * (this.configuration.position.y - 1) -
        32 * this.configuration.position.z -
        size.z * 32 +
        this.configuration.floorThickness;
    }

    this.room.visualization.container.addChild(this.container);
  }
}
