import {
    checkDataUrl,
    checkExtension,
    ExtensionType,
    LoaderParser,
    LoaderParserPriority,
    settings
} from "pixi.js";
import { Bundle } from "scuti-bundle";
import {Buffer} from "buffer";
import {JsonParser} from "./parsers/JsonParser.ts";
import {Parser} from "./parsers/Parser.ts";
import {TextureParser} from "./parsers/TextureParser.ts";

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

        const parsers: Parser[] = [JsonParser, TextureParser];

        const files: Map<string, any> = new Map();

        console.log(bundle.files);

        bundle.files.forEach((file: Buffer, name: string) => {
            parsers.forEach(async (parser: Parser) => {
                if (parser.test(name)) {
                    files.set(name, await parser.parse(file));
                    return;
                }
            });
        });

        console.log(files);
        return files as T;
        /*console.log(bundle);
        console.log(bundle.get("walls.json").toString())
        console.log(spritesheetAsset.loader?.testParse);*/
        //return json as T;
    },
} as LoaderParser;
