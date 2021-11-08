import { Injectable } from '@angular/core';
import { USERS, TAGS, CHALLENGES } from '../utill/data/primary';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: any = {};
  constructor() { }

  get(key) {
    let data = this.storage[key];
    if (!data) {
      let d = localStorage.getItem(key);
      if (d || d !== undefined) {
        if (d != 'undefined') {
          data = JSON.parse(d);
        }
      }
    }
    return data;
  }

  set(key: string, data: any, storeInLocalStorage?: boolean) {
    this.storage[key] = data;
    if (storeInLocalStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) { }
    return delete this.storage[key];
  }

  clearAll() {
    localStorage.clear();
  }

  resetData() {
    this.clearAll();
    this.set(StorageKeys.USERS, USERS, true);
    this.set(StorageKeys.TAGS, TAGS, true);
    this.set(StorageKeys.CHALLENGES, CHALLENGES, true);
  }
}

export enum StorageKeys {
  USERS = 'users',
  IS_LOGGED_IN = 'isLoggedIn',
  USER_DETAILS = 'user_details',
  CHALLENGES = ' challenges',
  TAGS = 'tags'
}
