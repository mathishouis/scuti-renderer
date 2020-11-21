import * as PIXI from 'pixi.js';
import {client} from "../../../main";
import {Log} from "../../../util/logger/Logger";
import {store} from "../../../../interface/store/store";

export class RoomFurniture extends PIXI.Graphics {
    constructor(id, baseId, positions, direction, state, container) {
        super();
        this.id = id;
        this.baseId = baseId;
        this.positions = positions;
        this.direction = direction;
        this.state = state;
        this.container = container;

        this.furniLoader = client.getFurniLoader();

        // Temporary :D

        this.furniData = this.furniLoader.furniData;


    }

    addFurni() {

        let furniName = this.furniLoader.splitColorName(this.furniData.floorItems[this.baseId].className).furniName

        // Furni loader
        if(!this.furniLoader.isLoaded(furniName)) {
            Log('Loading furni: ' + furniName, 'info')
            this.furniLoader.loadFurni(furniName);
        } else {
            Log(furniName + ' is already loaded!', 'info')
        }

    }

    drawFurni() {

        // Load furni
        this.furniLoader.furnitureLoader.load(() => {

            let furniName = this.furniLoader.splitColorName(this.furniData.floorItems[this.baseId].className).furniName;
            let furniProperty = this.furniLoader.getProperty(furniName);
            let furniContainer = new PIXI.Container();
            let zIndex = (this.positions.x + this.positions.y + this.positions.z)*100;

            let layerCount = furniProperty.visualization.layerCount;
            let layerLetters = "abcdefghijklmnopqrstuvwzyx";

            for(let i = 0; i < layerCount; i++) {
                let layer = 0;
                if(furniProperty.visualization.layers[i]) {
                    layer = furniProperty.visualization.layers[i];
                }
                let sprite = new PIXI.Sprite(this.furniLoader.getFurni(furniName).textures[furniName+'_'+furniName+'_64_' + layerLetters[i] + '_'+this.direction+'_'+this.state]);

                sprite.interactive = true;
                sprite.buttonMode = true

                sprite.on('mouseover',function(data){
                    sprite.alpha = 0.5
                });
                sprite.on('mouseout',function(data){
                    sprite.alpha = 1
                });


                if(this.furniLoader.splitColorName(this.furniData.floorItems[this.baseId].className).colorId) {
                    let colorId = this.furniLoader.splitColorName(this.furniData.floorItems[this.baseId].className).colorId

                    if(furniProperty.visualization.colors[colorId][i]) {
                        let color = furniProperty.visualization.colors[colorId][i];
                        sprite.tint = PIXI.utils.premultiplyTint("0x" + color, 0.9999);
                        console.log(furniName);
                    }

                }
                // To complete
                if (layer !== undefined && layer.ink !== undefined) {
                    sprite.blendMode = PIXI.BLEND_MODES.ADD;
                }
                if (layer !== undefined && layer.ignoreMouse !== undefined) {
                    if(layer.ignoreMouse == false) {

                    }
                }


                sprite.zIndex = zIndex;


                furniContainer.addChild(sprite);
            }



            furniContainer.x = 32 + 32 * this.positions.x - 32 * this.positions.y;
            furniContainer.y = 32 + 16 * this.positions.x + 16 * this.positions.y - 32 - this.positions.z * 32;

            furniContainer.zIndex = zIndex;
            furniContainer.buttonMode = true;


            this.container.addChild(furniContainer);
            this.container.updateTransform();

        });

        // Merci pitttt <<<<3333 enft
        //let loader = new PIXI.Loader("http://127.0.0.1:8082/", 2);
        //loader.add('spritesheet', 'rare_dragonlamp_pink/rare_dragonlamp_pink.json');
        //console.log(loader.resources);

        //loader.load(() => {
        //    let trucChiant = "abcdefghijklmnopqrst";
        //
        //    let spritesheet = loader.resources['spritesheet'].spritesheet;
        //    let furniProperty = spritesheet.data.furniProperty;
        //    let furniContainer = new PIXI.Container();
        //
        //   let layerCount = furniProperty.visualization.layerCount;

        //   for(let i = 0; i < layerCount; i++) {
        //       let layer = furniProperty.visualization.layers[i];
        //       console.log("trucChiant: " + trucChiant[i]);
        //        let sprite = new PIXI.Sprite(spritesheet.textures['rare_dragonlamp_pink_rare_dragonlamp_pink_64_' + trucChiant[i] + '_2_1']);

        //       if(layer.ink !== undefined) {
        //            sprite.blendMode = PIXI.BLEND_MODES.ADD;
        //        }

        //       furniContainer.addChild(sprite);
        //    }

        //   furniContainer.x = 100;
        //   furniContainer.y = 100;


        //    this.container.addChild(furniContainer);
        //});
    }

}