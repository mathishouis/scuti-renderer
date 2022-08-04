import { Assets } from '@pixi/assets';
import {Log} from "../utils/Logger";

export class ResourceManager {

    private readonly _resourceUrl: string;
    private _resources: string[] = [];

    constructor(resourcesUrl: string) {

        this._resourceUrl = resourcesUrl;

    }

    public async initialise(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const startDate: Date = new Date();
            this.add('room', 'generic/room/room.json');
            this.add('room_data', 'generic/room/room_data.json');
            this.add('tile_cursor', 'generic/tile_cursor/tile_cursor.json');
            this.add('place_holder_furniture', 'generic/place_holder/place_holder_furniture.json');
            this.add('hh_human_body', 'figure/hh_human_body/hh_human_body.json');
            await this.load('room');
            await this.load('room_data');
            await this.load('tile_cursor');
            await this.load('place_holder_furniture');
            await this.load('hh_human_body');
            const endDate: Date = new Date();
            Log('Resource Manager', 'Initialised in ' + (endDate.getTime() - startDate.getTime()) + 'ms.', 'info');
            resolve();
        });
    }

    public add(name: string, url: string): void {
        this._resources.push(name);
        Assets.add(name, this._resourceUrl + url);
    }

    public async load(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            Assets.load(name).then((value) => {
                resolve(value);
            });
        });
    }

    public waitForLoad(name: string): Promise<void> {
        const loadStatus = resolve => {
            if (this.has(name)) resolve();
            else setTimeout(_ => loadStatus(resolve), 400);
        }
        return new Promise(loadStatus);
    }

    public hasInQueue(name: string): boolean {
        if(this._resources.includes(name)) {
            return true;
        }
        return false;
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