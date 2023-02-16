import { RoomObject } from "../rooms/RoomObject";
import { IFloorPosition } from "../../interfaces/Furniture.interface";
import { Direction } from "../../enums/Direction";
import { AvatarAction } from "./actions/AvatarAction";
import { AvatarFigure, IAvatarConfiguration, IAvatarPart } from "../../interfaces/Avatar.interface";
import { gsap } from "gsap";
import { AvatarActionManager } from "./actions/AvatarActionManager";
import { AvatarAnimationManager } from "./animations/AvatarAnimationManager";
import { AvatarBodyPart } from "./AvatarBodyPart";
import { AvatarLayer } from "./AvatarLayer";
import { Assets } from "pixi.js";
import {InteractionManager} from "../interactions/InteractionManager";
import {IInteractionEvent} from "../../interfaces/Interaction.interface";

export class Avatar extends RoomObject {

    private _figure: AvatarFigure;

    private _position: IFloorPosition;

    private _bodyDirection: Direction;

    private _headDirection: Direction;

    private _actions: AvatarAction[];

    private _handItem: number;

    private _actionManager: AvatarActionManager;

    private _animationManager: AvatarAnimationManager;

    private _interactionManager: InteractionManager = new InteractionManager();

    private _bodyParts: AvatarBodyPart[] = [];

    constructor(
        configuration: IAvatarConfiguration
    ) {
        super();

        this._figure = this._parseFigure(configuration.figure);
        this._position = configuration.position;
        this._headDirection = configuration.headDirection;
        this._bodyDirection = configuration.bodyDirection;
        this._actions = configuration.actions;
        this._handItem = configuration.handItem;

        this._actionManager = new AvatarActionManager(AvatarAction.Default);
        this._animationManager = new AvatarAnimationManager();
        this._actions.forEach((action: AvatarAction) => this._animationManager.registerAnimation(action));

        this._figure.forEach((set: { setId: number, colors: number[] }, type: string) => {
            const parts: IAvatarPart[] = this._getParts(type, set.setId);
            this._bodyParts.push(new AvatarBodyPart(this, {
                type: type,
                setId: set.setId,
                colors: set.colors,
                parts: parts,
                actions: this._actions
            }));
        });
        //this.interactive = true;
    }

