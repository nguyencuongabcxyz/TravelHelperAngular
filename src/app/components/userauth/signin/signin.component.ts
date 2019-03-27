import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserauthService } from './../../../services/userauth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private service: UserauthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/Users');
  }
  onSubmit(form) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/Users');
      },
      err => {
       
          this.toastr.error('Incorrect username or password.','Authentication failed.');
        
      }
    );
  }

}
