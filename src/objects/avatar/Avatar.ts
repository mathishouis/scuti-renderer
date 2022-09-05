import {RoomObject} from "../room/RoomObject";
import {Scuti} from "../../Scuti";
import {IAvatarProps} from "../../interfaces/IAvatarProps";
import {AnimatedSprite, Container} from "pixi.js";
import {gsap} from "gsap";
import {IAvatarLayerProps} from "../../interfaces/IAvatarLayerProps";
import {AvatarLayer} from "./AvatarLayer";
import {Action} from "../../enum/Action";
import {getZOrder, getZOrderAvatar} from "../../utils/ZOrder";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";
import {FurnitureLayer} from "../furniture/FurnitureLayer";
import {AvatarEffect} from "./AvatarEffect";

export class Avatar extends RoomObject {

    private _engine: Scuti;

    private _x: number;
    private _y: number;
    private _z: number;
    private _direction: number;
    private _headDirection: number;
    private _figure: string;
    private _actions: Action[];
    private _container?: Container;
    private _layers: Map<IAvatarLayerProps, AvatarLayer> = new Map();
    private _loaded: boolean = false;
    private _handItem: number;
    private _moving: boolean = false;
    private _effect: AvatarEffect;

    private _click: (event: any) => void;
    private _doubleClick: (event: any) => void;

    constructor(engine: Scuti, props: IAvatarProps) {
        super();

        this._engine = engine;

        this._x = props.x;
        this._y = props.y;
        this._z = props.z;
        this._direction = props.direction;
        this._headDirection = props.headDirection ?? this._direction;
        this._figure = props.figure;
        this._actions = props.actions ?? [Action.Default];
        this._handItem = props.handItem ?? 0;

    }

    public async draw(redrawAll: boolean = false): Promise<void> {

        // @ts-ignore
        this.parentLayer = this.room.roomObjectLayer;

        this._layers = new Map();

        if (!this._loaded) {
            this._createPlaceholder();
        }

        //let layers = await this._getLayers();

        this._container?.destroy();
        this._container = new Container();
        this._container.sortableChildren = true;

        await this._effect.draw(true);

        let layers = await this._getLayers();

        /*layers.forEach((layer: IAvatarLayerProps) => {
            let avatarLayer = new AvatarLayer(layer);
            this._layers.set(layer.name, avatarLayer);
            this._container.addChild(avatarLayer);
        });*/

        this._layers.forEach((layer, index) => {
            if (!layers.includes(index) || redrawAll) {
                if (layer.hitTexture) {
                    layer.hitTexture.destroy();
                }
                layer.destroy();
                this._layers.delete(index);
            }
        });

        layers.forEach((layer: IAvatarLayerProps) => {
            if(!this._layers.has(layer) || redrawAll) {
                let avatarLayer = new AvatarLayer(layer);
                avatarLayer['click'] = () => {
                    if (this._click) this._click({});
                }
                avatarLayer['dblclick'] = () => {
                    if (this._doubleClick) this._doubleClick({});
                }
                this._layers.set(layer, avatarLayer);
                this._container.addChild(avatarLayer);
            }
        });

        this._loaded = true;

        this.addChild(this._container);

        if(!this._moving) {
            this.x = 32 * this._x - 32 * this._y;
            this.y = 16 * this._x + 16 * this._y - 32 * this._z;
            // @ts-ignore
            //this.zOrder = getZOrderAvatar(this._x, this._y, this._z);
        }

    }

