import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BotResponseType } from '../../enums/bot-response.enums';
import { BotResponseService } from '../bot-response.services';

describe('BotResponseService', () => {
  let app: INestApplication;
  let botResponseService: BotResponseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [BotResponseService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    botResponseService = app.get<BotResponseService>(BotResponseService);
  });

  it('should get positive response', () => {
    expect(botResponseService.getResponse(BotResponseType.POSITIVE).type)
    .toBe(BotResponseType.POSITIVE);
  });

  it('should get negative response', () => {
    expect(botResponseService.getResponse(BotResponseType.NEGATIVE).type)
    .toBe(BotResponseType.NEGATIVE);
  });

  it('should get deferred response', () => {
    expect(botResponseService.getResponse(BotResponseType.DEFERRED).type)
    .toBe(BotResponseType.DEFERRED);
  });
});
