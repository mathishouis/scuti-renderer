import { RoomObjectVisualization } from '../../RoomObjectVisualization';
import { asset } from '../../../../../utils/Assets';
import { FurnitureLayer } from '../FurnitureLayer';
import { BLEND_MODES } from '@pixi/constants';
import { RoomFurniture } from '../RoomFurniture';

export class FurnitureVisualization extends RoomObjectVisualization {
  public furniture!: RoomFurniture;
  public layers: Map<number, FurnitureLayer> = new Map();
  public frames: Map<number, number> = new Map();

  public render(): void {
    const key = `furnitures/${this.furniture.data.name}`;
    const spritesheet = asset(key);
    const { frames, properties } = spritesheet.data;
    const { directions, layers, animations } = properties;

    for (let i = 0; i < layers.length; i++) {
      const layerLetter = String.fromCharCode(97 + Number(i));
      const name = `${this.furniture.data.name}_${layerLetter}_${this.furniture.direction}_${this.furniture.state}`;
      const flipped = frames[name] ? frames[name].flipped ?? false : false;
      const animation = animations.find((animation: any) => animation.state === this.furniture.state);
      if (animation) {
        const animationLayer = animation.layers.find((layer: any) => layer.id === i);
        if (animationLayer && animationLayer.frames) this.frames.set(i, animationLayer.frames[0]);
      }
      const layer = layers.find((layer: any) => layer.id === i);
      const z = layer.z ?? 0;
      const blend = layer.ink ? BLEND_MODES[layer.ink] : undefined;
      const interactive = layer.interactive ?? true;
      const alpha = layer.alpha / 255 ?? 0;
      const tag = layer.tag;

      if (!directions.includes(this.furniture.direction)) this.furniture.direction = this.furniture.data.direction ?? directions[0];

      const furnitureLayer = new FurnitureLayer({
        furniture: this.furniture,
        id: i,
        frame: this.frames.get(i) ?? 0,
        alpha: alpha,
        tint: 0xffffff,
        z: z,
        blend: blend as any,
        flip: flipped,
        interactive: interactive,
        tag: tag,
      });
      furnitureLayer.render();

      this.layers.set(i, furnitureLayer);
    }
  }

  public next(): void {}
  public update(): void {}
  public destroy(): void {}
}
