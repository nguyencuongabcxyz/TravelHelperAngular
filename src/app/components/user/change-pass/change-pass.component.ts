import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css', './../../../app.component.css']
})
export class ChangePassComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  formChangePass: FormGroup;
  showOldPass = false;
  showNewPass = false;
  showConfirmPass = false;
  txtOldPass: string;
  txtNewPass: string;
  txtConfirmPass: string;
  txtMessage: string;
  check: boolean;

  constructor(private formBuilderService: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formChangePass = this.formBuilderService.group({
      OldPassword: ['', [Validators.required]],
      NewPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    });
  }

  SavePassword(){
    console.log(this.formChangePass.value);
    if(this.txtConfirmPass !== this.txtNewPass) {
      this.check = false;
      this.txtMessage = 'New password does not match';
    }
    else{
      var success = false;
      var password = {
        OldPassword: this.formChangePass.value.OldPassword,
        NewPassword: this.formChangePass.value.NewPassword
      }
      this.subscription = this.userService.changePassword(password).subscribe(data => {

        this.formChangePass.reset();
        this.txtMessage = 'Change password success';
        this.check = true;

      }, err => {
        console.log(err);
        this.txtMessage = 'Please provide your correct current password';
        this.check = false;
      });
    }
    // setTimeout(() => {
    //   if(!success){
    //     console.log('fail')
    //   }
    // }, 1000);

  }

  onClickOldPass(){
    this.showOldPass = !this.showOldPass;
    if(this.showOldPass) {
      document.getElementById('oldPassword').setAttribute('type', 'text');
    }
    else {
      document.getElementById('oldPassword').setAttribute('type', 'password');
    }
  }

  onClickNewPass(){
    this.showNewPass = !this.showNewPass;
    if(this.showNewPass) {
      document.getElementById('newPass').setAttribute('type', 'text');
    }
    else {
      document.getElementById('newPass').setAttribute('type', 'password');
    }
  }

  onClickConfirmPass(){
    this.showConfirmPass = !this.showConfirmPass;
    if(this.showConfirmPass) {
      document.getElementById('confirmPass').setAttribute('type', 'text');
    }
    else {
      document.getElementById('confirmPass').setAttribute('type', 'password');
    }
  }

  ngOnDestroy(){
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
