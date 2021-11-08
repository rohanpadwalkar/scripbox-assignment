import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[];
  userForm: FormGroup;
  @ViewChild('closeBtn') closeBtnref: ElementRef;
  genderOptions = [{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }];
  constructor(private commonService: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();
    this.userForm = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', Validators.required],
      gender: [null, Validators.required]
    })
  }

  getUsers() {
    this.commonService.getUserEmployees().subscribe(res => {
      if (res) {
        this.users = res;
      }
    })
  }

  submit() {
    if (this.userForm.valid) {
      this.commonService.saveUser(this.userForm.value);
      this.getUsers();
      this.closeBtnref.nativeElement.click();
    }
  }

  close() {
    this.userForm.reset();
  }
}
