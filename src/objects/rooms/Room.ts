import { Scuti } from "../../Scuti.ts";
import { IRoomConfiguration } from "../../interfaces/IRoomConfiguration.ts";
import { RoomVisualization } from "./RoomVisualization.ts";
import { RoomCamera } from "./RoomCamera.ts";
import { GameObject } from "../GameObject.ts";
import { RoomHeightmap } from "./RoomHeightmap.ts";

export class Room extends GameObject {
    public renderer!: Scuti;
    public heightMap!: RoomHeightmap;
    public visualization!: RoomVisualization;
    public camera!: RoomCamera;

    constructor(
        public configuration: IRoomConfiguration
    ) {
        super();
    }

    public render(): void {
        this.heightMap = new RoomHeightmap(this.configuration.heightMap);
        this.visualization = new RoomVisualization(this);
        this.camera = new RoomCamera(this);

        this.visualization.render();

        this.renderer.application.stage.addChild(this.camera);
    }

    public get tiles() {

    }

    public get walls() {

    }
}
