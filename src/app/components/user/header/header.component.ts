import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { Subject, Subscription, from } from 'rxjs';
import { con, dis, hubConnection } from './../../../models/global'
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //isNoty;
  isMenu;
  isSearch;
  isdrop;
  subscription = Subscription;
  textInput = "";
  textSelect = "host";
  placeholder = "Search for Place";
  @Input() admin;
  @Input() user;
  @Input() isNoty;
  logo_admin = {};
  admin_display = 'unset';
  idMessage = null;
  role;
  private searchedSubject = new Subject<string>();
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private service: UserService,
    private cdr: ChangeDetectorRef, private toast: ToastrService) { }
  isActive(): boolean {
    return (this.router.url.includes("/Users/Message"))
  }
  ngOnInit() {
    this.role=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])).role;
    // hubConnection.on('sendChatMessage', (from: string, fullName, avatar, message: string) => {
    //   console.log(from + ":" + message)
    //   if (!this.isActive())
    //     if (from != this.user.id) {
    //       this.isNoty = true;
    //       this.cdr.detectChanges();
    //       this.toast.show(message, fullName, { toastClass: "message-toast" });
          
    //     }
    // })



    this.activatedRoute.queryParams.subscribe(
      params => {
        // console.log(this.isActive())
        let id = params['id'];
        if (id) {
          this.idMessage = id;
        } else {
          this.idMessage = null;
        }
      }
    )


    if (this.admin) {
      this.logo_admin = {
        color: 'white'
      };
      this.admin_display = 'none';
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Userauth']);
    dis();

  }
  onChange() {
    this.placeholder = this.textSelect == 'people' ? "Search for Name" : "Search for Place";
  }
  onKeyup(formSearch) {
    if (formSearch.value.select !== 'people')
      this.searchedSubject.next(this.textInput);
  }
  onSubmit(form) {
    this.isSearch = false;
    this.textInput = '';
    this.router.navigate(['/Users/Search'], { queryParams: { type: form.value.select, data: form.value.input } });
  }
  resetvalue() {
    this.textInput = '';
    this.textSelect = 'host';
  }

  onChangePassword() {

    this.router.navigate(['/Users/ChangePassword']);
    this.isdrop = false;
    this.isMenu = false;
  }
}
