import { Module } from '@nestjs/common';
import { AirtableService } from './airtable.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AirtableService, TelegramService],
})
export class AppModule {}
