import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/local_user';
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        const obj = localStorage.getItem(STORAGE_KEYS.localUser);
        if (obj == null) {
            return null;
        }
        return JSON.parse(obj);
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}