import { RoomObjectVisualization } from '../../RoomObjectVisualization';
import { asset } from '../../../../../utils/Assets';
import { FurnitureLayer } from '../FurnitureLayer';
import { BLEND_MODES } from '@pixi/constants';
import { RoomFurniture } from '../RoomFurniture';
import { Texture } from 'pixi.js';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';
import { LandscapeWindowMask } from '../../../parts/wall/landscapes/layers/items/LandscapeWindowMask';
import { WallFurniture } from '../WallFurniture';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureVisualization extends RoomObjectVisualization {
  public furniture: RoomFurniture;
  public layers: Map<number, FurnitureLayer> = new Map();
  public masks: Map<string, LandscapeWindowMask> = new Map();
  public data!: FurnitureVisualizationData;

  constructor({ furniture }: Configuration) {
    super();

    this.furniture = furniture;
  }

  public render(): void {
    this.data = new FurnitureVisualizationData({ visualization: this });

    this.renderMasks();

    if (!this.data.directions.includes(this.furniture.direction)) {
      this.furniture.rotate({ direction: this.furniture.data.direction ?? this.data.directions[0] ?? 0, update: false });
      return;
    }

    for (let i = 0; i < this.data.layers.size; i++) this.layer(i);
  }

  public renderMasks(): void {
    if (this.furniture instanceof WallFurniture && this.data.masks) {
      this.data.masks.forEach(mask => {
        const storedMask = this.masks.get(mask.id);

        if (storedMask) {
          this.furniture.room.visualization.layers.masks.remove(storedMask);
          storedMask.destroy();
        }

        const windowMask = new LandscapeWindowMask({
          furniture: this.furniture as WallFurniture,
        });
        windowMask.render();

        this.masks.set(mask.id, windowMask);
        this.furniture.room.visualization.layers.masks.add(windowMask);
      });
    }
  }

  public layer(id: number): void {
    const layerConfiguration = {
      furniture: this.furniture,
      id: id,
      frame: this.getLayerFrame(id),
      alpha: this.getLayerAlpha(id),
      tint: this.getLayerColor(id),
      offsets: {
        x: this.getLayerXOffset(id, this.furniture.direction),
        y: this.getLayerYOffset(id, this.furniture.direction),
        z: this.getLayerZOffset(id, this.furniture.direction),
      },
      blend: this.getLayerBlend(id) as any,
      flip: this.getLayerFlipped(id),
      interactive: this.getLayerInteractive(id),
      tag: this.getLayerTag(id),
    };

    if (this.layers.get(id)) {
      this.layers.get(id)!.update(layerConfiguration);
    } else {
      const furnitureLayer = new FurnitureLayer(layerConfiguration);

      furnitureLayer.render();
      this.layers.set(id, furnitureLayer);
    }
  }

  public next(): void {
    for (let i = 0; i < this.data.layers.size; i++) {
      const layer = this.data.layers.get(i);

      if (layer) {
        if (layer.loopCount !== 0) {
          if (layer.currentLoopCount >= layer.loopCount && this.getLastFramePlayed(i)) {
            continue;
          } else {
            layer.currentLoopCount += 1;
          }
        }

        if (layer.currentFrameRepeat >= layer.frameRepeat) {
          layer.currentFrameRepeat = 0;
        } else {
          layer.currentFrameRepeat += 1;
          continue;
        }

        if (layer.frames.length > 1) {
          if (layer.frames.length - 1 > layer.frameIndex && !layer.needUpdate) {
            layer.frameIndex += 1;
          } else {
            layer.frameIndex = 0;
          }

          layer.needUpdate = true;
        }

        if (layer.needUpdate) {
          layer.needUpdate = false;
          this.layers.get(i)?.destroy();
          this.layer(i);
        }
      }
    }

    this.updateState();
  }
  public update(): void {
    this.data.reset();
    this.render();
  }
  public destroy(): void {
    this.layers.forEach((layer: FurnitureLayer) => layer.destroy());
    this.layers = new Map();
    this.data.reset();
  }

  public reset(): void {
    this.update();
  }

  public getLayerColor(id: number): number {
    const layer = this.data.layers.get(id);
    return layer ? layer.color : 0xffffff;
  }

  public getLayerTag(id: number): string {
    const layer = this.data.layers.get(id);
    return layer ? layer.tag : '';
  }

  public getLayerFrame(id: number): number {
    const layer = this.data.layers.get(id);
    if (layer && layer.frames.length) return layer.frames[layer.frameIndex];

    return 0;
  }

  public getLayerName(id: number): string {
    const layerLetter = this.data.layerCount === id ? 'sd' : String.fromCharCode(97 + id);
    return `${this.furniture.data.name}_${layerLetter}_${this.furniture.direction}_${this.getLayerFrame(id)}`;
  }

  public getLayerTexture(id: number): Texture {
    const spritesheet = asset(this.getAssetName());
    return spritesheet.textures[this.getLayerName(id)];
  }

  public getAssetName(): string {
    return `furnitures/${this.furniture.data.name}`;
  }

  public setState(id: number): void {
    if (this.furniture.state !== id) this.furniture.state = id;
    if (this.data) this.data.setState(id);
  }

  public updateState(): number {
    return 0;
  }

  public getLayerXOffset(id: number, direction: number): number {
    const layer = this.data.layers.get(id);
    return layer ? layer.offsets.x : 0;
  }

  public getLayerYOffset(id: number, direction: number): number {
    const layer = this.data.layers.get(id);
    return layer ? layer.offsets.y : 0;
  }

  public getLayerZOffset(id: number, direction: number): number {
    const layer = this.data.layers.get(id);
    return layer ? layer.offsets.z : 0;
  }

  public getLayerAlpha(id: number): number {
    const layer = this.data.layers.get(id);
    return layer ? layer.alpha : 1;
  }

  public getLayerInteractive(id: number): boolean {
    const layer = this.data.layers.get(id);
    return layer ? layer.interactive : false;
  }

  public getLayerBlend(id: number): BLEND_MODES | undefined {
    const layer = this.data.layers.get(id);
    return layer ? layer.blend : undefined;
  }

  public getLayerFlipped(id: number): boolean {
    const layer = this.data.layers.get(id);
    return layer ? layer.flipped : false;
  }

  public getLayer(id: number): FurnitureLayer | undefined {
    return this.layers.get(id);
  }

  public getLastFramePlayed(id: number): boolean {
    const layer = this.data.layers.get(id);

    if (layer) return layer.frameIndex === layer.frames.length - 1;

    return false;
  }
}
