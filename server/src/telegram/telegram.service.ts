import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { AirtableService } from 'src/airtable.service';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly airtableService: AirtableService) {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/start (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const token = match?.[1];

      if (!token) {
        this.bot.sendMessage(
          chatId,
          '❌ Oops! It seems the activation link is incorrect. Please try again.'
        );
        return;
      } else {
        try {
          await this.airtableService.updateChatId(chatId, token);
          this.bot.sendMessage(
            chatId,
            `✅ Subscription successful!\n\nYou will now receive your daily newsletter every morning around 9am (Paris time).\n\nIf you wish to unsubscribe at any time, simply send the /stop command.\n\nHappy reading! 📰`
          );
        } catch (error) {
          this.bot.sendMessage(
            chatId,
            '❌ An error occurred during your subscription. Please try again later.'
          );
          return error;
        }
      }
    });

    this.bot.onText(/\/stop/, async (msg) => {
      const chatId = msg.chat.id;
      try {
        await this.airtableService.unsubscribeUser(chatId);
        this.bot.sendMessage(
          chatId,
          '✅ Unsubscription successful!\n\nYou will no longer receive newsletters. We\'re sorry to see you go.\n\nIf you change your mind, you can always resubscribe using the same activation link. See you soon, perhaps! 👋'
        );
      } catch (e) {
        this.bot.sendMessage(
          chatId,
          '❌ An error occurred during your unsubscription. Please try again later.'
        );
        console.log(e);
      }
    });
  }
}
