import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FinnhubClient, StockClient } from '../../clients/stock.clients';
import { StockDataService } from '../stock-data.service';

describe('StockDataService', () => {
  let app: INestApplication;
  let stockDataService: StockDataService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        StockDataService,
        {
          provide: StockClient,
          useClass: FinnhubClient,
        },
        {
          provide: "FINNHUB_KEY",
          useValue: process.env.FINNHUB_KEY,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    stockDataService = app.get<StockDataService>(StockDataService);
  });

  it('should get stock data', () => {
    const data = stockDataService.getQuote('AAPL');

    expect(data).resolves.toHaveProperty<number>('openPrice');
    expect(data).resolves.toHaveProperty<number>('highPrice');
    expect(data).resolves.toHaveProperty<number>('lowPrice');
    expect(data).resolves.toHaveProperty<number>('currentPrice');
    expect(data).resolves.toHaveProperty<number>('previousClosePrice');
  });
});
