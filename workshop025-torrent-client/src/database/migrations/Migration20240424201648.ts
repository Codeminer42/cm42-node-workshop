import { Migration } from '@mikro-orm/migrations';

export class Migration20240424201648 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "torrents" add column "finished_at" timestamptz null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "torrents" drop column "finished_at";');
  }

}
