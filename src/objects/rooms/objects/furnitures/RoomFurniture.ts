import { RoomObject } from '../RoomObject';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { OffsetVector2D, Vector3D } from '../../../../types/Vector';
import { Direction } from '../../../../enums/Direction';
import { FurnitureData } from './FurnitureData';

export abstract class RoomFurniture extends RoomObject {
  public abstract id: number;
  public abstract visualization: FurnitureVisualization;
  public abstract data: FurnitureData;
  public abstract get position(): Vector3D | OffsetVector2D;
  public abstract set position(position: Vector3D | OffsetVector2D);
  public abstract get direction(): Direction;
  public abstract set direction(direction: Direction);
  public abstract get state(): number;
  public abstract set state(state: number);
  public abstract rotate(configuration: { direction: Direction; duration?: number; update?: boolean }): void;
  public abstract move(configuration: { position: Vector3D | OffsetVector2D; duration?: number }): void;
}
