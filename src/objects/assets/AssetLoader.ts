import { ILoadedKeys } from "../../interfaces/ILoadedKeys.ts";
import { Assets, Cache } from "pixi.js";

export class AssetLoader {
    static loadedKeys: ILoadedKeys = {};

    public static async load(key: string, path: string, onUncached?: () => void): Promise<void> {
        if ((AssetLoader.loadedKeys)[key] !== undefined) {
            await (AssetLoader.loadedKeys)[key];
            return;
        }
        if (!Cache.has(key)) {
            if (onUncached != null) onUncached();
            Assets.add(key, "http://localhost:8081" + path);
            (AssetLoader.loadedKeys)[key] = Assets.load(key);
            await (AssetLoader.loadedKeys)[key];
        }
    }

    public static get(key: string): any {
        return Assets.get(key);
    }
}
