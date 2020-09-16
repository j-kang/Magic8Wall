import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OutboundMessageService} from '../outbound-message.services';
import { MessagingClient, MockSlackClient } from '../../clients/messaging.clients';

describe('OutboundMessageService', () => {
  let app: INestApplication;
  let outboundMessageService: OutboundMessageService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        OutboundMessageService,
        {
          provide: MessagingClient,
          useClass: MockSlackClient,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    outboundMessageService = app.get<OutboundMessageService>(OutboundMessageService);
  });

  it('should post message to chat', () => {
    expect(outboundMessageService.send({text: "Hello, World!"}, "#random"))
      .toBe("Hello, World! sent to #random");
  });
});
