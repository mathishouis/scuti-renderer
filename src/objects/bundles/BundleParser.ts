import {
    BaseTexture,
    checkDataUrl,
    checkExtension,
    ExtensionType,
    LoaderParser,
    LoaderParserPriority,
    settings, Spritesheet, Texture, utils
} from "pixi.js";
import { Bundle } from "scuti-bundle";
import {Buffer} from "buffer";

const validBundleExtension: string = ".bundle";
const validBundleMIME: string = "application/octet-stream";

export const loadBundle = {
    extension: {
        type: ExtensionType.LoadParser,
        priority: LoaderParserPriority.Low,
    },
    name: "loadBundle",
    test(url: string): boolean {
        return checkDataUrl(url, validBundleMIME) || checkExtension(url, validBundleExtension);
    },
    async load<T>(url: string): Promise<T> {
        const response: Response = await settings.ADAPTER.fetch(url);
        const buffer: ArrayBuffer = await response.arrayBuffer();
        const bundle: Bundle = new Bundle(Buffer.from(buffer));

        // TEXTURE PARSER
        const src: ImageBitmap = await createImageBitmap(new Blob([bundle.get("texture")]));
        const baseTexture: BaseTexture = new BaseTexture(src);
        baseTexture.resource.internal = true;
        const texture = new Texture(baseTexture);

        const data = JSON.parse(bundle.get("data").toString());
        const spritesheet = new Spritesheet(texture, data);

        utils.clearTextureCache();

        await spritesheet.parse();

        return spritesheet as T;
    },
} as LoaderParser;
