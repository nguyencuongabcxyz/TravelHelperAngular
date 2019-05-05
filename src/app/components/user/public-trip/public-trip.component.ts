import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PublicTrip } from 'src/app/models/publictrip';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-public-trip',
  templateUrl: './public-trip.component.html',
  styleUrls: ['./public-trip.component.css', './../../../app.component.css']
})
export class PublicTripComponent implements OnInit, OnDestroy {
  addressInput = '';
  issearch = false;
  @ViewChild('search') search: ElementRef;
  now = new Date();
  formUser: FormGroup
  subscription: Subscription;
  publicTrips: PublicTrip[];
  trip: Trip = {};
  des: string;
  // places: string[] = [];
  idTrip: number;


  check: boolean;
  click: boolean;
  textBtn: string;
  isDelete: boolean;
  private searchedSubject = new Subject<string>();
  constructor(
    private userService: UserService,
    private formBuilderService: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activate: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activate.params.subscribe(data => {
      if(data.id){
        this.onClickPublicTrip(data.id);
      }
    });
    this.createForm();
    this.load();
  }



  createForm() {
    this.formUser = this.formBuilderService.group({
      destination: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      travelerNumber: ['', [Validators.required]],
      description: ['']
    });

    this.subscription = this.formUser.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  load() {
    this.subscription = this.userService.getPublicTripUser().subscribe(data => {
      this.publicTrips = data;
      console.log(data);
    });
  }

  onClickPublicTrip(id: number) {

    this.idTrip = id;
    this.subscription = this.userService.getPublicTripById(id).subscribe(data => {
      this.trip = data;
      this.trip.arrivalDate = this.trip.arrivalDate.slice(0, 10);
      this.trip.departureDate = this.trip.departureDate.slice(0, 10);
      this.des = this.trip.destination;
      console.log(this.trip);
    });


    this.click = false;
    this.check = null;
  }

  // onKeyUp() {
  //   if (!this.des) {
  //     this.places = [];
  //     return;
  //   }
  //   if (!this.des.trim()) {
  //     this.places = [];
  //     return;
  //   }

  //   this.subscription = this.userService.getAdressEntries(this.des).subscribe(data => {
  //     console.log(data);
  //     this.places = data;
  //   });
  // }

  // onClickPlace(place) {
  //   this.des = place;
  //   this.places = [];
  // }

  async onSubmitForm() {
    //this.formUser.value.travelerNumber = Number.parseInt(this.formUser.value.travelerNumber);
    console.log(this.formUser);
    var submit = await this.userService.postPublicTrip(this.formUser.value).toPromise().catch((err) => {
      console.log(err);
    });
    // this.router.navigate(['PublicTrip'], {relativeTo: this.activate.parent});

    if(submit){
      this.toastr.success('New public trip created', 'Create public trip success');
      this.formUser.reset();
      this.idTrip = null;
      this.check = true;
      this.click = true;
    }
    else {
      this.toastr.error('Create public trip failed', 'Error');
      this.check = false;
      this.click = true;
    }
    this.textBtn = 'Submit';
    this.load();
  }


  async onUpdatePublicTrip() {
    var update;
    if (this.idTrip) {
      update = await this.userService.putPublicTripById(this.idTrip, this.formUser.value).toPromise().catch((err) => {
        console.log(err);
      });
    }
    if(update){
      this.check = true;
      this.formUser.reset();
      this.toastr.success('Updated pubic trip', 'Update public trip success');
      this.click = true;
    }
    else{
      if(!this.idTrip){
        this.check = false;
      }
      this.click = true;
      this.toastr.error('Update pubic trip failed', 'Error');
    }
    this.textBtn = 'Update';
    this.load();
  }

  async onClickDeleteTrip(id: number) {
    this.isDelete = true;
    console.log(id);

    var del = await this.userService.deletePublicTripById(id).toPromise().catch((err) => {
      console.log(err);
      return err;
    });
    console.log(del);

    if(!del){

      this.idTrip = null;
      this.toastr.success('Delete pubic trip', 'Delete public trip success');
      this.load();
    }
    else {
      this.toastr.error('Delete pubic trip failed', 'Error');
    }
  }

  onClearForm() {
    this.formUser.reset();
    this.idTrip = null;
    this.click = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showsearch() {
    this.issearch = true;
    this.addressInput="";
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 0);
  }

  onKeyup() {
    this.searchedSubject.next(this.addressInput);
  }




}
