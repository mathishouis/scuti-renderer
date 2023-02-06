import {Direction} from "../types/Direction";
import {FloorPosition, FurnitureLayerId} from "./Furniture.interface";
import {AvatarAction} from "../objects/avatars/AvatarAction";
import {BLEND_MODES} from "pixi.js";

export interface AvatarConfiguration {
    figure: string,
    position: FloorPosition,
    bodyDirection: Direction,
    headDirection: Direction,
    actions: AvatarAction[]
}

export type AvatarFigure = Map<string, { setId: number, colors: number[] }>;

export interface AvatarPart {
    colorable: number,
    colorindex: number
    id: number,
    index: number,
    lib: {
        id: string,
        revision: string
    },
    type: string
}

export interface AvatarPartAction {
    state: string,
    precedence: string,
    main: string,
    geometrytype: string,
    activepartset: string,
    assetpartdefinition: string,
    prevents: string
}

export interface AvatarPartSet {
    partSets: {

    },
    activePartSets: {
        figure: string[],
        head: string[],
        speak: string[],
        gesture: string[],
        eye: string[],
        handRight: string[],
        handRightAndHead: string[],
        handLeft: string[],
        walk: string[],
        sit: string[],
        itemRight: string[],
        swim: string[],
    }
}

export interface AvatarLayerConfiguration {
    type: string,
    part: AvatarPart,
    action: AvatarAction,
    tint: number,
    z: number,
    flip: boolean,
    direction: Direction
}

export type AvatarFrameId = number;

export type AvatarLayerId = number;
