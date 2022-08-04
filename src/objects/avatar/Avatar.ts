import {RoomObject} from "../room/RoomObject";
import {Scuti} from "../../Scuti";
import {IAvatarProps} from "../../interfaces/IAvatarProps";
import {AnimatedSprite, Container} from "pixi.js";
import {gsap} from "gsap";
import {IAvatarLayerProps} from "../../interfaces/IAvatarLayerProps";
import {AvatarLayer} from "./AvatarLayer";
import {Action} from "../../enum/Action";

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
    private _layers: Map<string, AnimatedSprite> = new Map();
    private _loaded: boolean = false;

    constructor(engine: Scuti, props: IAvatarProps) {
        super();

        this._engine = engine;

        this._x = props.x;
        this._y = props.y;
        this._z = props.z;
        this._direction = props.direction;
        this._headDirection = props.headDirection ?? this._direction;
        this._figure = props.figure;
        this._actions = props.actions ?? [Action.Stand];

        this._draw();
    }

    private async _draw(): Promise<void> {

        this._layers = new Map();

        if (!this._loaded) {
            this._createPlaceholder();
        }

        let layers = await this._getLayers();

        this._container?.destroy();
        this._container = new Container();
        this._container.sortableChildren = true;

        layers.forEach((layer: IAvatarLayerProps) => {
            let avatarLayer = new AvatarLayer(layer);
            this._layers.set(layer.name, avatarLayer);
            this._container.addChild(avatarLayer);
        });

        this._loaded = true;

        this.addChild(this._container);

        this.x = 32 * this._x - 32 * this._y;
        this.y = 16 * this._x + 16 * this._y - 32 * this._z;
        this.zIndex = 2;

    }

    private _createPlaceholder(): void {

        this._container?.destroy();
        this._container = new Container();

        let hh_human_body = this._engine.resources.get('hh_human_body');
        let layers = new Map();

        Object.keys(hh_human_body.data.partsType).forEach((k) => {
            let gesture = "std";
            let direction = this._direction;
            let rotated = false;
            if (hh_human_body.data.partsType[k].gestures.includes(this._actions)) {
                gesture = this._actions
            }
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
        this.zIndex = 2;

    }

    private async _getLayers(): Promise<IAvatarLayerProps[]> {
        return new Promise(async (resolve, reject) => {
            const layers: IAvatarLayerProps[] = [];
            const figure: { partId: number; type: string; colors: number[] }[] = this._engine.avatars.splitLookFigure(this._figure);

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

                    Object.keys(this._engine.resources.get(libId).data.partsType).forEach((type) => {

                        let action = 'std';
                        let direction = this._direction;

                        for (const gesture of this._engine.resources.get(libId).data.partsType[type].gestures) {
                            if (this._actions.includes(gesture) && gesture !== 'std') {
                                action = gesture;
                                break;
                            }
                        }

                        if (this._engine.avatars.isHeadPart(type)) {
                            direction = this._headDirection;
                        }

                        let name = type + "_" + part.id + "_" + action + "_" + direction;

                        if (type !== "sd" && this._engine.resources.get(libId).animations[name] !== undefined) {
                            layers.push({
                                direction: direction,
                                textures: this._engine.resources.get(libId).animations[name],
                                tint: this._engine.avatars.getColor(figureType, colors[part.index]),
                                alpha: 1,
                                name: name,
                                z: this._engine.avatars.getDrawOrder(type, action, direction)
                            });
                        } else if (type === "sd") {
                            layers.push({
                                direction: direction,
                                textures: this._engine.resources.get(libId).animations["sd_1_" + action + "_0"],
                                tint: undefined,
                                alpha: 0.04,
                                name: "sd_1_" + action + "_0",
                                z: -1
                            });
                        }

                    });
                }
            }
            return resolve(layers);
        });
    }

    public move(x: number, y: number, z: number): void {
        this._x = x;
        this._y = y;
        this._z = z;
        gsap.to(this, { x: 32 * x - 32 * y, y: 16 * x + 16 * y - 32 * z, duration: 0.5, ease: "none" });
    }

    public addAction(action: Action): void {
        this._actions.push(action);
        this._draw();
    }

    public removeAction(action: Action): void {
        this._actions = this._actions.filter((actionFilter: Action) => { return actionFilter !== action });
        this._draw();
    }

    public startAnimation(): void {

    }

}