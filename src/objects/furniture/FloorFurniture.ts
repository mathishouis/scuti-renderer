import {RoomObject} from "../room/RoomObject";
import {IFloorFurnitureProps} from "../../interfaces/IFloorFurnitureProps";
import {BLEND_MODES, Container, Sprite} from "pixi.js";
import {FurnitureLayer} from "./FurnitureLayer";
import {Scuti} from "../../Scuti";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";
import {getZOrder, getZOrderFloorItem} from "../../utils/ZOrder";
import {gsap} from "gsap";

export class FloorFurniture extends RoomObject {

    private _engine: Scuti;

    private _x: number;
    private _y: number;
    private _z: number;
    private _direction: number;
    private _id: number;
    private _className: string;
    private _layers: Map<string, FurnitureLayer> = new Map();
    private _layersFrame: Map<number, number> = new Map();
    private _container?: Container;
    private _state: number;
    private _loaded: boolean = false;
    private _visualization: string;

    constructor(engine: Scuti, props: IFloorFurnitureProps) {
        super();

        this._engine = engine;

        this._x = props.x;
        this._y = props.y;
        this._z = props.z;
        this._direction = props.direction;
        this._state = props.state ?? 0;
        this._id = props.id;
        this._className = this._engine.furnitures.getClassName(this._id, "floorItem");

        this._draw();

    }

    private async _draw(): Promise<void> {

        this._layers = new Map();

        if (!this._loaded) {
            this._createPlaceholder();
        }

        if(!this._engine.resources.hasInQueue(this._className)) {
            this._engine.resources.add(this._className, 'furniture/' + this._engine.furnitures.splitColorName(this._className).name + '/' + this._engine.furnitures.splitColorName(this._className).name + '.json');
            await this._engine.resources.load(this._className);
        } else {
            await this._engine.resources.waitForLoad(this._className);
        }

        this._visualization = this._engine.resources.get(this._className).data.furniProperty.infos.visualization;

        this._container?.destroy();
        this._container = new Container();
        this._container.sortableChildren = true;

        this._getLayers().forEach((layer: IFurnitureLayerProps) => {
            if(layer.texture === undefined) {
                console.log(layer);
            } else {
                let furnitureLayer = new FurnitureLayer(layer);
                this._layers.set(layer.name, furnitureLayer);
                this._container.addChild(furnitureLayer);
            }
        })

        this._loaded = true;

        this.zIndex = getZOrder(this._x, this._y, this._z);

        this.addChild(this._container);
        this.x = 32 + 32 * this._x - 32 * this._y;
        this.y = 16 * this._x + 16 * this._y - 32 * this._z;

    }

    private _createPlaceholder(): void {

        this._container?.destroy();
        this._container = new Container();

        let placeholder = new Sprite(this._engine.resources.get('place_holder_furniture').textures['place_holder_furniture_64.png'])

        this._container.addChild(placeholder);

        this.addChild(this._container);

        this.x = 32 * this._x - 32 * this._y - 1;
        this.y = 16 * this._x + 16 * this._y - 32 * this._z - 50;
        this.zIndex = 2;

    }

    private _nextFrame(): void {
        this._layersFrame.forEach((frame: number, layer: number) => {
            let data = this._engine.resources.get(this._className);
            let visualization = data.data.furniProperty.visualization;

            if (visualization.animation[this._state] !== undefined && visualization.animation[this._state][layer] !== undefined) {
                let frameSequence = visualization.animation[this._state][layer].frameSequence;
                let currentFrame = frame;
                if ((frameSequence.length - 1) > currentFrame) {
                    this._layersFrame.set(layer, currentFrame + 1);
                } else {
                    this._layersFrame.set(layer, 0);
                }
                this._draw();

            }

        });
    }

    private _getLayers(): IFurnitureLayerProps[] {
        const layers: IFurnitureLayerProps[] = [];
        const { name, colorId } = this._engine.furnitures.splitColorName(this._className);

        let data = this._engine.resources.get(this._className);
        let visualization = data.data.furniProperty.visualization;


        for (let i = 0; i < visualization.layerCount; i++) {

            let layer: IFurnitureLayerProps = {
                frame: 0,
                texture: undefined,
                name: undefined,
                alpha: undefined,
                tint: undefined,
                z: 0,
                blendMode: BLEND_MODES.NORMAL
            }

            if (visualization.directions.indexOf(this._direction) === -1) {
                this._direction = visualization.directions[0];
            }

            if (visualization.animation[this._state] !== undefined && visualization.animation[this._state][i] !== undefined && visualization.animation[this._state][i].frameSequence.length > 1) {
                if (this._layersFrame.has(i)) {
                    layer.frame = this._layersFrame.get(i);
                } else {
                    this._layersFrame.set(i, 0);
                }
            }

            let frame = 0;
            if (visualization.animation[this._state] !== undefined && visualization.animation[this._state][i] !== undefined) {
                frame = visualization.animation[this._state][i].frameSequence[layer.frame] ?? 0;
            }

            layer.name = name + '_' + name + '_64_' + String.fromCharCode(97 + Number(i)) + '_' + this._direction + '_' + frame;

            if(data.data.frames[layer.name] !== undefined) {
                layer.flip = data.data.frames[layer.name].flipH;
            }

            if(data.textures[layer.name] !== undefined) {
                layer.texture = data.textures[layer.name];
            }

            if(colorId !== undefined && visualization.colors[colorId] !== undefined && visualization.colors[colorId][i] !== undefined) {
                layer.tint = Number('0x' + visualization.colors[colorId][i]);
            }

            if(visualization.layers[i] !== undefined) {
                if(visualization.layers[i].z !== undefined) {
                    layer.z = visualization.layers[i].z;
                }

                if(visualization.layers[i].alpha !== undefined) {
                    layer.alpha = visualization.layers[i].alpha / 255;
                }

                if(visualization.layers[i].ink !== undefined) {
                    //layer.blendMode = BLEND_MODES[visualization.layers[i].ink];
                    layer.blendMode = BLEND_MODES.ADD;
                }
            }

            layers.push(layer);

        }

        let layer: IFurnitureLayerProps = {
            frame: 0,
            texture: undefined,
            name: undefined,
            alpha: 0.19,
            tint: undefined,
            z: -1,
            blendMode: BLEND_MODES.NORMAL
        }

        layer.name = name + '_' + name + '_64_sd_' + this._direction + '_0';

        if(data.textures[layer.name] !== undefined) {
            layer.texture = data.textures[layer.name];
            layers.push(layer);
        }

        return layers;
    }

    private _onTick(): void {
        if(this._visualization === "furniture_animated") {
            this._nextFrame();
        }
    }

    public move(x: number, y: number, z: number, animate: boolean = false): void {
        if (!animate) {
            this._x = x;
            this._y = y;
            this._z = z;
            this.zIndex = getZOrder(this._x, this._y, this._z);
            this._draw();
        } else {
            this.zIndex = getZOrder(this._x, this._y, this._z);
            gsap.to(this, {
                x: 32 + 32 * x - 32 * y, y: 16 * x + 16 * y - 32 * z, duration: 0.5, ease: "linear", onComplete: () => {
                    this._x = x;
                    this._y = y;
                    this._z = z;
                }
            });
        }
    }

    public startAnimation(): void {
        this.animationTicker.add(() => {
            this._onTick();
        });
    }

    public stopAnimation(): void {
        this.animationTicker.remove(() => {
            this._onTick();
        });
    }

    public destroy(): void {
        this.stopAnimation();
        this._container?.destroy();
    }

}