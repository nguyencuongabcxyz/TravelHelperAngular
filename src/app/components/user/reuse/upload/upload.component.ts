import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', './../../../../app.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  modalRef: any;
  fileToUpload:File=null;
  defaultUrl='./../../../../../assets/imgs/profile-picture-placeholder.png'
  imageUrl;


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }
  ngOnInit() {

  }
  open() {
    this.modalRef = this.modalService.open(this.content);
    this.imageUrl=this.defaultUrl;
  }
  upload(uploadForm) {  
    const  fd= new FormData();
    fd.append('description',uploadForm.value.description);
    fd.append('image',this.fileToUpload,this.fileToUpload.name);
    
    console.log(fd.get('image'));

    //this.modalRef.close();
  }
  handleFileInput(file:FileList){
    this.fileToUpload=file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
}
