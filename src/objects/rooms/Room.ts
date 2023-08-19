import { Scuti } from "../../Scuti.ts";
import { IRoomConfiguration } from "../../interfaces/IRoomConfiguration.ts";
import { RoomVisualization } from "./RoomVisualization.ts";
import { RoomCamera } from "./RoomCamera.ts";
import { GameObject } from "../GameObject.ts";
import { RoomHeightmap } from "./RoomHeightmap.ts";
import { RoomConfiguration } from "./RoomConfiguration.ts";
import {RoomEvents} from "./RoomEvents.ts";

export class Room extends GameObject {
    public renderer!: Scuti;
    public heightMap!: RoomHeightmap;
    public visualization!: RoomVisualization;
    public camera!: RoomCamera;
    public configuration: RoomConfiguration;
    public events!: RoomEvents;

    constructor(
        configuration: IRoomConfiguration
    ) {
        super();

        this.configuration = new RoomConfiguration(this, configuration);
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
