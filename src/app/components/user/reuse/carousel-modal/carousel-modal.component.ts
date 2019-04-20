import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-carousel-modal',
  templateUrl: './carousel-modal.component.html',
  styleUrls: ['./carousel-modal.component.css'],
  providers: [NgbCarouselConfig, NgbCarousel]
})
export class CarouselModalComponent implements OnInit {
  @Output() myclick = new EventEmitter();
  @Input() photos;
  @ViewChild('content') content: ElementRef;
  @Input() isUser;
  index;
  activePhoto;
  modalRef: any;
  constructor(private service: UserService, private toast: ToastrService, private modalService: NgbModal,
    config: NgbCarouselConfig, private carousele: NgbCarousel) {
    config.interval = 0;
  }

  ngOnInit() {


  }
  open(index) {
    this.index = index;
    this.activePhoto = this.photos[this.index];
    this.modalRef = this.modalService.open(this.content, { windowClass: 'carousel-modal' });
    setTimeout(() => {
      window.document.getElementById("item_" + index).scrollIntoView();
    }, 0);
  }
  onclick(photo, i) {

    // console.log(i)
    this.index = i;
    this.activePhoto = photo;
  }
  action(event) {
   
    
    
    if (event == 'next')
      this.index++;
    if (event == 'previous')
      this.index--;
    this.activePhoto = this.photos[this.index];
    window.document.getElementById("item_" + this.index).scrollIntoView();
    console.log(window.document.getElementById('content').scrollLeft);
  }
  deletePhoto() {
    this.service.deletePhoto(this.activePhoto.photoId).subscribe(
      res => {
        if (res.status == 204) {
          this.myclick.emit(this.index);
          if (this.index === this.photos.length)
            this.index--;
          this.activePhoto = this.photos[this.index];
          this.toast.success("Deleted");
        } else {
          this.toast.error('Fail');
        }

      }
    );
  }
}
