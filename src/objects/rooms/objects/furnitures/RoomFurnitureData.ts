import { RoomFurniture } from './RoomFurniture';
import { error } from '../../../../utils/Logger';

interface Configuration {
  furniture: RoomFurniture;
}

export class RoomFurnitureData {
  public furniture: RoomFurniture;
  public name!: string;
  public offerId?: number;
  public colorId?: number;
  public direction?: number;
  public colors?: string[];

  constructor({ furniture }: Configuration) {
    this.furniture = furniture;

    this._initialize();
  }

  private _initialize(): void {
    const data = this.furniture.room.renderer.data.furnitures.get(this.furniture.id);

    if (!data) return error('RoomFurnitureData', `Canno't find the furniture (id:${this.furniture.id}) in furnitures.data`);

    this.name = data.name;
    this.offerId = data.offer_id;
    this.colorId = data.color_id;
    this.direction = data.direction;
    this.colors = data.colors;
  }
}
