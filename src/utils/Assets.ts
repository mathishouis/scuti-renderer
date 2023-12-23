import { Assets, Cache } from 'pixi.js';

interface LoadedKeys {
  [key: string]: Promise<any>;
}

const loadedKeys: LoadedKeys = {};
let assetsPath: string;

async function register(key: string, path: string, onUncached?: () => void): Promise<void> {
  if (loadedKeys[key] !== undefined) {
    await loadedKeys[key];
    return;
  }

  if (!Cache.has(key)) {
    if (onUncached != null) onUncached();
    Assets.add(key, assetsPath + path);
    loadedKeys[key] = Assets.load(key);
    await loadedKeys[key];
  }
}

function asset(key: string): any {
  return Assets.get(key);
}

function registerPath(path: string): void {
  assetsPath = path;
}

export { register, asset, registerPath };
