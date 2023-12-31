import { Room } from '../Room';

export abstract class RoomLayer {
  public abstract room: Room;
  public abstract childrens: any[];
  public abstract add(item: any): void;
  public abstract remove(item: any): void;
}
