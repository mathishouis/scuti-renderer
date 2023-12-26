import { RoomObject } from '../RoomObject';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { Vector3D } from '../../../../types/Vector';
import { Direction } from '../../../../enums/Direction';
import { FurnitureData } from './FurnitureData';

export abstract class RoomFurniture extends RoomObject {
  public abstract id: number;
  public abstract visualization: FurnitureVisualization;
  public abstract position: Vector3D;
  public abstract direction: Direction;
  public abstract state: number;
  public abstract data: FurnitureData;
}
