import { Texture } from 'pixi.js';

export abstract class RoomMaterial {
  public abstract color: number;
  public abstract texture: Texture;

  public abstract render(): void;
}
