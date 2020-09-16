import { Injectable } from "@nestjs/common";
import { BOT_RESPONSE_POOL } from "../constants/bot-responses.constants";
import { BotResponseType } from "../enums/bot-response.enums";
import { BotResponse } from "src/interfaces/bot-response.interfaces";

@Injectable()
export class BotResponseService {
    readonly responses: Array<BotResponse> = BOT_RESPONSE_POOL;

    getResponse(type: BotResponseType): BotResponse {
        let response: BotResponse;

        let typeMatchedResponses: Array<BotResponse> = this.responses
            .filter(response => response.type === type);
        
        response = typeMatchedResponses[Math.floor(Math.random() * typeMatchedResponses.length)];

        return response;
    }
}