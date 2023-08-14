import { Scuti } from "../../Scuti.ts";
import { RoomConfiguration } from "../../interfaces/RoomConfiguration.ts";
import { RoomVisualization } from "./RoomVisualization.ts";
import { RoomCamera } from "./RoomCamera.ts";
import { GameObject } from "../GameObject.ts";

export class Room extends GameObject {
    public renderer!: Scuti;
    public visualization!: RoomVisualization;
    public camera!: RoomCamera;

    constructor(
        private _configuration: RoomConfiguration
    ) {
        super();
    }

    public render(): void {
        this.visualization = new RoomVisualization(this);
        this.camera = new RoomCamera(this);

        this.renderer.application.stage.addChild(this.camera);
    }

}