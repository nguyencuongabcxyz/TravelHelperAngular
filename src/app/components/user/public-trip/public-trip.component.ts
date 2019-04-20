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

  onSubmitForm() {
    //this.formUser.value.travelerNumber = Number.parseInt(this.formUser.value.travelerNumber);
    console.log(this.formUser);
    var submit = false;
    this.subscription =  this.userService.postPublicTrip(this.formUser.value).subscribe((data: any) => {
      console.log(data);
      submit = true;
    });
    // this.router.navigate(['PublicTrip'], {relativeTo: this.activate.parent});

    this.textBtn = 'Submit';

    setTimeout( () => {
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
      this.load();
    }, 1000);
  }


  onUpdatePublicTrip() {
    var update = false;
    if (this.idTrip) {
      this.subscription = this.userService.putPublicTripById(this.idTrip, this.formUser.value).subscribe(data => {
        console.log(data);
        update = true;
      });
    }
    setTimeout(() => {
      if(update) {
        this.check = true;
        this.formUser.reset();
        this.toastr.success('Updated pubic trip', 'Update public trip success');
        this.click = true;
      }else{
        if(!this.idTrip){
          this.check = false;
        }
        this.click = true;
        this.toastr.error('Update pubic trip failed', 'Error');
      }
      this.load();
    }, 1000);
    this.textBtn = 'Update';
  }

  onClickDeleteTrip(id: number) {
    this.isDelete = true;
    var del = false;
    this.subscription = this.userService.deletePublicTripById(id).subscribe(data => {
      console.log(data);
      del = true;
      this.idTrip = null;
      this.load();
    });

    setTimeout(() => {
      if(del) {
        this.toastr.success('Delete pubic trip', 'Delete public trip success');
      }
      else{
        this.toastr.error('Delete pubic trip failed', 'Error');
      }
    }, 1000);
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
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 0);
  }

  onKeyup() {
    this.searchedSubject.next(this.addressInput);
  }




}
