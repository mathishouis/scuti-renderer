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
