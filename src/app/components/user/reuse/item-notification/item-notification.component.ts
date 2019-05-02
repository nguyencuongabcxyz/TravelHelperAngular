import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-notification',
  templateUrl: './item-notification.component.html',
  styleUrls: ['./item-notification.component.css']
})
export class ItemNotificationComponent implements OnInit {
  @Input() item;
  @Input() data;
  @Output() myClick = new EventEmitter();
  isdiabled;

  constructor() { }

  ngOnInit() {
  }
  typeShow(): string {
    if (this.item.type == "HostOffer")
      return "Host Offer";
    else if(this.item.type == "FriendRequest"){
      return "Friend Request";
    }else if(this.item.type == "TravelRequest"){
      return "Travel Request";
    }
  }
  onDelete() {
    this.isdiabled = true;
    let body = {
      type: 'delete', id: this.item.id
    }
    this.myClick.emit(body)
  }
}
