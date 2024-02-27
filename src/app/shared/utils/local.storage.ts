import { DataLocalStorage } from "../interfaces/local/data-local-storage";

const userLoggedItem = 'userLogged';

/********************************************** DataLogged **********************************************/
export function getLocalDataLogged(): DataLocalStorage {
    const data = JSON.parse(sessionStorage.getItem(userLoggedItem) || 'null') as DataLocalStorage;
    if (data !== null) {
        return data;
    } else {
        return data;
    }
}

export function setLocalDataLogged(data: DataLocalStorage): void {
    sessionStorage.setItem(userLoggedItem, JSON.stringify(data));
}

export function deleteLocalStorageData(): void {
    sessionStorage.setItem(userLoggedItem, '');
    sessionStorage.clear();
}

export function existUserLogged(): boolean {
    const data = JSON.parse(sessionStorage.getItem(userLoggedItem) || 'null');
    if (data !== null) {
        return true;
    } else {
        return false;
    }
}

