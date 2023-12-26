import { RoomObjectVisualization } from '../../RoomObjectVisualization';
import { asset } from '../../../../../utils/Assets.ts';
import { FurnitureLayer } from '../FurnitureLayer.ts';
import { BLEND_MODES } from '@pixi/constants';
import { RoomFurniture } from '../RoomFurniture.ts';

export class FurnitureVisualization extends RoomObjectVisualization {
  public furniture!: RoomFurniture;
  public layers: Map<number, FurnitureLayer> = new Map();

  public render(): void {
    const key = `furnitures/${this.furniture.data.name}`;
    const spritesheet = asset(key);

    for (let i = 0; i < spritesheet.data.properties.layers.length; i++) {
      if (!spritesheet.data.properties.directions.includes(this.furniture.direction))
        this.furniture.direction = this.furniture.data.direction ?? spritesheet.data.properties.directions[0];

      const layer = new FurnitureLayer({
        furniture: this.furniture,
        id: i,
        alpha: 0,
        tint: 0xffffff,
        z: 1,
        blend: BLEND_MODES.NONE,
        flip: false,
        interactive: false,
        tag: 'tag',
      });
      layer.render();

      this.layers.set(i, layer);
    }
  }

  public next(): void {}
  public update(): void {}
  public destroy(): void {}
}
