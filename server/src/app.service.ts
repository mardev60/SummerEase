import { Injectable } from '@nestjs/common';
import { AirtableService } from './airtable.service';

@Injectable()
export class AppService {
  constructor(private readonly airtableService: AirtableService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createSubject(subject: string, name: string) {
    const token = Math.random().toString(36).substr(2, 8);
    await this.airtableService.createSubject(subject, name, token);

    const telegramLink = this.generateTelegramLink(token);
    return telegramLink;
  }

  generateTelegramLink(token: string): any {
    return { telegram_link: `https://t.me/nwsvc_bot?start=${token}` };
  }
}
