import { asset } from './utils/Assets';
import { FurnitureStaticVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureStaticVisualization';
import { FurnitureGuildCustomizedVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureGuildCustomizedVisualization';
import { FurnitureAnimatedVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureAnimatedVisualization';
import { FurnitureVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureVisualization';
import { FurnitureBadgeDisplayVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureBadgeDisplayVisualization.ts';

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
    furniture_badge_display: FurnitureBadgeDisplayVisualization,
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
