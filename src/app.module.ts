import { Module } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { MessagingClient, SlackClient } from './clients/messaging.clients';
import { StockClient, FinnhubClient } from './clients/stock.clients';
import { ReplyController } from './controllers/reply.controller';
import { BotResponseType } from './enums/bot-response.enums';
import { BotReplyService } from './services/bot-reply.services';
import { BotResponseService } from './services/bot-response.services';
import { OutboundMessageService } from './services/outbound-message.services';
import { StockDataService } from './services/stock-data.service';

@Module({
  controllers: [ReplyController],
  providers: [
    BotReplyService,
    BotResponseService,
    OutboundMessageService,
    StockDataService, 
    {
      provide: StockClient,
      useClass: FinnhubClient,
    },
    {
     provide: "FINNHUB_KEY",
     useValue: process.env.FINNHUB_KEY,
    },
    {
     provide: MessagingClient,
     useFactory: () => {
       let token = process.env.SLACK_BOT_TOKEN
       return new SlackClient(new WebClient(token));
      } 
    },
  ],
})
export class AppModule {}
