import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
export var hubConnection: HubConnection;
export function con() {
    let token = localStorage.getItem('token')
    hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://travelhelperwebsite.azurewebsites.net/chat', {
            accessTokenFactory: () => {
                return token;
            },
        } as signalR.IHttpConnectionOptions)
        .build();
    connect();
    hubConnection.onclose(() => {
        token = localStorage.getItem('token')
        if (token)
            connect();
    })
}
export function dis() {
    if (hubConnection)
        hubConnection.stop();
}
export function on(func) {
    hubConnection.on('sendChatMessage', (from: string, fullName, avatar, message: string) => {
        func(from, fullName, avatar, message);
    });
}

async function connect() {
    hubConnection.start()
        .then(() => {
            console.log('Connection Started!')
        })
        .catch((err) => {
            console.log(err);
            sleep(5000);
            connect();
        })
}
async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}