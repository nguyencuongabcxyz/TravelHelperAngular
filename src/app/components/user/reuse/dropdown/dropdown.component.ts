import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from './../../../../services/user.service'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() searchedSubject: Subject<string>;
  @Output() myClick = new EventEmitter();
  @Input() formSearch: any;
  textSelect = 'host';
  cityNames: string[];
  constructor(private service: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.service.getAdress(this.searchedSubject).subscribe(
      res => {
        this.cityNames = res;
      }
    );
    this.searchedSubject.subscribe(
      value => {
        if (value.length < 1) {
          this.cityNames = [];
        }
      }
    );
  }
  onClick(city) {
    this.cityNames = [];
    if (this.formSearch)
      this.textSelect = this.formSearch.value['select'];
    this.router.navigate(['/Users/Search'], { queryParams: { type: this.textSelect, location: city } });
  }
  resetValue() {
    this.myClick.emit();
  }
}
