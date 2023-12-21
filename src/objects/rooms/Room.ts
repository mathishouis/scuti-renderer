import { Scuti } from '../../Scuti';
import { IRoomConfiguration } from '../../interfaces/IRoomConfiguration';
import { RoomVisualization } from './RoomVisualization';
import { RoomCamera } from './RoomCamera';
import { GameObject } from '../GameObject';
import { RoomHeightmap } from './RoomHeightmap';
import { RoomConfiguration } from './RoomConfiguration';
import { RoomEvents } from './RoomEvents';

export class Room extends GameObject {
  public renderer!: Scuti;
  public heightMap!: RoomHeightmap;
  public visualization!: RoomVisualization;
  public camera!: RoomCamera;
  public configuration: RoomConfiguration;
  public events!: RoomEvents;

  constructor(configuration: IRoomConfiguration) {
    super();

    this.configuration = new RoomConfiguration(this, configuration);
    this.configuration.floorMaterial.room = this;
    this.configuration.wallMaterial.room = this;
  }

  public render(): void {
    this.heightMap = new RoomHeightmap(this.configuration.heightMap);
    this.visualization = new RoomVisualization(this);
    this.camera = new RoomCamera(this);
    this.events = new RoomEvents();

    this.visualization.render();
    this.renderer.application.stage.addChild(this.camera);
  }

  public update(): void {
    this.heightMap = new RoomHeightmap(this.configuration.heightMap);
    this.visualization.update();
  }
}
