import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { Direction } from '../../../../enums/Direction';
import { FurnitureData } from './FurnitureData';
import { Room } from '../../Room';
import { asset, register } from '../../../../utils/Assets';
import { FurniturePlaceholder } from './FurniturePlaceholder';
import { FurnitureGuildCustomizedVisualization } from './visualizations/FurnitureGuildCustomizedVisualization.ts';

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

  constructor({ id, position, direction, state, ...visualization }: Configuration) {
    super();

    this.id = id;
    this.position = position;
    this.direction = direction;
    this.state = state;
    this.visualization = new FurnitureGuildCustomizedVisualization({ ...visualization, ...{ furniture: this } }); // todo(): create visualization based on asset data
  }

  public render(): void {
    this.data = new FurnitureData({ furniture: this });
    this.room.visualization.container.addChild(this.visualization.container);
    this.visualization.container.x = 32 * this.position.x - 32 * this.position.y;
    this.visualization.container.y = 16 * this.position.x + 16 * this.position.y - 32 * this.position.z - 50;

    const key = `furnitures/${this.data.name}`;
    const path = `/bundles/furnitures/${this.data.name}.bundle`;

    if (!asset(key)) {
      this.placeholder = new FurniturePlaceholder({ furniture: this, position: this.position });
      this.placeholder.render();
      register(key, path).then(() => this.render());
      return;
    }

    if (this.placeholder) this.placeholder.destroy();

    this.visualization.render();
  }
}
