import { Component, OnInit } from '@angular/core';
import { StorageKeys, StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  challengeList: any[] = [];
  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.challengeList = this.storage.get(StorageKeys.CHALLENGES);
  }

}
