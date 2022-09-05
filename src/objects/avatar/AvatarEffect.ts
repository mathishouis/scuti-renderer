import {RoomObject} from "../room/RoomObject";
import {Scuti} from "../../Scuti";
import {IAvatarProps} from "../../interfaces/IAvatarProps";
import {Sprite, Container} from "pixi.js";
import {IAvatarEffectProps} from "../../interfaces/IAvatarEffectProps";
import {Avatar} from "./Avatar";
import {getZOrderAvatar} from "../../utils/ZOrder";

export class AvatarEffect extends RoomObject {

    private _engine: Scuti;

    private _id: number;
    private _name: string;
    private _container?: Container;
    private _avatar: Avatar;

    constructor(engine: Scuti, props: IAvatarEffectProps) {
        super();

        this._engine = engine;

        this._id = props.id;
        this._name = this._engine.avatars.getEffect("fx", props.id);

        console.log(this._name);

    }

    public async draw(redrawAll: boolean = false): Promise<void> {

        return new Promise(async (resolve, reject) => {

            if (!this._engine.resources.hasInQueue(this._name)) {
                this._engine.resources.add(this._name, 'effect/' + this._name + '/' + this._name + '.json');
                await this._engine.resources.load(this._name);
            } else {
                await this._engine.resources.waitForLoad(this._name);
            }

            Object.entries(this._engine.resources.get(this._name).data.animations["fx." + this._id].frames[0]["fx"]).forEach(sprite => {
                console.log(this._avatar.direction, "direction");
                let direction = this._avatar.direction;
                if (direction === 4) direction = 2;
                if (direction === 5) direction = 1;
                if (direction === 6) direction = 0;
                let sp = new Sprite(this._engine.resources.get(this._name).textures[this._name + '_h_std_' + sprite[0] + '_1_' + direction + '_0']);
                console.log(this._engine.resources.get(this._name).textures[this._name + '_h_std_' + sprite[0] + '_1_' + direction + '_0']);
                sp.parentLayer = this._avatar.room.roomObjectLayer;
                sp.zOrder = getZOrderAvatar(this._avatar._x, this._avatar._y, this._avatar._z);
                [4, 5, 6, 7].includes(this._avatar.direction) ? sp.scale.x = -1 : null;
                [4, 5, 6, 7].includes(this._avatar.direction) ? sp.x = 64 : null;
                if (this._engine.resources.get(this._name).data.animations["fx." + this._id].add) {
                    let blend = this._engine.resources.get(this._name).data.animations["fx." + this._id].add[sprite[0]]?.blend;
                    if (blend) {
                        sp.alpha = blend / 100;
                    }
                }
                /*if(align) {
                    switch (align) {
                        case "bottom":
                            sp.anchor._y = 1;
                            break;
                        case "top":
                            sp.anchor._y = 0;
                            break;
                    }
                }*/
                sp.zIndex = Number(sprite[1]['dy']);

                this._avatar._container.addChild(sp);
                console.log(this._engine.resources.get(this._name).textures[this._name + '_h_std_' + sprite[0] + '_1_0_0'], this._name + '_h_std_' + sprite[0] + '_1_0_0');
            });

            //let layers = this._getLayers();
            resolve();
        });

    }

    public get avatar() {
        return this._avatar;
    }

    public set avatar(value) {
        this._avatar = value;
    }

}