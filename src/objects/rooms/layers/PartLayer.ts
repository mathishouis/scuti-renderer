import { RoomLayer } from './RoomLayer';
import { Room } from '../Room';
import { RoomPart } from '../parts/RoomPart';
import { CursorPart } from '../parts/floor/CursorPart';
import { DoorPart } from '../parts/wall/DoorPart';
import { Layer } from '@pixi/layers';
import { TilePart } from '../parts/floor/TilePart';
import { StairPart } from '../parts/floor/StairPart';
import { WallPart } from '../parts/wall/WallPart';
import { LandscapePart } from '../parts/wall/landscapes/LandscapePart';

export class PartLayer extends RoomLayer {
  public cursor: CursorPart | undefined;
  public door: DoorPart | undefined;
  public landscapes: Layer = new Layer();
  public childrens: RoomPart[] = [];

  constructor(public room: Room) {
    super();
  }

  public add(item: RoomPart): void {
    this.childrens.push(item);
  }

  public remove(item: RoomPart): void {
    const index = this.childrens.indexOf(item);
    if (index !== -1) this.childrens.splice(index, 1);
  }

  public clear(type?: (new () => TilePart) | (new () => StairPart) | (new () => WallPart) | (new () => LandscapePart)): void {
    if (!type) {
      this.childrens = [];
      return;
    } else {
      this.childrens = this.childrens.filter((filteredItem: RoomPart): boolean => !(filteredItem instanceof type));
    }
  }
}
