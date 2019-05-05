import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageSender } from 'src/app/models/messagesender';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { getDiffieHellman } from 'crypto';
import { UserChat } from 'src/app/models/userchat';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private http: HttpClient) { }
  messageSenders: MessageSender[];
  userModel: UserChat;
  private hubConnection: HubConnection;
  to: String;
  message: String;
  name: String;
  avatar: String;
  token: String = localStorage.getItem("token");

  public sendMessage(): void {
    this.hubConnection
      .invoke('sendChatMessage', this.to, this.message)
      .catch(err => console.error(err));
  }
  ngOnInit() {
    this.getId();
    this.http.get('http://travelhelperwebsite.azurewebsites.net/api/users/messagesenders').subscribe((res: MessageSender[]) => {
      this.messageSenders = res;
      this.to = this.messageSenders[0].id;
      this.router.navigateByUrl("/Users/Message/"+this.to+"");
    });
    if(this.to!=undefined){
      this.http.get('http://travelhelperwebsite.azurewebsites.net/api/userchats/'+this.to).subscribe((res: UserChat) =>{
        this.name = res.fullName;
        this.avatar = res.avatar;
        console.log(res);
      });
    }
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://travelhelperwebsite.azurewebsites.net/chat', {
        accessTokenFactory: () => {
          return this.token;
        },
      } as signalR.IHttpConnectionOptions)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection Started!'));
    this.hubConnection.on('sendChatMessage', (from: string, message: string) => {
      console.log(from + ":" + message)
    });
  }
  getId(){
    this.activatedRoute.params.subscribe(params => {
      this.to = params['id'];
    });
  }
  reloadPage(id){
    this.router.navigateByUrl("/Users/Message/"+id+"");
    this.ngOnInit();
    console.log("reload");
  }
}
