import { Particle } from './Particle.ts';
import { RoomObjectVisualization } from '../RoomObjectVisualization.ts';

interface Configuration {
  visualization: RoomObjectVisualization;
  fuseTime: number;
  maxNumParticles: number;
  particlesPerFrame: number;
  burstPulse: number;
  force: number;
  direction: number;
  energy: number;
  shape: string;
  gravity: number;
  airFriction: number;
  lifeTime: number;
  duration: number;
}

export class ParticleEmitter {
  public visualization: RoomObjectVisualization;
  public fuseTime: number;
  public maxNumParticles: number;
  public particlesPerFrame: number;
  public burstPulse: number;
  public force: number;
  public direction: number;
  public energy: number;
  public shape: string;
  public gravity: number;
  public airFriction: number;
  public lifeTime: number;
  public particles: Particle[] = [];
  public currentDuration: number = 0;
  public duration: number;

  constructor({
    visualization,
    fuseTime,
    maxNumParticles,
    particlesPerFrame,
    gravity,
    airFriction,
    energy,
    burstPulse,
    shape,
    force,
    direction,
    lifeTime,
    duration,
  }: Configuration) {
    this.visualization = visualization;
    this.fuseTime = fuseTime;
    this.maxNumParticles = maxNumParticles;
    this.particlesPerFrame = particlesPerFrame;
    this.gravity = gravity;
    this.airFriction = airFriction;
    this.energy = energy;
    this.burstPulse = burstPulse;
    this.shape = shape;
    this.force = force;
    this.direction = direction;
    this.lifeTime = lifeTime;
    this.duration = duration;
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

    if (this.currentDuration <= this.duration) {
      for (let i = 0; i < this.particlesPerFrame / 2; i++) {
        const particle = new Particle({
          visualization: this.visualization,
          position: {
            x: 100,
            y: 100,
          },
          direction: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
          },
          airFriction: this.airFriction,
          force: this.force,
          gravity: this.gravity,
          lifeTime: this.lifeTime,
          energy: this.energy,
          fade: false,
        });
        particle.render();
        this.particles.push(particle);
      }
      this.currentDuration++;
    }
  }
}
