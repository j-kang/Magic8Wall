import { Inject, Injectable } from "@nestjs/common";
import { WebAPICallResult, WebClient } from "@slack/web-api";

@Injectable()
export abstract class MessagingClient {
    abstract send(message: any, destination: string): any;
}

@Injectable()
export class SlackClient extends MessagingClient {

    constructor(private readonly client: WebClient) {
        super();
        this.client = client;
    }

    async send(message: any, toDestination: string) {
        const response = await this.client.chat.postMessage({
            channel: toDestination,
            text: "Beep boop",
            ...message,
        }) as WebAPICallResult

        return ;
    }
}

@Injectable()
export class MockSlackClient extends MessagingClient {
    send(message: any, toDestination: string) {
       return `${message.text} sent to ${toDestination}`;
    }
}