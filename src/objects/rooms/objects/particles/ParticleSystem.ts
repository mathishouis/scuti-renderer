import { ParticleEmitter } from './ParticleEmitter.ts';
import { FurnitureVisualization } from '../furnitures/visualizations/FurnitureVisualization.ts';
import { Vector2D } from '../../../../types/Vector.ts';

interface Configuration {
  visualization: FurnitureVisualization;
}

interface ParticleData {
  lifeTime: number;
  fade: boolean;
  emitter: boolean;
  frames: string[];
}

interface EmitterData {
  id: number;
  layerId: number;
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
  particles: ParticleData[];
}

interface ParticleSystemData {
  blend: number;
  offsets: Vector2D;
  emitters: EmitterData[];
}

export class ParticleSystem {
  public visualization: FurnitureVisualization;
  public emitters: ParticleEmitter[] = [];

  constructor({ visualization }: Configuration) {
    this.visualization = visualization;

    this._initialize();
  }

  private _initialize(): void {
    const visualizationData = this.visualization.data;

    if (visualizationData) {
      const { particles } = (visualizationData.spritesheet.data as any).properties;
      particles.forEach((particleSystem: ParticleSystemData) => this._particleSystem(particleSystem));
    }
  }

  private _particleSystem(particleSystem: ParticleSystemData): void {
    particleSystem?.emitters.forEach((emitter: EmitterData) => {
      const particleEmitter = new ParticleEmitter({
        visualization: this.visualization,
        maxNumParticles: emitter.maxNumParticles,
        particlesPerFrame: emitter.particlesPerFrame,
        force: emitter.force,
        offsets: {
          x: particleSystem.offsets.x,
          y: particleSystem.offsets.y,
        },
        position: {
          x: 0,
          y: this.visualization.getLayerYOffset(emitter.id, 0),
        },
        energy: emitter.energy,
        shape: emitter.shape,
        gravity: emitter.gravity,
        airFriction: emitter.airFriction,
        particles: emitter.particles,
        blend: particleSystem.blend,
        layerId: emitter.layerId,
      });
      particleEmitter.onStart = () => {
        particleEmitter.position = {
          x: 0,
          y: this.visualization.getLayerYOffset(particleEmitter.layerId, 0),
        };
        this.visualization.setState(0);
      };
      this.emitters.push(particleEmitter);
    });
  }

  public getLayerEmitter(id: number): ParticleEmitter | undefined {
    return this.emitters.find(emitter => emitter.layerId === id);
  }

  public next(): void {
    this.emitters.forEach((emitter: ParticleEmitter) => emitter.next());
  }
}
