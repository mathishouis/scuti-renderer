import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture.ts';
import { Particle } from '../../particles/Particle.ts';
import { ParticleEmitter } from '../../particles/ParticleEmitter.ts';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureFireworksVisualization extends FurnitureAnimatedVisualization {
  public emitter: ParticleEmitter;
  constructor({ furniture }: Configuration) {
    super({ furniture });

    const amount = 100;

    this.emitter = new ParticleEmitter({
      visualization: this,
      fuseTime: 15,
      maxNumParticles: 300,
      particlesPerFrame: 20,
      burstPulse: 4,
      force: 370,
      direction: -1,
      energy: 120,
      shape: 'sphere',
      gravity: 20,
      airFriction: 0.13,
      lifeTime: 20,
      duration: 3 * 24,
    });
  }

  public render() {
    super.render();

    //this.particles.forEach((particle: Particle) => particle.render());
  }

  public next() {
    super.next();

    //this.particles.forEach((particle: Particle) => particle.next());

    this.emitter.next();
  }
}
