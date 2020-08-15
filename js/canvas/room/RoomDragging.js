import { app } from "../../main.js";
import { container } from "../../main.js";


let draggingMode;
let clickCoords;
let roomCoordsSave;

export const drag = function () {
    app.stage.on("mouseup", (event) => {
        draggingMode = false;
    });
    
    app.stage.on("mouseupoutside", (event) => {
        draggingMode = false;
    });
    
    app.stage.on("mousemove", (event) => {
        if(draggingMode) {
            let dx = event.data.global.x - clickCoords.x;
            let dy = event.data.global.y - clickCoords.y;
            container.x = roomCoordsSave.x + dx;
            container.y = roomCoordsSave.y + dy;
        }
    });
    
    app.stage.on("mousedown", (event) => {
        draggingMode = true;
        clickCoords = {
            x: event.data.global.x,
            y: event.data.global.y
        };
        roomCoordsSave = {
            x: container.x,
            y: container.y
        };
    });
}