export class Map {
    constructor(floor) {
        this.model = floor;
    }

    generate() {
        let matrix;
        let lines = 0;
        matrix = [[]];
        for(let i = 0; i < this.model.length; i++) {
            if(this.model[i] === "\n") {
                matrix.push([]);
                lines++;
            } else {
                matrix[lines].push(this.model[i]);
            }
        }
        return matrix;
    }
}