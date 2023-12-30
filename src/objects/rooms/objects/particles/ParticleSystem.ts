import { ParticleEmitter } from './ParticleEmitter';
import { FurnitureVisualization } from '../furnitures/visualizations/FurnitureVisualization';
import { ParticleEmitterData, ParticleSystemData } from './ParticleData';
import { FurnitureAnimatedVisualization } from '../furnitures/visualizations/FurnitureAnimatedVisualization.ts';

interface Configuration {
  visualization: FurnitureVisualization;
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
    particleSystem?.emitters.forEach((emitter: ParticleEmitterData) => {
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
        if (this.visualization instanceof FurnitureAnimatedVisualization) {
          this.visualization.stopAnimation();
        }
        const layer = this.visualization.getLayer(emitter.layerId);
        particleEmitter.position = {
          x: 0,
          y: this.visualization.getLayerYOffset(particleEmitter.layerId, 0),
        };
        if (layer !== undefined) {
          layer.destroy();
        }
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

  public destroy(): void {
    this.emitters.forEach((emitter: ParticleEmitter) => emitter.destroy());
    this.emitters = [];
  }
}
