import {BaseTexture, checkExtension, Texture} from "pixi.js";
import { Buffer } from "buffer";
import {Parser} from "./Parser.ts";

export class TextureParser extends Parser {
    public static test(name: string): boolean {
        return checkExtension(name, ".png")
    }

    public static async parse<Texture>(buffer: Buffer): Promise<Texture> {
        const src: ImageBitmap = await createImageBitmap(new Blob([buffer]));
        const baseTexture: BaseTexture = new BaseTexture(src);

        baseTexture.resource.internal = true;

        const texture = new Texture(baseTexture);

        return texture;
    }
}
