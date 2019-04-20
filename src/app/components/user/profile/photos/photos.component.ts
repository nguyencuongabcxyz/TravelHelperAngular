import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router'
import { UploadComponent } from './../../reuse/upload/upload.component'
import { Subject, BehaviorSubject } from 'rxjs';
import { CarouselModalComponent } from '../../reuse/carousel-modal/carousel-modal.component';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css', './../../../../app.component.css']
})
export class PhotosComponent implements OnInit , OnDestroy {
  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
  navigationSubscription;
  @ViewChild(UploadComponent) upload: UploadComponent;
  @ViewChild(CarouselModalComponent) carousel: CarouselModalComponent;
  isUser: boolean;
  user: any = {};
  photos: any[] = [];
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
    this.service.getUser().subscribe(
      res => {
        this.user = res;
      }
    );
    this.isUser = this.service.getisUser();
  }
  load() {
    this.isLoading = true;
    this.service.getImages().subscribe(
      res => {
        this.photos = res;
        this.isLoading = false;
      }
    );
  }
  addphoto(photo){
    this.photos.push(photo);
  }
  subphoto(index){
    this.photos.splice(index,1);
  }
}
