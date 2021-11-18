import {APP_KEY} from "../configs/AppConfig";
import jwt from 'jwt-decode'

const TOKEN_KEY = APP_KEY+'_JWT';
const SESSION_USER = APP_KEY+'_SESSION_USER';

export const setSession = (token) => {
    localStorage.setItem(TOKEN_KEY,token);
}

export const setUserSession = (user) => {
    localStorage.setItem(SESSION_USER,JSON.stringify(user));
}

export const ripSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(SESSION_USER);
}

export const getSession = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const getUserSession = () => {
    return JSON.parse(localStorage.getItem(SESSION_USER));
}

export const isSession = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        const token = jwt(getSession());
        const now = new Date();
        if (token.exp < now.getTime()/1000 ) {
            // console.log('EXPIRED');
            ripSession()
            return false;
        }
        return true;
    }

    return false;
}