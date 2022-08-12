import { Texture } from 'pixi.js';
import { StairType } from "../types/StairType";
import {Room} from "..";

export interface ITileCursorProps {
    x: number,
    y: number,
    z: number,
    texture: Texture;
    room: Room
}