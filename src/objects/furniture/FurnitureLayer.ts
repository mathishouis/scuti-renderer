import {Sprite, Texture, utils} from "pixi.js";
import {IFurnitureLayerProps} from "../../interfaces/IFurnitureLayerProps";
import {Scuti} from "../../Scuti";
import {Room} from "../..";
import {HitTexture} from "../interactions/HitTexture";

export class FurnitureLayer extends Sprite {

    public _texture: Texture;
    private _name: string;
    private _frame: number;
    private _layerZ: number;
    private _engine: Scuti;
    private _room: Room;
    private _tag: string;
    private _hitTexture: HitTexture;

    constructor(props: IFurnitureLayerProps) {
        super(props.texture);

        this._name = props.name;
        this._texture = props.texture;
        this._frame = props.frame;
        this._engine = props.engine;
        this._tag = props.tag;

        this._layerZ = props.layerZ;
        // @ts-ignore
        this.interactive = props.interactive;
        //this.buttonMode = props.interactive;

        this._room = props.room;
        // @ts-ignore
        this.parentLayer = props.room.roomObjectLayer;
        // @ts-ignore
        props.z ? this.zOrder = Number(props.z) : null;
        props.tint ? this.tint = utils.premultiplyTint(props.tint, 0.999) : null;
        props.blendMode ? this.blendMode = props.blendMode : null;
        props.alpha ? this.alpha = props.alpha : null;
        props.flip ? this.scale.x = -1 : null;

    }

    public get layerZ(): number {
        return this._layerZ;
    }

    public get tag(): string {
        return this._tag;
    }

    public get engine(): Scuti {
        return this._engine;
    }

    public get hitTexture(): HitTexture {
        return this._hitTexture;
    }

    containsPoint(point) {

        const width = this.texture.orig.width;
        const height = this.texture.orig.height;
        // @ts-ignore
        const x1 = this.getGlobalPosition().x + this.texture.trim.x;
        let y1 = 0;

        let flag = false;
        const tempPoint = {
            x: this._engine.application.renderer.plugins.interaction.mouse.global.x,
            y: this._engine.application.renderer.plugins.interaction.mouse.global.y
        }


        if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
            // @ts-ignore
            y1 = this.getGlobalPosition().y + this.texture.trim.y;

            if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
                flag = true;
            }
        }

        if (!flag) {
            return false
        }

        if(!this._hitTexture) {
            this._hitTexture = new HitTexture(this);
        }

        return this._hitTexture.hit(tempPoint.x - x1, tempPoint.y - y1, this.scale.x === -1);
    }

}