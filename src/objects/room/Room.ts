import { Scuti } from "../../Scuti";
import { IRoomConfiguration } from "../../interfaces/IRoomConfiguration";
import { Container } from 'pixi.js';
import {Tile} from "./parts/Tile";

export class Room {

    private _modelContainer?: Container;
    private _engine: Scuti;

    constructor(engine: Scuti, configuration: IRoomConfiguration) {
        this._engine = engine;

        this._updateHeightmap();
    }

    private _updateHeightmap(): void {

        this._modelContainer?.destroy();
        this._modelContainer = new Container();


        this._engine.application.stage.addChild(new Tile({ color: 0xFFFFFF, tileThickness: 8, x: 0, y: 0, z: 0 }));

    }

    private _parseTileMap(): void {

    }

}