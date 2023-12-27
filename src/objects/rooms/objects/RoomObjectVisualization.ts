import { RoomFurniture } from './furnitures/RoomFurniture';
import { Container, Texture } from 'pixi.js';

export abstract class RoomObjectVisualization {
  public container = new Container();
  public abstract furniture: RoomFurniture;
  protected abstract render(): void;
  protected abstract next(): void;
  protected abstract update(): void;
  protected abstract destroy(): void;
  protected abstract reset(): void;
  protected abstract getLayerColor(id: number): number;
  protected abstract getLayerTag(id: number): string;
  protected abstract getLayerFrame(id: number): number;
  protected abstract getLayerName(id: number): string;
  protected abstract getAssetName(): string;
  protected abstract getLayerTexture(id: number): Texture;
}
