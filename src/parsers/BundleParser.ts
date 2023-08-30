import {
    checkDataUrl,
    checkExtension,
    extensions,
    ExtensionType,
    LoaderParser,
    LoaderParserPriority,
    settings, spritesheetAsset
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
        //const json = await response.json();
        const buffer: ArrayBuffer = await response.arrayBuffer();
        const bundle: Bundle = new Bundle(Buffer.from(buffer));
        console.log(bundle);
        console.log(bundle.get("walls.json").toString())
        console.log(spritesheetAsset.loader?.testParse);
        //return json as T;
    },
} as LoaderParser;
