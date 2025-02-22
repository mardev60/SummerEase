import { Injectable } from '@nestjs/common';
import * as Airtable from 'airtable';

@Injectable()
export class AirtableService {
  private airtable: Airtable;
  private base: Airtable.Base;

  constructor() {
    this.base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);
  }

  async createSubject(subject: string, name: string, token: string) {
    try {
      const createdRecord = await this.base('news_db').create([
        {
          fields: {
            subject: subject,
            token: token,
            name: name,
          },
        },
      ]);
      return createdRecord;
    } catch (error) {
      throw new Error(`Failed to create subject: ${error.message}`);
    }
  }

  async updateChatId(chatId: string, token: string) {
    try {
      const existingRecords = await this.base('news_db')
        .select({ filterByFormula: `{chat_id} = '${chatId}'` })
        .firstPage();

      if (existingRecords.length > 0) {
        await Promise.all(existingRecords.map(record => 
          this.base('news_db').destroy(record.id)
        ));
        console.log(`Deleted ${existingRecords.length} records with chat_id ${chatId}`);
      }

      const records = await this.base('news_db')
        .select({ filterByFormula: `{token} = '${token}'` })
        .firstPage();

      if (records.length === 0) {
        throw new Error('No record found with this token');
      }

      await this.base('news_db').update(records[0].id, {
        chat_id: chatId.toString()
      });

      console.log(
        `Updated record with token ${token} to have chat_id ${chatId}`,
      );
    } catch (error) {
      console.error('Error in updateChatId:', error);
      throw error;
    }
  }

  async unsubscribeUser(chatId: string) {
    try {
      const records = await this.base('news_db')
        .select({ filterByFormula: `{chat_id} = '${chatId}'` })
        .firstPage();

      if (records.length === 0) {
        throw new Error('Aucun enregistrement trouvé pour ce chat_id.');
      }

      await this.base('news_db').destroy(records[0].id);

      console.log(`Utilisateur avec chat_id: ${chatId} supprimé.`);
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }
}
