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
  @Input() type: string;
  textSelect = 'host';
  cityNames: string[]=[];
  isload = false;
  constructor(private service: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.service.getAdress(this.searchedSubject).subscribe(
      res => {
        this.cityNames = res;
        this.isload = false;
      }
    );
    this.searchedSubject.subscribe(
      value => {
        this.isload = value.length>1 ? true : false;
        if (value.length < 2) {
          this.cityNames = [];
        }
      }
    );
  }
  onClick(city) {
    if (this.type == 'select') {
      this.myClick.emit(city);
    } else {
      this.myClick.emit();
      if (this.formSearch)
        this.textSelect = this.formSearch.value['select'];
      this.router.navigate(['/Users/Search'], { queryParams: { type: this.textSelect, data: city } });
    }
    this.cityNames = [];
  }
}
