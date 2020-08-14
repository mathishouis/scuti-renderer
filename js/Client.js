import * as PIXI from 'pixi.js';

export class Client {
    constructor(data) {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: false,
            transparent: false,
            backgroundColor: 0x121212
        });
        this.container = new PIXI.Container();

        this.setUser(data);
    }

    setUser(data) {
        this.username = data.username;
    }

    getUsername() {
        return this.username;
    }

    displayClient() {
        document.getElementById("app").appendChild(this.app.view);
    }

    displayBeautifulRoom() {
        // display a room... this is a test method!
        this.app.stage.addChild(this.container);
    }
}