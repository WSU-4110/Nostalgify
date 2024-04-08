// creating an instance of the access token to be referenced globally
// export class at the bottom, when going to a new screen make sure to import the class
// change any current token references to accessTokenInstance and use set method 

class AccessTokenSingleton {
    static instance = null;
    accessToken = null;

    constructor() {
        if (!AccessTokenSingleton.instance) {
            AccessTokenSingleton.instance = this;
        }
        return AccessTokenSingleton.instance;
    }

    static getInstance() {
        if (!AccessTokenSingleton.instance) {
            AccessTokenSingleton.instance = new AccessTokenSingleton();
        }
        return AccessTokenSingleton.instance;
    }

    setAccessToken(token) {
        this.accessToken = token;
    }

    getAccessToken() {
        return this.accessToken;
    }
}

export default AccessTokenSingleton;

