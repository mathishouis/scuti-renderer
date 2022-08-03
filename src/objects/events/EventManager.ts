import {Log} from "../../utils/Logger";

export class EventManager {

    constructor() {


    }

    public async initialise(): Promise<void> {
        const startDate: Date = new Date();
        const endDate: Date = new Date();
        Log('Event Manager', 'Initialised in ' + (endDate.getTime() - startDate.getTime()) + 'ms.', 'info');
    }


}