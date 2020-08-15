import { Client } from "./../../../Client.js";

export class UserLoginMessage {
    constructor(packet) {
        this.packet = packet
        // {
        //     packedId: x,
        //     data: {
        //         isLogged: true,
        //         user: {
        //              username: "cc";
        //              truc: "bidule"
        //         }
        //     }
        // }
    }

    execute() {
        if(this.packet.data.isLogged) {
            let client = new Client(this.packet.data.user);
            client.displayClient();
            console.log("You're connected as: " + client.getUsername());
        } else {
            console.log("Oops... you cannot connect you to the client!");
        }
    }
}