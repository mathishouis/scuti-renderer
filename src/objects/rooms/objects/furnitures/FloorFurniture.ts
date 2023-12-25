import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { Direction } from '../../../../enums/Direction';
import { RoomFurnitureData } from './RoomFurnitureData';
import { Room } from '../../Room';

interface Configuration {
  id: number;
  position: Vector3D;
  direction: Direction;
  state: number;
}

export class FloorFurniture extends RoomFurniture {
  public id: number;
  public room!: Room;
  public visualization!: FurnitureVisualization;
  public position: Vector3D;
  public direction: Direction;
  public state: number;
  public data!: RoomFurnitureData;

  constructor({ id, position, direction, state }: Configuration) {
    super();

    this.id = id;
    this.position = position;
    this.direction = direction;
    this.state = state;
  }

  public render(): void {
    this.data = new RoomFurnitureData({ furniture: this });
  }
}
