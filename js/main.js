import { DataManager } from "./util/DataManager.js";
import { Network } from "./networking/Network.js";

import { IncomingManager } from "./messages/incoming/IncomingManager.js";
import { OutgoingManager } from "./messages/outcoming/OutgoingManager.js";
import { IncomingUserMessages } from "./messages/incoming/Incoming.js";

export let ws = new Network("localhost", "30000");
let incomingManager = new IncomingManager();
export let outgoingManager = new OutgoingManager();

ws.onopen = function(event) {
    const dataLogin = {
        packetId: 212,
        data: {
            username: DataManager.getUsernameInUrl(window.location.search)
        }
    };
    outgoingManager.compose(dataLogin);
}

ws.onclose = function(event) {
    window.document.body.textContent = "Connexion échouée";
}

ws.onmessage = function(event) {
    let dataParsed = JSON.parse(event.data);
    console.log("Data received: " + dataParsed);

    let messageClassCorresponding = incomingManager.messages.get(IncomingUserMessages.UserLoginMessage);
    let message = new messageClassCorresponding(dataParsed);
    message.execute();
}