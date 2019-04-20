import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  subscription = Subscription;
  textInput = "";
  textSelect = "host";


  private searchedSubject = new Subject<string>();
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private service: UserService) { }
  ngOnInit() {

  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Userauth']);

  }
  onKeyup() {
    this.searchedSubject.next(this.textInput);
  }
  onSubmit(form) {
    this.textInput = '';
    this.router.navigate(['/Users/Search'], { queryParams: { type: form.value.select, location: form.value.input } });
  }
  resetvalue() {
    this.textInput = '';
    this.textSelect = 'host';
  }
}
