import { Direction } from "../enums/Direction";
import { IFloorPosition } from "./Furniture.interface";
import { AvatarAction } from "../objects/avatars/actions/AvatarAction";

export type AvatarFigure = Map<string, { setId: number, colors: number[] }>;

export interface IAvatarConfiguration {
    figure: string,
    position: IFloorPosition,
    bodyDirection: Direction,
    headDirection: Direction,
    actions: AvatarAction[]
}

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

export interface IAvatarLayerConfiguration {
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

