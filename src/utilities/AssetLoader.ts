import { Assets, Cache } from 'pixi.js';

const domain = 'http://localhost:8081/';

interface LoadedKeys {
  [key: string]: Promise<any>;
}
const loadedKeys: LoadedKeys = {};

const load = async (key: string, url: string, onUncached?: () => void): Promise<void> => {
  if (loadedKeys[key] !== undefined) return await loadedKeys[key];

  if (!Cache.has(key)) {
    if (onUncached != null) onUncached();
    Assets.add(key, AssetLoader.domain + url);
    loadedKeys[key] = Assets.load(key);
    await loadedKeys[key];
  }
};

/**
 * Loads assets from a certain domain
 *
 * @memberof Scuti
 */
export const AssetLoader = { domain, load };
