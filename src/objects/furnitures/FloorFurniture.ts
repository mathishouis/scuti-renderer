import { Assets, BLEND_MODES, Sprite, Spritesheet } from "pixi.js";
import {
    FloorFurnitureConfiguration,
    FloorPosition, FurnitureFrameId,
    FurnitureLayerId,
    FurnitureVisualization
} from "../../interfaces/Furniture.interface";
import { Direction } from "../../types/Direction";
import { FurnitureData } from "./FurnitureData";
import { FurnitureLayer } from "./FurnitureLayer";
import { RoomObject } from "../rooms/RoomObject";
import { gsap } from "gsap";

export class FloorFurniture extends RoomObject {

    /**
     * The furniture id
     * @private
     */
    private readonly _id: number;

    /**
     * The furniture position
     * @private
     */
    private _position: FloorPosition;

    /**
     * The furniture direction
     * @private
     */
    private _direction: Direction;

    /**
     * The furniture state
     * @private
     */
    private _state: number;

    /**
     * The furniture data
     * @private
     */
    private _data: FurnitureData;

    /**
     * The current frame for each layers
     * @private
     */
    private _frames: Map<FurnitureFrameId, FurnitureLayerId> = new Map();

    /**
     * FloorFurniture class
     * @param configuration = The furniture configuration
     */
    constructor(
        configuration: FloorFurnitureConfiguration
    ) {
        super();

        this._id = configuration.id;
        this._position = configuration.position;
        this._direction = configuration.direction;
        this._state = configuration.state ?? 0;
        this._data = new FurnitureData(this);

        this._createPlaceholder();
        Assets.add("furnitures/" + this._data.baseName, "http://localhost:8081/furniture/" + this._data.baseName + "/" + this._data.baseName + ".json");
        Assets.load("furnitures/" + this._data.baseName).then(() => this._draw());
    }

    /**
     * Draw the furniture
     * @private
     */
    private _draw(): void {
        this._destroyParts();
        const spritesheet: Spritesheet = Assets.get("furnitures/" + this._data.baseName);
        const visualization: FurnitureVisualization = spritesheet.data["furniProperty"].visualization;

        for (let i: number = 0; i < visualization.layerCount; i++) {
            this._createLayer(i);
        }

        this.x = 32 + 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z - 64;
    }

    /**
     * Draw the layer
     * @param layer
     * @private
     */
    private _createLayer(
        layer: FurnitureLayerId
    ): void {
        const spritesheet: Spritesheet = Assets.get("furnitures/" + this._data.baseName);
        const visualization: FurnitureVisualization = spritesheet.data["furniProperty"].visualization;

        let alpha: number;
        let tint: number;
        let z: number;
        let blendMode: BLEND_MODES;
        let flip: boolean;
        let frame: number = 0;

        if(visualization.directions.indexOf(this._direction) === -1) {
            this._direction = visualization.directions[0];
        }

        if (visualization.animation[this._state] !== undefined && visualization.animation[this._state][layer] !== undefined && visualization.animation[this._state][layer].frameSequence.length > 1) {
            if (this._frames.has(layer)) {
                frame = this._frames.get(layer);
            } else {
                this._frames.set(layer, 0);
            }
        }

        if (visualization.animation[this._state] !== undefined && visualization.animation[this._state][layer] !== undefined) {
            frame = visualization.animation[this._state][layer].frameSequence[frame] ?? 0;
        }

        if(this._data.color !== null && visualization.colors[this._data.color] !== undefined && visualization.colors[this._data.color][layer] !== undefined) {
            tint = Number('0x' + visualization.colors[this._data.color][layer]);
        }

        if(visualization.layers[layer] !== undefined) {
            if(visualization.layers[layer].z !== undefined) z = visualization.layers[layer].z;
            if(visualization.layers[layer].alpha !== undefined) alpha = visualization.layers[layer].alpha / 255;
            if(visualization.layers[layer].ink !== undefined) blendMode = BLEND_MODES.ADD;
        }

        if(spritesheet.data.frames[this._data.baseName + '_' + this._data.baseName + '_64_' + String.fromCharCode(97 + Number(layer)) + '_' + this._direction + '_' + frame] !== undefined) {
            flip = spritesheet.data.frames[this._data.baseName + '_' + this._data.baseName + '_64_' + String.fromCharCode(97 + Number(layer)) + '_' + this._direction + '_' + frame]['flipH'];
        }

        this.addChild(new FurnitureLayer(this, {
            layer: layer,
            alpha: alpha,
            tint: tint,
            z: z,
            blendMode: blendMode,
            flip: flip,
            frame: frame
        }));
    }

    /**
     * Draw the next frame
     * @private
     */
    private _updateFrame(): void {
        this._frames.forEach((frame: FurnitureFrameId, layer: FurnitureLayerId) => {
            const spritesheet: Spritesheet = Assets.get("furnitures/" + this._data.baseName);
            const visualization: FurnitureVisualization = spritesheet.data["furniProperty"].visualization;

            if(visualization.animation[String(this._state)] !== undefined && visualization.animation[String(this._state)][layer] !== undefined) {
                const frameSequence: number[] = visualization.animation[String(this._state)][layer].frameSequence;
                const currentFrame: number = frame;
                if(frameSequence.length > 1)  {
                    if ((frameSequence.length - 1) > currentFrame) {
                        this._frames.set(layer, currentFrame + 1);
                    } else {
                        this._frames.set(layer, 0);
                    }
                    this._draw();
                }

            }

        });
    }

    /**
     * Draw the furniture placeholder
     * @private
     */
    private _createPlaceholder(): void {
        const placeholder: Sprite = new Sprite(Assets.get("furnitures/floor/placeholder").textures["place_holder_furniture_64.png"]);
        this.addChild(placeholder);

        placeholder.x = -32;
        placeholder.y = -50;
    }

    /**
     * Destroy all sprites
     * @private
     */
    private _destroyParts(): void {
        while(this.children[0]) {
            this.removeChild(this.children[0]);
        }
    }

    /**
     * On each animation tick
     * @private
     */
    private _onTicker(): void {
        this._updateFrame();
    }

    /**
     * Start the furniture animation
     */
    public startAnimation(): void {
        this.animationTicker.add(() => this._onTicker());
    }

    /**
     * Stop the furniture animation
     */
    public stopAnimation(): void {
        this.animationTicker.remove(() => this._onTicker());
    }

    public get id(): number {
        return this._id;
    }

    /**
     * Get the furniture data
     */
    public get data(): FurnitureData {
        return this._data;
    }

    /**
     * Get the furniture direction
     */
    public get direction(): Direction {
        return this._direction;
    }

    /**
     * Update the furniture direction
     * @param direction
     */
    public set direction(direction: Direction) {
        gsap.to(this, {
            x: 32 + 32 * this._position.x - 32 * this._position.y,
            y: 16 * this._position.x + 16 * this._position.y - 32 * this._position.z - 64 - 6.25,
            duration: 0.1,
            ease: "easeIn",
            onComplete: () => {
                this._direction = direction;
                this._draw();
                gsap.to(this, {
                    x: 32 + 32 * this._position.x - 32 * this._position.y,
                    y: 16 * this._position.x + 16 * this._position.y - 32 * this._position.z - 64,
                    duration: 0.1,
                    ease: "easeOut"
                });
            }
        });
    }

    /**
     * Return the furniture state
     */
    public get state(): number {
        return this._state;
    }

    /**
     * Update the furniture state
     * @param state
     */
    public set state(state: number) {
        this._state = state;
        this._draw();
    }

}
