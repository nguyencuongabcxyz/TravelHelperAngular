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
    let fontsizestr = getComputedStyle(this.des.nativeElement).fontSize;
    let fontsize= parseInt(fontsizestr.slice(0,fontsizestr.length-2));
    this.height = this.des.nativeElement.offsetHeight / fontsize;
    this.show = (this.height > 4.5);
  }

}
