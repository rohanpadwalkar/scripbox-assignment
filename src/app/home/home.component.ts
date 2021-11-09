import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonService } from '../services/common.service';
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
  searchString: string;
  selectedChallenge: any;
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
  constructor(private commonService: CommonService, private fb: FormBuilder, private route: Router) { }

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
    this.applySort();
  }

  searchChange() {
    this.selectedChallenge = null;
  }

  applySort() {
    this.selectedChallenge = null;
    const selectedSort = this.sortByOptions.find((opt: any) => opt.selected);
    if (selectedSort) {
      this.challengeList = this.challengeList.sort((a: any, b: any) => {
        if (selectedSort?.key === 'upvote') {
          return b?.voterId?.length - a?.voterId?.length
        } else {
          return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        }

      })
    }

  }

  getCurrentUserDetails() {
    this.commonService.getUserDetail().subscribe(res => {
      if (res) {
        this.userDetails = res;
      }
    })
  }

  getChallenges(applySort = true) {
    this.commonService.getChallengeList().subscribe(res => {
      if (res) {
        this.challengeList = res;
        this.challengeList.forEach(challengeObj => {
          challengeObj.hasUpvoted = challengeObj?.voterId.includes(this.userDetails?.employeeId)
        })
        if (applySort) {
          this.applySort();
        }
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
      this.getChallenges(false);
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

  logOut() {
    this.commonService.logOut().subscribe(res => {
      if (res) {
        this.route.navigate(['login']);
      }
    })
  }

}
