import { RoomFurniture } from './furnitures/RoomFurniture';
import { Container } from 'pixi.js';

export abstract class RoomObjectVisualization {
  public container = new Container();
  public abstract furniture: RoomFurniture;
  public abstract next(): void;
  public abstract update(): void;
  public abstract destroy(): void;
}
