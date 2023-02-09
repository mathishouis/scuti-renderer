import {Direction} from "../types/Direction";
import {FloorPosition} from "./Furniture.interface";
import {AvatarAction} from "../objects/avatars/actions/AvatarAction";

export interface IAvatarConfiguration {
    figure: string,
    position: FloorPosition,
    bodyDirection: Direction,
    headDirection: Direction,
    actions: AvatarAction[]
}

export type AvatarFigure = Map<string, { setId: number, colors: number[] }>;

export interface IAvatarPart {
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

export interface IActionDefinition {
    state: string,
    precedence: string,
    main: string,
    geometrytype: string,
    activepartset: string,
    assetpartdefinition: string,
    prevents: string
}

export interface IAnimationDefinition {
    desc: string,
    frames: {
        bodyparts: {}
    }[],
}

export interface IAnimationFrameData {
    assetpartdefinition: string,
    repeats: number,
    frame: number
}

export interface IBodyPartConfiguration {
    type: string,
    setId: number,
    colors: number[],
    parts: IAvatarPart[],
    actions: AvatarAction[]
}

export interface IAvatarPartSets {
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
    part: IAvatarPart,
    gesture: string,
    tint: number,
    z: number,
    flip: boolean,
    direction: Direction,
    frame: number,
    alpha?: number
}

