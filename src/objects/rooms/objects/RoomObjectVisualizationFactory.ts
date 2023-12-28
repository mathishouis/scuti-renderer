import { FurnitureStaticVisualization } from './furnitures/visualizations/FurnitureStaticVisualization';
import { FurnitureGuildCustomizedVisualization } from './furnitures/visualizations/FurnitureGuildCustomizedVisualization';
import { FurnitureAnimatedVisualization } from './furnitures/visualizations/FurnitureAnimatedVisualization';
import { FurnitureBadgeDisplayVisualization } from './furnitures/visualizations/FurnitureBadgeDisplayVisualization';
import { FurnitureBottleVisualization } from './furnitures/visualizations/FurnitureBottleVisualization';
import { FurnitureBrandedImageVisualization } from './furnitures/visualizations/FurnitureBrandedImageVisualization';
import { FurnitureBBVisualization } from './furnitures/visualizations/FurnitureBBVisualization';
import { FurnitureRoomBackgroundVisualization } from './furnitures/visualizations/FurnitureRoomBackgroundVisualization';
import { FurnitureCounterClockVisualization } from './furnitures/visualizations/FurnitureCounterClockVisualization';
import { FurnitureFireworksVisualization } from './furnitures/visualizations/FurnitureFireworksVisualization';
import { RoomObjectVisualization } from './RoomObjectVisualization';
import { FurnitureVoteCounterVisualization } from './furnitures/visualizations/FurnitureVoteCounterVisualization';
import { FurnitureVoteMajorityVisualization } from './furnitures/visualizations/FurnitureVoteMajorityVisualization.ts';

export class RoomObjectVisualizationFactory {
  public static VISUALIZATIONS: Record<string, new (configuration: any) => RoomObjectVisualization> = {
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
    furniture_vote_counter: FurnitureVoteCounterVisualization,
    furniture_vote_majority: FurnitureVoteMajorityVisualization,
  };

  public static get(visualization: string): { new (configuration: any): RoomObjectVisualization } {
    return RoomObjectVisualizationFactory.VISUALIZATIONS[visualization];
  }

  public static create(visualization: string, parameters: any): RoomObjectVisualization {
    return new (this.get(visualization))(parameters);
  }
}
