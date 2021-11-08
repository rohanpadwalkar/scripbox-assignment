import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private storage: StorageService) { }

  getUserDetail(): Observable<any> {
    const user: any[] = this.storage.get(StorageKeys.USER_DETAILS);
    return of(user);
  }

  saveChallenge(data) {
    data = {
      createdOn: new Date(),
      employeeDetails: this.storage.get(StorageKeys.USER_DETAILS),
      id: Date.now(),
      voterId: [],
      ...data
    }
    const challengeList: any[] = this.storage.get(StorageKeys.CHALLENGES) || [];
    challengeList.push(data);
    this.storage.set(StorageKeys.CHALLENGES, challengeList, true);
  }

  getChallengeList(): Observable<any> {
    const challengeList: any[] = this.storage.get(StorageKeys.CHALLENGES) || [];
    return of(challengeList);
  }

  upVoteChallenge(id) {
    const challengeList: any[] = this.storage.get(StorageKeys.CHALLENGES) || [];
    const userDetails: any = this.storage.get(StorageKeys.USER_DETAILS);
    const challange = challengeList.find(challenge => challenge.id == id);
    if (challange.voterId.includes(userDetails?.employeeId)) {
      challange.voterId = challange.voterId.filter(voter => voter !== userDetails?.employeeId);
    } else {
      challange.voterId.push(userDetails?.employeeId);
    }
    debugger
    return this.updateChallenge(id, challange);
  }

  updateChallenge(id, data): Observable<any> {
    const challengeList: any[] = this.storage.get(StorageKeys.CHALLENGES) || [];
    const challangeIndex = challengeList.findIndex(challenge => challenge.id === id);
    if (challangeIndex > -1) {
      challengeList[challangeIndex] = { ...challengeList[challangeIndex], ...data }
    }
    this.storage.set(StorageKeys.CHALLENGES, challengeList, true);
    return of(data);
  }

  getChallengeDetail(id: any): Observable<any> {
    const challengeList: any[] = this.storage.get(StorageKeys.CHALLENGES) || [];
    const challenge = challengeList.find(chal => chal.id === id);
    return of(challenge);
  }

  saveTags(data) {
    const tagsList: any[] = this.storage.get(StorageKeys.TAGS) || [];
    tagsList.push(data);
    this.storage.set(StorageKeys.TAGS, tagsList, true);
  }

  getTags(): Observable<any> {
    const challengeList: any[] = this.storage.get(StorageKeys.TAGS) || [];
    return of(challengeList);
  }

}
