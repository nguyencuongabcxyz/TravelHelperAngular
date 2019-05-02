import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { Subject, Subscription, from } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenu;
  isSearch;
  isdrop;
  subscription = Subscription;
  textInput = "";
  textSelect = "host";
  placeholder = "Search for Place";
  @Input() admin;
  logo_admin = {};
  admin_display = 'unset';

  private searchedSubject = new Subject<string>();
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private service: UserService) { }
  ngOnInit() {
    if(this.admin){
      this.logo_admin = {
        color: 'white'
      };
      this.admin_display = 'none';
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Userauth']);

  }
  onChange(){
    this.placeholder = this.textSelect=='people'?"Search for Name":"Search for Place";
  }
  onKeyup(formSearch) {
    if (formSearch.value.select !== 'people')
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

  onChangePassword(){
    this.router.navigate(['/Users/ChangePassword']);
    this.isdrop = false;
  }
}
