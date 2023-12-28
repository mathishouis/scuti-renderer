import { asset } from './utils/Assets';

interface FurnitureData {
  id: number;
  name: string;
  direction?: number;
  offer_id?: number;
  color_id?: number;
  colors?: string[];
}

export class ScutiData {
  public furnitures: {
    floors: Map<number, FurnitureData>;
    walls: Map<number, FurnitureData>;
  } = {
    floors: new Map(),
    walls: new Map(),
  };

  constructor() {
    this._prepare();
  }

  private _prepare(): void {
    asset('data/furnitures').floors.forEach((furniture: FurnitureData) => {
      this.furnitures.floors.set(furniture.id, furniture);
    });
    asset('data/furnitures').walls.forEach((furniture: FurnitureData) => {
      this.furnitures.walls.set(furniture.id, furniture);
    });
  }
}
