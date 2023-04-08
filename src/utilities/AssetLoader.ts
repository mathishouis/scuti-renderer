import { Assets } from "pixi.js";

/**
 * Loads assets from a certain domain
 *
 * @class
 * @memberof Scuti
 */
export class AssetLoader {
    static domain: string = "http://localhost:8081/";

    static async load(key: string, url: string, onUncached?: () => void) {
        if (Assets.get(key) === undefined) {
            if (onUncached) {
                onUncached();
            }
            Assets.add(key, AssetLoader.domain + url);
            await Assets.load(key);
        }
    }
}
