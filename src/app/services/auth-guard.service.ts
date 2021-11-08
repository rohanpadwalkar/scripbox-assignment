import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private store: StorageService) { }

  canActivate(): boolean {
    if (!this.store.get(StorageKeys.IS_LOGGED_IN)) {
      this.router.navigate(['login']);

      return false;
    } else {
      return true;
    }
  }
}
