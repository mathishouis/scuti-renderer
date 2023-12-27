import { asset } from './utils/Assets';
import { FurnitureStaticVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureStaticVisualization.ts';
import { FurnitureGuildCustomizedVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureGuildCustomizedVisualization.ts';
import { FurnitureAnimatedVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureAnimatedVisualization.ts';
import { FurnitureVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureVisualization.ts';

interface FurnitureData {
  id: number;
  name: string;
  direction?: number;
  offer_id?: number;
  color_id?: number;
  colors?: string[];
}

export class ScutiData {
  public static VISUALIZATIONS: Record<string, new (configuration: any) => FurnitureVisualization> = {
    furniture_static: FurnitureStaticVisualization,
    furniture_guild_customized: FurnitureGuildCustomizedVisualization,
    furniture_animated: FurnitureAnimatedVisualization,
  };
  public furnitures: Map<number, FurnitureData> = new Map();

  constructor() {
    this._prepare();
  }

  private _prepare(): void {
    asset('data/furnitures').floors.forEach((furniture: FurnitureData) => {
      this.furnitures.set(furniture.id, furniture);
    });
    asset('data/furnitures').walls.forEach((furniture: FurnitureData) => {
      this.furnitures.set(furniture.id, furniture);
    });
  }
}
