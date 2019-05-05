import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, AfterContentInit, AfterContentChecked, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { load } from '@angular/core/src/render3';


@Component({
  selector: 'app-box-chat',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css'],
})
export class BoxChatComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.cdr.detach();
  }


  @Input() userId;
  @Input() peopleId;
  @Output() send = new EventEmitter();
  @ViewChild('boxchat') boxchat: ElementRef;
  messages;
  textchat;
  indexSeeMore = 0;
  isLoadingMess;
  isLoading;
  constructor(private service: UserService, public router: Router, public activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    

    //this.mang.next(this.service.getListUserChat(0))

    //console.log(this.peopleId)
    //this.load(this.peopleId);
    // console.log(this.boxchat.nativeElement.scrollHeight)
    // setTimeout(() => {
    //   console.log(this.boxchat.nativeElement.scrollHeight)
    //   this.boxchat.nativeElement.scrollTop = this.boxchat.nativeElement.scrollHeight;

    // }, 0);

  }
  load(peopleId) {
    this.isLoading = true;
    this.peopleId = peopleId;
    this.service.getMessage(this.peopleId, this.indexSeeMore).subscribe(
      res => {
        this.messages = res;
        this.isLoading = false;
        setTimeout(() => {
          this.boxchat.nativeElement.scrollTop = this.boxchat.nativeElement.scrollHeight;
        }, 0);
      }
    )
  }
  loadMessage(receiveMessage) {
    if (receiveMessage.from == this.peopleId) {
      let item = {
        isYou: false,
        content: receiveMessage.message,
      }
      this.messages.push(item)

    } else if (receiveMessage.from == this.userId) {
      let item = {
        isYou: true,
        content: receiveMessage.message,
      }
      this.messages.push(item)

    }
    this.cdr.detectChanges();
    this.boxchat.nativeElement.scrollTop = this.boxchat.nativeElement.scrollHeight;
  }

  sendMessage() {
    // console.log(this.textchat)
    // let item = {
    //   isYou: true,
    //   content: this.textchat
    // }
    // this.messages.push(item)
    let data = {
      peopleId: this.peopleId,
      textchat: this.textchat
    }
    // console.log(data)
    this.textchat = "";
    this.send.emit(data);
  }
  seeMore() {
    this.isLoadingMess = true;
    this.indexSeeMore = this.indexSeeMore + 1;
    this.service.getMessage(this.peopleId, this.indexSeeMore).subscribe(
      res => {
        this.isLoadingMess = false;
        console.log(res)
        this.messages = res.concat(this.messages);

      }
    )
  }

}
