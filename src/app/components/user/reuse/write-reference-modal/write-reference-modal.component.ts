import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-write-reference-modal',
  templateUrl: './write-reference-modal.component.html',
  styleUrls: ['./write-reference-modal.component.css']
})
export class WriteReferenceModalComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() people: User;
  modalRef: any;
  isdiable;
  constructor(private modalService: NgbModal, private service: UserService, private toast: ToastrService,
    private route: Router, private avtiveRoute: ActivatedRoute) { }

  ngOnInit() {

  }
  open() {
    this.isdiable=false;
    this.modalRef = this.modalService.open(this.content, {  windowClass: 'modal-holder', });
   // console.log(this.route.url)
  }
  send(referenceForm) {
    this.isdiable=true;
    this.service.sendReference(referenceForm.value).subscribe(
      res => {
        this.toast.success("You had sent a Reference");
        this.modalRef.close();
        let x = this.route.url == '/Users/People/' + this.people.id + '/References';
        if (x == true) {
          this.route.navigateByUrl('Users/People/' + this.people.id + '/References');
        }
      }
    );
  }
}
