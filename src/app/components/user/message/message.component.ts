import { Component, OnInit, ViewChild, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageSender } from 'src/app/models/messagesender';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { UserService } from 'src/app/services/user.service';
import { BoxChatComponent } from "./box-chat/box-chat.component";
import { hubConnection } from './../../../models/global'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    // console.log(123)
    //this.cdr.detach();
    window.document.getElementById("main-container").style.cssText = "height:unset;padding-bottom:unset;"
    window.document.getElementById("main-footer").style.cssText = "display:unset";
    //this.boxChatComponent.destroy()
    //hubConnection.off('sendChatMessage');
    this.destroyComponent = true;
    // console.log(this.hubConnection)
    //   this.hubConnection.stop();
    //hubConnection.off('sendChatMessage')

  }
  @ViewChild(BoxChatComponent) boxChatComponent: BoxChatComponent;
  @ViewChild('listchatbox') listchatbox: ElementRef;
  @ViewChild('loadinguserchat') loadinguserchat: ElementRef;
  constructor(private service: UserService, public router: Router, public activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  private hubConnection: HubConnection;
  destroyComponent;
  listUserChatsAll: MessageSender[] = [];
  listUserChats: MessageSender[] = [];
  people;
  peopleId: String;
  message: String;
  receiveMessage;
  token: String = localStorage.getItem("token");
  index = 0;
  isLoadingMess;
  isConnecting;
  user;
  notFound;
  count = 0;
  ngOnInit() {
    //console.log(hubConnection)
    this.index = 0;
    this.receive();
    window.document.getElementById("main-container").style.cssText = "height:100vh;padding-bottom:5px;"
    window.document.getElementById("main-footer").style.cssText = "display:none";
    //this.setup();
    this.user = this.activatedRoute.snapshot.data.user;
    this.listUserChatsAll = this.activatedRoute.snapshot.data.listUserChats;
    this.listUserChats = this.listUserChatsAll.slice(0, 20);
    console.log(this.listUserChats)
    this.getIdcurrentPeople();
  }
  sendMessage(event): void {
    hubConnection
      .invoke('sendChatMessage', event.peopleId, event.textchat)
      .catch(err => console.error(err));
  }
  receive() {
    hubConnection.on('sendChatMessage', (from: string, fullName, avatar, message: string) => {
      console.log(from + ":" + message)
      if (!this.destroyComponent) {
        if (from == this.user.id) {
          let item = this.listUserChatsAll.filter(item => item.id == this.people.id)
          //console.log(item)
          if (item.length) {
            let i = this.listUserChatsAll.indexOf(item[0])
            this.listUserChatsAll.splice(0, 0, this.listUserChatsAll.splice(i, 1)[0]);

            let item1 = this.listUserChats.filter(item => item.id == this.people.id)
            if (item1.length) {
              let i = this.listUserChats.indexOf(item1[0])
              this.listUserChats.splice(0, 0, this.listUserChats.splice(i, 1)[0]);
            } else {
              this.listUserChats.unshift(item[0])
              this.count++;
            }
            // this.listUserChats[0].createDate = new Date().toLocaleString("en-US", { timeZone: "Iceland" });
            // this.listUserChats[0].lastedMessage = message;


          } else {
            let data: MessageSender = {
              avatar: this.people.avatarLocation,
              fullName: this.people.fullName,
              createDate: new Date,
              lastedMessage: message,
              id: this.people.id
            }
            this.listUserChats.unshift(data)
            this.listUserChatsAll.unshift(data)
            this.count++;
            // this.listUserChats[0].createDate = new Date().toLocaleString("en-US", { timeZone: "Iceland" });
            // this.listUserChats[0].lastedMessage = message;
          }
          this.listUserChats[0].createDate = new Date().toLocaleString("en-US", { timeZone: "Iceland" });
          this.listUserChats[0].lastedMessage = message;
          this.cdr.detectChanges();
          this.listchatbox.nativeElement.scrollTop = 0;
        } else {
          let item = this.listUserChatsAll.filter(item => item.id == from)

          if (item.length) {
            let i = this.listUserChatsAll.indexOf(item[0])
            this.listUserChatsAll.splice(0, 0, this.listUserChatsAll.splice(i, 1)[0]);

            let item1 = this.listUserChats.filter(item => item.id == from)
            if (item1.length) {
              let i = this.listUserChats.indexOf(item1[0])
              this.listUserChats.splice(0, 0, this.listUserChats.splice(i, 1)[0]);
            } else {
              this.listUserChats.unshift(item[0])
              this.count++;
            }
            // this.listUserChats[0].createDate = new Date().toLocaleString("en-US", { timeZone: "Iceland" });
            // this.listUserChats[0].lastedMessage = message;
          } else {
            let data: MessageSender = {
              avatar: avatar,
              fullName: fullName,
              createDate: new Date(),
              lastedMessage: message,
              id: from
            }
            this.listUserChats.unshift(data)
            this.listUserChatsAll.unshift(data)
            this.count++;
          }
          this.listUserChats[0].createDate = new Date().toLocaleString("en-US", { timeZone: "Iceland" });
          this.listUserChats[0].lastedMessage = message;
        }
        this.cdr.detectChanges();
        this.receiveMessage = { from: from, message: message };
        this.boxChatComponent.loadMessage(this.receiveMessage)
      }
    });
  }
  getIdcurrentPeople() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.peopleId = params['id'];
      if (this.peopleId) {
        //  console.log(this.peopleId)
        this.service.getPeopleProfile(this.peopleId).subscribe(
          res => {
            //  console.log(res)
            if (res.err == 404) {
              this.notFound = true;
            } else {
              this.notFound = false;
              this.people = res;
              this.cdr.detectChanges();
              this.boxChatComponent.load(this.peopleId)
            }
          }
        )
      } else {
        if (this.listUserChats[0])
          this.router.navigate(["/Users/Message/"], { queryParams: { id: this.listUserChats[0].id } })
      }
    });
  }
  loadMoreList() {
    this.isLoadingMess = true;
    this.index = this.listUserChats.length;
    // this.index++;
    // this.cdr.detectChanges();
    // this.listchatbox.nativeElement.scrollTop = 696969;
    setTimeout(() => {
      let re = this.listUserChatsAll.slice(this.index + this.count, 10 + this.index + this.count);
      console.log(re)
      this.listUserChats = this.listUserChats.concat(re);
      this.isLoadingMess = false;
    }, 1000);
    // this.service.getListUserChat(this.index, 3).subscribe(
    //   res => {
    //     console.log(res)
    //     this.listUserChats = this.listUserChats.concat(res);
    //     this.isLoadingMess = false;
    //   }
    // )
  }
  onClickItem(sender) {
    this.router.navigate([], { queryParams: { id: sender.id } })
  }
  onScrollDown() {
    console.log('scrolldown')
    this.loadMoreList();
  }


}
