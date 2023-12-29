import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture.ts';
import { ParticleEmitter } from '../../particles/ParticleEmitter.ts';
import { Vector2D } from '../../../../../types/Vector.ts';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureFireworksVisualization extends FurnitureAnimatedVisualization {
  private static BURST_STATE: number = 2;

  private _emitter!: ParticleEmitter;
  private _running: boolean = false;
  private _y: number = 0;
  private _burstPulse: number = 4;
  private _fuseTime: number = 15 * this._burstPulse;
  private _airFriction: number = 0.13;
  private _offsetY: number = 70;

  constructor({ furniture }: Configuration) {
    super({ furniture });
  }

  public render() {
    super.render();

    //this.particles.forEach((particle: Particle) => particle.render());
  }

  public next() {
    super.next();

    if (this.furniture.state === FurnitureFireworksVisualization.BURST_STATE) {
      if (!this._running && this._y < this._fuseTime) {
        this._running = true;
      } else if (this._y >= this._fuseTime) {
        this.showParticles({
          x: 0,
          y: this.getLayerYOffset(2, 0) - this._offsetY,
        });
        this._running = false;
        //console.log(this.getLayer(2)?.sprite.y);
        this.setState(0);
      } else if (this._running) {
        this._y++;
      }
    }

    if (this._emitter) this._emitter.next();
  }

  public getLayerYOffset(id: number, direction: number): number {
    if (this.furniture.state === FurnitureFireworksVisualization.BURST_STATE && this._running) {
      return super.getLayerYOffset(id, direction) - this._y * this._burstPulse * (1 - this._airFriction);
    }
    return super.getLayerYOffset(id, direction);
  }

  public showParticles(position: Vector2D): void {
    this._emitter = new ParticleEmitter({
      visualization: this,
      maxNumParticles: 300,
      particlesPerFrame: 20,
      force: 370,
      position: position,
      direction: {
        x: 0,
        y: 0,
      },
      energy: 120,
      shape: 'sphere',
      gravity: 20,
      airFriction: 0.13,
      lifeTime: 20,
      frames: [
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
      ],
    });
  }
}
