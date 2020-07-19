import Main from '../../../Main.js'
import Loading from '../../../../ui/splash/Loading.js'

export default class LoginHandler {
    static handle(message) {
        console.log("LoginHandler.handle(): " + message)
        Main.getGame().userManager.setUser(1, "Kozen", "Motto", "Monlook");
        Main.getGame().userManager.getUser(1);
        Main.getGame().state = "loaded";
        Loading.import();
        
    }
}