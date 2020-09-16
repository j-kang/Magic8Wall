import { Inject, Injectable } from "@nestjs/common";
import { MessagingClient } from "../clients/messaging.clients";

@Injectable()
export class OutboundMessageService {
    constructor(private readonly messagingClient: MessagingClient) {};

    send(message: any, toDestination: string) {
        return this.messagingClient.send(message, toDestination)
    }
}