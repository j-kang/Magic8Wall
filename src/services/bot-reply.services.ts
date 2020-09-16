import { Injectable } from "@nestjs/common";
import { BotResponseType, BOT_RESPONSE_TYPES } from "../enums/bot-response.enums";
import { BotResponseService } from "./bot-response.services";
import { OutboundMessageService } from "./outbound-message.services";
import { StockDataService } from "./stock-data.service";
import { BotResponse } from "../interfaces/bot-response.interfaces";
import { Quote } from "../interfaces/stock.interfaces";

@Injectable()
export class BotReplyService {
    constructor(private readonly botResponseService: BotResponseService,
        private readonly outboundMessageService: OutboundMessageService,
        private readonly stockDataService: StockDataService) {};
    

    private getRandomBotResponseType(): BotResponseType {
        return BOT_RESPONSE_TYPES[Math.floor(Math.random() * 3)];
    }

    private getRandomBotResponse(): BotResponse {
        return this.botResponseService.getResponse(this.getRandomBotResponseType());
    }

    private buildReply(symbol: string, user: string, stockQuote: Quote, botResponse: BotResponse) {
        return {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `_Should @${user} buy *${symbol}*?_\n\n ${botResponse.message}`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `:dollar:* Current Price:* ${stockQuote.currentPrice}`
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*:sunny: Open Price:* ${stockQuote.openPrice}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*:moon: Previous Close Price:* ${stockQuote.previousClosePrice}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*:chart_with_upwards_trend: High Today:* ${stockQuote.highPrice}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*:chart_with_downwards_trend: Low Today:* ${stockQuote.lowPrice}`
                        }
                    ]
                },
                {
                    "type": "divider"
                }
            ]
        }
    }

    async generateMessageAndSend(toDestination: string, symbol: string, user: string) {
        let stockQuote = await this.stockDataService.getQuote(symbol);
        let botResponse = this.getRandomBotResponse();

        let reply = this.buildReply(symbol, user, stockQuote, botResponse);

        return this.outboundMessageService.send(reply, toDestination);
    }
}