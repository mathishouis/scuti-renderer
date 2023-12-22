import { RoomLayer } from './RoomLayer';
import { Room } from '../Room';
import { RoomPart } from '../parts/RoomPart';
import { CursorPart } from '../parts/floor/CursorPart.ts';

export class PartLayer extends RoomLayer {
  public cursor!: CursorPart;
  public childrens: RoomPart[] = [];

  constructor(public room: Room) {
    super();
  }

  public add(item: RoomPart): void {
    this.childrens.push(item);
  }

  public remove(item: RoomPart): void {
    this.childrens = this.childrens.filter((filteredItem: RoomPart) => filteredItem !== item);
  }
}
