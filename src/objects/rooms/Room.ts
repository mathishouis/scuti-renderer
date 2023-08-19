import { Scuti } from "../../Scuti.ts";
import { RoomConfiguration } from "../../interfaces/RoomConfiguration.ts";
import { RoomVisualization } from "./RoomVisualization.ts";
import { RoomCamera } from "./RoomCamera.ts";
import { GameObject } from "../GameObject.ts";
import {RoomHeightmap} from "./RoomHeightmap.ts";

export class Room extends GameObject {
    public renderer!: Scuti;
    public heightMap!: RoomHeightmap;
    public visualization!: RoomVisualization;
    public camera!: RoomCamera;

    constructor(
        public configuration: RoomConfiguration
    ) {
        super();
    }

    public render(): void {
        this.heightMap = new RoomHeightmap(this.configuration.heightMap);
        this.visualization = new RoomVisualization(this);
        this.camera = new RoomCamera(this);

        this.renderer.application.stage.addChild(this.camera);
    }
}
