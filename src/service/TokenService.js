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
    localStorage.setItem(LOCAL_STORAGE_TOKEN_ALIAS, token);
}

export function tokenIsExist() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_ALIAS) != null;
}

export function isTokenExpired() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_ALIAS);

    var base64Url = token.split('.')[1];
    
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decodedToken = JSON.parse(jsonPayload)
    
    const tokenExpiredAt = new Date(decodedToken.exp * 1000);

    return new Date() >= tokenExpiredAt;
}
