import { Migration } from '@mikro-orm/migrations';

export class Migration20240403204113 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "torrents" ("id" varchar(40) not null, "name" varchar(256) not null, "status" text check ("status" in (\'Started\', \'Paused\', \'Finished\')) not null, "started_at" timestamptz not null, constraint "torrents_pkey" primary key ("id"));');

    this.addSql('create table "torrent_files" ("id" uuid not null, "name" varchar(256) not null, "torrent_id" varchar(40) not null, constraint "torrent_files_pkey" primary key ("id"));');

    this.addSql('alter table "torrent_files" add constraint "torrent_files_torrent_id_foreign" foreign key ("torrent_id") references "torrents" ("id") on update cascade;');
  }

}
