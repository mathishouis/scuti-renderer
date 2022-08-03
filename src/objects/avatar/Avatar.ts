import {RoomObject} from "../room/RoomObject";
import {Scuti} from "../../Scuti";
import {IAvatarProps} from "../../interfaces/IAvatarProps";
import {AnimatedSprite, Container} from "pixi.js";
import { gsap } from "gsap";

export class Avatar extends RoomObject {

    private _engine: Scuti;

    private _x: number;
    private _y: number;
    private _z: number;
    private _direction: number;
    private _figure: string;
    private _action: string;
    private _container?: Container;

    constructor(engine: Scuti, props: IAvatarProps) {
        super();

        this._engine = engine;

        this._x = props.x;
        this._y = props.y;
        this._z = props.z;
        this._direction = props.direction;
        this._figure = props.figure;
        this._action = props.action ?? 'std';

        this._draw();
    }

    private async _draw(): Promise<void> {

        this._container?.destroy();
        this._container = new Container();
        this._container.sortableChildren = true;

        let hh_human_body = this._engine.resources.get('hh_human_body');
        let sd = new AnimatedSprite(hh_human_body.animations["sd_1_std_0"]);
        sd.animationSpeed = 0.167;
        sd.alpha = 0.19;
        sd.play();
        this._container.addChild(sd);
        console.log(hh_human_body);
        let leftArm = new AnimatedSprite(hh_human_body.animations["lh_1_wlk_" + this._direction]);
        leftArm.animationSpeed = 0.167;
        leftArm.play();
        this._container.addChild(leftArm);
        let body = new AnimatedSprite(hh_human_body.animations["bd_1_wlk_" + this._direction]);
        body.animationSpeed = 0.167;
        body.play();
        this._container.addChild(body);
        let rightArm = new AnimatedSprite(hh_human_body.animations["rh_1_wlk_" + this._direction]);
        rightArm.animationSpeed = 0.167;
        rightArm.play();
        this._container.addChild(rightArm);
        let head = new AnimatedSprite(hh_human_body.animations["hd_1_spk_" + this._direction]);
        head.animationSpeed = 0.167;
        head.play();
        this._container.addChild(head);
        this.addChild(this._container);

        console.log(this._figure);
        console.log(this._engine.avatars.getColor(this._engine.avatars.splitLookFigure(this._figure)[1].type, this._engine.avatars.splitLookFigure(this._figure)[1].colors[0]));
        console.log(this._engine.avatars.getParts(this._engine.avatars.splitLookFigure(this._figure)[1].type, this._engine.avatars.splitLookFigure(this._figure)[1].partId));

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