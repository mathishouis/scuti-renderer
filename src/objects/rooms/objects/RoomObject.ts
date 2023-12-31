import { RoomObjectVisualization } from './RoomObjectVisualization';
import { Room } from '../Room';

export abstract class RoomObject {
  public abstract room: Room;
  public abstract visualization: RoomObjectVisualization;
  public abstract render(): void;
  public abstract update(): void;
  public abstract destroy(): void;
}
