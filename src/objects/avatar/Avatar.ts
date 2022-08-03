import {RoomObject} from "../room/RoomObject";
import {Scuti} from "../../Scuti";
import {IAvatarProps} from "../../interfaces/IAvatarProps";
import {AnimatedSprite, Container, Sprite} from "pixi.js";
import { gsap } from "gsap";
import {IAvatarPart} from "../../interfaces/IAvatarPart";
import {FurnitureLayer} from "../furniture/FurnitureLayer";

export class Avatar extends RoomObject {

    private _engine: Scuti;

    private _x: number;
    private _y: number;
    private _z: number;
    private _direction: number;
    private _headDirection: number;
    private _figure: string;
    private _action: string;
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
        this._action = props.action ?? 'std';

        this._draw();
    }

    private async _draw(): Promise<void> {

        this._layers = new Map();

        if (!this._loaded) {
            this._createPlaceholder();
        }

        let figure = this._engine.avatars.splitLookFigure(this._figure);

        for (const figurePart of figure) {
            let type = figurePart.type;
            let partId = figurePart.partId;
            let colors = figurePart.colors;

            let parts = this._engine.avatars.getParts(type, partId);

            for (const part of parts) {
                let partType = part.type;
                let lib = part.lib.id;
                this._engine.resources.add(lib, "figure/" + lib + "/" + lib + ".json");
                await this._engine.resources.load(lib);

                Object.keys(this._engine.resources.get(lib).data.partsType).forEach((k) => {
                    let gesture = "std";
                    let direction = this._direction;
                    let rotated = false;
                    if(this._engine.resources.get(lib).data.partsType[k].gestures.includes(this._action)) {
                        gesture = this._action
                    }
                    if(k === "hd" || k === "hr" || k === "hrb" || k === "ey" || k === "fc") {
                        direction = this._headDirection
                    }
                    if([4, 5, 6, 7].includes(direction)) {
                        rotated = true;
                    }
                    if(k !== "sd" && this._engine.resources.get(lib).animations[k + "_" + part.id + "_" + gesture + "_" + direction] !== undefined) {
                        let sprite = new AnimatedSprite(this._engine.resources.get(lib).animations[k + "_" + part.id + "_" + gesture + "_" + direction]);
                        sprite.zIndex = this._engine.avatars.getDrawOrder(k, gesture, direction);
                        sprite.tint = this._engine.avatars.getColor(type, colors[0]);
                        sprite.animationSpeed = 0.167;
                        if(rotated) sprite.scale.x = -1;
                        if(rotated) sprite.x = 64;
                        this._layers.set(k + "_" + part.id + "_" + gesture + "_" + direction + "_" + Math.floor(Math.random() * 100), sprite);
                    } else if(k === "sd") {
                        let sprite = new AnimatedSprite(this._engine.resources.get(lib).animations["sd_1_" + gesture + "_0"]);
                        sprite.alpha = 0.04;
                        this._layers.set("sd_1_" + gesture + "_0_" + Math.floor(Math.random() * 100), sprite);
                    }
                });
            }
        }
        this._container?.destroy();
        this._container = new Container();
        this._container.sortableChildren = true;

        this._layers.forEach((layer) => {
            this._container.addChild(layer);
            layer.play();
        });

        if (!this._loaded) {
            this._loaded = true;
        }

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
            if (hh_human_body.data.partsType[k].gestures.includes(this._action)) {
                gesture = this._action
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

    public move(x: number, y: number, z: number): void {
        this._x = x;
        this._y = y;
        this._z = z;
        gsap.to(this, { x: 32 * x - 32 * y, y: 16 * x + 16 * y - 32 * z, duration: 0.5, ease: "none" });
    }

    public startAnimation(): void {

    }

}