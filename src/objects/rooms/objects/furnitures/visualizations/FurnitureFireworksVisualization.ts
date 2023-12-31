import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture';
import { ParticleSystem } from '../../particles/ParticleSystem';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureFireworksVisualization extends FurnitureAnimatedVisualization {
  protected _burstState: number = 2;

  private _particleSystem!: ParticleSystem;
  private _layerData: Map<number, { running: boolean; y: number; speed: number }> = new Map();

  constructor({ furniture }: Configuration) {
    super({ furniture });
  }

  public render() {
    if (this._particleSystem) this._particleSystem.destroy();
    this._layerData = new Map();
    if (this.furniture.state === this._burstState) {
      this._particleSystem = new ParticleSystem({ visualization: this });
    }

    super.render();
  }

  public destroy() {
    if (this._particleSystem) this._particleSystem.destroy();
    super.destroy();
  }

  public reset() {
    super.reset();

    if (this._particleSystem) this._particleSystem.destroy();

    if (this.furniture.state === this._burstState) {
      this._particleSystem = new ParticleSystem({ visualization: this });
    }
    this._layerData = new Map<number, { running: boolean; y: number; speed: number }>();
  }

  public next() {
    super.next();

    if (this._particleSystem) {
      if (this.furniture.state === this._burstState) {
        for (let i = 0; i < this.furniture.visualization.data.layerCount; i++) {
          const emitter = this._particleSystem.getLayerEmitter(i);
          if (emitter) {
            if (this._layerData.get(i) === undefined) {
              this._layerData.set(i, {
                running: false,
                y: 0,
                speed: 1,
              });
            }
            const layerData = this._layerData.get(i);

            if (layerData) {
              if (!layerData.running && layerData.y < emitter.fuseTime) {
                layerData.running = true;
              } else if (layerData.running) {
                layerData.speed *= 1 - emitter.airFriction;
                layerData.y += layerData.speed;
              }
            }
          }
        }
      }

      this._particleSystem.next();
    }
  }

  public getLayerYOffset(id: number, direction: number): number {
    const layerData = this._layerData.get(id);

    if (this._particleSystem && layerData !== undefined && layerData.running) {
      const emitter = this._particleSystem.getLayerEmitter(id);
      if (emitter) return super.getLayerYOffset(id, direction) - layerData.y * (emitter.force / 10);
    }

    return super.getLayerYOffset(id, direction);
  }
}
