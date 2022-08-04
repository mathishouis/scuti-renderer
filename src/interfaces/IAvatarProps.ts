import {Action} from "../enum/Action";

export interface IAvatarProps {
    x: number,
    y: number,
    z: number,
    direction: number,
    headDirection?: number,
    figure: string,
    actions?: Action[]
}