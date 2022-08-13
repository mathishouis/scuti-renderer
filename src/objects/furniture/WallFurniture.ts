import {RoomObject} from "../room/RoomObject";
import {BLEND_MODES, Container, Sprite} from "pixi.js";
import {FurnitureLayer} from "./FurnitureLayer";
import {Scuti} from "../../Scuti";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";
import {IWallFurnitureProps} from "../../interfaces/IWallFurnitureProps";
import {getZOrder, getZOrderFloorItem} from "../../utils/ZOrder";

export class WallFurniture extends RoomObject {

    private _engine: Scuti;

    private _x: number;
    private _y: number;
    private _offsetX: number;
    private _offsetY: number;
    private _direction: number;
    private _id: number;
    private _className: string;
    private _layers: Map<string, FurnitureLayer> = new Map();
    private _layersFrame: Map<number, number> = new Map();
    private _container?: Container;
    private _state: number;
    private _loaded: boolean = false;
    private _visualization: string;

    constructor(engine: Scuti, props: IWallFurnitureProps) {
        super();

        this._engine = engine;

        this._x = props.x;
        this._y = props.y;
        this._offsetX = props.offsetX;
        this._offsetY = props.offsetY;
        this._direction = props.direction;
        this._state = props.state ?? 0;
        this._id = props.id;
        this._className = this._engine.furnitures.getClassName(this._id, "wallItem");

    }

    public async draw(): Promise<void> {

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
            let furnitureLayer = new FurnitureLayer(layer);
            this._layers.set(layer.name, furnitureLayer);
            this._container.addChild(furnitureLayer);
        })

        this._loaded = true;

        this.addChild(this._container);

        this.x = 32 + 32 * this._x - 32 * this._y;
        this.y = 16 * this._x + 16 * this._y - 32;
        if(this._direction === 2) {
            this.x = this.x + this._offsetX * 2;
            this.y = this.y + this._offsetY * 2 - 84;
        } else {
            this.x = this.x + this._offsetX * 2 - 32;
            this.y = this.y + this._offsetY * 2 - 84;
        }

    }

    private _createPlaceholder(): void {

        this._container?.destroy();
        this._container = new Container();

        let placeholder = new Sprite(this._engine.resources.get('place_holder_wall_item').textures['place_holder_wall_item_64.png']);

        if(this._direction === 4) {
            placeholder.scale.x = -1;
        }

        this._container.addChild(placeholder);

        this.addChild(this._container);

        this.x = 32 + 32 * this._x - 32 * this._y;
        this.y = 16 * this._x + 16 * this._y - 32;
        if(this._direction === 2) {
            this.x = this.x + this._offsetX * 2;
            this.y = this.y + this._offsetY * 2 - 110;
        } else {
            this.x = this.x + this._offsetX * 2 - 32;
            this.y = this.y + this._offsetY * 2 - 114;
        }

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
                this.draw();

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
                blendMode: BLEND_MODES.NORMAL,
                flip: false,
                room: this.room,
                layerZ: 0,
                engine: this._engine
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
            } else {
                continue;
            }

            if(colorId !== undefined && visualization.colors[colorId] !== undefined && visualization.colors[colorId][i] !== undefined) {
                layer.tint = Number('0x' + visualization.colors[colorId][i]);
            }

            if(visualization.layers[i] !== undefined) {
                if(visualization.layers[i].z !== undefined) {
                    layer.layerZ = visualization.layers[i].z;
                    layer.z = getZOrderFloorItem(this._x, this._y, 0, visualization.layers[i].z);
                } else {
                    layer.layerZ = 0;
                    layer.z = getZOrderFloorItem(this._x, this._y, 0, 0);
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
            z: getZOrderFloorItem(this._x, this._y, 0, -100),
            blendMode: BLEND_MODES.NORMAL,
            room: this.room,
            layerZ: -100,
            engine: this._engine
        }

        layer.name = name + '_' + name + '_64_sd_' + this._direction + '_0';

        if(data.data.frames[layer.name] !== undefined) {
            layer.flip = data.data.frames[layer.name].flipH;
        }

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

    public move(x: number, y: number, offsetX: number, offsetY: number, animate: boolean = false): void {
        if (!animate) {
            this._x = x;
            this._y = y;
            this._offsetX = offsetX;
            this._offsetY = offsetY;
            this.draw();
        } else {
            gsap.to(this, {
                x: this._direction === 2 ? 32 + 32 * x - 32 * y + offsetX * 2 : 32 + 32 * x - 32 * y + offsetX * 2 - 32,
                y: 16 * x + 16 * y - 32 + offsetY * 2 - 84, duration: 0.5, ease: "linear", onComplete: () => {
                    this._x = x;
                    this._y = y;
                    this._offsetX = offsetX;
                    this._offsetY = offsetY;
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

    public get state(): number {
        return this._state;
    }

    public set state(state: number) {
        this._state = state;
        this.draw();
    }

    public get direction(): number {
        return this._state;
    }

    public set direction(direction: number) {
        this._direction = direction;
        this.draw();
    }

}