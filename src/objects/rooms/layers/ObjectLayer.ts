import { RoomLayer } from './RoomLayer';
import { Room } from '../Room';
import { RoomObject } from '../objects/RoomObject';

export class ObjectLayer extends RoomLayer {
  public childrens: RoomObject[] = [];

  constructor(public room: Room) {
    super();
  }

  public add(item: RoomObject): void {
    this.childrens.push(item);
  }

  public remove(item: RoomObject): void {
    this.childrens = this.childrens.filter((filteredItem: RoomObject) => filteredItem !== item);
  }
}
