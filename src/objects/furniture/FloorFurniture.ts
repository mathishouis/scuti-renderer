import {RoomObject} from "../room/RoomObject";
import {IFloorFurnitureProps} from "../../interfaces/IFloorFurnitureProps";
import {BLEND_MODES, Container, RenderTexture, Sprite} from "pixi.js";
import {FurnitureLayer} from "./FurnitureLayer";
import {Scuti} from "../../Scuti";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";
import {getZOrderFloorItem} from "../../utils/ZOrder";
import {gsap} from "gsap";
import {IFurniData} from "../../interfaces/IFurniData";

export class FloorFurniture extends RoomObject {

    private _engine: Scuti;

    private _x: number;
    private _y: number;
    private _z: number;
    private _direction: number;
    private _id: number;
    private _layers: Map<IFurnitureLayerProps, FurnitureLayer> = new Map();
    private _layersFrame: Map<number, number> = new Map();
    private _container?: Container;
    private _state: number;
    private _loaded: boolean = false;
    private _infos: { visualization: string, logic: string };
    private _visualization: {};
    private _furniData: IFurniData;

    private _click: (event: any) => void;
    private _doubleClick: (event: any) => void;

    constructor(engine: Scuti, props: IFloorFurnitureProps) {
        super();

        this._engine = engine;

        this._x = props.x;
        this._y = props.y;
        this._z = props.z;
        this._direction = props.direction;
        this._state = props.state ?? 0;
        this._id = props.id;
        this._furniData = this._engine.furnitures.getFurniData(this._id, "floorItem");

    }

    public async draw(redrawAll: boolean = false): Promise<void> {

        if (!this._loaded) {
            this._createPlaceholder();
        }

        if(!this._engine.resources.hasInQueue(this._furniData.className)) {
            this._engine.resources.add(this._furniData.className, 'furniture/' + this._engine.furnitures.splitColorName(this._furniData.className).name + '/' + this._engine.furnitures.splitColorName(this._furniData.className).name + '.json');
            await this._engine.resources.load(this._furniData.className);
        } else {
            await this._engine.resources.waitForLoad(this._furniData.className);
        }

        if(!this._loaded) {
            this._container?.destroy();
            this._container = new Container();
            this._container.sortableChildren = true;
        }

        let layers = this._getLayers();

        this._layers.forEach((layer, index) => {
            if(!layers.includes(index) || redrawAll) {
                if(layer.hitTexture) {
                    layer.hitTexture.destroy();
                }
                layer.destroy();
                this._layers.delete(index);
            }
        });

        this._infos = this._engine.resources.get(this._furniData.className).data.furniProperty.infos;
        this._visualization = this._engine.resources.get(this._furniData.className).data.furniProperty.visualization;

        /*this._container?.destroy();
        this._container = new Container();
        this._container.sortableChildren = true;*/

        layers.forEach((layer: IFurnitureLayerProps) => {
            if(layer.texture === undefined) {
                console.log(layer);
            } else {
                if(!this._layers.has(layer) || redrawAll) {
                    let furnitureLayer = new FurnitureLayer(layer);
                    furnitureLayer['click'] = () => {
                        if (this._click) this._click({
                            tag: furnitureLayer.tag
                        });
                    }
                    furnitureLayer['dblclick'] = () => {
                        if (this._doubleClick) this._doubleClick({
                            tag: furnitureLayer.tag
                        });
                    }
                    this._layers.set(layer, furnitureLayer);
                    this._container.addChild(furnitureLayer);
                }
            }
        })

        this._loaded = true;

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

    }

    private _nextFrame(): void {
        this._layersFrame.forEach((frame: number, layer: number) => {
            let data = this._engine.resources.get(this._furniData.className);
            let visualization = data.data.furniProperty.visualization;

            if (visualization.animation[String(this._state)] !== undefined && visualization.animation[String(this._state)][layer] !== undefined) {
                let frameSequence = visualization.animation[String(this._state)][layer].frameSequence;
                let currentFrame = frame;
                if(frameSequence.length > 1)  {
                    if ((frameSequence.length - 1) > currentFrame) {
                        this._layersFrame.set(layer, currentFrame + 1);
                    } else {
                        this._layersFrame.set(layer, 0);
                    }
                    this.draw();
                }

            }

        });
    }

