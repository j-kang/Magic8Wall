import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WebClient } from '@slack/web-api';
import { MessagingClient, MockSlackClient, SlackClient } from '../../clients/messaging.clients';
import { FinnhubClient, StockClient } from '../../clients/stock.clients';
import { BotReplyService } from '../bot-reply.services';
import { BotResponseService } from '../bot-response.services';
import { OutboundMessageService } from '../outbound-message.services';
import { StockDataService } from '../stock-data.service';

describe('BotReplyService', () => {
  let app: INestApplication;
  let botReplyService: BotReplyService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    botReplyService = app.get<BotReplyService>(BotReplyService);
  });

  it('should send reply', async () => {
    let message = await botReplyService.generateMessageAndSend("#random", "AAPL", "joseph");
  });
});
