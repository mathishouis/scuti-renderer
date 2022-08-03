import { Assets } from '@pixi/assets';

export class ResourceManager {

    private readonly _resourceUrl: string;

    constructor(resourcesUrl: string) {

        this._resourceUrl = resourcesUrl;

    }

    public async initialise(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.add('room', 'generic/room/room.json');
            this.add('room_data', 'generic/room/room_data.json');
            this.add('tile_cursor', 'generic/tile_cursor/tile_cursor.json');
            this.add('place_holder_furniture', 'generic/place_holder/place_holder_furniture.json');
            this.add('furnidata', 'gamedata/furnidata.json');
            this.add('hh_human_body', 'figure/hh_human_body/hh_human_body.json');
            this.add('figuredata', 'gamedata/figuredata.json');
            this.add('figuremap', 'gamedata/figuremap.json');
            this.add('draworder', 'gamedata/draworder.json');
            await this.load('room');
            await this.load('room_data');
            await this.load('tile_cursor');
            await this.load('place_holder_furniture');
            await this.load('furnidata');
            await this.load('hh_human_body');
            await this.load('figuredata');
            await this.load('figuremap');
            await this.load('draworder');
            resolve();
        });
    }

    public add(name: string, url: string): void {
        Assets.add(name, this._resourceUrl + url, { cors: true });
    }

    public async load(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            Assets.load(name).then((value) => {
                resolve(value);
            });
        });
    }

    public has(name: string): boolean {
        if(Assets.get(name) !== undefined) {
            return true;
        }
        return false;
    }

    /*public async get(name: string, url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.has(name)) {
                resolve(Assets.get(name));
            } else {
                this.add(name, url);
                this.load(name).then((value) => {
                    resolve(value);
                });
            }
        });
    }*/
    public get(name: string) {
        return Assets.get(name);
    }


}