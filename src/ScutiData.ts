import { asset } from './utils/Assets';
import { FurnitureStaticVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureStaticVisualization';
import { FurnitureGuildCustomizedVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureGuildCustomizedVisualization';
import { FurnitureAnimatedVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureAnimatedVisualization';
import { FurnitureVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureVisualization';
import { FurnitureBadgeDisplayVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureBadgeDisplayVisualization';
import { FurnitureBottleVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureBottleVisualization';
import { FurnitureBrandedImageVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureBrandedImageVisualization';
import { FurnitureBBVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureBBVisualization';
import { FurnitureRoomBackgroundVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureRoomBackgroundVisualization';
import { FurnitureCounterClockVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureCounterClockVisualization';
import { FurnitureFireworksVisualization } from './objects/rooms/objects/furnitures/visualizations/FurnitureFireworksVisualization';

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
    furniture_bottle: FurnitureBottleVisualization,
    furniture_branded_image: FurnitureBrandedImageVisualization,
    furniture_bb: FurnitureBBVisualization,
    furniture_bg: FurnitureRoomBackgroundVisualization,
    furniture_counter_clock: FurnitureCounterClockVisualization,
    furniture_fireworks: FurnitureFireworksVisualization,
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
