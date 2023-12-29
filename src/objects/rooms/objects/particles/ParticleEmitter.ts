import { Particle } from './Particle';
import { RoomObjectVisualization } from '../RoomObjectVisualization';
import { Vector2D } from '../../../../types/Vector';
import { ParticleData } from './ParticleData';

interface Configuration {
  visualization: RoomObjectVisualization;
  maxNumParticles?: number;
  particlesPerFrame?: number;
  force?: number;
  position?: Vector2D;
  offsets?: Vector2D;
  energy?: number;
  shape?: 'sphere' | 'plane' | 'cone';
  gravity?: number;
  airFriction?: number;
  particles: ParticleData[];
  blend?: number;
  layerId: number;
  fuseTime?: number;
}

export class ParticleEmitter {
  public visualization: RoomObjectVisualization;
  public maxNumParticles: number;
  public particlesPerFrame: number;
  public force: number;
  public position: Vector2D;
  public offsets: Vector2D;
  public energy: number;
  public shape: 'sphere' | 'plane' | 'cone';
  public gravity: number;
  public airFriction: number;
  public generatedParticles: Particle[] = [];
  public age: number = 0;
  public particles: ParticleData[];
  public blend: number;
  public layerId: number;
  public fuseTime: number;

  public running: boolean = false;

  public onStart!: () => void;
  public onEnd!: () => void;

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
    offsets,
    particles,
    blend,
    layerId,
    fuseTime,
  }: Configuration) {
    this.visualization = visualization;
    this.maxNumParticles = maxNumParticles ?? 300;
    this.particlesPerFrame = particlesPerFrame ?? 20;
    this.gravity = gravity ?? 20;
    this.airFriction = airFriction ?? 0.13;
    this.energy = energy ?? 100;
    this.shape = shape ?? 'sphere';
    this.force = force ?? 350;
    this.position = position ?? { x: 0, y: 0 };
    this.offsets = offsets ?? { x: 0, y: 0 };
    this.particles = particles;
    this.blend = blend ?? 1;
    this.layerId = layerId;
    this.fuseTime = fuseTime ?? 20;
  }

  public next(): void {
    if (this.age >= this.fuseTime && !this.running) {
      this.running = true;
      if (this.onStart) this.onStart();
    }
    if (this.generatedParticles.length > 0) {
      for (let i = this.generatedParticles.length - 1; i >= 0; i--) {
        const particle = this.generatedParticles[i];
        if (particle.finished) {
          this.generatedParticles.splice(i, 1);
        } else {
          particle.next();
        }
      }

      while (this.generatedParticles.length > this.maxNumParticles) {
        const particle = this.generatedParticles.shift();
        particle?.destroy();
      }
    }

    const randomParticle = this.particles[Math.floor(Math.random() * this.particles.length)];

    if ((this.age - this.fuseTime <= randomParticle.lifeTime && this.running) || randomParticle.emitter) {
      for (let i = 0; i < this.particlesPerFrame / 3; i++) {
        const particle = new Particle({
          visualization: this.visualization,
          position: {
            x: this.position.x - this.offsets.x,
            y: this.position.y - this.offsets.y,
          },
          direction: this._getDirection(this.shape),
          airFriction: this.airFriction,
          gravity: this.gravity,
          frames: randomParticle.frames,
          energy: this.energy,
          fade: randomParticle.fade,
          alpha: this.blend,
          fadeTime: this.fuseTime,
        });
        particle.render();
        this.generatedParticles.push(particle);
      }
    } else {
      this.running = false;
      if (this.onEnd) this.onEnd();
    }

    this.age++;
  }

  public destroy(): void {
    if (this.running && this.onEnd) this.onEnd();
    this.running = false;
    this.generatedParticles.forEach((particle: Particle) => particle.destroy());
  }

  private _getDirection(shape: 'sphere' | 'cone' | 'plane'): Vector2D {
    switch (shape) {
      case 'sphere':
        return this._getRandomSphereDirection();
      case 'cone':
        return this._getRandomConeDirection();
      default:
        return this._getRandomPlaneDirection();
    }
  }

  private _getRandomSphereDirection(): Vector2D {
    const theta = Math.random() * 2 * Math.PI;
    return {
      x: Math.sqrt(Math.random()) * Math.cos(theta),
      y: Math.sqrt(Math.random()) * Math.sin(theta),
    };
  }

  private _getRandomConeDirection(): Vector2D {
    const angle = ((-160 + Math.random() * 140) / 180) * Math.PI;
    const distance = Math.random();
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  }

  private _getRandomPlaneDirection(): Vector2D {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle) * 0.5,
    };
  }
}