    private _draw(): void {
        this._destroyParts();
        if(this._handItem !== 0 || this._handItem !== undefined) {
            if(Assets.get("figures/hh_human_item") === undefined) {
                Assets.add("figures/hh_human_item", "http://localhost:8081/figure/hh_human_item/hh_human_item.json");
                Assets.load("figures/hh_human_item").then(() => this._createHandItem(this._handItem));
            } else {
                this._createHandItem(this._handItem);
            }
        }
        if(Assets.get("figures/hh_human_body") === undefined) {
            Assets.add("figures/hh_human_body", "http://localhost:8081/figure/hh_human_body/hh_human_body.json");
            Assets.load("figures/hh_human_body").then(() => this._createShadow());
        } else {
            this._createShadow();
        }
        this._bodyParts.forEach((bodyPart: AvatarBodyPart) => bodyPart.updateParts());

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    private _createHandItem(
        item: number
    ): void {
        const handItemCarryId: number = this._actionManager.getActionDefinition(AvatarAction.CarryItem).params[String(item)];
        const handItemUseId: number = this._actionManager.getActionDefinition(AvatarAction.UseItem).params[String(item)];
        if(this._actions.includes(AvatarAction.UseItem) && handItemUseId !== undefined) {
            this.addChild(new AvatarLayer(this, {
                type: "ri",
                part: { id: handItemUseId, lib: { id: "hh_human_item" }},
                gesture: "drk",
                tint: undefined,
                z: 1000,
                flip: false,
                direction: this._bodyDirection,
                frame: 0
            }));
        } else if(this._actions.includes(AvatarAction.CarryItem) && handItemCarryId !== undefined) {
            this.addChild(new AvatarLayer(this, {
                type: "ri",
                part: { id: handItemCarryId, lib: { id: "hh_human_item" }},
                gesture: "crr",
                tint: undefined,
                z: 1000,
                flip: false,
                direction: this._bodyDirection,
                frame: 0
            }));
        }
    }

    private _createPlaceholder(): void {

    }

    private _createShadow(): void {
        this.addChild(new AvatarLayer(this, {
            type: "sd",
            part: { id: 1, lib: { id: "hh_human_body" }},
            gesture: "std",
            tint: undefined,
            z: 0,
            flip: true,
            direction: 0,
            frame: 0,
            alpha: 0.1
        }));
    }

    private _destroyParts(): void {
        while(this.children[0]) {
            this.removeChild(this.children[0]);
        }
    }

    private _parseFigure(figure: string): AvatarFigure {
        return new Map(figure.split(".").map(part => {
            const data: string[] = part.split("-");
            return [
                data[0],
                {
                    setId: Number(data[1]),
                    colors: data.splice(2, 2).map(color => {
                        return Number(color);
                    })
                },
            ] as const;
        }));
    }

    private _getParts(type: string, setId: number): IAvatarPart[] {
        const figureData: [] = Assets.get('figures/figuredata');
        const figureMap: [] = Assets.get('figures/figuremap');
        const hiddenLayers: [] = figureData.settype[type]?.set[setId]["hiddenLayers"];
        let parts = [];
        let set = figureData.settype[type]?.set[setId];
        set?.parts.forEach((part) => {
            let libId = figureMap.parts[part.type][String(part.id)];
            let lib = figureMap.libs[libId];
            //console.log(part.type, libId);
            part.lib = lib;
            parts.push(part);
        });
        if(hiddenLayers !== undefined) {
            parts = parts.filter(part => !hiddenLayers.includes(part.type));
        }
        return parts;
    }

    /**
     * On each animation tick
     * @private
     */
    private _onTicker(): void {
        this._draw();
    }

    /**
     * Start the furniture animation
     */
    public start(): void {
        this.animationTicker.add(() => this._onTicker());
    }

    /**
     * Stop the furniture animation
     */
    public stop(): void {
        this.animationTicker.remove(() => this._onTicker());
    }

    public get pos(): IFloorPosition {
        return this._position;
    }

    public set pos(position: IFloorPosition) {
        gsap.to(this, {
            x: 32 * position.x - 32 * position.y, y: 16 * position.x + 16 * position.y - 32 * position.z, duration: 0.5, ease: "linear", onComplete: () => {
                this._position = position;
            }
        });
    }

    public get actions(): AvatarAction[] {
        return this._actions;
    }

    public get headDirection(): Direction {
        return this._headDirection;
    }

    public get bodyDirection(): Direction {
        return this._bodyDirection;
    }

    public get actionManager(): AvatarActionManager {
        return this._actionManager;
    }

    public get animationManager(): AvatarAnimationManager {
        return this._animationManager;
    }

    public get interactionManager(): InteractionManager {
        return this._interactionManager;
    }

    get onPointerDown(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerDown;
    }

    set onPointerDown(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerDown = value;
    }

    get onPointerUp(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerUp;
    }

    set onPointerUp(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerUp = value;
    }

    get onPointerMove(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerMove;
    }

    set onPointerMove(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerMove = value;
    }

    get onPointerOut(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerOut;
    }

    set onPointerOut(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerOut = value;
    }

    get onPointerOver(): (event: IInteractionEvent) => void {
        return this._interactionManager.onPointerOver;
    }

    set onPointerOver(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onPointerOver = value;
    }

    get onDoubleClick(): (event: IInteractionEvent) => void {
        return this._interactionManager.onDoubleClick;
    }

    set onDoubleClick(
        value: (event: IInteractionEvent) => void
    ) {
        this._interactionManager.onDoubleClick = value;
    }

}
