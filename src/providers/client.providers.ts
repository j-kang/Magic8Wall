import { MessagingClient, MockSlackClient, SlackClient } from "../clients/messaging.clients";

export const slackProvider = {
    provide: MessagingClient,
    useFactory: () => {
        if(process.env.NODE_ENV === 'test') {
            return new MockSlackClient();
        }
    }  
}