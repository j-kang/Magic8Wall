import { Injectable } from "@nestjs/common";
import { Quote } from "../interfaces/stock.interfaces";
import { StockClient } from "../clients/stock.clients"

@Injectable()
export class StockDataService {
    constructor(private readonly client: StockClient){};

    getQuote(symbol: string): Promise<Quote> {
        return this.client.getQuote(symbol);
    }
}