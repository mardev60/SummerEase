import { Injectable } from '@nestjs/common';
import * as Airtable from 'airtable';

@Injectable()
export class AirtableService {
  private airtable: Airtable;
  private base: Airtable.Base;

  constructor() {
    this.base = new Airtable({
      apiKey: 'apiKey',
    }).base('dbID');
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
      // Rechercher tous les enregistrements avec le même chat_id
      const existingChatRecords = await this.base('news_db')
        .select({ filterByFormula: `{chat_id} = '${chatId}'` })
        .firstPage();

      // Supprimer tous les enregistrements trouvés avec ce chat_id
      if (existingChatRecords.length > 0) {
        await this.base('news_db').destroy(
          existingChatRecords.map((record) => record.id),
        );
        console.log(
          `Supprimé ${existingChatRecords.length} enregistrement(s) avec chat_id ${chatId}`,
        );
      }

      // Insérer la nouvelle ligne avec le chat_id et le token
      await this.base('news_db').create({
        chat_id: chatId.toString(),
        token: token,
      });

      console.log(
        `Nouvel enregistrement ajouté avec chat_id ${chatId} et token ${token}`,
      );
    } catch (error) {
      console.error('Erreur dans updateChatId:', error);
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
