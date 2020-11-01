import {client} from "../../../main";

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
            client.setVue();
            client.setUser(this.packet.data.user);
            client.displayClient();
            console.log(client);
            console.log("You're connected as: " + client.getUsername());
        } else {
            console.log("Oops... you cannot connect you to the client!");
        }
    }
}