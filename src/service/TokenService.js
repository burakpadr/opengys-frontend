import { gysClient } from "@/assets/js/client";

const LOCAL_STORAGE_TOKEN_ALIAS = "token";

export function getTokenFromBackend(email, password) {
    const payload = {
        username: email,
        password: password
    }

    return gysClient.post("auth", payload);
}

export function setTokenToLocalStorage(token) {
    localStorage.setItem("locale", process.env.VUE_APP_DEFAULT_LOCALE)

    localStorage.setItem(LOCAL_STORAGE_TOKEN_ALIAS, token);
}

export function tokenIsExist() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_ALIAS) != null;
}

export function isTokenExpired() {
    const decodedToken = parseToken();
    
    const tokenExpiredAt = new Date(decodedToken.exp * 1000);

    return new Date() >= tokenExpiredAt;
}

export function removeToken() {
    localStorage.removeItem("locale");

    localStorage.removeItem(LOCAL_STORAGE_TOKEN_ALIAS);
}

export function parseToken() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_ALIAS);

    var base64Url = token.split('.')[1];
    
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    return JSON.parse(decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));
}
