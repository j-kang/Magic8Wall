import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BotReplyService } from '../services/bot-reply.services';

@Controller('reply')
export class ReplyController {
  constructor(private readonly botReplyService: BotReplyService) {}

  @Post()
  generateAndSend(@Body() request) {
    this.botReplyService.generateMessageAndSend(request['channel_id'], request['text'], request['user_name']);
  }
}