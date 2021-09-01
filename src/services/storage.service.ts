import { Cart } from './../models/cart';
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

    getCart(): Cart {
        const obj = localStorage.getItem(STORAGE_KEYS.cart);
        if (obj == null) {
            return null;
        }
        return JSON.parse(obj);
    }

    setCart(obj: Cart) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        } else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    }
}