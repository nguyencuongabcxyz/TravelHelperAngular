import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserauthService } from './../../../services/userauth.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { NgProgressComponent } from '@ngx-progressbar/core'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', './../../../app.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  constructor(private userservice: UserService, private service: UserauthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    // if (localStorage.getItem('token') != null)
    //   this.router.navigateByUrl('/Users');
  }
  onSubmit(form) {
    this.progressBar.start();
    this.service.login(form.value).subscribe(
      (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.progressBar.complete();
          this.router.navigateByUrl('/Users');
        } else {
          this.progressBar.complete();
          this.toastr.error('User had been blocked.', 'Authentication failed.');
        }
      },
      err => {
        this.progressBar.complete();
        this.toastr.error('Incorrect username or password.', 'Authentication failed.');

      }
    );
  }

}
