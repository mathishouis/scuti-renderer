import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { Direction } from '../../../../enums/Direction';
import { RoomFurnitureData } from './RoomFurnitureData';
import { Room } from '../../Room';
import { asset, register } from '../../../../utils/Assets.ts';
import { RoomFurniturePlaceholder } from './RoomFurniturePlaceholder.ts';
import { FurnitureStaticVisualization } from './visualizations/FurnitureStaticVisualization.ts';

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
  public placeholder!: RoomFurniturePlaceholder;
  public position: Vector3D;
  public direction: Direction;
  public state: number;
  public data!: RoomFurnitureData;

  constructor({ id, position, direction, state }: Configuration) {
    super();

    this.id = id;
    this.position = position;
    this.direction = direction;
    this.state = state;
    this.visualization = new FurnitureStaticVisualization({ furniture: this }); // todo(): create visualization based on asset data
  }

  public render(): void {
    this.data = new RoomFurnitureData({ furniture: this });
    this.room.visualization.container.addChild(this.visualization.container);
    this.visualization.container.x = 32 * this.position.x - 32 * this.position.y;
    this.visualization.container.y = 16 * this.position.x + 16 * this.position.y - 32 * this.position.z - 50;

    const key = `furnitures/${this.data.name}`;
    const path = `/bundles/furnitures/${this.data.name}.bundle`;

    if (!asset(key)) {
      this.placeholder = new RoomFurniturePlaceholder({ furniture: this, position: this.position });
      this.placeholder.render();
      register(key, path).then(() => this.render());
      return;
    }

    if (this.placeholder) this.placeholder.destroy();

    this.visualization.render();
  }
}
