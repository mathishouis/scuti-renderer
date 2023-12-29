import { Vector2D } from '../../../../types/Vector.ts';
import { Graphics, Sprite } from 'pixi.js';
import { RoomObjectVisualization } from '../RoomObjectVisualization.ts';
import { asset } from '../../../../utils/Assets.ts';

interface Configuration {
  visualization: RoomObjectVisualization;
  position: Vector2D;
  direction: Vector2D;
  frames: string[];
  gravity?: number;
  airFriction?: number;
  force?: number;
  age?: number;
  fade?: boolean;
  fadeTime?: number;
  alpha?: number;
  energy?: number;
}

export class Particle {
  public visualization: RoomObjectVisualization;
  public position: Vector2D;
  public direction: Vector2D;
  public gravity: number;
  public airFriction: number;
  public force: number;
  public age: number;
  public fade: boolean;
  public fadeTime: number;
  public energy: number;
  public sprite!: Sprite;
  public alpha: number;
  public finished: boolean = false;
  public frames: string[]; /* = [
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_1',
    'fireworks_04_c_0_2',
    'fireworks_04_c_0_3',
    'fireworks_04_c_0_4',
    'fireworks_04_c_0_5',
    'fireworks_04_c_0_6',
    'fireworks_04_c_0_7',
  ];*/

  constructor({
    visualization,
    position,
    direction,
    gravity,
    airFriction,
    force,
    age,
    fade,
    fadeTime,
    alpha,
    energy,
    frames,
  }: Configuration) {
    this.visualization = visualization;
    this.position = position;
    this.direction = direction;
    this.gravity = gravity ?? 0.95;
    this.airFriction = airFriction ?? 0.95;
    this.force = force ?? 10;
    this.age = age ?? 0;
    this.fade = fade ?? true;
    this.fadeTime = fadeTime ?? 50;
    this.energy = energy ?? 100;
    this.alpha = alpha ?? 1;
    this.frames = frames ?? [];
  }

  public render(): void {
    this.sprite = new Sprite(asset('furnitures/fireworks_04').textures[this.frames[0]]);
    this.sprite.alpha = 1;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.visualization.container.addChild(this.sprite);
  }

  public destroy(): void {
    this.finished = true;
    this.sprite.destroy();
    this.sprite = undefined as any;
  }

  public next(): void {
    if (this.sprite) {
      if (this.age === this.frames.length || this.sprite.alpha <= 0) {
        this.destroy();
        return;
      }

      this.sprite.texture = asset('furnitures/fireworks_04').textures[this.frames[this.age]];

      if (this.fade && this.age > this.frames.length - this.fadeTime) {
        this.alpha -= 0.05;
        this.sprite.alpha = this.alpha;
      }

      this.sprite.x += (this.direction.x * this.force) / 20;
      this.sprite.y += (this.direction.y * this.force) / 20 + this.gravity / 4;
      this.force *= 1 - this.airFriction;
      this.age++;
    }
  }
}
