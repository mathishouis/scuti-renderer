import {RoomObject} from "../rooms/RoomObject";
import {FloorPosition} from "../../interfaces/Furniture.interface";
import {Direction} from "../../types/Direction";
import {AvatarAction} from "./AvatarAction";
import {Assets, Spritesheet} from "pixi.js";
import {
    AvatarConfiguration,
    AvatarFigure,
    AvatarPart,
    AvatarPartAction,
    AvatarPartSet
} from "../../interfaces/Avatar.interface";
import {AvatarUtil} from "../../utilities/AvatarUtil";
import {AvatarLayer} from "./AvatarLayer";
import {gsap} from "gsap";

export class Avatar extends RoomObject {

    private _figure: AvatarFigure;

    private _position: FloorPosition;

    private _bodyDirection: Direction;

    private _headDirection: Direction;

    private _actions: AvatarAction[];

    constructor(
        configuration: AvatarConfiguration
    ) {
        super();

        this.sortableChildren = true;

        this._figure = AvatarUtil.parseFigure(configuration.figure);
        this._position = configuration.position;
        this._headDirection = configuration.headDirection;
        this._bodyDirection = configuration.bodyDirection;
        this._actions = configuration.actions;

        this._draw();
    }

    private _draw(): void {
        this._destroyParts();
        this._figure.forEach((set: { setId: number, colors: number[] }, type: string) => {
            const parts: AvatarPart[] = AvatarUtil.getParts(type, set.setId);

            parts.forEach((part: AvatarPart) => {
                Assets.add("figures/" + part.lib.id, "http://localhost:8081/figure/" + part.lib.id + "/" + part.lib.id + ".json");
                Assets.load("figures/" + part.lib.id).then(() => this._createLayer(part, { set: set, type: type }));
            });
        });

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    private _createLayer(part: AvatarPart, set: { set: { setId: number, colors: number[] }, type: string }): void {
        const spritesheet: Spritesheet = Assets.get("figures/" + part.lib.id);
        const avatarActions: AvatarPartAction[] = Assets.get("figures/actions");
        const avatarPartSets: AvatarPartSet = Assets.get("figures/partsets");

        Object.keys(spritesheet.data.partsType).forEach((type: string) => {
            let action: AvatarAction = AvatarAction.Default;
            let actionPrecedence: number = Number(avatarActions[action].precedence);
            let direction: Direction = this._bodyDirection;

            spritesheet.data.partsType[type].gestures.forEach((gesture: string) => {

                if (this._actions.some((avatarAction: AvatarAction) => AvatarUtil.getAction(gesture).includes(avatarAction)) && !AvatarUtil.getAction(gesture).includes(AvatarAction.Default)) {
                    const actions: AvatarAction[] = this._actions.filter((avatarAction: AvatarAction) => AvatarUtil.getAction(gesture).includes(avatarAction));
                    actions.forEach((avatarAction: AvatarAction) => {
                        if(Number(avatarActions[avatarAction].precedence) < actionPrecedence) {
                            action = avatarAction;
                            actionPrecedence = avatarActions[avatarAction].precedence;
                        }
                    });
                }

            });

            this._actions.forEach((action: AvatarAction) => {
                console.log(avatarActions[action]);
            });
            if (avatarActions) {
                //const actions: AvatarAction[] = this._actions.filter((avatarAction: AvatarAction) => AvatarUtil.getAction(gesture).includes(avatarAction));
            }

            if (avatarPartSets.activePartSets.head.includes(type)) {
                direction = this._headDirection;
            }

            console.log(action);
            if(action === AvatarAction.Swim) {
                console.log(avatarPartSets.partSets[type]["swim"]);
            }

            if (spritesheet.animations[type + "_" + part.id + "_" + avatarActions[action].assetpartdefinition + "_" + direction] !== undefined && !spritesheet.animations[type + "_" + part.id + "_" + avatarActions[action].assetpartdefinition + "_" + direction].includes(undefined)) {
                this.addChild(new AvatarLayer(this, {
                    type: type,
                    part: part,
                    action: action,
                    tint: part.colorable === 1 && type !== "ey" ? AvatarUtil.getColor(set.type, set.set.colors[part.index]) : undefined,
                    z: AvatarUtil.getDrawOrder(type, action, direction),
                    flip: true,
                    direction: direction
                }));
            }
        });
    }

    private _createPlaceholder(): void {

    }

    private _destroyParts(): void {
        while(this.children[0]) {
            this.removeChild(this.children[0]);
        }
    }

    public get pos(): FloorPosition {
        return this._position;
    }

    public set pos(position: FloorPosition) {
        gsap.to(this, {
            x: 32 * position.x - 32 * position.y, y: 16 * position.x + 16 * position.y - 32 * position.z, duration: 0.5, ease: "linear", onComplete: () => {
                this._position = position;
            }
        });
    }

}
