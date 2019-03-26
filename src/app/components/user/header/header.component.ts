import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service'
import { Subject } from 'rxjs'
import { User } from './../../../models/user'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 

  textInput = "";
  textSelect = "host";

  cityNames: string[];
  private searchedSubject = new Subject<string>();
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private service: UserService) { }
  ngOnInit() {
    this.service.getAdress(this.searchedSubject).subscribe(
      res => {
        this.cityNames = res;

      }
    );

  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Userauth']);
  }
  onKeyup() {
    this.searchedSubject.next(this.textInput);
    if (this.textInput.length < 1) {
      this.cityNames = [];
    }
  }
  onSubmit(form) {
    form.value.input = this.textInput;
    this.cityNames = [];
    console.log(form.value);
    this.router.navigate(['/Users/Message'], { queryParams: { type: form.value.select, location: form.value.input } });
  }
}
