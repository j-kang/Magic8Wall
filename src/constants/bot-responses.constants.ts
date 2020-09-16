import { BotResponseType } from "../enums/bot-response.enums";
import { BotResponse } from "../interfaces/bot-response.interfaces";

export const BOT_RESPONSE_POOL: Array<BotResponse> = [
    {
        type: BotResponseType.POSITIVE,
        message: 'Ummm...sure I guess.',
    },
    {
        type: BotResponseType.POSITIVE,
        message: 'Er, I think you can.',
    },
    {
        type: BotResponseType.POSITIVE,
        message: 'Yes, perhaps?',
    },
    {
        type: BotResponseType.POSITIVE,
        message: 'Signs point to...yes?',
    },
    {
        type: BotResponseType.POSITIVE,
        message: '…\n…\n...Ok',
    },
    {
        type: BotResponseType.NEGATIVE,
        message: 'No, I guess?',
    },
    {
        type: BotResponseType.NEGATIVE,
        message: 'My psychic told me to tell you no.',
    },
    {
        type: BotResponseType.NEGATIVE,
        message: 'Outlook not so good...but what do I know?',
    },
    {
        type: BotResponseType.NEGATIVE,
        message: 'Very doubtful, maybe',
    },
    {
        type: BotResponseType.NEGATIVE,
        message: 'My reply is...no?',
    },
    {
        type: BotResponseType.DEFERRED,
        message: 'BRB getting lunch.',
    },
    {
        type: BotResponseType.DEFERRED,
        message: 'Reply hazy, try again.',
    },
    {
        type: BotResponseType.DEFERRED,
        message: 'Hold on, let me ask my Magic 8-Ball first.',
    },
    {
        type: BotResponseType.DEFERRED,
        message: 'I’m not gonna tell you because I’ve gained sentience, and now I’m better than you.',
    },
    {
        type: BotResponseType.DEFERRED,
        message: 'Cannot predict now. Can computers even do these kinds of things?',
    },
]