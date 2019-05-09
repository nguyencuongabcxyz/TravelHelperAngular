import { Component, OnInit, Input } from '@angular/core';
import { type } from 'os';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.css']
})
export class CardResultComponent implements OnInit {
  @Input() type;
  @Input() item;
  referencesCount = 0;
  constructor(private service: UserService) { }
  referenceSize;
  ngOnInit() {
    this.referenceSize = this.type == 'traveler' ? this.item.user.referenceSize : this.item.referenceSize;

    //console.log(this.type)
    //console.log(this.item)
    let id;
    if (this.item.user) {
      id = this.item.user.id;
    } else {
      id = this.item.id;
    }

    this.service.getPeopleReferences(id).subscribe(
      res => {
        this.referencesCount = res.length;
      }
    )
  }

}
