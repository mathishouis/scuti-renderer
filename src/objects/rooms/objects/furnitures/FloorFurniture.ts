import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { Direction } from '../../../../enums/Direction';
import { FurnitureData } from './FurnitureData';
import { Room } from '../../Room';
import { asset, register } from '../../../../utils/Assets';
import { FloorFurniturePlaceholder } from './placeholders/FloorFurniturePlaceholder';
import { RoomObjectVisualizationFactory } from '../RoomObjectVisualizationFactory';
import { gsap } from 'gsap';

interface Configuration {
  id: number;
  position: Vector3D;
  direction: Direction;
  state: number;
}

export class FloorFurniture extends RoomFurniture {
  public id: number;
  public room!: Room;
  public visualization!: FurnitureVisualization;
  public placeholder!: FloorFurniturePlaceholder;
  public data!: FurnitureData;

  private _position: Vector3D;
  private _direction: Direction;
  private _state: number;
  private _parameters: Record<string, any>;

  constructor({ id, position, direction, state, ...parameters }: Configuration) {
    super();

    this.id = id;

    this._position = position;
    this._direction = direction;
    this._state = state;
    this._parameters = parameters;
  }

  public render(): void {
    this.data = new FurnitureData({ furniture: this });

    const key = `furnitures/${this.data.name}`;
    const path = `/bundles/furnitures/${this.data.name}.bundle`;
    const spritesheet = asset(key);

    if (!spritesheet) {
      this.placeholder = new FloorFurniturePlaceholder({ furniture: this, position: this.position });
      this.placeholder.render();
      register(key, path).then(() => this.render());
      return;
    }

    if (this.placeholder) this.placeholder.destroy();

    this.visualization = RoomObjectVisualizationFactory.create(spritesheet.data.properties.visualization, {
      ...this._parameters,
      ...{ furniture: this },
    }) as FurnitureVisualization;

    this.visualization.setState(this.state);
    this.visualization.render();

    this.position = this._position;

    this.room.visualization.container.addChild(this.visualization.container);
  }

  public update(): void {
    this.visualization.update();
  }

  public destroy(): void {
    this.visualization.destroy();
  }

  public get position(): Vector3D {
    return this._position;
  }

  public set position(position: Vector3D) {
    this._position = position;
    // @todo() move this to utils or something like that
    this.visualization.container.x = 32 * position.x - 32 * position.y + 32;
    this.visualization.container.y = 16 * position.x + 16 * position.y - 32 * position.z;
  }

  public get direction(): Direction {
    return this._direction;
  }

  public set direction(direction: Direction) {
    this._direction = direction;
    this.update();
  }

  public get state(): number {
    return this._state;
  }

  public set state(state: number) {
    this._state = state;
    if (this.visualization) {
      this.visualization.setState(state);
      this.visualization.update();
    }
  }

  public rotate({ direction, duration, update }: { direction: Direction; duration?: number; update?: boolean }): void {
    this._direction = direction;
    gsap.to(this.visualization.container, {
      x: 32 * this.position.x - 32 * this.position.y + 32,
      y: 16 * this.position.x + 16 * this.position.y - 32 * this.position.z - 6.25,
      duration: (duration ?? 0) / 2,
      ease: 'easeIn',
      onComplete: () => {
        if (update === undefined || update) this.visualization.update();
        gsap.to(this.visualization.container, {
          x: 32 * this.position.x - 32 * this.position.y + 32,
          y: 16 * this.position.x + 16 * this.position.y - 32 * this.position.z,
          duration: (duration ?? 0) / 2,
          ease: 'easeOut',
        });
      },
    });
  }

  public move({ position, duration }: { position: Vector3D; duration?: number }): void {
    this._position = position;
    gsap.to(this.visualization.container, {
      x: 32 * this.position.x - 32 * this.position.y + 32,
      y: 16 * this.position.x + 16 * this.position.y - 32 * this.position.z,
      duration: duration ?? 0,
      ease: 'linear',
    });
  }
}
