import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../component/alert/alert.service';
import { StorageKeys, StorageService } from '../services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  employeeId: string;
  constructor(private storage: StorageService, private alert: AlertService, private route: Router) { }

  ngOnInit(): void {
  }

  reset() {
    if (confirm('Are you sure you want to reset the database?')) {
      this.storage.resetData();
    }
  }

  doLogin() {
    const users: any[] = this.storage.get(StorageKeys.USERS) || []
    const user = users.find(user => user?.employeeId?.toLowerCase() === this.employeeId?.toLowerCase());
    if (user) {
      this.storage.set(StorageKeys.USER_DETAILS, user, true);
      this.storage.set(StorageKeys.IS_LOGGED_IN, true, true);
      this.alert.success('Successfully logged in');
      this.route.navigate(['/home'])
    } else {
      this.alert.error('Employee not found');
    }
  }

}
