import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, AfterContentInit, AfterContentChecked, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, BehaviorSubject, from } from 'rxjs';
import { formatDate } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

@Component({
  selector: '[app-box-chat]',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css']
})
export class BoxChatComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
   // this.cdr.detach();
  }


  @Input() userId;
  @Input() peopleId;
  @Input() people;
  @Output() send = new EventEmitter();
  @ViewChild('boxchat') boxchat: ElementRef;
  @ViewChild('area') area: ElementRef;
  messages;
  textarea;
  indexSeeMore = 0;
  isLoadingMess;
  isLoading;
  isSent;
  nothing;
  constructor(private service: UserService, public router: Router, public activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }
  load(peopleId) {
    this.isLoading = true;
    this.peopleId = peopleId;
    this.indexSeeMore = 0;
    this.service.getMessage(this.peopleId, this.indexSeeMore).subscribe(
      res => {
        this.messages = res;
        this.isLoading = false;
        this.cdr.detectChanges();
        this.boxchat.nativeElement.scrollTop = 696969;
      }
    )
  }
  loadMessage(receiveMessage) {
    if (receiveMessage.from == this.peopleId) {
      let item = {
        isYou: false,
        content: receiveMessage.message,
        createDate: new Date().toLocaleString("en-US", { timeZone: "Iceland" }) 
      }
      this.messages.push(item);
    }
    else if (receiveMessage.from == this.userId) {
      let item = {
        isYou: true,
        content: receiveMessage.message,
        createDate: new Date().toLocaleString("en-US", { timeZone: "Iceland" })
      }
      this.messages.push(item)
     // console.log(this.messages)
      this.isSent = false;
    }
    this.cdr.detectChanges();
    this.boxchat.nativeElement.scrollTop = this.boxchat.nativeElement.scrollHeight;
  }

  sendMessage() {
    this.isSent = true;
    let data = {
      peopleId: this.peopleId,
      textchat: this.textarea
    }
    this.textarea = "";
    this.send.emit(data);
  }
  seeMore() {
    this.isLoadingMess = true;
    this.indexSeeMore = this.indexSeeMore + 1;
    let x = this.boxchat.nativeElement.scrollHeight;
    this.service.getMessage(this.peopleId, this.indexSeeMore).subscribe(
      res => {
        this.isLoadingMess = false;
        this.messages = res.concat(this.messages);
        this.cdr.detectChanges();
        this.boxchat.nativeElement.scrollTop = this.boxchat.nativeElement.scrollHeight - x;


      }
    )
  }

  onkeyup(event: KeyboardEvent) {
    const textArea = this.area.nativeElement;
    if (event.keyCode === 13 && !event.shiftKey) {
      if (this.textarea) {
        this.sendMessage();
      }
      textArea.style.height = '30px';
    } else {
      if (textArea.offsetHeight < 90)
        textArea.style.overflow = 'hidden';
      else
        textArea.style.overflow = 'auto';
      textArea.style.height = '30px';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }
  onScrollUp() {
    console.log('scrollup')
    this.seeMore();
  }
}
