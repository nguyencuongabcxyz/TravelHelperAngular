import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageSender } from 'src/app/models/messagesender';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { getDiffieHellman } from 'crypto';
import { UserChat } from 'src/app/models/userchat';
import { UserService } from 'src/app/services/user.service';
import { BoxChatComponent } from "./box-chat/box-chat.component";
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.hubConnection.stop();
  }
  @ViewChild(BoxChatComponent) boxChatComponent: BoxChatComponent;
  constructor(private service: UserService, public router: Router, public activatedRoute: ActivatedRoute, private http: HttpClient) { }
  listUserChats: MessageSender[];
  userModel: UserChat;
  private hubConnection: HubConnection;
  people;
  peopleId: String;
  message: String;
  receiveMessage;
  name: String;
  avatar: String;
  token: String = localStorage.getItem("token");
  index = 0;

  user;
  ngOnInit() {
    this.connect();
    this.user = this.activatedRoute.snapshot.data.user;
    this.listUserChats = this.activatedRoute.snapshot.data.listUserChats;
    this.getId();
  }
  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://travelhelperwebsite.azurewebsites.net/chat', {
        accessTokenFactory: () => {
          return this.token;
        },
      } as signalR.IHttpConnectionOptions)
      .build();


    this.hubConnection
      .start()
      .then(() => console.log('Connection Started!'))
      .catch((err)=>console.log(err))


    this.hubConnection.on('sendChatMessage', (from: string, message: string) => {
      console.log(from + ":" + message)
      this.receiveMessage = { from: from, message: message }
      this.boxChatComponent.loadMessage(this.receiveMessage)
    });
  }
  sendMessage(event): void {
    this.hubConnection
      .invoke('sendChatMessage', event.peopleId, event.textchat)
      .catch(err => console.error(err));
  }
  getId() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.peopleId = params['id'];
      console.log(this.peopleId)
      if (this.peopleId) {
        this.service.getPeopleProfile(this.peopleId).subscribe(
          res => {
            this.people = res;
          }
        )
        this.boxChatComponent.load(this.peopleId)
      } else {
        console.log('un')
        this.router.navigate(["/Users/Message/"], { queryParams: { id: this.listUserChats[0].id } })
      }
    });
  }
  loadMoreList() {
    this.index++;
    this.service.getListUserChat(this.index).subscribe(
      res => {
        console.log(res)
      }
    )
  }
}
