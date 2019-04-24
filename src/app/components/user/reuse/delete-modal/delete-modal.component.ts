import { Component, OnInit, ViewChild, ElementRef, Output ,EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Output() myClick = new EventEmitter();
  modalRef: any;
  constructor( private modalService: NgbModal) { }

  ngOnInit() {
  }
  open() {
    this.modalRef = this.modalService.open(this.content,{windowClass:'modal-holder'});
  }
  onDelete(){
    
    this.myClick.emit();
    this.modalRef.close();
  }
}
