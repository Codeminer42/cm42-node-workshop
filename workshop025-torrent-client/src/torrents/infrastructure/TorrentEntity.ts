import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  OneToMany,
  ManyToOne,
  Reference,
  Enum,
  EntityDTO,
  BaseEntity,
} from "@mikro-orm/core";

import { TorrentStatus } from "../domain/Torrent.js";

@Entity({ tableName: "torrent_files" })
export class TorrentFileEntity extends BaseEntity {
  @PrimaryKey({ type: "uuid" })
  id: string;

  @Property({ type: "varchar" })
  name: string;

  @ManyToOne({
    inversedBy: "files",
    entity: "TorrentEntity",
    deleteRule: "cascade",
  })
  torrent: Reference<TorrentEntity>;

  constructor(data: EntityDTO<TorrentFileEntity>) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.torrent = Reference.createFromPK(TorrentEntity, data.torrent);
  }
}

@Entity({ tableName: "torrents" })
export class TorrentEntity extends BaseEntity {
  @PrimaryKey({ type: "varchar", length: 40 })
  id: string;

  @Property({ type: "varchar" })
  name: string;

  @Enum({ items: Object.values(TorrentStatus) })
  status: TorrentStatus;

  @Property({ type: "datetime" })
  startedAt: Date;

  @OneToMany({ mappedBy: "torrent", entity: "TorrentFileEntity" })
  files = new Collection<TorrentFileEntity>(this);

  constructor(data: EntityDTO<TorrentEntity>) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.startedAt = data.startedAt;
    this.files = new Collection(
      this,
      data.files.map((file) => new TorrentFileEntity(file))
    );
  }
}
