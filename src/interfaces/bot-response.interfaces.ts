import { BotResponseType } from "src/enums/bot-response.enums";

export interface BotResponse {
    type: BotResponseType,
    message: string,
}