import { Inject, Injectable } from "@nestjs/common";
import fetch from 'node-fetch';
import { BASE_URL, QUOTE } from "../constants/finnhub-api.constants";
import { URLSearchParams } from "url";
import { FinnhubEndpoint} from "../interfaces/finnhub-api.interfaces";
import { Quote } from "../interfaces/stock.interfaces";

@Injectable()
export abstract class StockClient {
    abstract getQuote(symbol: string): Promise<Quote>;
}

@Injectable()
export class FinnhubClient extends StockClient {

    constructor(@Inject('FINNHUB_KEY') private readonly apiKey: string) {
        super();
    }

    private buildUrl(endpoint: FinnhubEndpoint, params: object): string {
        let query = new URLSearchParams(`token=${this.apiKey}`);

        endpoint.queryParams.forEach(key => query.append(key, params[key]))

        return `${BASE_URL}${endpoint.route}?${query.toString()}`;
    }
    
    async getQuote(symbol: string): Promise<Quote> {
        const response = await fetch(this.buildUrl(QUOTE, {symbol: symbol}));

        if(response.ok) {
            const data = await response.json();
            return {
                openPrice: data.o,
                highPrice: data.h,
                lowPrice: data.l,
                currentPrice: data.c,
                previousClosePrice: data.pc,
            }
        } else {
            throw new Error(`Status was ${response.status}`);
        }

    }
}