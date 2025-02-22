import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { AirtableService } from 'src/airtable.service';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly airtableService: AirtableService) {
    const token = 'apiKEY';

    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/start (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const token = match?.[1];

      if (!token) {
        this.bot.sendMessage(chatId, 'Erreur !');
        return;
      } else {
        try {
          await this.airtableService.updateChatId(chatId, token);
          this.bot.sendMessage(chatId, 'Parfait !');
        } catch (error) {
          return error;
        }
      }
    });

    this.bot.onText(/\/stop/, async (msg, match) => {
      const chatId = msg.chat.id;
      try {
        await this.airtableService.unsubscribeUser(chatId);
        this.bot.sendMessage(chatId, 'Stop pris en compte !');
      } catch (e) {
        console.log(e);
      }
    });
  }
}