    private _createPlaceholder(): void {

        // TODO: Refactor this shit

        this._container?.destroy();
        this._container = new Container();

        let hh_human_body = this._engine.resources.get('hh_human_body');
        let layers = new Map();

        Object.keys(hh_human_body.data.partsType).forEach((k) => {
            let gesture = "std";
            let direction = this._direction;
            let rotated = false;
            /*if (hh_human_body.data.partsType[k].gestures.includes(this._actions)) {
                gesture = this._actions
            }*/
            if(k === "hd" || k === "hr" || k === "hrb" || k === "ey" || k === "fc") {
                direction = this._headDirection
            }
            if([4, 5, 6, 7].includes(direction)) {
                rotated = true;
            }
            if(k !== "sd" && hh_human_body.animations[k + "_1_" + gesture + "_" + direction] !== undefined) {
                let sprite = new AnimatedSprite(hh_human_body.animations[k + "_1_" + gesture + "_" + direction]);
                sprite.zIndex = this._engine.avatars.getDrawOrder(k, gesture, direction);
                sprite.animationSpeed = 0.167;
                if(rotated) sprite.scale.x = -1;
                if(rotated) sprite.x = 64;
                layers.set(k + "_1_" + gesture + "_" + direction + "_" + Math.floor(Math.random() * 100), sprite);
            } else if(k === "sd") {
                let sprite = new AnimatedSprite(hh_human_body.animations["sd_1_" + gesture + "_0"]);
                sprite.alpha = 0.46;
                layers.set("sd_1_" + gesture + "_0_" + Math.floor(Math.random() * 100), sprite);
            }
        });

        layers.forEach((layer) => {
            this._container.addChild(layer);
            layer.play();
        });

        this._container.alpha = 0.40;

        this.addChild(this._container);

        this.x = 32 * this._x - 32 * this._y ;
        this.y = 16 * this._x + 16 * this._y - 32 * this._z;

    }

    private async _getLayers(): Promise<IAvatarLayerProps[]> {
        return new Promise(async (resolve, reject) => {
            const layers: IAvatarLayerProps[] = [];
            const figure: { partId: number; type: string; colors: number[] }[] = this._engine.avatars.splitLookFigure(this._figure);

            if(this._handItem !== 0 && (this._actions.includes(Action.CarryItem) || this._actions.includes(Action.UseItem))) {
                if (!this._engine.resources.hasInQueue('hh_human_item')) {
                    this._engine.resources.add('hh_human_item', 'figure/hh_human_item/hh_human_item.json');
                    await this._engine.resources.load('hh_human_item');
                } else {
                    await this._engine.resources.waitForLoad('hh_human_item');
                }
                let action = this._actions.includes(Action.UseItem) ? Action.UseItem : Action.CarryItem;
                let handItemId;
                if(action === Action.CarryItem) {
                    handItemId = this._engine.avatars.habboAvatarActions.CarryItem.params[String(this._handItem)];
                } else {
                    handItemId = this._engine.avatars.habboAvatarActions.UseItem.params[String(this._handItem)];
                    if(handItemId === undefined) {
                        handItemId = this._engine.avatars.habboAvatarActions.CarryItem.params[String(this._handItem)];
                        action = Action.CarryItem;
                    }
                }
                if(handItemId !== undefined) {
                    layers.push({
                        direction: this._direction,
                        textures: this._engine.resources.get('hh_human_item').animations['ri_' + handItemId + '_' + this._engine.avatars.habboAvatarActions[action].assetpartdefinition + '_' + this._direction],
                        tint: undefined,
                        alpha: 1,
                        name: 'ri_' + handItemId + '_' + this._engine.avatars.habboAvatarActions[action].assetpartdefinition + '_' + this._direction,
                        z: getZOrderAvatar(this._x, this._y, this._z) + this._engine.avatars.getDrawOrder('rh', action, this._direction),
                        engine: this._engine,
                        room: this.room
                    });
                }
            }

            for (const figurePart of figure) {
                const figureType: string = figurePart.type;
                const figurePartId: number = figurePart.partId;
                const colors: number[] = figurePart.colors;

                const parts = this._engine.avatars.getParts(figureType, figurePartId);

                for (const part of parts) {
                    const libId: string = part.lib.id;

                    if (!this._engine.resources.hasInQueue(libId)) {
                        this._engine.resources.add(libId, "figure/" + libId + "/" + libId + ".json");
                        await this._engine.resources.load(libId);
                    } else {
                        await this._engine.resources.waitForLoad(libId);
                    }

                    Object.keys(this._engine.resources.get(libId).data.partsType).forEach((type: string) => {

                        let action = Action.Default;
                        let actionPrecedence = Number(this._engine.avatars.habboAvatarActions[action].precedence);
                        let direction = this._direction;

                        for (const gesture of this._engine.resources.get(libId).data.partsType[type].gestures) {
                            if (this._actions.some(r=>this._engine.avatars.getAction(gesture).includes(r)) && !this._engine.avatars.getAction(gesture).includes(Action.Default)) {
                                let actions = this._actions.filter((f: Action) => this._engine.avatars.getAction(gesture).includes(f));
                                actions.forEach((a: Action) => {
                                    if(Number(this._engine.avatars.habboAvatarActions[a].precedence) < actionPrecedence) {
                                        action = a;
                                        actionPrecedence = this._engine.avatars.habboAvatarActions[a].precedence;
                                    }
                                });
                            }
                            console.log(type, "gesture");
                            if(this._effect) {
                                if(Object.keys(this._engine.resources.get(this._effect._name).data.animations["fx." + this._effect._id].frames[0]["bodypart"]).includes("leftarm") && ['li','ls','lh','lc'].includes(type)) {
                                    action = this._engine.resources.get(this._effect._name).data.animations["fx." + this._effect._id].frames[0]["bodypart"]["leftarm"].action;
                                }
                                if(Object.keys(this._engine.resources.get(this._effect._name).data.animations["fx." + this._effect._id].frames[0]["bodypart"]).includes("rightarm") && ['ri','rs','rh','rc'].includes(type)) {
                                    action = this._engine.resources.get(this._effect._name).data.animations["fx." + this._effect._id].frames[0]["bodypart"]["rightarm"].action;
                                }
                                if(Object.keys(this._engine.resources.get(this._effect._name).data.animations["fx." + this._effect._id].frames[0]["bodypart"]).includes("torso") && ['lg','sh','bd'].includes(type)) {
                                    action = this._engine.resources.get(this._effect._name).data.animations["fx." + this._effect._id].frames[0]["bodypart"]["torso"].action;
                                }
                            }
                        }

                        if (this._engine.avatars.habboAvatarPartSets.activePartSets.head.includes(type)) {
                            direction = this._headDirection;
                        }

                        let name = type + "_" + part.id + "_" + this._engine.avatars.habboAvatarActions[action].assetpartdefinition + "_" + direction;

                        if (type !== "sd" && this._engine.resources.get(libId).animations[name] !== undefined && !this._engine.resources.get(libId).animations[name].includes(undefined)) {
                            layers.push({
                                flip: true,
                                direction: direction,
                                textures: this._engine.resources.get(libId).animations[name],
                                tint: part.colorable === 1 && type !== "ey" ? this._engine.avatars.getColor(figureType, colors[part.index]) : undefined,
                                alpha: 1,
                                name: name,
                                z: getZOrderAvatar(this._x, this._y, this._z) + this._engine.avatars.getDrawOrder(type, action, direction),
                                engine: this._engine,
                                room: this.room
                            });
                        } else if (type === "sd") {
                            layers.push({
                                direction: direction,
                                textures: this._engine.resources.get(libId).animations["sd_1_std_0"],
                                tint: undefined,
                                alpha: 0.04,
                                name: "sd_1_std_0",
                                z: getZOrderAvatar(this._x, this._y, this._z) - 1,
                                engine: this._engine,
                                room: this.room
                            });
                        }

                    });
                }
            }
            return resolve(layers);
        });
    }

