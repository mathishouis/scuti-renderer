import { Particle } from './Particle.ts';
import { RoomObjectVisualization } from '../RoomObjectVisualization.ts';
import { Vector2D } from '../../../../types/Vector.ts';

interface Configuration {
  visualization: RoomObjectVisualization;
  maxNumParticles: number;
  particlesPerFrame: number;
  force: number;
  position: Vector2D;
  direction: Vector2D;
  energy: number;
  shape: string;
  gravity: number;
  airFriction: number;
  lifeTime: number;
  frames: string[];
}

export class ParticleEmitter {
  public visualization: RoomObjectVisualization;
  public maxNumParticles: number;
  public particlesPerFrame: number;
  public force: number;
  public position: Vector2D;
  public direction: Vector2D;
  public energy: number;
  public shape: string;
  public gravity: number;
  public airFriction: number;
  public lifeTime: number;
  public particles: Particle[] = [];
  public age: number = 0;
  public frames: string[];

  constructor({
    visualization,
    maxNumParticles,
    particlesPerFrame,
    gravity,
    airFriction,
    energy,
    shape,
    force,
    position,
    direction,
    lifeTime,
    frames,
  }: Configuration) {
    this.visualization = visualization;
    this.maxNumParticles = maxNumParticles;
    this.particlesPerFrame = particlesPerFrame;
    this.gravity = gravity;
    this.airFriction = airFriction;
    this.energy = energy;
    this.shape = shape;
    this.force = force;
    this.position = position;
    this.direction = direction;
    this.lifeTime = lifeTime;
    this.frames = frames;
  }

  public next(): void {
    if (this.particles.length > 0) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const particle = this.particles[i];
        if (particle.finished) {
          this.particles.splice(i, 1);
        } else {
          particle.next();
        }
      }

      while (this.particles.length > this.maxNumParticles) {
        const particle = this.particles.shift();
        particle?.destroy();
      }
    }

    if (this.age <= this.lifeTime) {
      for (let i = 0; i < this.particlesPerFrame / 2; i++) {
        const particle = new Particle({
          visualization: this.visualization,
          position: this.position,
          direction: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
          },
          airFriction: this.airFriction,
          force: this.force,
          gravity: this.gravity,
          frames: this.frames,
          energy: this.energy,
          fade: false,
        });
        particle.render();
        this.particles.push(particle);
      }
      this.age++;
    }
  }
}
