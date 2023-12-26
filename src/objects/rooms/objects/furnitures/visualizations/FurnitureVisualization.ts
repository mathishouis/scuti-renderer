import { RoomObjectVisualization } from '../../RoomObjectVisualization';
import { asset } from '../../../../../utils/Assets.ts';

export class FurnitureVisualization extends RoomObjectVisualization {
  public render(): void {
    const key = `furnitures/${this.furniture.data.name}`;
    const spritesheet = asset(key);

    console.log(spritesheet);
    /*for (let i = 0; i < this.furniture.; i++) {

    }*/
  }
}