    public move(x: number, y: number, z: number, animate: boolean): void {
        if(!animate) {
            this._x = x;
            this._y = y;
            this._z = z;
            this.draw();
        } else {
            this._moving = true;
            // @ts-ignore
            //this.zOrder = getZOrderAvatar(x, y, z);
            gsap.to(this, {
                x: 32 * x - 32 * y, y: 16 * x + 16 * y - 32 * z, duration: 0.5, ease: "linear", onComplete: () => {
                    this._x = x;
                    this._y = y;
                    this._z = z;
                    this._moving = false;
                }
            });
        }

    }

    public addAction(action: Action): void {
        this._actions.push(action);
        this.draw();
    }

    public removeAction(action: Action): void {
        this._actions = this._actions.filter((actionFilter: Action) => { return actionFilter !== action });
        this.draw();
    }

    public get direction(): number {
        return this._direction;
    }

    public set direction(direction: number) {
        this._direction = direction;
        this.draw();
    }

    public get headDirection(): number {
        return this._headDirection;
    }

    public set headDirection(direction: number) {
        this._headDirection = direction;
        this.draw();
    }

    public get handItem(): number {
        return this._handItem;
    }

    public set handItem(item: number) {
        this._handItem = item;
        this.addAction(Action.CarryItem);
    }

    public get effect() {
        return this._effect;
    }

    public set effect(value: AvatarEffect) {
        this._effect = value;
        this._effect.avatar = this;
        this.draw(true);
    }

    public startAnimation(): void {

    }

    public destroy(): void {
        this._container?.destroy();
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