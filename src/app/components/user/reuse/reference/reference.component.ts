import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {
  @Input() reference:any;
  @ViewChild('des') des: ElementRef;
  height;
  show = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.onResize(event);
    }, 0);
  }
  onResize(event) {
    this.height = this.des.nativeElement.offsetHeight / 16;
    this.show = (this.height > 5);
  }

}
