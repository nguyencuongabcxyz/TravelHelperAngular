import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', './../../../../app.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() from;
  @Output() myclick = new EventEmitter();
  value;
  modalRef: any;
  fileToUpload: File = null;
  defaultUrl = './../../../../../assets/imgs/profile-picture-placeholder.png'
  imageUrl;
  uploading;
  isdisable;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,
    private toast: ToastrService, private service: UserService) { }
  ngOnInit() {

  }
  open() {
    this.uploading = false;
    this.value = 3;
    this.modalRef = this.modalService.open(this.content, { windowClass: 'modal-holder' });
    this.imageUrl = this.defaultUrl;

    
  }

  upload(uploadForm) {
    this.isdisable=true;
    const fd = new FormData();
    //fd.append('description',uploadForm.value.description);
    fd.append('file', this.fileToUpload, this.fileToUpload.name);
    this.uploading = true;
    if (this.from == 'photos') {

      this.service.uploadPhotos(fd).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress)
            this.value = Math.round(event.loaded / event.total * 100);
          else if (event.type === HttpEventType.Response) {
            
            this.modalRef.close();
            this.myclick.emit(event.body);
            this.toast.success("Uploaded");
          }
        }
      );
    }
    if (this.from == 'edit') {
      this.service.uploadAvatar(fd).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress)
            this.value = Math.round(event.loaded / event.total * 100);
          else if (event.type === HttpEventType.Response) {
            
            this.modalRef.close();
            this.myclick.emit(event.body.avatarLocation);
            this.toast.success("Update Successed");
          }
        }
      );
    }

  }
  handleFileInput(file) {
    this.fileToUpload = file.item(0);
    if (this.fileToUpload) {
      //show image preview
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
    } else {
      this.imageUrl = this.defaultUrl;
    }
  }
}
