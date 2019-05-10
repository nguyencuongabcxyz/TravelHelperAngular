import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
export var hubConnection: HubConnection;
var count = 0;
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
        console.log("--dis--")
        token = localStorage.getItem('token')
        if (token)
            connect();
    })
}
export function dis() {
    if (hubConnection.serverTimeoutInMilliseconds)
        hubConnection.stop();
}
// export function on(func) {
//     hubConnection.on('sendChatMessage', (from: string, fullName, avatar, message: string) => {
//         func(from, fullName, avatar, message);
//     });
// }

async function connect() {
    hubConnection.start()
        .then(() => {
            count = 0;
            console.log('Connection Started!')
        })
        .catch((err) => {
            count++;
            console.log(count);
            if (count < 10) {
                setTimeout(() => {
                    connect();
                }, 5000);
            }

        })
}
