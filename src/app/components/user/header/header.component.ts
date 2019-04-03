import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service'

import { Subject, Subscription } from 'rxjs'




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  subscription = Subscription;
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
  onKeyup(event: KeyboardEvent) {
    // console.log('onkeyup');
    const { keyCode } = event;
    if(keyCode === 13) {
      this.cityNames = null;
    } else {
      this.searchedSubject.next(this.textInput);
      if (this.textInput.length < 1) {
        this.cityNames = [];
      }
    }
  }
  onSubmit(form) {
    console.log(form.value);
    form.value.input = this.textInput;
    this.cityNames = [];
    this.router.navigate(['/Users/Search'], { queryParams: { type: form.value.select, location: form.value.input } });
  }

  onSearch(form) {
    // console.log('onsearch');
    if(!this.textInput){
      return;
    }
    if(!this.textInput.trim()) {
      return;
    }
    // if(form.value.input){
    //   this.textInput = ;
    // }

    this.router.navigate(['Search'], {relativeTo: this.activatedRoute, queryParams: {type: form.value.select, location: this.textInput}});
    this.cityNames = [];
  }

  onClickInputSearch() {
    console.log('click');
  }
}
