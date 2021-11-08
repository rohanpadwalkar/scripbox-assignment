import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonService } from '../services/common.service';
import { StorageKeys, StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetails: any;
  challengeList: any[] = [];
  tags: any[] = [];
  challengeForm: FormGroup;
  sortByOptions = [{ label: 'Votes', key: 'upvote' }, { label: 'Latest: by date', key: 'createdOn' }];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  @ViewChild('closeBtn') closeBtnref: ElementRef;
  constructor(private commonService: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.challengeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: [null, Validators.required]
    });
    this.loadData();
  }

  loadData() {
    this.getCurrentUserDetails();
    this.getChallenges();
    this.getTags();
  }

  changeSortOption(index) {
    this.sortByOptions.forEach((obj: any, ind) => obj.selected = index === ind ? !obj?.selected : false);
  }

  getCurrentUserDetails() {
    this.commonService.getUserDetail().subscribe(res => {
      if (res) {
        this.userDetails = res;
      }
    })
  }

  getChallenges() {
    this.commonService.getChallengeList().subscribe(res => {
      if (res) {
        this.challengeList = res;
        this.challengeList.forEach(challengeObj => {
          challengeObj.hasUpvoted = challengeObj?.voterId.includes(this.userDetails.employeeId)
        })
      }
    })
  }

  getTags() {
    this.commonService.getTags().subscribe(res => {
      if (res) {
        this.tags = res;
      }
    })
  }

  upVote(id) {
    this.commonService.upVoteChallenge(id).subscribe(res => {
      debugger;
      this.getChallenges();
    })
  }

  close() {
    this.challengeForm.reset();
  }

  submit() {
    if (this.challengeForm.valid) {
      const value = this.challengeForm.getRawValue();
      this.commonService.saveChallenge(value);
      this.closeBtnref.nativeElement.click();
      this.getChallenges();

    }
  }

}
