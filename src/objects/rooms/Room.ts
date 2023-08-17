import { Scuti } from "../../Scuti.ts";
import { RoomConfiguration } from "../../interfaces/RoomConfiguration.ts";
import { RoomVisualization } from "./RoomVisualization.ts";
import { RoomCamera } from "./RoomCamera.ts";
import { GameObject } from "../GameObject.ts";
import {RoomHeightmap} from "./RoomHeightmap.ts";

export class Room extends GameObject {
    public renderer!: Scuti;
    public visualization!: RoomVisualization;
    public camera!: RoomCamera;
    public heightMap!: RoomHeightmap;

    constructor(
        public configuration: RoomConfiguration
    ) {
        super();
    }

    public render(): void {
        this.visualization = new RoomVisualization(this);
        this.camera = new RoomCamera(this);
        this.heightMap = new RoomHeightmap(this.configuration.heightMap);

        this.renderer.application.stage.addChild(this.camera);
    }
}
