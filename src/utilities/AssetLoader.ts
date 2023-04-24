import { Assets } from 'pixi.js'

const domain = 'http://localhost:8081/'

const load = async (key: string, url: string, onUncached?: () => void): Promise<void> => {
  if (Assets.get(key) === undefined) {
    if (onUncached != null) {
      onUncached()
    }
    Assets.add(key, AssetLoader.domain + url)
    await Assets.load(key)
  }
}

/**
 * Loads assets from a certain domain
 *
 * @memberof Scuti
 */
export const AssetLoader = { domain, load }