    private _getLayers(): IFurnitureLayerProps[] {
        const layers: IFurnitureLayerProps[] = [];
        const { name, colorId } = this._engine.furnitures.splitColorName(this._furniData.className);

        let data = this._engine.resources.get(this._furniData.className);
        let visualization = data.data.furniProperty.visualization;


        for (let i = 0; i < visualization.layerCount; i++) {

            let layer: IFurnitureLayerProps = {
                frame: 0,
                texture: undefined,
                name: undefined,
                alpha: undefined,
                tint: undefined,
                z: getZOrderFloorItem(this._x, this._y, this._z, 0),
                blendMode: BLEND_MODES.NORMAL,
                room: this.room,
                layerZ: 0,
                engine: this._engine,
                interactive: true,
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
                    layer.layerZ = visualization.layers[i].z;
                    layer.z = getZOrderFloorItem(this._x, this._y, this._z, visualization.layers[i].z);
                }

                if(visualization.layers[i].ignoreMouse !== undefined) {
                    layer.interactive = !visualization.layers[i].ignoreMouse;
                }

                if(visualization.layers[i].tag !== undefined) {
                    layer.tag = visualization.layers[i].tag;
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
            z: getZOrderFloorItem(this._x, this._y, this._z, -100),
            blendMode: BLEND_MODES.NORMAL,
            room: this.room,
            layerZ: -100,
            engine: this._engine,
            interactive: false,
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
        if(this._infos.visualization === "furniture_animated") {
            this._nextFrame();
        }
    }

    public move(x: number, y: number, z: number, animate: boolean = false): void {
        if (!animate) {
            this._x = x;
            this._y = y;
            this._z = z;
            this.draw();
        } else {
            this._layers.forEach(layer => {
                // @ts-ignore
                layer.zOrder = getZOrderFloorItem(x, y, z, layer.layerZ);
            });
            gsap.to(this, {
                x: 32 + 32 * x - 32 * y, y: 16 * x + 16 * y - 32 * z, duration: 0.5, ease: "linear", onComplete: () => {
                    this._x = x;
                    this._y = y;
                    this._z = z;
                    this._layers.forEach(layer => {
                        // @ts-ignore
                        layer.zOrder = getZOrderFloorItem(x, y, z, layer.layerZ);
                    });
                }
            });
        }
    }

    public rotate(direction: number, animate: boolean = false) {
        if (!animate) {
            this._direction = direction;
            this.draw();
        } else {
            gsap.to(this, {
                x: 32 + 32 * this._x - 32 * this._y, y: 16 * this._x + 16 * this._y - 32 * this._z - 6.25, duration: 0.1, ease: "easeIn", onComplete: () => {
                    this._direction = direction;
                    this.draw();
                    gsap.to(this, { x: 32 + 32 * this._x - 32 * this._y, y: 16 * this._x + 16 * this._y - 32 * this._z, duration: 0.1, ease: "easeOut" });
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
        return this._direction;
    }

    public set direction(direction: number) {
        this._direction = direction;
        this.draw();
    }

    public get roomPosition(): { x: number, y: number, z: number } {
        return {
            x: this._x,
            y: this._y,
            z: this._z
        };
    }

    public get infos(): { visualization: string, logic: string } {
        return this._infos;
    }

    public get visualization(): {} {
        return this._visualization;
    }

    public get furnidata(): IFurniData {
        return this._furniData;
    }

    public async image(direction: number, state: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const tempDirection: number = this._direction;
            const tempState: number = this._state;
            this._direction = direction;
            this._state = state;
            await this.draw();
            this._direction = tempDirection;
            this._state = tempState;
            const renderTexture: RenderTexture = this._engine.application.renderer.generateTexture(this);
            resolve(this._engine.application.renderer.plugins.extract.base64(renderTexture, "image/png", 1));
            this.draw(true);
        });
    }

    public get click() {
        return this._click;
    }

    public set click(value) {
        this._click = value;
    }

    public get doubleClick() {
        return this._doubleClick;
    }

    public set doubleClick(value) {
        this._doubleClick = value;
    }
}