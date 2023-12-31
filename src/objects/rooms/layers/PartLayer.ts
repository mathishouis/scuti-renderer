import { RoomLayer } from './RoomLayer';
import { Room } from '../Room';
import { RoomPart } from '../parts/RoomPart';
import { CursorPart } from '../parts/floor/CursorPart';
import { DoorPart } from '../parts/wall/DoorPart';
import { Layer } from '@pixi/layers';
import { TilePart } from '../parts/floor/TilePart.ts';
import { StairPart } from '../parts/floor/StairPart.ts';
import { WallPart } from '../parts/wall/WallPart.ts';
import { LandscapePart } from '../parts/wall/landscapes/LandscapePart.ts';

export class PartLayer extends RoomLayer {
  public cursor!: CursorPart;
  public door!: DoorPart;
  public landscapes: Layer = new Layer();
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

  public clear(type?: (new () => TilePart) | (new () => StairPart) | (new () => WallPart) | (new () => LandscapePart)): void {
    if (!type) {
      this.childrens = [];
      return;
    } else {
      this.childrens = this.childrens.filter((filteredItem: RoomPart) => !(filteredItem instanceof type));
    }
  }
}
