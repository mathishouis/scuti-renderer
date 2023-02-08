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

    private _frames: Map<number, Map<string, { action: String, frame: number, repeat: number }>> = new Map();

    constructor(
        configuration: AvatarConfiguration
    ) {
        super();

        this._figure = AvatarUtil.parseFigure(configuration.figure);
        this._position = configuration.position;
        this._headDirection = configuration.headDirection;
        this._bodyDirection = configuration.bodyDirection;
        this._actions = configuration.actions;
    }

    private _draw(): void {
        this._destroyParts();
        this._figure.forEach((set: { setId: number, colors: number[] }, type: string) => {
            const parts: AvatarPart[] = AvatarUtil.getParts(type, set.setId);

            parts.forEach((part: AvatarPart) => {
                Assets.add("figures/" + part.lib.id, "http://localhost:8081/figure/" + part.lib.id + "/" + part.lib.id + ".json");
                Assets.load("figures/" + part.lib.id).then(() => this._createLayer(part, {set: set, type: type}));
            });
        });

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    private _createLayer(part: AvatarPart, set: { set: { setId: number, colors: number[] }, type: string }): void {
        if(!this._frames.has(part.id)) this._frames.set(part.id, new Map());

        const spritesheet: Spritesheet = Assets.get("figures/" + part.lib.id);
        const avatarActions: AvatarPartAction[] = Assets.get("figures/actions");
        const avatarAnimations: [] = Assets.get("figures/animations");
        const avatarPartSets: AvatarPartSet = Assets.get("figures/partsets");

        Object.keys(spritesheet.data.partsType).forEach((type: string) => {
            if(!this._frames.get(part.id).has(type)) this._frames.get(part.id).set(type, {
                action: "Default",
                frame: 0,
                repeat: 0
            });
            //console.log(this._frames);
            //console.log(this._frames.get(part.id).find(frame => frame.has(type)));
            //let action: AvatarAction = AvatarAction.Default;
            //let actionPrecedence: number = Number(avatarActions[action].precedence);
            let direction: Direction = this._bodyDirection;

            /*spritesheet.data.partsType[type].gestures.forEach((gesture: string) => {
                if(type.includes("l")) console.log(type, gesture);

                const actions: AvatarAction[] = this._actions.filter((avatarAction: AvatarAction) => AvatarUtil.getAction(gesture).includes(avatarAction));
                actions.forEach((avatarAction: AvatarAction) => {
                    if (Number(avatarActions[avatarAction].precedence) < actionPrecedence) {
                        action = avatarAction;
                        actionPrecedence = avatarActions[avatarAction].precedence;
                        console.log(true)
                        //                        if(type.includes("l")) console.log(type, gesture, action, actionPrecedence);
                    }
                });
            });*/

            const sortedActions: AvatarAction[] = [];
            this._actions.forEach((action: AvatarAction) => {
                const avatarAction: AvatarPartAction = avatarActions[action];
                if(avatarAction !== undefined) {
                    const activePartSet: string = avatarActions[action].activepartset;
                    if(avatarPartSets.activePartSets[activePartSet].includes(type)) {
                        sortedActions.push(action);
                    }
                }
            });
            let actionPrecedence: number = 10000;
            let finalAction: AvatarAction = AvatarAction.Default;
            sortedActions.forEach((action: AvatarAction) => {
                const avatarAction: AvatarPartAction = avatarActions[action];
                if(Number(avatarAction.precedence) < actionPrecedence) {
                    actionPrecedence = Number(avatarAction.precedence);
                    finalAction = action;
                }
            });
            /*if(type === "hd") finalAction = AvatarAction.Default;
            if(type === "ey") finalAction = AvatarAction.Default;
            if(type === "rs") finalAction = AvatarAction.Default;*/
            /*if(!spritesheet.data.partsType[type].gestures.includes(avatarActions[finalAction].assetpartdefinition)) {
                finalAction = AvatarAction.Default;
            }*/

            if (avatarPartSets.activePartSets.head.includes(type)) {
                direction = this._headDirection;
            }

            const animation = avatarAnimations[finalAction];
            let gesture: string = avatarActions[finalAction].assetpartdefinition
            let frame: Number = 0;
            if(animation !== undefined && animation.frames[this._frames.get(part.id).get(type).frame].bodyparts[type] !== undefined) {
                this._frames.get(part.id).get(type).action = finalAction;
                frame = animation.frames[this._frames.get(part.id).get(type).frame].bodyparts[type].frame;
                gesture = animation.frames[this._frames.get(part.id).get(type).frame].bodyparts[type].assetpartdefinition
                //console.log(frame);
            }

            let tempDirection: number = direction;
            if([4, 5, 6, 7].includes(tempDirection)) {
                tempDirection = 6 - tempDirection
            }
            if(spritesheet.textures[part.lib.id + "_h_" + gesture + "_" + type + "_" + part.id + "_" + tempDirection + "_" + frame] === undefined) {
                gesture = "std";
                finalAction = AvatarAction.Respect;
                this._frames.get(part.id).get(type).action = finalAction;
            }

                //console.log(action, this._frames);

            //if(type === "ls" || type === "lh" || type === "lc") console.log(1, part.lib.id + "_h_" + avatarActions[finalAction].assetpartdefinition + "_" + type + "_" + part.id + "_" + direction + "_" + frame);
            //if(type === "hr" || type === "hd") console.log(type, finalAction, gesture);

            //if(spritesheet.animations[type + "_" + part.id + "_" + gesture + "_" + direction] !== undefined && !spritesheet.animations[type + "_" + part.id + "_" + gesture + "_" + direction].includes(undefined)) {
            //if(type === "hd" || type === "ey" || type === "rs") console.log(type, finalAction, gesture, animation.frames[this._frames.get(part.id).get(type).frame].bodyparts[type]);


            try {
                this.addChild(new AvatarLayer(this, {
                    type: type,
                    part: part,
                    gesture: gesture,
                    tint: part.colorable === 1 && type !== "ey" ? AvatarUtil.getColor(set.type, set.set.colors[part.index]) : undefined,
                    z: AvatarUtil.getDrawOrder(type, gesture, direction),
                    flip: true,
                    direction: direction,
                    frame: frame
                }));
            } catch (e) {
                //console.log(e);

            }
            //}
        });
    }

    private _updateFrame(): void {
        const avatarAnimations: [] = Assets.get("figures/animations");

        this._frames.forEach((types: Map<string, { action: string, frame: number, repeat: number }>, partId: number ) => {
            types.forEach((value: { action: string, frame: number, repeat: number }, type: string) => {
                const animation = avatarAnimations[value.action];
                //console.log(animation, value.action, avatarAnimations);
                if(animation !== undefined && animation.frames[value.frame] !== undefined && animation.frames[value.frame].bodyparts[type] !== undefined) {
                    if(animation.frames[value.frame].bodyparts[type].repeats !== undefined) {
                        if(value.repeat >= Number(animation.frames[value.frame].bodyparts[type].repeats)) {
                            this._frames.get(partId).get(type).repeat = 0;
                            if (value.frame >= animation.frames.length - 1) {
                                this._frames.get(partId).get(type).frame = 0;
                            } else {
                                this._frames.get(partId).get(type).frame += 1;
                            }
                        } else {
                            this._frames.get(partId).get(type).repeat += 1;
                        }
                    } else {
                        if (value.frame >= animation.frames.length - 1) {
                            this._frames.get(partId).get(type).frame = 0;
                        } else {
                            this._frames.get(partId).get(type).frame += 1;
                        }
                    }
                }
            });
        });

        this._draw();
    }

    /**
     * On each animation tick
     * @private
     */
    private _onTicker(): void {
        this._updateFrame();
    }

    /**
     * Start the furniture animation
     */
    public startAnimation(): void {
        this.animationTicker.add(() => this._onTicker());
    }

    /**
     * Stop the furniture animation
     */
    public stopAnimation(): void {
        this.animationTicker.remove(() => this._onTicker());
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
