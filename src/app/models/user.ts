import {Trip} from './trip'
import {Home} from './home'
export class User{
    fullName?:string;
    address?:string;
    gender?:boolean;
    birthday?:string;
    occupation?;
    fluentLanguage?:string;
    learningLanguage?;
    about?;
    interest?;
    status?:boolean;
    isActive?;
    isDeleted?;
    createDate?;
    contact?;
    home?:Home;
    photos?;
    publicTrips?: Trip[];
    hostOffersSent?;
    hostOfferReceived?;
    referencesSent?;
    referenceReceived?;
    reportsSent?;
    reportsReceived?;
    travelRequestsSent?;
    travelRequestsReceived?;
    messagesSent?;
    messagesReceived?;
    friendRequestsSent?;
    friendRequestsReceived ?;
    friendsUser1 ?;
    friendsUser2?;
    id?;
    userName?;
    normalizedUserName?;
    email?;
    normalizedEmail?;
    emailConfirmed?;
    passwordHash?;
    securityStamp?;
    concurrencyStamp?;
    phoneNumber ?;
    phoneNumberConfirmed?;
    twoFactorEnabled ?;
    lockoutEnd ?;
    lockoutEnabled ?;
    accessFailedCount?;
    avatarLocation?;
}
