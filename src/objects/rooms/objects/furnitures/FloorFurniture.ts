import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { Direction } from '../../../../enums/Direction';
import { FurnitureData } from './FurnitureData';
import { Room } from '../../Room';
import { asset, register } from '../../../../utils/Assets';
import { FurniturePlaceholder } from './FurniturePlaceholder';
import { RoomObjectVisualizationFactory } from '../RoomObjectVisualizationFactory';

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
  public placeholder!: FurniturePlaceholder;
  public position: Vector3D;
  public direction: Direction;
  public state: number;
  public data!: FurnitureData;
  public parameters: any;

  constructor({ id, position, direction, state, ...parameters }: Configuration) {
    super();

    this.id = id;
    this.position = position;
    this.direction = direction;
    this.state = state;
    this.parameters = parameters;
  }

  public render(): void {
    this.data = new FurnitureData({ furniture: this });

    const key = `furnitures/${this.data.name}`;
    const path = `/bundles/furnitures/${this.data.name}.bundle`;
    const spritesheet = asset(key);

    if (!spritesheet) {
      this.placeholder = new FurniturePlaceholder({ furniture: this, position: this.position });
      this.placeholder.render();
      register(key, path).then(() => this.render());
      return;
    }

    if (this.placeholder) this.placeholder.destroy();

    this.visualization = RoomObjectVisualizationFactory.create(spritesheet.data.properties.visualization, {
      ...this.parameters,
      ...{ furniture: this },
    }) as FurnitureVisualization;

    this.visualization.setState(this.state);
    this.visualization.render();
    this.visualization.container.x = 32 * this.position.x - 32 * this.position.y;
    this.visualization.container.y = 16 * this.position.x + 16 * this.position.y - 32 * this.position.z - 50;

    this.room.visualization.container.addChild(this.visualization.container);
  }

  // todo(): make a getter / setter
  public setState(state: number): void {
    this.state = state;
    this.visualization.setState(state);
  }
}
