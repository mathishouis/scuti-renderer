import { RoomFurniture } from './furnitures/RoomFurniture';
import { Container, Texture } from 'pixi.js';

export abstract class RoomObjectVisualization {
  public container = new Container();
  public abstract furniture: RoomFurniture;
  public abstract render(): void;
  public abstract next(): void;
  public abstract update(): void;
  public abstract destroy(): void;
  public abstract reset(): void;
  public abstract getLayerColor(id: number): number;
  public abstract getLayerTag(id: number): string;
  public abstract getLayerFrame(id: number): number;
  public abstract getLayerName(id: number): string;
  public abstract getAssetName(): string;
  public abstract getLayerTexture(id: number): Texture;
}
