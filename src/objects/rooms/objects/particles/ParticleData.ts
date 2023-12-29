import { Vector2D } from '../../../../types/Vector';

export interface ParticleData {
  lifeTime: number;
  fade: boolean;
  emitter: boolean;
  frames: string[];
}

export interface ParticleEmitterData {
  id: number;
  layerId: number;
  fuseTime: number;
  maxNumParticles: number;
  particlesPerFrame: number;
  burstPulse: number;
  force: number;
  direction: number;
  energy: number;
  shape: 'sphere' | 'cone' | 'plane';
  gravity: number;
  airFriction: number;
  particles: ParticleData[];
}

export interface ParticleSystemData {
  blend: number;
  offsets: Vector2D;
  emitters: ParticleEmitterData[];
}
