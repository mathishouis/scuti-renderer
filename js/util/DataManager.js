export class DataManager {
    static getUsernameInUrl(data) {
        let element;
        let urlData = data.substr(1).split("&");
        for(let i = 0; i < urlData.length; i++) {
            element = urlData[i].split("=");
            if(element[0] == "username") {
                return element[1];
            }
        }
        return "";
    }
}