import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router'
import { User } from './../../../../models/user'
@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css', './../../../../app.component.css']
})
export class ReferencesComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
  navigationSubscription;
  isUser: boolean;
  type = 'all';
  //user: User = {};
  references = [];
  referencesres = [];
  positive = [];
  negative = [];
  isLoading = true;
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.load();
        }
      }
    );
    this.load();
    this.isUser = this.service.getisUser();
  }
  load() {
    this.isLoading = true;
    this.service.getReferences().subscribe(
      res => {
        this.isLoading = false
        this.referencesres = res;
        this.positive = this.referencesres.filter(item => item.status == true);
        this.negative = this.referencesres.filter(item => item.status == false);

        this.references = this.referencesres;
      }
    );
  }
  onClick(type: string) {
    this.type = type;
    this.references = this.filter(this.type);

  }
  filter(type) {
    if (type == 'all') {
      return this.referencesres;
    } else if (type == 'negative') {
      return this.negative;
    } else {
      return this.positive;
    }
  }
}
