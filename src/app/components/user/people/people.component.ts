import { Component, OnInit } from '@angular/core';

// import { UserService } from './../../../services/user.service'
// import { Router, ActivatedRoute } from '@angular/router'
// import { User } from './../../../models/user'
// @Component({
//   selector: 'app-people',
//   templateUrl: './people.component.html',
//   styleUrls: ['./people.component.css', './../../../app.component.css']
// })
// export class PeopleComponent implements OnInit {
//   user: User = {};
//   constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }

//   ngOnInit() {
//     let id = this.activatedRoute.snapshot.paramMap.get('id');
//     console.log(id);
//     this.service.getPeopleProfile(id).subscribe(
//       res => {
//         this.user = res;
//         console.log(res);
//       }
//     );



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  img = '/assets/imgs/demo.jpg';
  test = {
    name: 'robert downey jr',
    ref: ['a', 'b', 'c'],
    occupation: 'Actor',
    speaks: ['english', 'vietnamese'],
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
  };

  constructor() { }

  ngOnInit() {

  }

}
