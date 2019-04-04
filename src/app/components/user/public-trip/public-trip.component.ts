import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PublicTrip } from 'src/app/models/publictrip';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';


@Component({
  selector: 'app-public-trip',
  templateUrl: './public-trip.component.html',
  styleUrls: ['./public-trip.component.css', './../../../app.component.css']
})
export class PublicTripComponent implements OnInit, OnDestroy {

  formUser: FormGroup
  subscription: Subscription;
  publicTrips: PublicTrip[];
  trip: Trip = {};
  des: string;
  places: string[] = [];
  idTrip: number;

  check: boolean;
  click: boolean;
  textBtn: string;
  isDelete: boolean;

  constructor(
    private userService: UserService,
    private formBuilderService: FormBuilder,
    private router: Router,
    private activate: ActivatedRoute
  ) { }

  ngOnInit() {
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
    this.subscription = this.userService.getUserProfile().subscribe(data => {
      this.publicTrips = data.publicTrips;
      console.log(data);
    });
  }

  onClickPublicTrip(id: number){
    if(!this.isDelete) {
      this.idTrip = id;
      this.subscription = this.userService.getPublicTripById(id).subscribe(data => {
        this.trip = data;
        this.trip.arrivalDate = this.trip.arrivalDate.slice(0, 10);
        this.trip.departureDate = this.trip.departureDate.slice(0, 10);
        this.des = this.trip.destination;
        console.log(this.trip);
      });
    }
    this.isDelete = false;
    this.click = false;
  }

  onKeyUp() {
    if (!this.des) {
      this.places = [];
      return;
    }
    if (!this.des.trim()) {
      this.places = [];
      return;
    }

    this.subscription = this.userService.getAdressEntries(this.des).subscribe(data => {
      console.log(data);
      this.places = data;
    });
  }

  onClickPlace(place) {
    this.des = place;
    this.places = [];
  }

  onSubmitForm() {
    //this.formUser.value.travelerNumber = Number.parseInt(this.formUser.value.travelerNumber);
    console.log(this.formUser);
    this.userService.postPublicTrip(this.formUser.value).subscribe(data => {
      console.log(data);
    });
    // this.router.navigate(['PublicTrip'], {relativeTo: this.activate.parent});

    this.formUser.reset();
    this.idTrip = null;
    this.textBtn = 'Submit';
    this.click = true;
    this.check = true;
    setTimeout( () => {
      this.load();
    }, 100);
  }


  onUpdatePublicTrip() {
    if(this.idTrip) {
      this.subscription = this.userService.putPublicTripById(this.idTrip, this.formUser.value).subscribe(data => {
        console.log(data);
        this.load();
      });
      this.check = true;
    } else {
      this.check = false;
    }
    this.click = true;
    this.textBtn = 'Update';
    this.formUser.reset();
  }

  onClickDeleteTrip(id: number) {
    this.isDelete = true;
    this.subscription = this.userService.deletePublicTripById(id).subscribe(data => {
      console.log(data);
    });
    setTimeout( () => {
      this.load();
    }, 100);
  }

  onClearForm() {
    this.formUser.reset();
    this.idTrip = null;
    this.click = false;
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
