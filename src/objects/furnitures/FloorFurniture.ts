import {Assets, BLEND_MODES, Container, Sprite, Spritesheet} from "pixi.js";
import {FloorFurnitureConfiguration, FloorPosition, FurnitureVisualization} from "../../interfaces/Furniture.interface";
import {Direction} from "../../types/Direction";
import {Room} from "../rooms/Room";
import {FurnitureData} from "./FurnitureData";
import {FurnitureLayer} from "./FurnitureLayer";

export class FloorFurniture extends Container {

    private readonly _room: Room;
    private readonly _id: number;
    private _position: FloorPosition;
    private _direction: Direction;
    private _state: number;
    private _data: FurnitureData;

    constructor(
        room: Room,
        configuration: FloorFurnitureConfiguration
    ) {
        super();

        this._room = room;
        this._id = configuration.id;
        this._position = configuration.position;
        this._direction = configuration.direction;
        this._state = configuration.state ?? 0;
        this._data = new FurnitureData(this._id);

        this._createPlaceholder();
        console.log(this._data);
        Assets.add("furnitures/" + this._data.baseName, "http://localhost:8081/furniture/" + this._data.baseName + "/" + this._data.baseName + ".json");
        Assets.load("furnitures/" + this._data.baseName).then(() => this._draw());
    }

    private _draw(): void {
        this._destroyParts();
        const spritesheet: Spritesheet = Assets.get("furnitures/" + this._data.baseName);
        const visualization: FurnitureVisualization = spritesheet.data.furniProperty.visualization; // TODO: FurnitureVisualization interface

        for (let i: number = 0; i < visualization.layerCount; i++) {
            this._parseLayer(i, visualization);
        }

        this.x = 32 + 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z - 64;
        this._room.visualization.objectLayer.addChild(this);
    }

    private _parseLayer(layer: number, visualization: FurnitureVisualization): void {
        let alpha: number;
        let tint: number;
        let z: number;
        let blendMode: BLEND_MODES;
        let flip: boolean;
        let frame: number = 0;

        if(visualization.directions.indexOf(this._direction) === -1) {
            this._direction = visualization.directions[0];
        }

        if(this._data.color !== null && visualization.colors[this._data.color] !== undefined && visualization.colors[this._data.color][layer] !== undefined) {
            tint = Number('0x' + visualization.colors[this._data.color][layer]);
        }

        if(visualization.layers[layer] !== undefined) {
            if(visualization.layers[layer].z !== undefined) z = visualization.layers[layer].z;
            if(visualization.layers[layer].alpha !== undefined) alpha = visualization.layers[layer].alpha / 255;
            if(visualization.layers[layer].ink !== undefined) blendMode = BLEND_MODES.ADD;
        }

        this.addChild(new FurnitureLayer(this, {
            layer: layer,
            alpha: alpha,
            tint: tint,
            z: z,
            blendMode: blendMode,
            flip: false,
            frame: frame
        }));
    }

    private _createPlaceholder(): void {
        const placeholder: Sprite = new Sprite(Assets.get("furnitures/floor/placeholder").textures["place_holder_furniture_64.png"]);
        this.addChild(placeholder);

        placeholder.x = -32;
        placeholder.y = -50;
    }

    private _destroyParts(): void {
        while(this.children[0]) {
            this.removeChild(this.children[0]);
        }
    }

    private _createLayer(): void {

    }

    public get data(): FurnitureData {
        return this._data;
    }

    public get direction(): Direction {
        return this._direction;
    }

}
