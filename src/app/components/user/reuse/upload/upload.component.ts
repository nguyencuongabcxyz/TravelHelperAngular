import { Component, OnInit, ViewChild, ElementRef, Input, Output,EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', './../../../../app.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() from;
  @Output() myclick= new EventEmitter();
  modalRef: any;
  fileToUpload: File = null;
  defaultUrl = './../../../../../assets/imgs/profile-picture-placeholder.png'
  imageUrl;


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,
    private toast: ToastrService, private service: UserService) { }
  ngOnInit() {

  }
  open() {
    this.modalRef = this.modalService.open(this.content, { windowClass: 'modal-holder' });
    this.imageUrl = this.defaultUrl;
  }
  addphoto(){
    
  }
  upload(uploadForm) {
    const fd = new FormData();
    //fd.append('description',uploadForm.value.description);
    fd.append('file', this.fileToUpload, this.fileToUpload.name);

  //  console.log(this.fileToUpload)
    if (this.from == 'photos') {
      this.service.uploadImage(fd).subscribe(
        res => {
          this.toast.success("Uploaded");
          this.modalRef.close();
          this.myclick.emit(res);
        }
      );
    }
    if(this.from=='edit'){
      this.service.uploadAvatar(fd).subscribe(
        res=>{
          this.toast.success("Update Successed");
          this.modalRef.close();
          this.myclick.emit(res.avatarLocation);
        }
      );
    }
    
  }
  handleFileInput(file: FileList) {
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
   // console.log(this.fileToUpload)
  }
}
