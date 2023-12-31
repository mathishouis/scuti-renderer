import { Room } from '../../Room';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { FurnitureData } from './FurnitureData';
import { OffsetVector2D } from '../../../../types/Vector';
import { Direction } from '../../../../enums/Direction';
import { RoomFurniture } from './RoomFurniture';
import { asset, register } from '../../../../utils/Assets';
import { RoomObjectVisualizationFactory } from '../RoomObjectVisualizationFactory';
import { WallFurniturePlaceholder } from './placeholders/WallFurniturePlaceholder';

interface Configuration {
  id: number;
  position: OffsetVector2D;
  direction: Direction;
  state: number;
}

export class WallFurniture extends RoomFurniture {
  public id: number;
  public room!: Room;
  public visualization!: FurnitureVisualization;
  public placeholder!: WallFurniturePlaceholder;
  public data!: FurnitureData;

  private _position: OffsetVector2D;
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
      this.placeholder = new WallFurniturePlaceholder({ furniture: this, position: this.position });
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

    if (this.direction === Direction.EAST) {
      this.visualization.container.x = 32 + 32 * this.position.x - 32 * this.position.y + this.position.offsets.x * 2;
      this.visualization.container.y = 16 * this.position.x + 16 * this.position.y - 32 + this.position.offsets.y * 2 + 31;
    } else if (this.direction === Direction.SOUTH) {
      this.visualization.container.x = 32 + 32 * this.position.x - 32 * this.position.y + this.position.offsets.x * 2 - 32;
      this.visualization.container.y = 16 * this.position.x + 16 * this.position.y - 32 + this.position.offsets.y * 2 + 31;
    }

    this.room.visualization.container.addChild(this.visualization.container);
  }

  public update(): void {
    this.visualization.update();
  }

  public destroy(): void {
    this.visualization.destroy();
  }

  public get position(): OffsetVector2D {
    return this._position;
  }

  public set position(position: OffsetVector2D) {
    if (this._position === position) return;

    this._position = position;

    // todo(): move this to utils or something like that
    if (this.direction === Direction.EAST) {
      this.visualization.container.x = 32 + 32 * this.position.x - 32 * this.position.y + this.position.offsets.x * 2;
      this.visualization.container.y = 16 * this.position.x + 16 * this.position.y - 32 + this.position.offsets.y * 2 + 31;
    } else if (this.direction === Direction.SOUTH) {
      this.visualization.container.x = 32 + 32 * this.position.x - 32 * this.position.y + this.position.offsets.x * 2 - 32;
      this.visualization.container.y = 16 * this.position.x + 16 * this.position.y - 32 + this.position.offsets.y * 2 + 31;
    }

    if (this.visualization && this.visualization.data && this.visualization.data.masks && this.room) {
      this.room.visualization.layers.masks.update();
      this.visualization.renderMasks();
    }
  }

  public get direction(): Direction {
    return this._direction;
  }

  public set direction(direction: Direction) {
    if (this._direction === direction) return;

    this._direction = direction;
    this.update();
  }

  public get state(): number {
    return this._state;
  }

  public set state(state: number) {
    if (this._state === state) return;

    this._state = state;

    if (this.visualization) {
      this.visualization.setState(state);
      this.visualization.update();
    }
  }

  public rotate({ direction, update }: { direction: Direction; update?: boolean }): void {
    this._direction = direction;
    if (update === undefined || update) this.visualization.update();
  }

  public move({ position, duration }: { position: OffsetVector2D; duration?: number }): void {
    this._position = position;
    // todo(): implement this
  }
}
