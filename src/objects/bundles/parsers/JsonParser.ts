import { checkExtension } from "pixi.js";
import { Buffer } from "buffer";
import {Parser} from "./Parser.ts";

export class JsonParser extends Parser {
    public static test(name: string): boolean {
        return checkExtension(name, ".json")
    }

    public static async parse<T>(buffer: Buffer): Promise<T> {
        return JSON.parse(buffer.toString());
    }
}
