import { RoomPart } from '../../RoomPart';
import { Room } from '../../../Room';
import { Container } from 'pixi.js';
import { EventManager } from '../../../../events/EventManager';
import { Vector3D } from '../../../../../types/Vector';
import { Direction } from '../../../../../enums/Direction';
import { LandscapeMaterial } from '../../../materials/LandscapeMaterial';

interface Configuration {
  material?: LandscapeMaterial;
  position: Vector3D;
  length: number;
  floorThickness: number;
  height: number;
  direction: Direction;
  door?: number;
}

export class LandscapePart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  constructor(public configuration: Configuration) {
    super();
  }

  public render(): void {
    const material: LandscapeMaterial = this.configuration.material ?? new LandscapeMaterial(101);
    const { direction, length, floorThickness, position, height } = this.configuration;
    const baseX = 32 * position.x - 32 * (direction === Direction.WEST ? position.y + length - 1 : position.y - 1);
    const baseY = 16 * position.x + 16 * (direction === Direction.WEST ? position.y + length - 1 : position.y - 1);
    const size: Vector3D = {
      x: direction === Direction.NORTH ? length : 0,
      y: direction === Direction.WEST ? length : 0,
      z:
        floorThickness / 32 -
        position.z +
        (height === -1 ? this.room.heightMap.maxHeight + 115 / 32 : 115 / 32 + (64 / 32) * height),
    };

    material.layers.forEach((layer: any) => {
      new layer.layer({ ...layer.params, ...{ part: this } }).render();
    });

    this.container.x = baseX;
    this.container.y = baseY - 32 * position.z - size.z * 32 + floorThickness;

    this.room.visualization.container.addChild(this.container);
  }
}
