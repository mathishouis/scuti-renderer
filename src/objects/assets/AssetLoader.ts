import { Assets, Cache } from 'pixi.js';

interface LoadedKeys {
  [key: string]: Promise<any>;
}

export class AssetLoader {
  static loadedKeys: LoadedKeys = {};
  static assetsPath: string;

  public static async load(key: string, path: string, onUncached?: () => void): Promise<void> {
    if (AssetLoader.loadedKeys[key] !== undefined) {
      await AssetLoader.loadedKeys[key];
      return;
    }
    if (!Cache.has(key)) {
      if (onUncached != null) onUncached();
      Assets.add(key, AssetLoader.assetsPath + path);
      AssetLoader.loadedKeys[key] = Assets.load(key);
      await AssetLoader.loadedKeys[key];
    }
  }

  public static get(key: string): any {
    return Assets.get(key);
  }
}
