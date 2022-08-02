export class HMap {

    private _w: number;
    private _h: number;
    private _offsetX: number;
    private _offsetY: number;
    private _data: Uint8ClampedArray;

    constructor(img, offsetX = 0, offsetY = 0){
        this._w = img.width
        this._h = img.height
        this._offsetX = offsetX
        this._offsetY = offsetY
        this._data = this._getData(img)
    }

    _getData(img){
        const canvas = document.createElement('canvas')
        canvas.width = this._w
        canvas.height = this._h
        const context = canvas.getContext('2d', { alpha: false })
        context.drawImage(img, 0, 0, this._w, this._h)
        return context.getImageData(0, 0, this._w, this._h).data
    }

    pixel(_x, _y){
        for (let y = 0; y < this._h; y++) {
            let inpos = y * this._w * 4;
            for (let x = 0; x < this._w; x++) {
                inpos++; //r
                inpos++; //g
                inpos++; //b
                let pa = this._data[inpos++];
                if (pa !== 0) {
                    if(x === _x && y === _y) {
                        return {
                            a: this._data[inpos - 1], //A
                            b: this._data[inpos - 2], //B
                            g: this._data[inpos - 3], //G
                            r: this._data[inpos - 4] //R
                        }
                    }
                }
            }
        }
        /*if (
            x < this._offsetX ||
            x >= this._offsetX + this._w ||
            y < this._offsetY ||
            y >= this._offsetY + this._h
        ) return [this._data[0], this._data[1], this._data[2]]
        const i = (y - this._offsetY) * this._w * 4 + (x - this._offsetX) * 4
        return [this._data[i], this._data[i+1], this._data[i+2]]
        */
    }

    getPixelXY(imgData, x, y) {
        const canvas = document.createElement('canvas')
        canvas.width = imgData.width
        canvas.height = imgData.height
        const context = canvas.getContext('2d', { alpha: true })
        context.drawImage(imgData, 0, 0);
        var i = context.getImageData(x, y, 1, 1).data
        //console.log(context.getImageData(0, 0, imgData.width, imgData.height).data);
        return [i[0], i[1], i[2], i[3]] // Returns array [R,G,B,A]
    }

// AND/OR

    /*getPixelXY(imgData, x, y) {
        if(x < 0 || y < 0 || x > imgData.width || y > imgData.height) return;
        return this.getPixel(imgData, y*imgData.width+x)
    }*/
}