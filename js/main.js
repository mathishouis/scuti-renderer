import { DataManager } from "./util/DataManager.js";
import { Network } from "./networking/Network.js";
import { IncomingManager } from "./messages/incoming/IncomingManager.js";

let ws = new Network("localhost", "30000");
let incomingManager = new IncomingManager();

ws.onopen = function(event) {
    const dataLogin = {
        packetId: 212,
        data: {
            username: DataManager.getUsernameInUrl(window.location.search)
        }
    };
    ws.sendToServer(JSON.stringify(dataLogin));
}

ws.onclose = function(event) {
    window.document.body.textContent = "Connexion échouée";
}

ws.onmessage = function(event) {
    let dataParsed = JSON.parse(event.data);
    console.log(dataParsed);

    let messageClassCorresponding = incomingManager.messages.get(222);
    console.log(messageClassCorresponding);
    let message = new messageClassCorresponding(dataParsed);
    message.execute();
}